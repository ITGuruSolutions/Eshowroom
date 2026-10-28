// =============================================================================
// Hans Impex 360° E-Showroom — Master Interactive Controller
// Built with Three.js WebGL Engine · Bajaj E-Showroom Architecture
// =============================================================================

(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Global Showroom Application State
  const state = {
    three: {
      renderer: null,
      scene: null,
      camera: null,
      sphereMesh: null,
      yaw: 180,
      pitch: -20,
      fov: 74,
      targetYaw: 180,
      targetPitch: -20,
      targetFov: 74,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      velYaw: 0,
      velPitch: 0,
      autoRotate: !reducedMotion,
      idleTimer: 0,
      gyroEnabled: false,
      isTweening: false
    },
    activeProductId: null,
    activeCategory: "all",
    activeTourIndex: -1,
    tourTimer: null,
    tourProgress: 0,
    audioEnabled: false,
    audioCtx: null,
    ambientNodes: null,
    turntable: {
      angle: 0,
      isDragging: false,
      startX: 0,
      autoSpin: true
    },
    selectedVariantIndex: 0,
    mood: "day" // 'day', 'night', 'gold'
  };

  // Cached DOM Elements
  const els = {
    viewport: $("#showroom-viewport"),
    canvas: $("#showroom-canvas"),
    spotsContainer: $("#spots-container"),
    loader: $("#viewport-loader"),
    loaderBar: $(".viewport-loader-bar"),
    gate: $("#gate-screen"),
    gateEnterBtn: $("#gate-enter-btn"),
    gateAudioCheck: null,
    toast: $("#showroom-toast"),
    search: $("#search-input"),
    searchResults: $("#search-results-tray"),
    pavilionNav: $("#pavilion-nav"),
    rail: $("#showcase-rail"),
    hint: $("#interaction-hint"),
    compassArrow: $("#compass-arrow"),
    radarPanel: $("#radar-map-panel"),
    radarToggle: $("#radar-toggle-btn"),
    radarLauncher: $("#radar-collapsed-launcher"),
    fovCone: $("#map-fov-cone"),
    userBeacon: $("#map-user-beacon"),
    tourConsole: $("#tour-console"),
    tourBadge: $("#tour-station-badge"),
    tourTitle: $("#tour-station-title"),
    tourCounter: $("#tour-step-counter"),
    tourCaption: $("#tour-caption-text"),
    tourProgressFill: $("#tour-progress-fill"),
    tourPlayBtn: $("#tour-play-pause-btn"),
    studioOverlay: $("#product-studio-overlay"),
    turntableImg: $("#turntable-product-img"),
    turntableStage: $("#turntable-container"),
    quoteModal: $("#quote-modal-backdrop"),
    quoteForm: $("#export-quote-form"),
    soundToggleBtn: null,
    tourToggleBtn: $("#guided-tour-btn"),
    moodToggleBtn: $("#mood-toggle-btn")
  };

  // Audio section removed per user request (safe no-op stubs maintained)
  const AudioEngine = {
    init() {},
    startAmbiance() {},
    stopAmbiance() {},
    playChime() {},
    playWhoosh() {},
    playClick() {}
  };

  // ---------------------------------------------------------------------------
  // Three.js 360° Equirectangular WebGL Engine
  // ---------------------------------------------------------------------------
  function initThreeEngine() {
    if (!window.THREE) {
      console.error("Three.js not found. Hotspots will fall back to static mode.");
      return;
    }

    const container = els.viewport;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(state.three.fov, width / height, 0.1, 1200);
    camera.target = new THREE.Vector3(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: els.canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    if (THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 3. High-Fidelity Inverted Equirectangular Sphere (160x96 segments for seamless curvature without polygon stepping)
    const sphereGeo = new THREE.SphereGeometry(500, 160, 96);
    sphereGeo.scale(-1, 1, 1); // Invert inside faces

    // Multi-tier texture candidate chain for maximum speed, sharpness, and offline file:/// support
    const texLoader = new THREE.TextureLoader();
    
    // Check if on file:/// protocol with embedded base64 available to bypass browser null-origin CORS
    const isFileProtocol = window.location.protocol === "file:";
    const candidates = [];
    if (isFileProtocol && window.__SHOWROOM_PANO_BASE64__) {
      candidates.push(window.__SHOWROOM_PANO_BASE64__);
    }
    candidates.push(
      "background2.webp",
      "background2.jpeg",
      "background.webp",
      "backgraound.webp",
      "background.jpg",
      "backgraound.jpg",
      "backgraound_original.jpg",
      "assets/showroom-360.webp"
    );
    if (window.__SHOWROOM_PANO_BASE64__) {
      candidates.push(window.__SHOWROOM_PANO_BASE64__);
    }

    let candidateIndex = 0;
    const applyTexture = (texture) => {
      if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
      // Disable mipmapping to prevent screen-space distance over-blurring on 360 photo spheres
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      if (renderer.capabilities) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }

      if (!state.three.sphereMesh) {
        const sphereMat = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(mesh);
        state.three.sphereMesh = mesh;
      } else {
        state.three.sphereMesh.material.map = texture;
        state.three.sphereMesh.material.needsUpdate = true;
      }

      els.loader.classList.remove("show");
      showInteractionHint();
    };

    const tryLoadNext = () => {
      if (candidateIndex >= candidates.length) {
        console.warn("[Hans Impex 360] All texture sources exhausted, using procedural grid.");
        els.loader.classList.remove("show");
        return;
      }

      const src = candidates[candidateIndex++];
      texLoader.load(
        src,
        (texture) => {
          applyTexture(texture);
        },
        (xhr) => {
          if (xhr.lengthComputable && els.loaderBar) {
            const pct = Math.round((xhr.loaded / xhr.total) * 100);
            els.loaderBar.style.width = pct + "%";
          }
        },
        (err) => {
          console.warn("[Hans Impex 360] Texture load failed for candidate, trying next tier:", src, err);
          tryLoadNext();
        }
      );
    };

    tryLoadNext();

    state.three.renderer = renderer;
    state.three.scene = scene;
    state.three.camera = camera;

    setupPanoInteraction();
    createHotspotElements();
    renderShowcaseRail(state.activeCategory);

    // Animation Loop
    let lastTime = performance.now();
    function animate(currentTime) {
      requestAnimationFrame(animate);
      const dt = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      updateCameraPhysics(dt);
      updateHotspotPositions();
      updateRadarTelemetry();
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);

    window.addEventListener("resize", onWindowResize);
  }

  // Convert (pitch, yaw) spherical coordinates to 3D Vector3 (aligned 1:1 with camera lookAt)
  function latLonToVector3(pitch, yaw, radius = 450) {
    const phi = THREE.MathUtils.degToRad(90 - pitch);
    const theta = THREE.MathUtils.degToRad(yaw);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Update Camera Target, Inertia, Damping & FOV
  function updateCameraPhysics(dt) {
    const t = state.three;

    if (!t.isDragging && !t.isTweening) {
      t.yaw += t.velYaw * dt;
      t.pitch += t.velPitch * dt;

      // Inertia decay
      const decay = Math.pow(0.05, dt);
      t.velYaw *= decay;
      t.velPitch *= decay;
      if (Math.abs(t.velYaw) < 0.05) t.velYaw = 0;
      if (Math.abs(t.velPitch) < 0.05) t.velPitch = 0;

      // Auto-rotation when idle
      t.idleTimer += dt;
      if (t.autoRotate && t.idleTimer > 4 && state.activeTourIndex === -1 && !state.activeProductId) {
        t.yaw += dt * 4.5;
      }
    }

    // Clamp pitch between -75 and 75 degrees
    t.pitch = Math.max(-75, Math.min(75, t.pitch));

    // Update Three.js camera look target
    const phi = THREE.MathUtils.degToRad(90 - t.pitch);
    const theta = THREE.MathUtils.degToRad(t.yaw);

    const targetX = 500 * Math.sin(phi) * Math.cos(theta);
    const targetY = 500 * Math.cos(phi);
    const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

    t.camera.lookAt(targetX, targetY, targetZ);
    t.camera.fov = t.fov;
    t.camera.updateProjectionMatrix();
  }

  // Smooth camera tween to specified coordinates
  function tweenCameraTo(targetPitch, targetYaw, targetFov = 78, duration = 1000, onComplete) {
    const t = state.three;
    t.isTweening = true;
    t.autoRotate = false;
    t.idleTimer = 0;

    const startPitch = t.pitch;
    const startYaw = t.yaw;
    const startFov = t.fov;

    // Normalize yaw difference to shortest path (-180 to 180)
    let deltaYaw = (targetYaw - startYaw) % 360;
    if (deltaYaw > 180) deltaYaw -= 360;
    if (deltaYaw < -180) deltaYaw += 360;

    const deltaPitch = targetPitch - startPitch;
    const deltaFov = (targetFov || startFov) - startFov;

    if (reducedMotion || duration <= 0) {
      t.pitch = targetPitch;
      t.yaw = startYaw + deltaYaw;
      t.fov = targetFov || startFov;
      t.isTweening = false;
      if (onComplete) onComplete();
      return;
    }

    AudioEngine.playWhoosh();
    const startTime = performance.now();

    function stepTween(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      t.pitch = startPitch + deltaPitch * ease;
      t.yaw = startYaw + deltaYaw * ease;
      t.fov = startFov + deltaFov * ease;

      if (progress < 1) {
        requestAnimationFrame(stepTween);
      } else {
        t.isTweening = false;
        if (onComplete) onComplete();
      }
    }
    requestAnimationFrame(stepTween);
  }

  // Resize Handler
  function onWindowResize() {
    const t = state.three;
    if (!t.camera || !t.renderer) return;
    const width = els.viewport.clientWidth || window.innerWidth;
    const height = els.viewport.clientHeight || window.innerHeight;
    t.camera.aspect = width / height;
    t.camera.updateProjectionMatrix();
    t.renderer.setSize(width, height);
  }

  // Pointer / Touch / Mousewheel Input Handling
  function setupPanoInteraction() {
    const vp = els.viewport;
    const t = state.three;
    let pinchDist = 0;

    vp.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".spot-node") || e.target.closest(".hud-btn")) return;
      t.isDragging = true;
      t.lastMouseX = e.clientX;
      t.lastMouseY = e.clientY;
      t.velYaw = 0;
      t.velPitch = 0;
      t.autoRotate = false;
      t.idleTimer = 0;
      try { vp.setPointerCapture(e.pointerId); } catch (_) {}
    });

    vp.addEventListener("pointermove", (e) => {
      if (!t.isDragging) return;
      const dx = e.clientX - t.lastMouseX;
      const dy = e.clientY - t.lastMouseY;
      t.lastMouseX = e.clientX;
      t.lastMouseY = e.clientY;

      const sensitivity = (t.fov / 78) * 0.16;
      t.yaw -= dx * sensitivity;
      t.pitch += dy * sensitivity * 0.85;

      t.velYaw = -dx * sensitivity * 2.2;
      t.velPitch = dy * sensitivity * 1.5;
    });

    const onPointerUp = (e) => {
      if (!t.isDragging) return;
      t.isDragging = false;
      try { vp.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    vp.addEventListener("pointerup", onPointerUp);
    vp.addEventListener("pointercancel", onPointerUp);

    // Mouse wheel zoom
    vp.addEventListener("wheel", (e) => {
      e.preventDefault();
      t.autoRotate = false;
      t.idleTimer = 0;
      const zoomFactor = e.deltaY * 0.045;
      t.fov = Math.max(42, Math.min(100, t.fov + zoomFactor));
    }, { passive: false });

    // Touch pinch-to-zoom
    vp.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        pinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    vp.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (pinchDist > 0) {
          const delta = (pinchDist - currentDist) * 0.08;
          t.fov = Math.max(42, Math.min(100, t.fov + delta));
        }
        pinchDist = currentDist;
      }
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // 3D Hotspot Screen Projection
  // ---------------------------------------------------------------------------
  const hotspotMarkers = [];

  function createHotspotElements() {
    els.spotsContainer.innerHTML = "";
    hotspotMarkers.length = 0;

    PRODUCTS.forEach((product) => {
      const node = document.createElement("div");
      node.className = "spot-node";
      node.dataset.id = product.id;
      node.dataset.cat = product.category;

      node.innerHTML = `
        <div class="spot-beacon">
          <div class="spot-radar-wave"></div>
          <div class="spot-radar-ring"></div>
          <div class="spot-core">
            <img src="${product.thumb}" alt="${product.name}" loading="lazy">
          </div>
        </div>
        <div class="spot-floating-badge">
          <span class="spot-badge-dot"></span>
          <span class="spot-badge-name">${product.name}</span>
        </div>
        <div class="spot-preview-card">
          <span class="spot-preview-kicker">${CATEGORIES[product.category]?.name || "Export"}</span>
          <span class="spot-preview-title">${product.name}</span>
          <span class="spot-preview-action">Tap to 360° Inspect <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
      `;

      node.addEventListener("click", (e) => {
        e.stopPropagation();
        AudioEngine.playChime();
        openProductStudio(product.id);
      });

      els.spotsContainer.appendChild(node);

      // Compute 3D vector position on sphere
      const pos3D = latLonToVector3(product.pitch, product.yaw, 450);
      hotspotMarkers.push({ el: node, pos: pos3D, product });
    });
  }

  function updateHotspotPositions() {
    const t = state.three;
    if (!t.camera) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const filter = state.activeCategory;

    hotspotMarkers.forEach(({ el, pos, product }) => {
      // Category filter check
      const isVisibleCategory = filter === "all" ||
        (filter === "premium" && product.premium) ||
        (filter === "bulk") ||
        (product.category === filter);

      if (!isVisibleCategory) {
        el.classList.add("hidden");
        return;
      }

      // 3D world to 2D screen projection
      const projected = pos.clone().project(t.camera);

      // projected.z < 1 means the point is in front of the camera
      if (projected.z < 1) {
        const screenX = (projected.x * 0.5 + 0.5) * width;
        const screenY = (-(projected.y * 0.5) + 0.5) * height;

        // Check if point is within viewport bounds
        if (screenX >= -40 && screenX <= width + 40 && screenY >= -40 && screenY <= height + 40) {
          el.classList.remove("hidden");
          el.style.transform = `translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          return;
        }
      }

      el.classList.add("hidden");
    });
  }

  // ---------------------------------------------------------------------------
  // Interactive Radar Mini-Map & Dynamic Vision Cone (Bajaj Style)
  // ---------------------------------------------------------------------------
  function updateRadarTelemetry() {
    const yaw = state.three.yaw;
    const fov = state.three.fov;

    // Update compass needle pointing North
    if (els.compassArrow) {
      els.compassArrow.style.transform = `rotate(${-yaw + 180}deg)`;
    }

    // Update vision cone in radar mini-map (0 deg rotation points UP towards hero pavilion)
    if (els.fovCone) {
      els.fovCone.setAttribute("transform", `rotate(${yaw - 180}, 84, 74)`);
    }
  }

  function setupRadarMapInteractions() {
    $$(".map-zone").forEach((zone) => {
      zone.addEventListener("click", () => {
        const catId = zone.dataset.cat;
        if (catId && CATEGORIES[catId]) {
          AudioEngine.playClick();
          selectPavilion(catId);
        }
      });
    });

    if (els.radarToggle) {
      els.radarToggle.addEventListener("click", () => {
        els.radarPanel.classList.add("collapsed");
      });
    }

    if (els.radarLauncher) {
      els.radarLauncher.addEventListener("click", () => {
        els.radarPanel.classList.remove("collapsed");
        els.radarPanel.classList.toggle("mobile-view");
      });
    }
  }

  // ---------------------------------------------------------------------------
  // Pavilion Zone Switching (Automotive Showroom Zones)
  // ---------------------------------------------------------------------------
  function selectPavilion(categoryId) {
    const cat = CATEGORIES[categoryId];
    if (!cat) return;

    state.activeCategory = categoryId;
    AudioEngine.playClick();

    // Update active tab states
    $$(".pavilion-tab").forEach((tab) => {
      tab.classList.toggle("on", tab.dataset.cat === categoryId);
    });

    // Update mini-map zone highlight
    $$(".map-zone").forEach((zone) => {
      zone.classList.toggle("active", zone.dataset.cat === categoryId);
    });

    // Smooth camera glide to zone's focal point
    tweenCameraTo(cat.pitch, cat.yaw, cat.hfov, 900);

    // Refresh showcase cards rail
    renderShowcaseRail(categoryId);

    toast(`Entered ${cat.name}`);
  }

  // ---------------------------------------------------------------------------
  // Showcase Bottom Cards Carousel Rail
  // ---------------------------------------------------------------------------
  function renderShowcaseRail(categoryId = "all") {
    const list = PRODUCTS.filter((p) => {
      if (categoryId === "all") return true;
      if (categoryId === "premium") return !!p.premium;
      if (categoryId === "bulk") return true;
      return p.category === categoryId;
    });

    els.rail.innerHTML = list.map((p) => {
      const topVariant = p.variants?.[0]?.size || "Export Grade";
      return `
      <div class="showcase-card ${state.activeProductId === p.id ? "active" : ""}" data-id="${p.id}">
        <div class="showcase-thumb-wrap">
          <span class="showcase-chip">${CATEGORIES[p.category]?.name?.split(" ")[0] || "Export"}</span>
          <img src="${p.thumb}" alt="${p.name}" loading="lazy">
          <button class="showcase-locate-chip" data-id="${p.id}" title="Focus in Showroom"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> View</button>
        </div>
        <div class="showcase-body">
          <div class="showcase-name" title="${p.name}">${p.name}</div>
          <div class="showcase-sub">${p.tagline ? p.tagline.split("·")[0].trim() : "Export Quality"}</div>
          <div class="showcase-footer">
            <span class="showcase-variant-tag">${topVariant}</span>
            <span class="showcase-cta">360° <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
        </div>
      </div>
    `;}).join("");

    $$(".showcase-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const id = card.dataset.id;
        const locateBtn = e.target.closest(".showcase-locate-chip");
        if (locateBtn) {
          e.stopPropagation();
          const prod = PRODUCTS.find((p) => p.id === id);
          if (prod) {
            AudioEngine.playWhoosh();
            const focusPitch = Math.max(-24, Math.min(6, prod.pitch + 4));
            tweenCameraTo(focusPitch, prod.yaw, 62, 850);
            toast(`Viewing ${prod.name}`);
            const marker = hotspotMarkers.find((m) => m.product.id === id);
            if (marker) {
              marker.el.classList.add("highlight");
              setTimeout(() => marker.el.classList.remove("highlight"), 2500);
            }
          }
          return;
        }
        AudioEngine.playChime();
        openProductStudio(id);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Bajaj-Grade 360° Product Studio Inspector
  // ---------------------------------------------------------------------------
  function openProductStudio(productId) {
    const p = PRODUCTS.find((item) => item.id === productId);
    if (!p) return;

    state.activeProductId = productId;
    state.selectedVariantIndex = 0;
    state.turntable.angle = 0;

    // Smoothly focus camera on product in 360 scene before opening studio
    tweenCameraTo(p.pitch, p.yaw, 68, 600, () => {
      populateStudioContent(p);
      els.studioOverlay.classList.add("open");
    });
  }

  function closeProductStudio() {
    state.activeProductId = null;
    els.studioOverlay.classList.remove("open");
    renderShowcaseRail(state.activeCategory);
  }

  function populateStudioContent(p) {
    // Header & Tagline
    $("#studio-cat-tag").textContent = CATEGORIES[p.category]?.name || "Export Grade";
    $("#studio-origin-badge").textContent = p.origin || "India (Noida Processing)";
    $("#studio-product-title").textContent = p.name;
    $("#studio-product-tagline").textContent = p.tagline || "";
    $("#studio-desc-text").textContent = p.desc;

    // Turntable image setup
    els.turntableImg.src = p.image;
    els.turntableImg.alt = p.name;
    els.turntableImg.style.transform = "rotate(0deg)";

    // Packaging Variants Switcher (Bajaj Variant Switcher style)
    const variantsWrap = $("#studio-variants-list");
    variantsWrap.innerHTML = "";
    if (p.variants && p.variants.length > 0) {
      p.variants.forEach((v, idx) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `variant-chip ${idx === 0 ? "selected" : ""}`;
        chip.textContent = v.size;
        chip.addEventListener("click", () => {
          state.selectedVariantIndex = idx;
          $$(".variant-chip", variantsWrap).forEach((c) => c.classList.remove("selected"));
          chip.classList.add("selected");
          AudioEngine.playClick();
          updateVariantSpecs(p, v);
        });
        variantsWrap.appendChild(chip);
      });
      updateVariantSpecs(p, p.variants[0]);
    }

    // Key Features Grid
    const featuresWrap = $("#studio-features-grid");
    featuresWrap.innerHTML = "";
    if (p.features) {
      p.features.forEach((f) => {
        const box = document.createElement("div");
        box.className = "feature-box";
        box.innerHTML = `<b>${f.title}</b><p>${f.desc}</p>`;
        featuresWrap.appendChild(box);
      });
    }

    // Technical Specs Table
    const specsTable = $("#studio-specs-table");
    specsTable.innerHTML = "";
    if (p.specs) {
      Object.entries(p.specs).forEach(([k, v]) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${k}</td><td>${v}</td>`;
        specsTable.appendChild(row);
      });
    }

    // Nutrition Table
    const nutTable = $("#studio-nutrition-table");
    nutTable.innerHTML = "";
    if (p.nutrition) {
      Object.entries(p.nutrition).forEach(([k, v]) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${k}</td><td>${v}</td>`;
        nutTable.appendChild(row);
      });
    }

    // Action Suite Links
    const whatsappBtn = $("#studio-whatsapp-btn");
    const prefilledText = encodeURIComponent(
      `Hello Hans Impex, I am exploring your 360° E-Showroom and would like an export quotation for "${p.name}". (HS Code: ${p.hsCode || "Standard"}). Please share pricing and shipping details.`
    );
    whatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${prefilledText}`;

    $("#studio-quote-btn").onclick = () => {
      openQuoteModal(p.name);
    };

    $("#studio-print-btn").onclick = () => {
      window.print();
    };

    $("#studio-site-link").href = p.view || SITE;
  }

  function updateVariantSpecs(p, variant) {
    $("#spec-active-moq").textContent = variant.moq;
    $("#spec-active-packaging").textContent = variant.packaging;
    $("#spec-active-shelflife").textContent = variant.shelfLife;
  }

  // Interactive 360 Turntable Drag Interaction
  function setupTurntableInteraction() {
    const stage = els.turntableStage;
    const tt = state.turntable;

    stage.addEventListener("pointerdown", (e) => {
      tt.isDragging = true;
      tt.startX = e.clientX;
      tt.autoSpin = false;
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    });

    stage.addEventListener("pointermove", (e) => {
      if (!tt.isDragging) return;
      const dx = e.clientX - tt.startX;
      tt.startX = e.clientX;
      tt.angle += dx * 0.45;
      // Realistic 3D turntable spin: rotateY perspective with subtle tilt & specular highlight
      const normAngle = ((tt.angle % 360) + 360) % 360;
      const scaleX = Math.cos(normAngle * Math.PI / 180);
      const isBack = scaleX < 0;
      const displayScaleX = Math.max(0.2, Math.abs(scaleX));
      const skew = Math.sin(normAngle * Math.PI / 180) * 8;
      const brightness = 0.88 + Math.cos(normAngle * Math.PI / 180) * 0.22;
      
      els.turntableImg.style.transform = `perspective(800px) rotateY(${tt.angle.toFixed(1)}deg) scale3d(${Math.abs(scaleX) * 0.15 + 0.85}, 1, 1)`;
      els.turntableImg.style.filter = `drop-shadow(${(-skew * 2.5).toFixed(1)}px 22px 30px rgba(0,0,0,0.75)) brightness(${brightness.toFixed(2)})`;
      
      const pedestal = $(".turntable-pedestal", els.turntableStage);
      if (pedestal) {
        pedestal.style.transform = `rotateX(72deg) rotate(${tt.angle.toFixed(1)}deg)`;
      }
    });

    const stopDrag = (e) => {
      if (!tt.isDragging) return;
      tt.isDragging = false;
      try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    stage.addEventListener("pointerup", stopDrag);
    stage.addEventListener("pointercancel", stopDrag);
  }

  // ---------------------------------------------------------------------------
  // Guided Auto-Tour Controller (Bajaj Auto-Pilot)
  // ---------------------------------------------------------------------------
  function startGuidedTour() {
    state.activeTourIndex = 0;
    els.tourConsole.classList.add("active");
    els.tourToggleBtn.classList.add("tour-active");
    els.tourPlayBtn.textContent = "Pause";
    goToTourStation(0);
    toast("Guided Auto-Tour Started");
  }

  function stopGuidedTour() {
    state.activeTourIndex = -1;
    clearInterval(state.tourTimer);
    els.tourConsole.classList.remove("active");
    els.tourToggleBtn.classList.remove("tour-active");
    toast("Tour Ended");
  }

  function goToTourStation(index) {
    if (index < 0 || index >= TOUR_STATIONS.length) {
      stopGuidedTour();
      return;
    }

    state.activeTourIndex = index;
    const station = TOUR_STATIONS[index];

    // Update Console Content
    els.tourBadge.textContent = station.badge;
    els.tourTitle.textContent = station.title;
    els.tourCounter.textContent = `${index + 1} of ${TOUR_STATIONS.length}`;
    els.tourCaption.textContent = station.caption;
    els.tourProgressFill.style.width = `${((index + 1) / TOUR_STATIONS.length) * 100}%`;

    // Smooth camera glide
    tweenCameraTo(station.pitch, station.yaw, station.hfov, 1200);

    // Auto advance timer after 8 seconds
    clearInterval(state.tourTimer);
    let progress = 0;
    state.tourTimer = setInterval(() => {
      progress += 1.25; // 8 seconds total
      if (progress >= 100) {
        clearInterval(state.tourTimer);
        goToTourStation(state.activeTourIndex + 1);
      }
    }, 100);
  }

  // ---------------------------------------------------------------------------
  // Atmosphere / Showroom Mood Switcher
  // ---------------------------------------------------------------------------
  function cycleMood() {
    const moods = ["day", "night", "gold"];
    const labels = { day: "Daylight Showroom", night: "Executive Studio", gold: "Imperial Gold" };
    const nextIdx = (moods.indexOf(state.mood) + 1) % moods.length;
    state.mood = moods[nextIdx];

    document.body.classList.remove("mood-day", "mood-night", "mood-gold");
    document.body.classList.add(`mood-${state.mood}`);

    AudioEngine.playClick();
    toast(`Switched to ${labels[state.mood]}`);
  }

  // ---------------------------------------------------------------------------
  // Live Search HUD
  // ---------------------------------------------------------------------------
  function handleLiveSearch(query) {
    query = (query || "").trim().toLowerCase();
    if (!query) {
      els.searchResults.classList.remove("open");
      els.searchResults.innerHTML = "";
      return;
    }

    const matches = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      CATEGORIES[p.category]?.name?.toLowerCase().includes(query) ||
      (p.desc && p.desc.toLowerCase().includes(query)) ||
      (p.hsCode && p.hsCode.includes(query))
    );

    if (matches.length === 0) {
      els.searchResults.innerHTML = `<div style="padding:12px;color:var(--text-muted);font-size:12.5px;">No products matching "${query}"</div>`;
    } else {
      els.searchResults.innerHTML = matches.map((p) => `
        <button type="button" class="search-hit-item" data-id="${p.id}">
          <img class="search-hit-thumb" src="${p.thumb}" alt="">
          <div class="search-hit-info">
            <b>${p.name}</b>
            <span>${CATEGORIES[p.category]?.name || "Export"} · ${p.hsCode || "HS Code Available"}</span>
          </div>
        </button>
      `).join("");

      $$(".search-hit-item", els.searchResults).forEach((hit) => {
        hit.addEventListener("click", () => {
          const id = hit.dataset.id;
          els.searchResults.classList.remove("open");
          els.search.value = "";
          openProductStudio(id);
        });
      });
    }

    els.searchResults.classList.add("open");
  }

  // ---------------------------------------------------------------------------
  // Export Quote Modal & Form Dispatch
  // ---------------------------------------------------------------------------
  function openQuoteModal(prefillProduct = "") {
    const select = $("#quote-product-select");
    select.innerHTML = "";
    PRODUCTS.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.name;
      opt.textContent = `${p.name} (${CATEGORIES[p.category]?.name || "Export"})`;
      if (prefillProduct && p.name.includes(prefillProduct)) opt.selected = true;
      select.appendChild(opt);
    });

    els.quoteModal.classList.add("open");
    $("#quote-name-field").focus();
  }

  function closeQuoteModal() {
    els.quoteModal.classList.remove("open");
  }

  function handleQuoteSubmit(e) {
    e.preventDefault();
    const form = els.quoteForm;
    const f = new FormData(form);
    const get = (k) => f.get(k) || "";

    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const company = get("company");
    const destination = get("destination");
    const product = get("product");
    const qty = get("qty");
    const message = get("message");

    const emailBody = [
      "Hans Impex — 360° E-Showroom Formal Quote Request",
      "================================================",
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone}`,
      `Destination Port/Country: ${destination}`,
      `Product Requested: ${product}`,
      `Quantity & Packing: ${qty}`,
      "",
      "Customer Message / Notes:",
      message,
      "",
      "Sent via Hans Impex 360° E-Showroom Experience (hansimpex.online)"
    ].join("\n");

    const subject = `Showroom Quotation Request — ${product} (${company || name})`;
    location.href = `mailto:contactus@hansimpex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    $("#quote-status-msg").textContent = "Opening your email app with pre-filled Hans Impex export details…";
    toast("Quotation Request Prepared");

    setTimeout(closeQuoteModal, 2200);
  }

  // ---------------------------------------------------------------------------
  // UI Helpers (Toast, Hint, Entrance)
  // ---------------------------------------------------------------------------
  let toastTimer = null;
  function toast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("show");
    }, 2800);
  }

  function showInteractionHint() {
    if (reducedMotion) return;
    els.hint.classList.add("visible");
    setTimeout(() => {
      els.hint.classList.remove("visible");
    }, 4500);
  }

  function enterShowroom() {
    els.gate.classList.add("hidden");
    els.loader.classList.add("show");

    

    initThreeEngine();
    AudioEngine.playWhoosh();
    toast("Welcome to Hans Impex 360° E-Showroom");
  }

  // ---------------------------------------------------------------------------
  // Event Listeners Binding
  // ---------------------------------------------------------------------------
  function bindEventListeners() {
    // Entrance Gate
    els.gateEnterBtn.addEventListener("click", enterShowroom);

    // Audio section removed

    // Showroom Mood Switcher
    els.moodToggleBtn.addEventListener("click", cycleMood);

    // Guided Tour Toggle
    els.tourToggleBtn.addEventListener("click", () => {
      if (state.activeTourIndex === -1) {
        startGuidedTour();
      } else {
        stopGuidedTour();
      }
    });

    // Tour Console Controls
    $("#tour-next-btn").addEventListener("click", () => {
      goToTourStation(state.activeTourIndex + 1);
    });
    $("#tour-prev-btn").addEventListener("click", () => {
      goToTourStation(state.activeTourIndex - 1);
    });
    $("#tour-exit-btn").addEventListener("click", stopGuidedTour);
    els.tourPlayBtn.addEventListener("click", () => {
      if (state.tourTimer) {
        clearInterval(state.tourTimer);
        state.tourTimer = null;
        els.tourPlayBtn.textContent = "Resume";
      } else {
        els.tourPlayBtn.textContent = "Pause";
        goToTourStation(state.activeTourIndex);
      }
    });

    // Look-around Camera Tools
    $("#btn-reset-view").addEventListener("click", () => {
      AudioEngine.playClick();
      tweenCameraTo(-20, 180, 74, 700);
    });
    $("#btn-zoom-in").addEventListener("click", () => {
      state.three.fov = Math.max(42, state.three.fov - 8);
    });
    $("#btn-zoom-out").addEventListener("click", () => {
      state.three.fov = Math.min(100, state.three.fov + 8);
    });

    // Showcase Rail Collapse / Expand Toggle
    const railWrap = $("#showcase-rail-wrap");
    const railToggle = $("#showcase-toggle-btn");
    if (railToggle && railWrap) {
      railToggle.addEventListener("click", () => {
        AudioEngine.playClick();
        const isCollapsed = railWrap.classList.toggle("collapsed");
        const icon = railToggle.querySelector(".showcase-toggle-icon");
        if (icon) {
          icon.style.transform = isCollapsed ? "rotate(180deg)" : "rotate(0deg)";
        }
      });
    }
    $("#btn-fullscreen").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Pavilion Category Tabs
    $$(".pavilion-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        selectPavilion(tab.dataset.cat);
      });
    });

    // Studio Inspector Close & Tabs
    $("#studio-close-btn").addEventListener("click", closeProductStudio);
    els.studioOverlay.addEventListener("click", (e) => {
      if (e.target === els.studioOverlay) closeProductStudio();
    });

    $$(".studio-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
        $$(".studio-tab-btn").forEach((b) => b.classList.remove("active"));
        $$(".studio-panel-view").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        $(`#panel-${targetTab}`).classList.add("active");
        AudioEngine.playClick();
      });
    });

    // Search HUD
    els.search.addEventListener("input", (e) => handleLiveSearch(e.target.value));
    els.search.addEventListener("focus", () => {
      if (els.search.value) handleLiveSearch(els.search.value);
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-hud")) {
        els.searchResults.classList.remove("open");
      }
    });

    // Quote Modal
    $("#hud-quote-btn").addEventListener("click", () => openQuoteModal());
    $("#hud-enquire-btn").addEventListener("click", () => openQuoteModal());
    $("#modal-close-icon").addEventListener("click", closeQuoteModal);
    els.quoteModal.addEventListener("click", (e) => {
      if (e.target === els.quoteModal) closeQuoteModal();
    });
    els.quoteForm.addEventListener("submit", handleQuoteSubmit);

    // Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProductStudio();
        closeQuoteModal();
        stopGuidedTour();
        els.searchResults.classList.remove("open");
      }
      if (e.key === "/" && document.activeElement !== els.search) {
        e.preventDefault();
        els.search.focus();
      }
      if (e.key === "ArrowLeft") {
        state.three.targetYaw = state.three.yaw - 24;
        tweenCameraTo(state.three.pitch, state.three.targetYaw, state.three.fov, 300);
      }
      if (e.key === "ArrowRight") {
        state.three.targetYaw = state.three.yaw + 24;
        tweenCameraTo(state.three.pitch, state.three.targetYaw, state.three.fov, 300);
      }
      if (e.key === "ArrowUp") {
        state.three.pitch = Math.min(75, state.three.pitch + 8);
      }
      if (e.key === "ArrowDown") {
        state.three.pitch = Math.max(-75, state.three.pitch - 8);
      }
    });

    setupRadarMapInteractions();
    setupTurntableInteraction();
  }

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------
  let isInitialized = false;
  function initApp() {
    if (isInitialized) return;
    isInitialized = true;
    bindEventListeners();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
