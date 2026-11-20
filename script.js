/* =====================================================================
 *  script.js — behaviour only (animations, page switching, carousel).
 *  All the WORDS and PICTURES live in index.html. Nothing here needs editing
 *  when you change your text.
 * ===================================================================== */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- IMAGES: stay hidden until they load, so a missing file leaves the placeholder instead of a broken icon ---------- */
function revealImages(root) {
  root.querySelectorAll("img[data-soft]").forEach((img) => {
    const isLogo = img.classList.contains("school-logo-image");
    const placeholder = isLogo ? img.parentElement.querySelector(".school-logo-placeholder") : null;
    const show = () => {
      img.hidden = false;
      if (placeholder) placeholder.hidden = true;
      else img.parentElement?.classList.add("has-image");
    };
    const hide = () => { img.hidden = true; if (placeholder) placeholder.hidden = false; };
    img.hidden = true;
    img.addEventListener("load", show);
    img.addEventListener("error", hide);
    if (img.getAttribute("src") && img.complete && img.naturalWidth > 0) show();
  });
  /* Family & Friends photo slots: data-photo="path" */
  root.querySelectorAll("[data-photo]").forEach((slot) => {
    const path = slot.dataset.photo.trim();
    if (!path || slot.querySelector(".memory-photo")) return;
    const img = document.createElement("img");
    img.className = "memory-photo";
    img.alt = slot.querySelector("small")?.textContent || "";
    img.loading = "lazy";
    img.addEventListener("load", () => slot.classList.add("has-photo"));
    img.src = path;
    slot.prepend(img);
  });
}

/* ---------- LOADING SCREEN: a real car start-up, then a night drive ----------
   1) the cluster backlight comes on and the warning lights glow
   2) both needles do the self-test sweep (all the way up and back, like a real car)
   3) ENGINE START: the rev needle kicks and settles to idle, the camera shakes
   4) it drives off: the rev needle climbs, the shift lights fill, it changes gear 1 → 5
      and the speed climbs, the road and street lights rush past faster and faster
   It finishes when the drive is done AND the page has loaded, then it bursts forward into the site. */
