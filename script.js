/* ---------- TEXT FILLING (reads portfolio.text from content.js) ---------- */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getText(path) {
  return path.split(".").reduce((node, key) => (node == null ? node : node[key]), portfolio.text);
}

function applyText(root) {
  root.querySelectorAll("[data-t]").forEach((el) => {
    const value = getText(el.dataset.t);
    if (typeof value !== "string") return;
    if (!value.includes("*")) { el.textContent = value; return; }
    el.replaceChildren();
    value.split("*").forEach((part, i) => {
      if (!part) return;
      if (i % 2) {
        const accent = document.createElement("span");
        if (el.dataset.accent) accent.className = el.dataset.accent;
        accent.textContent = part;
        el.append(accent);
      } else el.append(document.createTextNode(part));
    });
  });
}

function renderSlots(root) {
  root.querySelectorAll("[data-slot]").forEach((slot) => {
    const [group, index] = slot.dataset.slot.split(".");
    const item = portfolio.text[group]?.slots?.[Number(index)];
    if (!item || !item.image) return;
    const img = document.createElement("img");
    img.className = "memory-photo";
    img.alt = item.caption || "";
    img.loading = "lazy";
    img.addEventListener("load", () => slot.classList.add("has-photo"));
    img.src = item.image;
    slot.prepend(img);
  });
}

