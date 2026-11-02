/*
 * EDITABLE PROFILE CONTENT
 * Replace the empty URLs only with your real profile links and file paths.
 * The supplied portrait is in assets/rhaine-portrait.jpg for local file use.
 * The hosted portrait path is in portraitUrl; keep both paths in sync if replacing it.
 */
const portfolio = {
  portraitUrl: "/manus-storage/rhaine-portrait_f0ce9a52.jpg",
  portraitLocalUrl: "assets/rhaine-portrait.jpg",
  cvUrl: "",
  email: "",
  socials: [
    { name: "Facebook", url: "", icon: "bxl-facebook" },
    { name: "GitHub", url: "", icon: "bxl-github" },
    { name: "LinkedIn", url: "", icon: "bxl-linkedin" }
  ],
  skills: [
    { name: "Programming", status: "Learning", icon: "bx-code-alt" },
    { name: "Web Development", status: "Learning", icon: "bx-code-block" },
    { name: "UI/UX Design", status: "Exploring", icon: "bx-palette" },
    { name: "Problem-Solving", status: "Developing", icon: "bx-bulb" }
  ],
  projects: [
    {
      title: "Add a project title",
      description: "Replace this with a short description of an academic or personal project you have actually worked on.",
      technologies: ["Add technologies"],
      icon: "bx-layer"
    },
    {
      title: "Add another project",
      description: "Share what you made, what you learned, and what you might improve next. Keep it genuine and your own.",
      technologies: ["Add technologies"],
      icon: "bx-code-curly"
    }
  ]
};

const allowedViews = new Set(["home", "about", "skills", "projects", "education", "contact"]);
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
      link.innerHTML = `<span class="contact-icon"><i class="${iconClass}" aria-hidden="true"></i></span><span class="contact-label">${profile.name}</span><span class="contact-value">Open profile <i class="bx bx-link-external" aria-hidden="true"></i></span>`;
    } else {
      link.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
      link.title = `Open ${profile.name} in a new tab`;
    }
    return link;
  }
  const button = document.createElement("button");
  button.type = "button";
  button.disabled = true;
  button.title = `Add your real ${profile.name} URL in script.js`;
  button.setAttribute("aria-label", `${profile.name} link not added yet`);
  if (compact) {
    button.className = "contact-row is-unavailable";
    button.innerHTML = `<span class="contact-icon"><i class="${iconClass}" aria-hidden="true"></i></span><span class="contact-label">${profile.name}</span><span class="contact-value">Add your ${profile.name} URL</span>`;
  } else {
    button.className = "social-control";
    button.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
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
  const fullName = "Rhaine Kylle Balabag";
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

function renderSkills() {
  const host = document.getElementById("skills-grid");
  if (!host) return;
  portfolio.skills.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.innerHTML = `<span class="skill-icon"><i class="bx ${skill.icon}" aria-hidden="true"></i></span><div><h2 class="skill-name"></h2><span class="skill-status"></span></div>`;
    card.querySelector(".skill-name").textContent = skill.name;
    card.querySelector(".skill-status").textContent = skill.status;
    host.append(card);
  });
}

function renderProjects() {
  const host = document.getElementById("projects-grid");
  if (!host) return;
  portfolio.projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    const art = document.createElement("div");
    art.className = "project-art";
    art.setAttribute("aria-hidden", "true");
    const icon = document.createElement("i");
    icon.className = `bx ${project.icon || "bx-layer"}`;
    art.append(icon);
    const copy = document.createElement("div");
    copy.className = "project-card-copy";
    const number = document.createElement("span");
    number.className = "project-number";
    number.textContent = `PROJECT 0${index + 1} · PLACEHOLDER`;
    const title = document.createElement("h2");
    title.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.description;
    const tags = document.createElement("div");
    tags.className = "tech-list";
    (project.technologies || []).forEach((technology) => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.textContent = technology;
      tags.append(tag);
    });
    const details = document.createElement("button");
    details.type = "button";
    details.className = "project-detail-button";
    details.innerHTML = 'View project notes <i class="bx bx-right-arrow-alt" aria-hidden="true"></i>';
    details.addEventListener("click", () => openProject(index));
    copy.append(number, title, description, tags, details);
    card.append(art, copy);
    host.append(card);
  });
}

function renderContact() {
  const host = document.getElementById("contact-list");
  if (!host) return;
  const normalizedEmail = String(portfolio.email || "").trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  const emailRow = document.createElement(emailIsValid ? "a" : "div");
  emailRow.className = `contact-row${emailIsValid ? " is-configured" : " is-unavailable"}`;
  if (emailIsValid) {
    emailRow.href = `mailto:${normalizedEmail}`;
    emailRow.setAttribute("aria-label", `Email ${normalizedEmail}`);
  }
  emailRow.innerHTML = `<span class="contact-icon"><i class="bx bx-envelope" aria-hidden="true"></i></span><span class="contact-label">Email</span><span class="contact-value"></span>`;
  emailRow.querySelector(".contact-value").textContent = emailIsValid ? normalizedEmail : "Add your email address";
  host.append(emailRow);
  portfolio.socials.forEach((profile) => host.append(makeSocialControl(profile, true)));

  const emailButton = document.getElementById("email-button");
  if (emailButton && emailIsValid) {
    emailButton.disabled = false;
    emailButton.removeAttribute("title");
    emailButton.addEventListener("click", () => { window.location.href = `mailto:${normalizedEmail}`; });
  }
}

