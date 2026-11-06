/*
 * EDITABLE PORTFOLIO CONTENT
 * Keep personal details, achievements, and file paths accurate to what you want to share.
 */
const portfolio = {
  portraitUrl: "/manus-storage/rhaine-portrait_f0ce9a52.jpg",
  portraitLocalUrl: "assets/images/home/portrait.jpg",
  aboutPhotoUrl: "/manus-storage/picture-1_38cb3810.jpg",
  aboutPhotoLocalUrl: "assets/images/about/picture-1.jpg",
  cvUrl: "",
  email: "",
  socials: [
    { name: "Facebook", url: "", icon: "bxl-facebook" },
    { name: "GitHub", url: "", icon: "bxl-github" },
    { name: "LinkedIn", url: "", icon: "bxl-linkedin" }
  ],
  aboutProfile: {
    name: "Rhaine Kylle Balabag",
    birthDate: "2007-11-26",
    birthday: "November 26, 2007",
    location: "Poblacion Tuba, Benguet, Philippines",
    college: "University of the Cordilleras",
    course: "Bachelor of Science in Information Technology",
    specialization: "Network Security",
    yearLevel: "First Year",
    hobbies: ["Performing", "Digital design", "Learning new things"],
    interests: ["Programming", "Mathematics", "Research", "Creativity", "Everyday technology"],
    skills: ["Analytical thinking", "Problem-solving", "Communication", "Teamwork", "Adaptability", "Creativity"],
    technicalSkills: ["Basic programming", "Computer applications", "Digital design"],
    statement: "I am a curious, creative, and goal-oriented individual who enjoys exploring new ideas and taking on challenges. I value continuous learning and believe that every experience is an opportunity to improve myself. As I continue my journey in Information Technology, I hope to strengthen my technical abilities, gain practical experience, and develop solutions that combine creativity and functionality. I am always willing to learn, adapt, collaborate, and contribute my ideas to every opportunity that comes my way."
  },
  schools: [
    {
      level: "Elementary",
      achievementKey: "elementary",
      school: "Apolinario Mabini Elementary School",
      mark: "AM",
      logoPath: "assets/images/education/apolinario-mabini-logo.jpg",
      logoHostedPath: "/manus-storage/apolinario-mabini-logo_6fe87006.jpg",
      program: "Elementary education",
      status: "Elementary",
      description: "My elementary years were where I began developing my academic foundation and discovering my interests in learning, particularly in mathematics."
    },
    {
      level: "Junior High School",
      achievementKey: "junior",
      school: "Baguio City High School",
      mark: "BCHS",
      logoPath: "assets/images/education/baguio-city-high-school-logo.png",
      logoHostedPath: "/manus-storage/baguio-city-high-school-logo_f634932f.png",
      program: "Junior High School",
      status: "Junior High School",
      description: "My junior high school years helped strengthen my academic foundation, particularly in mathematics and problem-solving. This was also when I became more involved in academic competitions and student leadership."
    },
    {
      level: "Senior High School",
      achievementKey: "senior",
      school: "Baguio City High School",
      mark: "BCHS",
      logoPath: "assets/images/education/baguio-city-high-school-logo.png",
      logoHostedPath: "/manus-storage/baguio-city-high-school-logo_f634932f.png",
      program: "Science, Technology, Engineering, and Mathematics (STEM) strand",
      status: "Senior High School · STEM",
      description: "My senior high school experience under the STEM strand further developed my interest in mathematics, research, science, and technology. It also allowed me to participate in leadership activities, research projects, and academic competitions."
    },
    {
      level: "College",
      achievementKey: "college",
      school: "University of the Cordilleras",
      mark: "UC",
      logoPath: "assets/images/education/university-of-cordilleras-logo.png",
      logoHostedPath: "/manus-storage/university-of-cordilleras-logo_87c43154.png",
      program: "Bachelor of Science in Information Technology",
      status: "Currently Studying · First Year",
      description: "My current academic journey focuses on Information Technology, where I continue to explore programming, computing, software development, and the different possibilities of technology."
    }
  ],
  achievementCategories: {
    academics: {
      letter: "A",
      title: "ACADEMIC ACHIEVEMENTS",
      overviewTitle: "ACADEMICS",
      shortTitle: "Academics",
      icon: "bx-award",
      summary: "Academic recognition from elementary school through senior high school.",
      levels: {
        elementary: {
          groups: [{ heading: "Elementary", items: ["Consistent Honor Student from Grades 1 to 6."] }]
        },
        junior: {
          groups: [{ heading: "Junior High School", items: ["Honor Student, Grades 7 to 9.", "Batch Valedictorian, Grade 10.", "Mathematics Awardee, Grade 10."] }]
        },
        senior: {
          groups: [
            { heading: "Grade 11", items: ["Honor Student."] },
            { heading: "Grade 12", items: ["Honor Student.", "Mathematics Awardee.", "Best in Capstone Research.", "Leadership Awardee."] }
          ]
        },
        college: {
          groups: [{ heading: "College", items: ["No college awards or academic distinctions have been added yet; this section remains open for future updates."] }]
        }
      }
    },
    competitions: {
      letter: "B",
      title: "ACADEMIC COMPETITIONS",
      overviewTitle: "COMPETITIONS",
      shortTitle: "Competitions",
      icon: "bx-trophy",
      summary: "Participation and regional-level experiences in academic competitions.",
      levels: {
        elementary: {
          groups: [{ heading: "Elementary · Participated in", items: ["DaMath.", "MTAP.", "Mathematics Quiz Bee."] }]
        },
        junior: {
          groups: [{ heading: "Junior High School · Participated in", items: ["Mathematical Investigation (Problem-Based), reaching the Regional level.", "Mathematics Quiz Bee."] }]
        },
        senior: {
          groups: [{ heading: "Senior High School · Participated in", items: ["Mathematical Investigation (Research-Based), reaching the Regional level.", "Science Quiz Bee.", "Mathematics Quiz Bee."] }]
        },
        college: {
          groups: [{ heading: "College", items: ["This section is open for future competition entries."] }]
        }
      }
    },
    leadership: {
      letter: "C",
      title: "LEADERSHIP & ORGANIZATIONAL INVOLVEMENT",
      overviewTitle: "LEADERSHIP",
      shortTitle: "Leadership",
      icon: "bx-group",
      summary: "Student roles, proposed Math Club initiatives, and skills developed through involvement.",
      levels: {
        elementary: {
          groups: [{ heading: "Elementary", items: ["Consistently served as a Class Officer."] }]
        },
        junior: {
          groups: [{ heading: "Junior High School", items: ["Class Officer.", "Math Club Secretary."] }]
        },
        senior: {
          groups: [
            { heading: "Senior High School roles", items: ["Class Secretary.", "Math Club Secretary."] },
            { heading: "Proposed Math Club initiatives", items: ["Clean and Green initiatives.", "Donation Drives.", "Event Booths."], note: "These were proposed projects or initiatives, not necessarily completed projects." },
            { heading: "Skills developed", items: ["Organization.", "Responsibility.", "Teamwork.", "Communication.", "Initiative.", "Collaboration."] }
          ]
        },
        college: {
          groups: [{ heading: "College", items: ["Open for future leadership experiences. No current college positions or organizational memberships have been added."] }]
        }
      }
    },
    programs: {
      letter: "D",
      title: "PROGRAMMING, RESEARCH & TECHNOLOGY",
      overviewTitle: "PROGRAMS & COMPUTER-RELATED PROJECTS",
      shortTitle: "Programs & Projects",
      icon: "bx-laptop",
      summary: "Academic research and computer-related work, with space for future projects.",
      levels: {
        elementary: {
          groups: [{ heading: "Elementary", items: ["No computer-related projects have been added for this level yet."] }]
        },
        junior: {
          groups: [{ heading: "Junior High School", items: ["No computer-related projects have been added for this level yet."] }]
        },
        senior: {
          groups: [{ heading: "Grade 12 · Senior High School", items: ["Research and Computer-Related Project."] }],
          project: {
            name: "BAGUIO BREAKTHROUGH",
            title: "Optimizing Shortest Routes to Parks in the City of Baguio Using Bellman-Ford Algorithm.",
            description: "This research explored the use of the Bellman-Ford algorithm to identify optimized routes connecting selected parks and destinations in Baguio City. It demonstrated how graph theory and computer algorithms can be applied to practical routing problems.",
            concepts: ["Bellman-Ford Algorithm", "Graph Theory", "Shortest-Path Optimization", "Route Analysis", "Computer Science Applications"],
            resources: ["Research documentation", "Project photographs", "Graphs and diagrams", "Presentation materials", "Research papers"]
          },
          futureProjects: ["Programming exercises", "Java projects", "Radix conversion", "Logic circuit simulations"]
        },
        college: {
          groups: [{ heading: "College", items: ["Open for future computer-related project entries. No additional college projects have been added yet."] }]
        }
      }
    }
  }
};

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