/* ---------- LOADING SCREEN: night drive + instrument cluster (about 6.5 s, then opens by itself) ---------- */
function runLoader(onReady) {
  const loader = document.getElementById("loader");
  if (!loader) { onReady(); return; }
  const SVG = "http://www.w3.org/2000/svg", MAX = 280;
  const polar = (r, v) => { const a = (-135 + (v / MAX) * 270) * Math.PI / 180; return [160 + r * Math.sin(a), 160 - r * Math.cos(a)]; };
  const marks = loader.querySelector(".dial-marks");
  const add = (tag, attrs, text) => { const el = document.createElementNS(SVG, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); if (text !== undefined) el.textContent = text; marks.append(el); };
  const [rx1, ry1] = polar(126, 220), [rx2, ry2] = polar(126, MAX);
  add("path", { d: `M${rx1} ${ry1} A126 126 0 0 1 ${rx2} ${ry2}`, class: "dial-redzone" });
  for (let v = 0; v <= MAX; v += 10) {
    const major = v % 40 === 0, [x1, y1] = polar(120, v), [x2, y2] = polar(major ? 101 : 110, v);
    add("line", { x1, y1, x2, y2, class: `dial-tick${major ? " major" : ""}${v >= 220 ? " hot" : ""}` });
    if (major) { const [tx, ty] = polar(84, v); add("text", { x: tx, y: ty, class: "dial-num" }, v); }
  }
  const canvas = document.getElementById("loader-canvas"), ctx = canvas.getContext("2d");
  let W = 0, H = 0;
  const resize = () => { const d = Math.min(window.devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W * d; canvas.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  resize(); window.addEventListener("resize", resize);

  const needle = document.getElementById("loader-needle"), speed = document.getElementById("loader-speed");
  const fill = document.getElementById("loader-fill"), percent = document.getElementById("loader-percent"), status = document.getElementById("loader-status");
  const messages = portfolio.text.loader.messages;
  const duration = reducedMotion ? 1200 : 6500, start = performance.now();
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), out = (t) => 1 - Math.pow(1 - t, 3);
  const rev = (p) => (p < .5 ? out(p / .5) : p < .72 ? 1 - .78 * ease((p - .5) / .22) : .22 + .78 * Math.pow((p - .72) / .28, 1.6));
  let dist = 0, last = start;

  const road = (p, now) => {
    const vx = W / 2 + Math.sin(now / 420) * p * 1.6, vy = H * .46, K = Math.max(W * .75, H * .55), D = H - vy;
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
    const glow = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(W, H) * (.28 + p * .22));
    glow.addColorStop(0, `rgba(255,170,110,${.5 + p * .35})`); glow.addColorStop(.25, "rgba(239,70,53,.22)"); glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    const line = (x, z1, z2, w, c, a) => { const [ax, ay] = P(x, z1), [bx, by] = P(x, z2); ctx.strokeStyle = c; ctx.globalAlpha = a; ctx.lineWidth = Math.max(.4, w / z1); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.globalAlpha = 1; };
    ctx.globalCompositeOperation = "source-over";
    line(-1.02, .4, 60, 7, "#cfd6dc", .5); line(1.02, .4, 60, 7, "#cfd6dc", .5);
    for (let k = 0; k < 16; k++) {
      const z = k * 3.4 - (dist % 3.4) + 3.4; if (z < .45) continue;
      [-.34, .34].forEach((x) => line(x, z, z + 1.5, 9, "#e8ecef", Math.min(1, 1.6 / z + .1)));
    }
    ctx.globalCompositeOperation = "lighter";
    const trail = .05 + p * .5;
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
    ctx.globalCompositeOperation = "source-over";
  };

  const frame = (now) => {
    const t = Math.min((now - start) / duration, 1), p = ease(t), n = rev(t);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    dist += (.3 + 4.2 * p * p) * dt * 6;
    ctx.clearRect(0, 0, W, H); road(p, now);
    needle.setAttribute("transform", `rotate(${-135 + n * 270} 160 160)`);
    speed.textContent = Math.round(n * MAX);
    fill.style.transform = `scaleX(${t})`;
    percent.textContent = Math.round(t * 100) + "%";
    status.textContent = messages[Math.min(messages.length - 1, Math.floor(p * messages.length))] + "…";
    if (t < 1) { requestAnimationFrame(frame); return; }
    loader.classList.add("is-done");
    onReady();
    window.setTimeout(() => { loader.remove(); window.removeEventListener("resize", resize); }, 1000);
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
    const hot = e.target instanceof Element && e.target.closest("button, a, [data-view], [data-school-index]");
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
function playWipe() {
  const wipe = document.getElementById("page-wipe");
  if (!wipe || reducedMotion) return;
  wipe.classList.remove("is-go");
  void wipe.offsetWidth;
  wipe.classList.add("is-go");
}

const mainViews = new Set(["home", "about", "education", "family-friends"]);
const detailViews = new Set(["education-detail"]);
const contentRegion = document.getElementById("content-region");
const navButtons = [...document.querySelectorAll(".nav-button")];
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

/* ---------- SOCIAL LOGOS (built in, no icon font needed) ---------- */
const SOCIAL_SVG = {
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .4-1.7 1.8-1.7H17V3.5c-.3 0-1.3-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v2.8H7.6v3.4h2.8V22z"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.700-.3-5.500-1.300-5.500-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 0 1 6 0C17.300 4.700 18.300 5 18.300 5c.7 1.700.2 2.900.1 3.200.8.800 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.500a2.500 2.500 0 1 1 0 5 2.500 2.500 0 0 1 0-5zM3 9.800h4V21H3zM9.500 9.800h3.800v1.600c.6-1 1.900-1.900 3.900-1.900 4.100 0 4.800 2.700 4.800 6.200V21h-4v-4.900c0-1.200 0-2.700-1.700-2.700s-1.900 1.300-1.900 2.600V21h-4z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r="1" fill="currentColor" stroke="none"/></svg>',
  email: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2.500"/><path d="m4 7 8 6 8-6"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3z"/></svg>'
};
function socialIconMarkup(profile) {
  const svg = SOCIAL_SVG[String(profile.name || "").trim().toLowerCase()];
  return svg || `<i class="bx ${profile.icon || "bx-link"}" aria-hidden="true"></i>`;
}

function makeSocialControl(profile, compact = false) {
  const url = safeUrl(profile.url);
  const iconClass = `bx ${profile.icon || "bx-link"}`;
  if (url) {
    const link = document.createElement("a");
    link.className = compact ? "contact-row is-configured" : "social-control";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${profile.name} (opens in a new tab)`);
    if (compact) {
      link.innerHTML = `<span class="contact-icon">${socialIconMarkup(profile)}</span><span class="contact-label">${profile.name}</span><span class="contact-value">Open profile <i class="bx bx-link-external" aria-hidden="true"></i></span>`;
    } else {
      link.innerHTML = `${socialIconMarkup(profile)}`;
      link.title = `Open ${profile.name} in a new tab`;
    }
    return link;
  }
  const button = document.createElement("button");
  button.type = "button";
  button.disabled = true;
  button.title = `Add your real ${profile.name} link in content.js (socials)`;
  button.setAttribute("aria-label", `${profile.name} link not added yet`);
  if (compact) {
    button.className = "contact-row is-unavailable";
    button.innerHTML = `<span class="contact-icon">${socialIconMarkup(profile)}</span><span class="contact-label">${profile.name}</span><span class="contact-value">Add your ${profile.name} URL</span>`;
  } else {
    button.className = "social-control";
    button.innerHTML = `${socialIconMarkup(profile)}`;
  }
  return button;
}

function renderHomeSocials() {
  const host = document.getElementById("home-socials");
  if (!host) return;
  portfolio.socials.forEach((profile) => host.append(makeSocialControl(profile)));
}

function configureCvButton() {
  const button = document.getElementById("cv-button");
  if (!button) return;
  const cvUrl = String(portfolio.cvUrl || "").trim();
  if (!cvUrl) return;
  button.disabled = false;
  button.removeAttribute("title");
  button.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Rhaine-Kylle-Balabag-CV";
    document.body.append(link);
    link.click();
    link.remove();
  });
}

function typeHomeName() {
  const output = contentRegion.querySelector("#home-title .typed-output");
  if (!output) return;
  const fullName = portfolio.text.home.name;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    output.textContent = fullName;
    return;
  }
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

function renderPortrait() {
  const localUrl = String(portfolio.portraitUrl || "").trim();
  const hostedUrl = "";
  const url = window.location.protocol === "file:" ? localUrl : (safeUrl(hostedUrl) || localUrl);
  if (!url) return;
  const image = document.getElementById("portrait-image");
  if (!image) return;
  image.addEventListener("load", () => { image.hidden = false; }, { once: true });
  image.addEventListener("error", () => {
    if (url !== localUrl && localUrl) {
      image.src = localUrl;
      return;
    }
    image.removeAttribute("src");
    image.hidden = true;
    console.warn("Portrait could not be loaded. Check portraitUrl and portraitLocalUrl in script.js.");
  }, { once: true });
  image.src = url;
}

function calculateAge(birthDate) {
  const parts = String(birthDate || "").split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) return "";
  const [birthYear, birthMonth, birthDay] = parts;
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  if (today.getMonth() + 1 < birthMonth || (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)) age -= 1;
  return age >= 0 ? age : "";
}

function setAboutText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderAboutList(id, items) {
  const host = document.getElementById(id);
  if (!host) return;
  host.replaceChildren();
  items.forEach((item) => {
    const chip = document.createElement("li");
    chip.textContent = item;
    host.append(chip);
  });
}

function renderAbout() {
  const factsHost = document.getElementById("about-facts");
  if (!factsHost) return;

  const profile = portfolio.aboutProfile;
  const lastSpace = profile.name.lastIndexOf(" ");
  setAboutText("about-name-first", lastSpace > 0 ? profile.name.slice(0, lastSpace) : profile.name);
  setAboutText("about-name-last", lastSpace > 0 ? profile.name.slice(lastSpace + 1) : "");
  setAboutText("about-role", `${profile.yearLevel} · ${profile.specialization}`);

  factsHost.replaceChildren();
  const L = portfolio.text.about.labels;
  [
    { label: L.birthday, value: profile.birthday },
    { label: L.age, value: `${calculateAge(profile.birthDate)} ${portfolio.text.about.ageSuffix}` },
    { label: L.sex, value: profile.sex },
    { label: L.status, value: profile.status },
    { label: L.height, value: profile.height },
    { label: L.weight, value: profile.weight },
    { label: L.location, value: profile.location }
  ].filter((f) => f.value).forEach(({ label, value }) => {
    const fact = document.createElement("div");
    fact.className = "about-fact";
    const term = document.createElement("dt");
    term.textContent = label;
    const detail = document.createElement("dd");
    detail.textContent = value;
    fact.append(term, detail);
    factsHost.append(fact);
  });

  setAboutText("about-college", profile.college);
  setAboutText("about-course", `${profile.course} - ${profile.specialization}`);
  setAboutText("about-year", profile.yearLevel);
  setAboutText("about-statement", profile.statement);
  renderAboutList("about-hobbies", profile.hobbies);
  renderAboutList("about-interests", profile.interests);
  renderAboutList("about-skills", profile.skills);
  renderAboutList("about-technical-skills", profile.technicalSkills);

  const photo = document.querySelector(".about-profile-photo");
  const localPhotoUrl = String(portfolio.aboutPhotoUrl || "").trim();
  const hostedPhotoUrl = "";
  if (photo) {
    const photoUrl = window.location.protocol === "file:" ? localPhotoUrl : (safeUrl(hostedPhotoUrl) || localPhotoUrl);
    photo.addEventListener("load", () => { photo.hidden = false; }, { once: true });
    photo.addEventListener("error", () => {
      if (photoUrl !== localPhotoUrl && localPhotoUrl) {
        photo.src = localPhotoUrl;
        return;
      }
      photo.hidden = true;
    }, { once: true });
    if (photoUrl) photo.src = photoUrl;
  }
}

function makeSchoolMark(school, imageId = null) {
  const wrapper = document.createElement("span");
  wrapper.className = "school-mark-wrap";
  const mark = document.createElement("span");
  mark.className = "school-logo-placeholder";
  const initials = document.createElement("strong");
  initials.textContent = school.mark;
  const caption = document.createElement("small");
  caption.textContent = portfolio.text.education.logoCaption;
  mark.append(initials, caption);
  wrapper.append(mark);

  const localUrl = String(school.logoPath || "").trim();
  const hostedUrl = String(school.logoHostedPath || "").trim();
  const initialUrl = window.location.protocol === "file:" ? localUrl : (safeUrl(hostedUrl) || localUrl);
  const loadLogo = (image) => {
    const setSource = (source, isFallback = false) => {
      image.onload = () => { image.hidden = false; mark.hidden = true; };
      image.onerror = () => {
        if (!isFallback && localUrl && source !== localUrl) {
          setSource(localUrl, true);
          return;
        }
        image.hidden = true;
        mark.hidden = false;
      };
      image.src = source;
    };
    if (initialUrl) setSource(initialUrl);
    else { image.hidden = true; mark.hidden = false; }
  };

  if (imageId) {
    const image = document.getElementById(imageId);
    if (image) {
      image.alt = `${school.school} logo`;
      loadLogo(image);
    }
  } else {
    const image = document.createElement("img");
    image.className = "school-logo-image";
    image.alt = `${school.school} logo`;
    image.hidden = true;
    loadLogo(image);
    wrapper.append(image);
  }
  return wrapper;
}

/* =====================================================================
 *  ACHIEVEMENTS PAGE
 *  1) Educational stage cards   2) Certificates carousel   3) Diplomas
 *  All text and image paths come from content.js (portfolio.schools,
 *  portfolio.certificates, portfolio.diplomas, portfolio.text.education).
 * ===================================================================== */

/* Small helper: make an element with a class and optional text. */
function makeEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* Which achievement groups appear on each school card, and their icons. */
const STAGE_SECTIONS = [
  { key: "academics", icon: "bx-award" },
  { key: "competitions", icon: "bx-trophy" },
  { key: "leadership", icon: "bx-group" }
];
/* Placeholder sentences such as "No awards added yet" are treated as empty. */
const NOT_ADDED_YET = /^(no |this section is open|open for)/i;

/* Collect the short list of achievements for one school + one category. */
function stageItems(school, categoryKey) {
  const level = portfolio.achievementCategories[categoryKey]?.levels?.[school.achievementKey];
  const items = [];
  (level?.groups || []).forEach((group) => {
    if (/skills developed|proposed/i.test(group.heading)) return;   // keep the cards compact
    group.items.forEach((item) => {
      if (!NOT_ADDED_YET.test(item) && !items.includes(item)) items.push(item);
    });
  });
  return items;
}

/* Build an image that stays hidden until it loads, so a missing file
   simply leaves the placeholder visible instead of a broken icon. */
function makeSoftImage(src, alt, className) {
  const image = makeEl("img", className);
  image.alt = alt;
  image.hidden = true;
  image.addEventListener("load", () => { image.hidden = false; image.parentElement?.classList.add("has-image"); });
  image.addEventListener("error", () => { image.hidden = true; });
  if (src) image.src = src;
  return image;
}

function renderEducationCards() {
  const host = document.getElementById("school-grid");
  if (!host) return;
  const t = portfolio.text.education;

  portfolio.schools.forEach((school, index) => {
    const card = makeEl("article", "stage-card");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.dataset.schoolIndex = String(index);        // the global click handler opens the school detail page
    card.setAttribute("aria-label", `${school.level}: ${school.school}. ${t.openDetails}.`);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openEducationDetail(index); }
    });

    /* Building photo (top of the card) */
    const photo = makeEl("div", "stage-photo");
    photo.append(makeEl("span", "stage-photo-label", t.buildingCaption));
    photo.append(makeSoftImage(school.buildingPath, `${school.school} building`, "stage-photo-image"));

    /* "View full details" pill sits on the photo's top-right corner */
    photo.append(makeEl("span", "stage-open", `${t.openDetails} →`));

    /* School logo + school name + years (the logo overlaps the photo's bottom edge) */
    const head = makeEl("div", "stage-head");
    const logo = makeEl("div", "stage-logo");
    logo.append(makeSchoolMark(school));
    const title = makeEl("div", "stage-title");
    title.append(makeEl("h2", "stage-name", school.stageName || school.school));
    if (school.years) title.append(makeEl("span", "stage-years", school.years));
    head.append(logo, title);

    const body = makeEl("div", "stage-body");

    /* Academic / Competition / Leadership lists */
    STAGE_SECTIONS.forEach(({ key, icon }) => {
      const section = makeEl("section", "stage-section");
      const title = makeEl("h3", "stage-section-title");
      const iconEl = makeEl("i", `bx ${icon}`);
      iconEl.setAttribute("aria-hidden", "true");
      title.append(iconEl, document.createTextNode(` ${t.sections[key]}:`));
      const list = makeEl("ul", "stage-list");
      const items = stageItems(school, key);
      if (items.length) items.forEach((text) => list.append(makeEl("li", "", text)));
      else list.append(makeEl("li", "is-empty", t.stageEmpty));
      section.append(title, list);
      body.append(section);
    });

    card.append(photo, head, body);
    host.append(card);
  });

  renderCertificates();
  renderDiplomas();
}

/* ---------- CERTIFICATES CAROUSEL ---------- */
let carouselFrame = 0;

function renderCertificates() {
  const track = document.getElementById("cert-track");
  if (!track) return;
  const list = portfolio.certificates || [];
  if (!list.length) { track.closest(".cert-block")?.setAttribute("hidden", ""); return; }
  const t = portfolio.text.education;

  /* The list is drawn twice so the carousel can loop forever without a gap. */
  [false, true].forEach((isCopy) => {
    list.forEach((item, index) => {
      const button = makeEl("button", "cert-item");
      button.type = "button";
      button.setAttribute("aria-label", `${item.title} — ${t.certificateHint}`);
      if (isCopy) { button.tabIndex = -1; button.setAttribute("aria-hidden", "true"); }
      const thumb = makeEl("span", "cert-thumb");
      thumb.append(makeEl("span", "cert-placeholder", String(index + 1).padStart(2, "0")));
      thumb.append(makeSoftImage(item.image, item.title, "cert-image"));
      button.append(thumb);
      button.addEventListener("click", () => openLightbox(list, index, button));
      track.append(button);
    });
  });
  startCarousel(track, list.length);
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

  prev.onclick = () => { push -= itemWidth() * 3; };
  next.onclick = () => { push += itemWidth() * 3; };
  viewport.onmouseenter = () => { paused = true; };
  viewport.onmouseleave = () => { paused = false; };
  viewport.onfocusin = () => { paused = true; };
  viewport.onfocusout = () => { paused = false; };

  const frame = (now) => {
    if (!track.isConnected) return;       // page changed: stop
    const dt = Math.min(now - last, 64);
    last = now;
    if (Math.abs(push) > 0.5) {
      const step = push * (1 - Math.exp(-dt / 140));
      x += step; push -= step;
    } else {
      push = 0;
      const lightboxOpen = document.body.classList.contains("lightbox-open");
      if (!paused && !reducedMotion && !lightboxOpen) x += SPEED * dt / 1000;
    }
    const loop = loopWidth();
    if (loop > 0) x = ((x % loop) + loop) % loop;       // wrap around
    track.style.transform = `translate3d(${-x}px, 0, 0)`;
    carouselFrame = requestAnimationFrame(frame);
  };
  carouselFrame = requestAnimationFrame(frame);
}

/* ---------- DIPLOMAS ---------- */
function renderDiplomas() {
  const grid = document.getElementById("dip-grid");
  if (!grid) return;
  const list = portfolio.diplomas || [];
  if (!list.length) { grid.closest(".dip-block")?.setAttribute("hidden", ""); return; }
  const t = portfolio.text.education;
  list.forEach((item, index) => {
    const card = makeEl("button", "dip-card");
    card.type = "button";
    card.setAttribute("aria-label", `${item.title} — ${t.certificateHint}`);
    const thumb = makeEl("span", "dip-thumb");
    thumb.append(makeEl("span", "cert-placeholder", String(index + 1).padStart(2, "0")));
    thumb.append(makeSoftImage(item.image, item.title, "dip-image"));
    const copy = makeEl("span", "dip-copy");
    copy.append(makeEl("strong", "", item.title), makeEl("small", "", item.caption || ""), makeEl("em", "", t.certificateHint));
    card.append(thumb, copy);
    card.addEventListener("click", () => openLightbox(list, index, card));
    grid.append(card);
  });
}

/* ---------- LIGHTBOX (click a certificate or diploma to enlarge it) ---------- */
const lightbox = { el: null, list: [], index: 0, opener: null };

function buildLightbox() {
  const t = portfolio.text.education;
  const root = makeEl("div", "lightbox");
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Enlarged image");

  const close = makeEl("button", "lightbox-close", "×");
  close.type = "button"; close.setAttribute("aria-label", t.close);
  const prev = makeEl("button", "lightbox-nav lightbox-prev", "‹");
  prev.type = "button"; prev.setAttribute("aria-label", t.prev);
  const next = makeEl("button", "lightbox-nav lightbox-next", "›");
  next.type = "button"; next.setAttribute("aria-label", t.next);

  const figure = makeEl("figure", "lightbox-figure");
  const stage = makeEl("div", "lightbox-stage");
  const image = makeEl("img", "lightbox-image");
  const missing = makeEl("div", "lightbox-missing", t.imageSoon);
  stage.append(missing, image);
  const caption = makeEl("figcaption", "lightbox-caption");
  const title = makeEl("strong", "lightbox-title");
  const text = makeEl("span", "lightbox-text");
  const count = makeEl("small", "lightbox-count");
  caption.append(title, text, count);
  figure.append(stage, caption);
  root.append(close, prev, figure, next);

  Object.assign(lightbox, { el: root, image, missing, title, text, count, prev, next });
  image.addEventListener("load", () => { image.hidden = false; missing.hidden = true; });
  image.addEventListener("error", () => { image.hidden = true; missing.hidden = false; });

  close.addEventListener("click", closeLightbox);
  prev.addEventListener("click", () => showLightbox(lightbox.index - 1));
  next.addEventListener("click", () => showLightbox(lightbox.index + 1));
  root.addEventListener("click", (event) => { if (event.target === root || event.target === figure) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (!root.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    else if (event.key === "ArrowLeft") showLightbox(lightbox.index - 1);
    else if (event.key === "ArrowRight") showLightbox(lightbox.index + 1);
  });
  document.body.append(root);
}

function showLightbox(index) {
  const total = lightbox.list.length;
  lightbox.index = (index + total) % total;
  const item = lightbox.list[lightbox.index];
  lightbox.title.textContent = item.title || "";
  lightbox.text.textContent = item.caption || "";
  lightbox.text.hidden = !item.caption;
  lightbox.count.textContent = `${lightbox.index + 1} / ${total}`;
  lightbox.image.alt = item.title || "";
  lightbox.image.hidden = true;
  lightbox.missing.hidden = false;
  lightbox.missing.textContent = `${item.title} · ${portfolio.text.education.imageSoon}`;
  lightbox.image.removeAttribute("src");
  if (item.image) lightbox.image.src = item.image;
  const single = total < 2;
  lightbox.prev.hidden = single; lightbox.next.hidden = single;
}

function openLightbox(list, index, opener) {
  if (!lightbox.el) buildLightbox();
  lightbox.list = list;
  lightbox.opener = opener;
  showLightbox(index);
  lightbox.el.classList.add("is-open");
  document.body.classList.add("lightbox-open");
  lightbox.el.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  if (!lightbox.el) return;
  lightbox.el.classList.remove("is-open");
  document.body.classList.remove("lightbox-open");
  lightbox.opener?.focus({ preventScroll: true });
}

function renderEducationDetail(schoolIndex) {
  const school = portfolio.schools[schoolIndex];
  if (!school) return false;
  const name = document.getElementById("school-detail-name");
  const level = document.getElementById("school-detail-level");
  const program = document.getElementById("school-detail-program");
  const status = document.getElementById("school-detail-status");
  const description = document.getElementById("school-detail-description");
  const mark = document.getElementById("school-detail-mark");
  const logoImage = document.getElementById("school-detail-logo");
  const logoPlaceholder = document.getElementById("school-detail-logo-placeholder");
  if (!name || !level || !program || !status || !description || !mark || !logoImage || !logoPlaceholder) return false;
  name.textContent = school.school;
  level.textContent = school.level.toUpperCase();
  program.textContent = school.program;
  status.textContent = school.status;
  description.textContent = school.description;
  mark.textContent = school.mark;
  const localUrl = String(school.logoPath || "").trim();
  const hostedUrl = String(school.logoHostedPath || "").trim();
  const initialUrl = window.location.protocol === "file:" ? localUrl : (safeUrl(hostedUrl) || localUrl);
  const setSource = (source, isFallback = false) => {
    logoImage.onload = () => { logoImage.hidden = false; logoPlaceholder.hidden = true; };
    logoImage.onerror = () => {
      if (!isFallback && localUrl && source !== localUrl) {
        setSource(localUrl, true);
        return;
      }
      logoImage.hidden = true;
      logoPlaceholder.hidden = false;
    };
    logoImage.src = source;
  };
  if (initialUrl) setSource(initialUrl);
  else { logoImage.hidden = true; logoPlaceholder.hidden = false; }
  renderSchoolAchievements(school);
  return true;
}

function renderSchoolAchievements(school) {
  const host = document.getElementById("school-achievements");
  if (!host) return;
  host.replaceChildren();

  Object.values(portfolio.achievementCategories).forEach((category) => {
    const level = category.levels[school.achievementKey];
    if (!level) return;
    const groups = (level.groups || []).map((group) => ({
      ...group,
      items: group.items.filter((item) => !/open for future|no .* have been added|no .* added/i.test(item))
    })).filter((group) => group.items.length);
    if (!groups.length && !level.project) return;

    const card = document.createElement("article");
    card.className = "school-achievement-card";
    const header = document.createElement("div");
    header.className = "school-achievement-card-header";
    const mark = document.createElement("span");
    mark.className = "school-achievement-mark";
    mark.textContent = category.letter;
    const title = document.createElement("h3");
    title.textContent = category.shortTitle;
    const icon = document.createElement("i");
    icon.className = `bx ${category.icon}`;
    icon.setAttribute("aria-hidden", "true");
    header.append(mark, title, icon);
    card.append(header);
    groups.forEach((group) => card.append(createAchievementGroup(group)));

    if (level.project) {
      const project = document.createElement("article");
      project.className = "school-research-card";
      const label = document.createElement("p");
      label.className = "research-overline";
      label.textContent = level.project.name;
      const projectTitle = document.createElement("h4");
      projectTitle.textContent = level.project.title;
      const description = document.createElement("p");
      description.className = "research-description";
      description.textContent = level.project.description;
      project.append(label, projectTitle, description);
      card.append(project);
    }
    host.append(card);
  });

  if (!host.childElementCount) {
    const empty = document.createElement("p");
    empty.className = "school-achievements-empty";
    empty.textContent = portfolio.text.education.empty;
    host.append(empty);
  }
}

function createAchievementGroup(group) {
  const section = document.createElement("section");
  section.className = "achievement-group";
  const title = document.createElement("h3");
  title.textContent = group.heading;
  section.append(title);
  const list = document.createElement("ul");
  group.items.forEach((item) => {
    const entry = document.createElement("li");
    entry.textContent = item;
    list.append(entry);
  });
  section.append(list);
  if (group.note) {
    const note = document.createElement("p");
    note.className = "achievement-note";
    note.textContent = group.note;
    section.append(note);
  }
  return section;
}

/* ---------- PREVIOUS / NEXT BAR ---------- */
const PAGE_ORDER = ["home", "about", "education", "family-friends"];          // order of the tabs
const PAGE_NAME_KEY = { home: "home", about: "about", education: "education", "family-friends": "family" };   // labels in content.js > text.nav

function setPagerButton(button, view) {
  const name = button.querySelector(".pager-name");
  button.disabled = !view;                       // first / last tab: that button is switched off
  if (view) { button.dataset.view = view; name.textContent = portfolio.text.nav[PAGE_NAME_KEY[view]]; }
  else { button.removeAttribute("data-view"); name.textContent = ""; }
}

function updatePager(activeView) {
  const position = PAGE_ORDER.indexOf(activeView);
  const t = portfolio.text.pager;
  const prev = document.getElementById("pager-prev"), next = document.getElementById("pager-next");
  if (!prev || !next || position < 0) return;
  prev.querySelector(".pager-dir").textContent = t.prev;
  next.querySelector(".pager-dir").textContent = t.next;
  setPagerButton(prev, PAGE_ORDER[position - 1]);
  setPagerButton(next, PAGE_ORDER[position + 1]);
  document.querySelectorAll(".pager-dot").forEach((dot) => dot.classList.toggle("is-active", dot.dataset.view === activeView));
}

function markActiveView(view) {
  const activeView = view === "education-detail" ? "education" : view;
  updatePager(activeView);
  navButtons.forEach((button) => {
    const isActive = button.dataset.view === activeView;
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

function showView(view, { schoolIndex = null, shouldAnimate = true } = {}) {
  if (!mainViews.has(view) && !detailViews.has(view)) view = "home";
  if (view === "education-detail" && !portfolio.schools[schoolIndex]) view = "education";
  const token = ++transitionToken;
  if (shouldAnimate && contentRegion.firstElementChild) { contentRegion.classList.add("is-leaving"); playWipe(); }
  const delay = shouldAnimate && contentRegion.firstElementChild ? 230 : 0;
  window.setTimeout(() => {
    if (token !== transitionToken) return;
    const template = document.getElementById(`view-${view}`);
    if (!template) return;
    contentRegion.classList.remove("is-leaving", "is-visible");
    contentRegion.replaceChildren(template.content.cloneNode(true));
    applyText(contentRegion);
    renderSlots(contentRegion);

    if (view === "home") {
      renderHomeSocials();
      configureCvButton();
      renderPortrait();
      typeHomeName();
    } else if (view === "about") {
      renderAbout();
    } else if (view === "education") {
      renderEducationCards();
    } else if (view === "education-detail") {
      renderEducationDetail(schoolIndex);
    }

    markActiveView(view);
    document.body.dataset.view = view === "education-detail" ? "education" : view;
    fitView();
    window.setTimeout(fitView, 350);
    if (view === "home") window.setTimeout(fitView, 1900);
    const heading = contentRegion.querySelector("h1");
    if (heading && view !== "home") {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    requestAnimationFrame(() => {
      if (token === transitionToken) contentRegion.classList.add("is-visible");
    });
  }, delay);
}

function currentLocation() {
  const params = new URLSearchParams(window.location.search);
  const rawView = params.get("view") || "home";
  const viewAliases = {
    achievements: "education",
    "achievement-category": "education",
    family: "family-friends",
    friends: "family-friends"
  };
  const requestedView = viewAliases[rawView] || rawView;
  if (requestedView === "education-detail") {
    const schoolParam = params.get("school");
    const schoolIndex = schoolParam === null ? Number.NaN : Number(schoolParam);
    if (Number.isInteger(schoolIndex) && portfolio.schools[schoolIndex]) return { view: requestedView, schoolIndex };
  }
  return { view: mainViews.has(requestedView) ? requestedView : "home" };
}

function updateAddress(view, details = {}, replace = false) {
  const url = new URL(window.location.href);
  ["view", "school", "category", "level", "project", "returnToEducation"].forEach((key) => url.searchParams.delete(key));
  if (view !== "home") url.searchParams.set("view", view);
  Object.entries(details).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  });
  const state = { view, ...details };
  window.history[replace ? "replaceState" : "pushState"](state, "", url);
}

function navigate(view) {
  if (!mainViews.has(view)) return;
  const current = currentLocation();
  if (current.view === view) return;
  updateAddress(view);
  showView(view);
}

function openEducationDetail(index) {
  if (!portfolio.schools[index]) return;
  updateAddress("education-detail", { school: index });
  window.history.replaceState({ ...window.history.state, returnToEducation: true }, "", window.location.href);
  showView("education-detail", { schoolIndex: index });
}

function closeEducationDetail() {
  if (window.history.state?.view === "education-detail" && window.history.state?.returnToEducation && window.history.length > 1) {
    window.history.back();
    return;
  }
  navigate("education");
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  if (!target) return;

  if (target.closest("#view-education-detail .back-button") || target.closest(".education-detail-page .back-button")) {
    event.preventDefault();
    closeEducationDetail();
    return;
  }

  const schoolButton = target.closest("[data-school-index]");
  if (schoolButton) {
    openEducationDetail(Number(schoolButton.dataset.schoolIndex));
    return;
  }
  const viewButton = target.closest("[data-view]");
  if (!viewButton || viewButton.disabled) return;
  event.preventDefault();
  navigate(viewButton.dataset.view);
});

document.addEventListener("keydown", (event) => {
  const current = currentLocation();
  if (event.key === "Escape" && detailViews.has(current.view)) closeEducationDetail();
});

window.addEventListener("popstate", () => {
  const location = currentLocation();
  showView(location.view, { ...location, shouldAnimate: true });
});

const initialLocation = currentLocation();
window.history.replaceState(initialLocation, "", window.location.href);
applyText(document);
document.title = portfolio.text.siteTitle;
startBackdrop();
startCursor();
runLoader(() => showView(initialLocation.view, { ...initialLocation, shouldAnimate: false }));