function renderPortrait() {
  const localUrl = String(portfolio.portraitLocalUrl || "").trim();
  const hostedUrl = String(portfolio.portraitUrl || "").trim();
  const url = window.location.protocol === "file:" ? localUrl : (safeUrl(hostedUrl) || localUrl);
  if (!url) return;
  const image = document.getElementById("portrait-image");
  if (!image) return;
  image.addEventListener("load", () => {
    image.hidden = false;
  }, { once: true });
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

function markActiveView(view) {
  const activeView = view === "project-detail" ? "projects" : view;
  navButtons.forEach((button) => {
    const isActive = button.dataset.view === activeView;
    button.classList.toggle("is-active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function copyProjectDetails(index) {
  const project = portfolio.projects[index];
  if (!project) return false;
  const title = document.getElementById("project-detail-title");
  const description = document.getElementById("project-detail-description");
  const tech = document.getElementById("project-detail-tech");
  if (!title || !description || !tech) return false;
  title.textContent = project.title;
  description.textContent = project.description;
  (project.technologies || []).forEach((technology) => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.textContent = technology;
    tech.append(tag);
  });
  return true;
}

function showView(view, { projectIndex = null, shouldAnimate = true } = {}) {
  const isProjectDetail = view === "project-detail";
  if (!isProjectDetail && !allowedViews.has(view)) view = "home";
  if (isProjectDetail && !portfolio.projects[projectIndex]) view = "projects";
  const token = ++transitionToken;
  if (shouldAnimate && contentRegion.firstElementChild) contentRegion.classList.add("is-leaving");
  const delay = shouldAnimate && contentRegion.firstElementChild ? 125 : 0;
  window.setTimeout(() => {
    if (token !== transitionToken) return;
    const template = document.getElementById(isProjectDetail && view === "project-detail" ? "view-project-detail" : `view-${view}`);
    if (!template) return;
    contentRegion.classList.remove("is-leaving", "is-visible");
    contentRegion.replaceChildren(template.content.cloneNode(true));
    if (isProjectDetail && view === "project-detail") copyProjectDetails(projectIndex);
    if (view === "home") { renderHomeSocials(); configureCvButton(); renderPortrait(); typeHomeName(); }
    if (view === "skills") renderSkills();
    if (view === "projects") renderProjects();
    if (view === "contact") renderContact();
    markActiveView(view);
    requestAnimationFrame(() => {
      if (token === transitionToken) contentRegion.classList.add("is-visible");
    });
  }, delay);
}

function currentLocation() {
  const params = new URLSearchParams(window.location.search);
  const requestedView = params.get("view") || "home";
  const projectIndex = Number(params.get("project"));
  if (requestedView === "project-detail" && Number.isInteger(projectIndex) && projectIndex >= 0) {
    return { view: "project-detail", projectIndex };
  }
  return { view: allowedViews.has(requestedView) ? requestedView : "home" };
}

function updateAddress(view, projectIndex = null, replace = false) {
  const url = new URL(window.location.href);
  if (view === "home") url.searchParams.delete("view");
  else url.searchParams.set("view", view);
  if (Number.isInteger(projectIndex)) url.searchParams.set("project", String(projectIndex));
  else url.searchParams.delete("project");
  const state = Number.isInteger(projectIndex) ? { view, projectIndex } : { view };
  window.history[replace ? "replaceState" : "pushState"](state, "", url);
}

function navigate(view) {
  if (!allowedViews.has(view)) return;
  if (currentLocation().view === view && !new URLSearchParams(location.search).has("project")) return;
  updateAddress(view);
  showView(view);
}

function openProject(index) {
  if (!portfolio.projects[index]) return;
  updateAddress("project-detail", index);
  showView("project-detail", { projectIndex: index });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button || button.disabled) return;
  event.preventDefault();
  navigate(button.dataset.view);
});

window.addEventListener("popstate", () => {
  const locationState = currentLocation();
  showView(locationState.view, { projectIndex: locationState.projectIndex ?? null });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && currentLocation().view === "project-detail") {
    window.history.back();
  }
});

const initialLocation = currentLocation();
window.history.replaceState(
  initialLocation.view === "project-detail" ? { view: initialLocation.view, projectIndex: initialLocation.projectIndex } : { view: initialLocation.view },
  "",
  window.location.href
);
showView(initialLocation.view, { projectIndex: initialLocation.projectIndex ?? null, shouldAnimate: false });