function renderPortrait() {
  const localUrl = String(portfolio.portraitLocalUrl || "").trim();
  const hostedUrl = String(portfolio.portraitUrl || "").trim();
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
  [
    { label: "Birthday", value: profile.birthday },
    { label: "Age", value: `${calculateAge(profile.birthDate)} years old` },
    { label: "Location", value: profile.location }
  ].forEach(({ label, value }) => {
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
  const localPhotoUrl = String(portfolio.aboutPhotoLocalUrl || "").trim();
  const hostedPhotoUrl = String(portfolio.aboutPhotoUrl || "").trim();
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
  caption.textContent = "SCHOOL LOGO";
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

function renderEducationCards() {
  const host = document.getElementById("school-grid");
  if (!host) return;
  portfolio.schools.forEach((school, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "school-card";
    card.dataset.schoolIndex = String(index);
    card.setAttribute("aria-label", `${school.level}: ${school.school}. Open details and achievements.`);
    card.append(makeSchoolMark(school));

    const copy = document.createElement("span");
    copy.className = "school-card-copy";
    const level = document.createElement("span");
    level.className = "school-card-level";
    level.textContent = school.level;
    const name = document.createElement("strong");
    name.textContent = school.school;
    const program = document.createElement("small");
    program.textContent = school.program;
    const open = document.createElement("span");
    open.className = "school-card-open";
    open.innerHTML = 'View achievements <i class="bx bx-right-arrow-alt" aria-hidden="true"></i>';
    copy.append(level, name, program, open);
    card.append(copy);
    host.append(card);
  });
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
    empty.textContent = "No achievements have been added for this school yet.";
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

function markActiveView(view) {
  const activeView = view === "education-detail" ? "education" : view;
  navButtons.forEach((button) => {
    const isActive = button.dataset.view === activeView;
    button.classList.toggle("is-active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function showView(view, { schoolIndex = null, shouldAnimate = true } = {}) {
  if (!mainViews.has(view) && !detailViews.has(view)) view = "home";
  if (view === "education-detail" && !portfolio.schools[schoolIndex]) view = "education";
  const token = ++transitionToken;
  if (shouldAnimate && contentRegion.firstElementChild) contentRegion.classList.add("is-leaving");
  const delay = shouldAnimate && contentRegion.firstElementChild ? 125 : 0;
  window.setTimeout(() => {
    if (token !== transitionToken) return;
    const template = document.getElementById(`view-${view}`);
    if (!template) return;
    contentRegion.classList.remove("is-leaving", "is-visible");
    contentRegion.replaceChildren(template.content.cloneNode(true));

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
showView(initialLocation.view, { ...initialLocation, shouldAnimate: false });