function runLoader(onReady) {
  const loader = document.getElementById("loader");
  if (!loader) { onReady(); return; }
  const SVG = "http://www.w3.org/2000/svg";

  /* ---- build one round gauge (used for the rev counter and the speedometer) ---- */
  function makeGauge(host, { max, minor, major, redFrom, label, unit, big }) {
    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", "0 0 320 320");
    const id = host.id;
    svg.innerHTML = `<defs>
      <linearGradient id="${id}-bz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f6f8"/><stop offset=".22" stop-color="#868f97"/><stop offset=".5" stop-color="#23282d"/><stop offset=".76" stop-color="#a3acb4"/><stop offset="1" stop-color="#15181b"/></linearGradient>
      <radialGradient id="${id}-fc" cx=".5" cy=".38" r=".72"><stop offset="0" stop-color="#20262b"/><stop offset=".65" stop-color="#0b0d0f"/><stop offset="1" stop-color="#040506"/></radialGradient>
      <radialGradient id="${id}-hb" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#f1f4f6"/><stop offset=".5" stop-color="#6d767e"/><stop offset="1" stop-color="#14171a"/></radialGradient>
      <linearGradient id="${id}-gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#fff" stop-opacity=".02"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <circle cx="160" cy="160" r="157" fill="url(#${id}-bz)"/><circle cx="160" cy="160" r="149" fill="#050607"/>
    <circle cx="160" cy="160" r="144" fill="url(#${id}-fc)"/>
    <circle class="ld-backlight" cx="160" cy="160" r="132"/>
    <g class="ld-marks"></g>
    <text class="ld-digital" x="160" y="222">0</text><text class="ld-unit" x="160" y="244">${unit}</text>
    <g class="ld-needle"><polygon points="160,30 164.5,164 155.5,164"/><polygon class="tail" points="157.5,160 162.5,160 161.5,184 158.5,184"/></g>
    <circle cx="160" cy="160" r="14" fill="url(#${id}-hb)"/><circle cx="160" cy="160" r="4" fill="#0b0d0f"/>
    <ellipse cx="160" cy="92" rx="122" ry="80" fill="url(#${id}-gl)"/>`;
    host.append(svg);
    const marks = svg.querySelector(".ld-marks");
    const polar = (r, v) => { const a = (-135 + (v / max) * 270) * Math.PI / 180; return [160 + r * Math.sin(a), 160 - r * Math.cos(a)]; };
    const add = (tag, attrs, text) => { const el = document.createElementNS(SVG, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); if (text !== undefined) el.textContent = text; marks.append(el); };
    const [a1, b1] = polar(126, redFrom), [a2, b2] = polar(126, max);
    add("path", { d: `M${a1} ${b1} A126 126 0 0 1 ${a2} ${b2}`, class: "ld-redzone" });
    for (let v = 0; v <= max + 1e-6; v += minor) {
      const isMajor = Math.abs(v / major - Math.round(v / major)) < 1e-6, [x1, y1] = polar(120, v), [x2, y2] = polar(isMajor ? 100 : 110, v);
      add("line", { x1, y1, x2, y2, class: `ld-tick${isMajor ? " major" : ""}${v >= redFrom ? " hot" : ""}` });
      if (isMajor) { const [tx, ty] = polar(big ? 82 : 84, v); add("text", { x: tx, y: ty, class: "ld-num" }, label(v)); }
    }
    const needle = svg.querySelector(".ld-needle"), digital = svg.querySelector(".ld-digital");
    /* needle physics: a spring that follows the target, slightly bouncy like a real needle */
    const st = { x: 0, v: 0, target: 0 };
    return {
      st,
      step(dt) {
        const k = 220, c = 2 * Math.sqrt(k) * 0.62;
        st.v += (k * (st.target - st.x) - c * st.v) * dt; st.x += st.v * dt;
        st.x = Math.max(-0.01 * max, Math.min(max * 1.02, st.x));
        needle.setAttribute("transform", `rotate(${-135 + (st.x / max) * 270} 160 160)`);
      },
      digital(text) { digital.textContent = text; }
    };
  }

  const tach = makeGauge(document.getElementById("ld-tach"), { max: 8, minor: .5, major: 1, redFrom: 6.5, label: (v) => v, unit: "×1000 R/MIN" });
  const speedo = makeGauge(document.getElementById("ld-speedo"), { max: 280, minor: 10, major: 40, redFrom: 240, label: (v) => v, unit: "KM/H", big: true });

  const canvas = document.getElementById("loader-canvas"), ctx = canvas.getContext("2d");
  let W = 0, H = 0;
  const resize = () => { const d = Math.min(window.devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W * d; canvas.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  resize(); window.addEventListener("resize", resize);

  const dash = document.getElementById("loader-dash"), world = document.getElementById("loader-world");
  const gearEl = document.getElementById("ld-gear"), odoEl = document.getElementById("ld-odo");
  const lamps = [...loader.querySelectorAll(".ld-lamp")], leds = [...loader.querySelectorAll(".ld-shift i")];
  const fill = document.getElementById("loader-fill"), percent = document.getElementById("loader-percent"), status = document.getElementById("loader-status");
  const messages = (status.dataset.messages || "READY TO LAUNCH").split("|");   /* words come from index.html (data-messages) */

  let pageLoaded = document.readyState === "complete";
  window.addEventListener("load", () => { pageLoaded = true; }, { once: true });

  /* drive plan: 5 gears, top speed at 7 200 r/min in each gear */
  const TOP = [0, 58, 102, 150, 198, 246];           // km/h at the shift point, per gear
  const SHIFT = 7.2;
  const T = reducedMotion ? { lit: 100, sweep: 100, start: 100, idle: 100, drive: 600 } : { lit: 550, sweep: 1300, start: 650, idle: 380, drive: 4300 };
  const t0 = performance.now();
  const at = { sweep: T.lit, start: T.lit + T.sweep, idle: T.lit + T.sweep + T.start, drive: T.lit + T.sweep + T.start + T.idle };
  const total = at.drive + T.drive;
  let last = t0, dist = 0, odo = 128440, finished = false, shakeKick = 0, lastGear = 0;
  const ease = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  /* ---- the night road (same scene as before, now driven by the real speed) ---- */
  const road = (p, now) => {
    const vx = W / 2 + Math.sin(now / 520) * p * 14, vy = H * .46, K = Math.max(W * .75, H * .55), D = H - vy;
    const sky = ctx.createLinearGradient(0, 0, 0, vy);
    sky.addColorStop(0, "#030406"); sky.addColorStop(.7, "#0b0e13"); sky.addColorStop(1, "#2b120d");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, vy);
    const ground = ctx.createLinearGradient(0, vy, 0, H);
    ground.addColorStop(0, "#1a0d0a"); ground.addColorStop(.25, "#0d0f12"); ground.addColorStop(1, "#050608");
    ctx.fillStyle = ground; ctx.fillRect(0, vy, W, D);
    const P = (x, z, h = 0) => [vx + x * K / z, vy + D * (1 - h) / z];
    ctx.fillStyle = "#111317"; ctx.beginPath();
    [[-1.05, .35], [1.05, .35], [1.05, 60], [-1.05, 60]].forEach(([x, z], i) => { const [px, py] = P(x, z); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.fill();
    /* headlight beams on the asphalt */
    const beam = ctx.createRadialGradient(vx, H * 1.05, 0, vx, H * 1.05, H * .62);
    beam.addColorStop(0, "rgba(255,236,205,.22)"); beam.addColorStop(.5, "rgba(255,220,180,.07)"); beam.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = beam; ctx.fillRect(0, vy, W, D);
    const glow = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(W, H) * (.28 + p * .22));
    glow.addColorStop(0, `rgba(255,170,110,${.42 + p * .4})`); glow.addColorStop(.25, "rgba(239,70,53,.2)"); glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    const line = (x, z1, z2, w, c, a) => { const [ax, ay] = P(x, z1), [bx, by] = P(x, z2); ctx.strokeStyle = c; ctx.globalAlpha = a; ctx.lineWidth = Math.max(.4, w / z1); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.globalAlpha = 1; };
    ctx.globalCompositeOperation = "source-over";
    line(-1.02, .4, 60, 7, "#cfd6dc", .5); line(1.02, .4, 60, 7, "#cfd6dc", .5);
    const dashLen = 1.5 + p * 2.2;                    /* lane marks stretch (motion blur) at speed */
    for (let k = 0; k < 16; k++) {
      const z = k * 3.4 - (dist % 3.4) + 3.4; if (z < .45) continue;
      [-.34, .34].forEach((x) => line(x, z, z + dashLen, 9, "#e8ecef", Math.min(1, 1.6 / z + .1)));
    }
    ctx.globalCompositeOperation = "lighter";
    const trail = .05 + p * .9;
    for (let k = 0; k < 14; k++) {
      const z = k * 5.5 - (dist % 5.5) + 5.5; if (z < .5) continue;
      [-1, 1].forEach((side, i) => {
        const x = side * 1.55, [a, b] = P(x, z, 1.7), [a2, b2] = P(x, z + trail * (1 + z * .08), 1.7), r = Math.max(2, 70 / z);
        const g = ctx.createRadialGradient(a, b, 0, a, b, r), c = (k + i) % 3 ? "255,190,110" : "170,205,255";
        g.addColorStop(0, `rgba(${c},.95)`); g.addColorStop(.3, `rgba(${c},.35)`); g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g; ctx.fillRect(a - r, b - r, r * 2, r * 2);
        ctx.strokeStyle = `rgba(${c},.55)`; ctx.lineWidth = Math.max(.6, 6 / z); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(a2, b2); ctx.stroke();
      });
    }
    /* speed streaks at the edges once it is fast */
    if (p > .35) {
      const n = Math.round((p - .35) * 40);
      for (let s = 0; s < n; s++) {
        const ang = (s * 2.39996 + now / 900) % (Math.PI * 2), r0 = Math.max(W, H) * (.35 + ((s * 37 + now / 6) % 100) / 220), len = 40 + p * 160;
        const x0 = vx + Math.cos(ang) * r0, y0 = vy + Math.sin(ang) * r0 * .7;
        ctx.strokeStyle = `rgba(255,${180 + (s % 3) * 20},150,${.05 + p * .12})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len * .7); ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = "source-over";
  };

  const frame = (now) => {
    const e = now - t0, dt = Math.min(.05, (now - last) / 1000); last = now;
    let rpm = 0, kmh = 0, gear = "N", lit = Math.min(1, e / T.lit);
    let progress;

    if (e < at.sweep) {                                   /* 1) backlight on, lights glowing */
      progress = .08 * (e / at.sweep);
      lamps.forEach((l) => l.classList.add("on"));
    } else if (e < at.start) {                            /* 2) self-test sweep */
      const s = (e - at.sweep) / T.sweep, up = s < .5 ? ease(s / .5) : 1 - ease((s - .5) / .5);
      tach.st.target = up * 8; speedo.st.target = up * 280;
      progress = .08 + .14 * s;
    } else if (e < at.idle) {                             /* 3) engine start: kick, settle to idle */
      const s = (e - at.start) / T.start;
      lamps.forEach((l, i) => l.classList.toggle("on", s < .25 + i * .14 && !l.classList.contains("keep")));
      if (s < .12) { tach.st.target = 2.9; shakeKick = 1; } else tach.st.target = .9 + Math.sin(e / 45) * .03;
      speedo.st.target = 0;
      progress = .22 + .1 * s;
    } else if (e < at.drive) {                            /* idle, then into 1st */
      tach.st.target = .9 + Math.sin(e / 45) * .04; speedo.st.target = 0; gear = (e - at.idle) > T.idle * .6 ? 1 : "N";
      progress = .32 + .04 * ((e - at.idle) / T.idle);
    } else {                                              /* 4) drive through the gears */
      let s = Math.min(1, (e - at.drive) / T.drive);
      if (s >= 1 && !pageLoaded) s = 1;                    /* page still loading: cruise at the top */
      const g = Math.min(5, 1 + Math.floor(s * 5)), within = Math.min(1, s * 5 - (g - 1));
      const startRpm = g === 1 ? 1.2 : SHIFT * TOP[g - 1] / TOP[g];
      rpm = startRpm + (SHIFT - startRpm) * Math.pow(within, .85);
      kmh = TOP[g] * rpm / SHIFT;
      if (s >= 1) { rpm = 6.1 + Math.sin(e / 70) * .05; kmh = TOP[5] * rpm / SHIFT; }
      tach.st.target = rpm; speedo.st.target = kmh; gear = g;
      if (g !== lastGear && lastGear) shakeKick = .55;     /* gear change jolt */
      lastGear = g;
      progress = .36 + .64 * s;
    }
    if (typeof gear === "number" && lastGear === 0 && gear === 1) lastGear = 1;

    tach.step(dt); speedo.step(dt);
    const shownRpm = Math.max(0, tach.st.x), shownKmh = Math.max(0, speedo.st.x);
    tach.digital(Math.round(shownRpm * 1000).toLocaleString("en-US"));
    speedo.digital(Math.round(shownKmh));
    gearEl.textContent = gear;
    const ledsOn = Math.max(0, Math.min(leds.length, Math.round((shownRpm - 4.6) / (SHIFT - 4.6) * leds.length)));
    const flash = shownRpm > 6.9 && Math.floor(now / 70) % 2 === 0;
    leds.forEach((l, i) => { l.classList.toggle("on", i < ledsOn); l.classList.toggle("flash", flash); });

    const p = Math.min(1, shownKmh / 280);
    dist += (shownKmh / 3.6) * dt * .55;
    odo += (shownKmh / 3600) * dt * 40;
    odoEl.textContent = String(Math.floor(odo)).padStart(6, "0");

    /* camera shake: always a little engine rumble, more at speed, a jolt on start and on each shift */
    shakeKick *= Math.pow(.02, dt);
    const amp = (e > at.start ? .35 : 0) + p * 1.8 + shakeKick * 6;
    const sx = (Math.random() - .5) * amp, sy = (Math.random() - .5) * amp;
    world.style.transform = `translate(${sx}px, ${sy}px) scale(${1 + p * .04})`;
    dash.style.transform = `translate(calc(-50% + ${sx * .5}px), ${sy * .5}px)`;
    loader.style.setProperty("--lit", lit.toFixed(3));

    ctx.clearRect(0, 0, W, H); road(p, now);
    const pr = Math.min(progress, pageLoaded ? 1 : .97);
    fill.style.transform = `scaleX(${pr})`;
    percent.textContent = Math.round(pr * 100) + "%";
    status.textContent = (e < at.start ? "SYSTEM CHECK" : e < at.drive ? "ENGINE START" : messages[Math.min(messages.length - 1, Math.floor(Math.min(1, (e - at.drive) / T.drive) * messages.length))]) + "…";

    if (!finished && e >= total && pageLoaded) {
      finished = true;
      loader.classList.add("is-done");
      onReady();
      window.setTimeout(() => { loader.remove(); window.removeEventListener("resize", resize); }, 1100);
    }
    if (!finished || e < total + 1100) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------- BACKGROUND: drifting speed streaks ---------- */
function startBackdrop() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, streaks = [];
  const make = (anywhere) => ({ x: anywhere ? Math.random() * w : -200, y: Math.random() * h, len: 70 + Math.random() * 200, v: 1 + Math.random() * 3.4, a: .05 + Math.random() * .15, hot: Math.random() < .28 });
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    streaks = Array.from({ length: Math.max(14, Math.min(44, Math.round(w / 30))) }, () => make(true));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    streaks.forEach((s, i) => {
      s.x += s.v;
      const g = ctx.createLinearGradient(s.x - s.len, 0, s.x, 0);
      const c = s.hot ? "239,70,53" : "200,220,230";
      g.addColorStop(0, `rgba(${c},0)`); g.addColorStop(1, `rgba(${c},${s.a})`);
      ctx.strokeStyle = g; ctx.lineWidth = s.hot ? 1.6 : 1;
      ctx.beginPath(); ctx.moveTo(s.x - s.len, s.y); ctx.lineTo(s.x, s.y); ctx.stroke();
      if (s.x - s.len > w) streaks[i] = make(false);
    });
    requestAnimationFrame(draw);
  };
  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

/* ---------- CURSOR: ring + dot that chase the mouse (desktop only) ---------- */
function startCursor() {
  if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const dot = document.getElementById("cursor-dot"), ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;
  let mx = -100, my = -100, rx = -100, ry = -100;
  document.body.classList.add("has-cursor");
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    document.body.classList.add("cursor-on");
  });
  document.addEventListener("mouseleave", () => document.body.classList.remove("cursor-on"));
  document.addEventListener("mouseover", (e) => {
    const hot = e.target instanceof Element && e.target.closest("button, a, [data-view]");
    ring.classList.toggle("is-hot", Boolean(hot));
  });
  window.addEventListener("mousedown", (e) => {
    ring.classList.add("is-down");
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement("i");
      spark.className = "cursor-spark";
      const angle = (i / 8) * Math.PI * 2, dist = 26 + Math.random() * 26;
      spark.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px`;
      document.body.append(spark);
      window.setTimeout(() => spark.remove(), 600);
    }
  });
  window.addEventListener("mouseup", () => ring.classList.remove("is-down"));
  const follow = () => {
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);
}

/* ---------- TAB SWITCH: red speed streak sweeps across the screen ---------- */
/* ---------- PAGE TRANSITION: a dark panel with speed streaks rushes across, shows where you are going,
   the new page is swapped in underneath, then the panel races off the other side ---------- */
const SHIFT_IN = 420;                                   /* ms until the screen is fully covered */
function playWipe(title = "") {
  const shift = document.getElementById("page-shift");
  if (!shift || reducedMotion) return;
  const label = document.getElementById("ps-title");
  if (label) label.textContent = title;
  shift.classList.remove("is-in", "is-out");
  void shift.offsetWidth;
  shift.classList.add("is-in");
  window.clearTimeout(playWipe.t);
  playWipe.t = window.setTimeout(() => { shift.classList.add("is-out"); }, SHIFT_IN + 180);
  window.clearTimeout(playWipe.t2);
  playWipe.t2 = window.setTimeout(() => { shift.classList.remove("is-in", "is-out"); }, SHIFT_IN + 180 + 560);
}

/* ---------- PAGE ENTRANCE: the new page builds itself piece by piece (title first, then the blocks rise in
   one after another, pictures rise a little further and grow into place) ---------- */
function choreograph(region) {
  if (reducedMotion) return;
  const panel = region.querySelector(".view-panel") || region.firstElementChild;
  if (!panel) return;
  let blocks = [...panel.children].filter((n) => n.offsetParent !== null);
  for (let round = 0; round < 3 && blocks.length < 5; round++) {
    blocks = blocks.flatMap((n) => (n.children.length > 1 && n.children.length < 9 ? [...n.children].filter((c) => c.offsetParent !== null) : [n]));
  }
  const extra = [...panel.querySelectorAll(".stage-card, .stage-split > *")];
  const list = [...new Set(blocks.flatMap((b) => (b.matches(".stage-grid, .stage-split") ? [] : [b])).concat(extra))].slice(0, 26);
  list.forEach((el, i) => {
    el.classList.remove("rise-in");
    el.style.setProperty("--ri", i);
    if (el.matches("img, figure, .portrait, [class*='portrait'], [class*='photo']")) el.classList.add("rise-photo");
    el.classList.add("rise-in");
  });
  window.setTimeout(() => list.forEach((el) => el.classList.remove("rise-in", "rise-photo")), 900 + list.length * 70);
}

/* ---------- NAV RETICLE: corner brackets glide to whatever menu item you point at, and back to the open page ---------- */
function setupNavReticle() {
  const nav = document.querySelector(".primary-nav");
  if (!nav || nav.querySelector(".nav-reticle")) return;
  const ret = document.createElement("span");
  ret.className = "nav-reticle";
  ret.setAttribute("aria-hidden", "true");
  nav.append(ret);
  const moveTo = (btn) => {
    if (!btn) return;
    const n = nav.getBoundingClientRect(), b = btn.getBoundingClientRect();
    ret.style.width = `${b.width + 16}px`; ret.style.height = `${Math.max(22, b.height - 10)}px`;
    ret.style.transform = `translate(${b.left - n.left - 8}px, ${b.top - n.top + 5}px)`;
    ret.classList.add("is-shown");
  };
  const home = () => moveTo(nav.querySelector(".nav-button.is-active"));
  nav.querySelectorAll(".nav-button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => moveTo(btn));
    btn.addEventListener("focus", () => moveTo(btn));
  });
  nav.addEventListener("mouseleave", home);
  window.addEventListener("resize", home);
  setupNavReticle.home = home;
  home();
}

const navButtons = [...document.querySelectorAll(".nav-button")];
const PAGE_ORDER = navButtons.map((b) => b.dataset.view);            /* order of the menu = order of Previous / Next */
const mainViews = new Set(PAGE_ORDER);
const contentRegion = document.getElementById("content-region");
let transitionToken = 0;

function safeUrl(value) {
  const candidate = String(value || "").trim();
  if (!candidate) return "";
  try {
    const parsed = new URL(candidate, window.location.href);
    if (!["http:", "https:"].includes(parsed.protocol)) return "";
    return parsed.href;
  } catch {
    return "";
  }
}

/* ---------- LINKS: social icons and the CV button turn on when data-url="..." has a link ---------- */
function setupLinks(root) {
  root.querySelectorAll("[data-url]").forEach((el) => {
    const url = safeUrl(el.dataset.url);
    if (!url) return;                                   /* empty = stays greyed out */
    if (el.id === "cv-button") {
      el.disabled = false;
      el.removeAttribute("title");
      el.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "Rhaine-Kylle-Balabag-CV";
        document.body.append(link);
        link.click();
        link.remove();
      });
      return;
    }
    const name = el.dataset.name || "link";
    const link = document.createElement("a");
    link.className = el.className;
    link.innerHTML = el.innerHTML;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${name} (opens in a new tab)`);
    link.title = `Open ${name} in a new tab`;
    el.replaceWith(link);
  });
}

/* ---------- HOME: the name is typed out letter by letter ---------- */
function typeHomeName() {
  const output = contentRegion.querySelector("#home-title .typed-output");
  if (!output) return;
  const fullName = output.textContent.trim();
  if (reducedMotion) { output.textContent = fullName; return; }
  output.textContent = "";
  let index = 0;
  const typeCharacter = () => {
    if (!output.isConnected) return;
    index += 1;
    output.textContent = fullName.slice(0, index);
    if (index < fullName.length) window.setTimeout(typeCharacter, 64);
  };
  window.setTimeout(typeCharacter, 180);
}

/* ---------- ABOUT: the age updates itself from data-birthdate="YYYY-MM-DD" ---------- */
function calculateAge(birthDate) {
  const parts = String(birthDate || "").split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) return "";
  const [birthYear, birthMonth, birthDay] = parts;
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  if (today.getMonth() + 1 < birthMonth || (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)) age -= 1;
  return age >= 0 ? age : "";
}

function updateAge(root) {
  root.querySelectorAll("[data-birthdate]").forEach((el) => {
    const age = calculateAge(el.dataset.birthdate);
    if (age !== "") el.textContent = el.textContent.replace(/\d+/, age);
  });
}

/* ---------- ACHIEVEMENTS: number the certificates and duplicate them so the slider loops with no gap ---------- */
let carouselFrame = 0;

function setupCertificates() {
  const track = document.getElementById("cert-track");
  if (!track) return;
  const items = [...track.children];
  if (!items.length) { track.closest(".cert-block")?.setAttribute("hidden", ""); return; }
  items.forEach((item, index) => {
    const number = item.querySelector(".cert-placeholder");
    if (number) number.textContent = String(index + 1).padStart(2, "0");
  });
  items.forEach((item) => {
    const copy = item.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.append(copy);
  });
  startCarousel(track, items.length);
}

/* Moves the track a little every frame (auto-slide). The arrows add a
   smooth push left or right. Hovering the carousel pauses it. */
function startCarousel(track, count) {
  cancelAnimationFrame(carouselFrame);
  const viewport = track.parentElement;
  const prev = document.getElementById("cert-prev");
  const next = document.getElementById("cert-next");
  const SPEED = 30;                       // pixels per second while auto-sliding
  let x = 0, push = 0, paused = false, last = performance.now();

  const itemWidth = () => track.children[1].offsetLeft - track.children[0].offsetLeft;
  const loopWidth = () => track.children[count].offsetLeft - track.children[0].offsetLeft;

  if (prev) prev.onclick = () => { push -= itemWidth() * 3; };
  if (next) next.onclick = () => { push += itemWidth() * 3; };
  viewport.onmouseenter = () => { paused = true; };     /* cursor on the certificates = stopped */
  viewport.onmouseleave = () => { paused = false; };    /* cursor leaves = moves again right away */

  const frame = (now) => {
    if (!track.isConnected) return;       // page changed: stop
    const dt = Math.min(now - last, 64);
    last = now;
    if (Math.abs(push) > 0.5) {
      const step = push * (1 - Math.exp(-dt / 140));
      x += step; push -= step;
    } else {
      push = 0;
      if (!paused && !reducedMotion) x += SPEED * dt / 1000;
    }
    const loop = loopWidth();
    if (loop > 0) x = ((x % loop) + loop) % loop;       // wrap around
    track.style.transform = `translate3d(${-x}px, 0, 0)`;
    carouselFrame = requestAnimationFrame(frame);
  };
  carouselFrame = requestAnimationFrame(frame);
}

/* ---------- PREVIOUS / NEXT BAR ---------- */
function setPagerButton(button, view) {
  const name = button.querySelector(".pager-name");
  button.disabled = !view;                       /* first / last tab: that button is switched off */
  if (view) {
    button.dataset.view = view;
    name.textContent = navButtons.find((b) => b.dataset.view === view)?.textContent.trim() || "";
  } else {
    button.removeAttribute("data-view");
    name.textContent = "";
  }
}

function updatePager(activeView) {
  const position = PAGE_ORDER.indexOf(activeView);
  const prev = document.getElementById("pager-prev"), next = document.getElementById("pager-next");
  if (!prev || !next || position < 0) return;
  setPagerButton(prev, PAGE_ORDER[position - 1]);
  setPagerButton(next, PAGE_ORDER[position + 1]);
  document.querySelectorAll(".pager-dot").forEach((dot) => dot.classList.toggle("is-active", dot.dataset.view === activeView));
}

function markActiveView(view) {
  updatePager(view);
  navButtons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("is-active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

/* ---------- FIT TO SCREEN: pages never scroll; content is scaled to fit exactly ---------- */
function fitView() {
  const panel = contentRegion.querySelector(".view-panel");
  if (!panel) return;
  const W = window.innerWidth, home = panel.classList.contains("home-view");
  const hi = home ? 1 : W >= 1800 ? 1.5 : W >= 1500 ? 1.3 : W >= 1200 ? 1.15 : W >= 820 ? 1.05 : 1.8;
  const clippers = [panel, ...panel.querySelectorAll("*")].filter((n) => n === panel || n.matches(".about-reference-layout, .school-card, .stage-card, .school-card-copy, .connection-panel, .fact-card, .about-fact, .about-topic, .about-tag-list li") || (getComputedStyle(n).overflow !== "visible" && !n.closest(".instrument-dial, .cert-viewport")));
  const stack = home ? panel.querySelector(".home-center-stack") : null;
  const inside = () => { if (!stack) return true; const r = stack.getBoundingClientRect(), pr = panel.getBoundingClientRect(); return r.top >= pr.top - 2 && r.bottom <= pr.bottom + 2; };
  const fits = () => inside() && clippers.every((n) => (n.clientWidth === 0 && n.clientHeight === 0) || (n.scrollHeight <= n.clientHeight + (n.matches(".about-reference-layout") ? 0 : 8) && n.scrollWidth <= n.clientWidth + 8));
  let lo = .3, best = 1;
  panel.style.zoom = hi;
  if (fits()) { best = hi; }
  else {
    panel.style.zoom = lo;
    if (!fits()) { panel.style.zoom = 1; return; }
    let top = hi;
    for (let i = 0; i < 11; i++) {
      const mid = (lo + top) / 2;
      panel.style.zoom = mid;
      if (fits()) lo = mid; else top = mid;
    }
    best = lo;
  }
  panel.style.zoom = best;
}
contentRegion.addEventListener("load", () => fitView(), true);
let fitTimer = 0;
window.addEventListener("resize", () => { window.clearTimeout(fitTimer); fitTimer = window.setTimeout(fitView, 80); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitView());

function showView(view, { shouldAnimate = true } = {}) {
  if (!mainViews.has(view)) view = "home";
  const token = ++transitionToken;
  const destBtn = navButtons.find((b) => b.dataset.view === view);
  const destTitle = destBtn ? destBtn.textContent.trim() : "";
  const animateSwap = shouldAnimate && contentRegion.firstElementChild && !reducedMotion;
  if (animateSwap) { contentRegion.classList.add("is-leaving"); playWipe(destTitle); }
  const delay = animateSwap ? SHIFT_IN : 0;
  window.setTimeout(() => {
    if (token !== transitionToken) return;
    const template = document.getElementById(`view-${view}`);
    if (!template) return;
    contentRegion.classList.remove("is-leaving", "is-visible");
    contentRegion.replaceChildren(template.content.cloneNode(true));

    setupLinks(contentRegion);
    updateAge(contentRegion);
    setupCertificates();
    revealImages(contentRegion);
    if (view === "home") typeHomeName();

    markActiveView(view);
    document.body.dataset.view = view;
    fitView();
    window.setTimeout(fitView, 350);
    if (view === "home") window.setTimeout(fitView, 1900);
    const heading = contentRegion.querySelector("h1");
    if (heading && view !== "home") {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    requestAnimationFrame(() => {
      if (token !== transitionToken) return;
      contentRegion.classList.add("is-visible");
      choreograph(contentRegion);
      if (setupNavReticle.home) setupNavReticle.home();
    });
  }, delay);
}

function currentLocation() {
  const params = new URLSearchParams(window.location.search);
  const rawView = params.get("view") || "home";
  const viewAliases = { achievements: "education", family: "family-friends", friends: "family-friends" };
  const requestedView = viewAliases[rawView] || rawView;
  return { view: mainViews.has(requestedView) ? requestedView : "home" };
}

function updateAddress(view, replace = false) {
  const url = new URL(window.location.href);
  url.searchParams.delete("view");
  if (view !== "home") url.searchParams.set("view", view);
  window.history[replace ? "replaceState" : "pushState"]({ view }, "", url);
}

function navigate(view) {
  if (!mainViews.has(view)) return;
  if (currentLocation().view === view) return;
  updateAddress(view);
  showView(view);
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  if (!target) return;
  const viewButton = target.closest("[data-view]");
  if (!viewButton || viewButton.disabled) return;
  event.preventDefault();
  navigate(viewButton.dataset.view);
});

window.addEventListener("popstate", () => {
  showView(currentLocation().view, { shouldAnimate: true });
});

const initialLocation = currentLocation();
window.history.replaceState(initialLocation, "", window.location.href);
startBackdrop();
startCursor();
setupNavReticle();
runLoader(() => showView(initialLocation.view, { shouldAnimate: false }));
