/*
 * ============================================================
 *  EDITABLE PORTFOLIO CONTENT  —  edit THIS file on GitHub.
 *  Everything you read on the website lives here:
 *   1. Photos / links ........ top of the file
 *   2. About / Personal info . portfolio.aboutProfile
 *   3. Schools & achievements  portfolio.schools / achievementCategories
 *   4. Every other label ..... portfolio.text  (bottom of file)
 *  Tip: in text, wrap words in *stars* to show them in the red accent colour.
 *  Keep the quotes "" and commas , exactly as they are.
 * ============================================================
 */
const portfolio = {
  portraitUrl: "assets/images/home/portrait.jpg",   // Home photo
  aboutPhotoUrl: "assets/images/about/picture-1.jpg",   // Personal Information photo
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
    sex: "Male",
    status: "Single",
    height: "5'5\"",
    weight: "53 kg",
    college: "University of the Cordilleras",
    course: "Bachelor of Science in Information Technology",
    specialization: "Network Security",
    yearLevel: "First Year",
    hobbies: ["Performing", "Digital design", "Learning new things"],
    interests: ["Programming", "Mathematics", "Research", "Creativity", "Everyday technology"],
    skills: ["Analytical thinking", "Problem-solving", "Communication", "Creativity"],
    technicalSkills: ["Basic programming", "Computer applications", "Digital design"],
    statement: "I am a curious, creative, and goal-oriented individual who enjoys exploring new ideas and taking on challenges. I value continuous learning and believe that every experience is an opportunity to improve myself. As I continue my journey in Information Technology, I hope to strengthen my technical abilities, gain practical experience, and develop solutions that combine creativity and functionality. I am always willing to learn, adapt, collaborate, and contribute my ideas to every opportunity that comes my way."
  },
  schools: [
    {
      level: "Elementary",
      achievementKey: "elementary",
      stageName: "Apolinario Mabini Elementary School",   // title shown on the Achievements card
      years: "2014-2020",   // years shown under the title
      school: "Apolinario Mabini Elementary School",
      buildingPath: "assets/images/education/buildings/apolinario-mabini.jpg",   // school building photo (shown inside the card)
      mark: "AM",
      logoPath: "assets/images/education/apolinario-mabini-logo.jpg",
      gradPhotoPath: "assets/images/education/graduation/elementary.jpg",   // graduation photo (shown on the school's detail page)
      gradCaption: "ELEMENTARY GRADUATION · 2020",
      program: "Elementary education",
      status: "Elementary",
      description: "My elementary years were where I began developing my academic foundation and discovering my interests in learning, particularly in mathematics."
    },
    {
      level: "Junior High School",
      achievementKey: "junior",
      stageName: "Baguio City High School - Junior High",
      years: "2020-2024",
      school: "Baguio City High School",
      buildingPath: "assets/images/education/buildings/baguio-city-high-school-junior.jpg",
      mark: "BCHS",
      logoPath: "assets/images/education/baguio-city-high-school-logo.png",
      gradPhotoPath: "assets/images/education/graduation/junior-high.jpg",
      gradCaption: "JUNIOR HIGH GRADUATION · 2024",
      program: "Junior High School",
      status: "Junior High School",
      description: "My junior high school years helped strengthen my academic foundation, particularly in mathematics and problem-solving. This was also when I became more involved in academic competitions and student leadership."
    },
    {
      level: "Senior High School",
      achievementKey: "senior",
      stageName: "Baguio City High School - Senior High",
      years: "2024-2026",
      school: "Baguio City High School",
      buildingPath: "assets/images/education/buildings/baguio-city-high-school-senior.jpg",
      mark: "BCHS",
      logoPath: "assets/images/education/baguio-city-high-school-logo.png",
      gradPhotoPath: "assets/images/education/graduation/senior-high.jpg",
      gradCaption: "SENIOR HIGH GRADUATION · 2026",
      program: "Science, Technology, Engineering, and Mathematics (STEM) strand",
      status: "Senior High School · STEM",
      description: "My senior high school experience under the STEM strand further developed my interest in mathematics, research, science, and technology. It also allowed me to participate in leadership activities, research projects, and academic competitions."
    },
    {
      level: "College",
      achievementKey: "college",
      stageName: "University of the Cordilleras - College",
      years: "In progress",
      school: "University of the Cordilleras",
      buildingPath: "assets/images/education/buildings/university-of-cordilleras.jpg",
      mark: "UC",
      logoPath: "assets/images/education/university-of-cordilleras-logo.jpg",
      program: "Bachelor of Science in Information Technology",
      status: "Currently Studying · First Year",
      description: "My current academic journey focuses on Information Technology, where I continue to explore programming, computing, software development, and the different possibilities of technology."
    }
  ],
  achievementCategories: {
    academics: {
      letter: "A", title: "ACADEMIC ACHIEVEMENTS", overviewTitle: "ACADEMICS", shortTitle: "Academics", icon: "bx-award",
      summary: "Academic recognition from elementary school through senior high school.",
      levels: {
        elementary: { groups: [{ heading: "Elementary", items: ["Consistent Honor Student.", "Top 3 overall, Batch 2020."] }] },
        junior: { groups: [{ heading: "Junior High School", items: ["Consistent Honor / High Honor Student.", "Batch Valedictorian.", "Award in Mathematics."] }] },
        senior: { groups: [{ heading: "Senior High School", items: ["Consistent Honor / High Honor Student.", "Award in Capstone Project.", "Award in Mathematics."] }] },
        college: { groups: [{ heading: "College", items: ["No college awards or academic distinctions have been added yet; this section remains open for future updates."] }] }
      }
    },
    competitions: {
      letter: "B", title: "ACADEMIC COMPETITIONS", overviewTitle: "COMPETITIONS", shortTitle: "Competitions", icon: "bx-trophy",
      summary: "Participation and placements in academic competitions.",
      levels: {
        elementary: { groups: [{ heading: "Elementary", items: ["MTAP – District (2015-2019).", "District Mathematical Festival (2015-2019).", "English Festival – Tongue Twister, 2nd place.", "Nutrition Month – Quiz Bee, 2nd place.", "Nutrition Month – Slogan Making, 2nd place."] }] },
        junior: { groups: [{ heading: "Junior High School", items: ["Mathematical Investigation (Problem-Based) – Division 1st place, District 2nd place.", "Science Quiz Bee – School-based 3rd place."] }] },
        senior: { groups: [{ heading: "Senior High School", items: ["Mathematical Investigation (Research-Based) – Regionals.", "Mathematical Quiz Bee – District 1st place.", "BIOlympia (UP Baguio) – Participant."] }] },
        college: { groups: [{ heading: "College", items: ["This section is open for future competition entries."] }] }
      }
    },
    leadership: {
      letter: "C", title: "LEADERSHIP & ORGANIZATIONAL INVOLVEMENT", overviewTitle: "LEADERSHIP", shortTitle: "Leadership", icon: "bx-group",
      summary: "Student roles and initiatives.",
      levels: {
        elementary: { groups: [{ heading: "Elementary", items: ["Consistent Class President."] }] },
        junior: { groups: [{ heading: "Junior High School", items: ["Class Officer – President & Secretary."] }] },
        senior: {
          groups: [
            { heading: "Senior High School", items: ["Leadership Awardee – Class Secretary & Mathletes Guild Officer."] },
            { heading: "Projects include (proposed Math Club initiatives)", items: ["Clean and Green initiatives.", "Donation Drives.", "Event Booths."], note: "These were proposed projects or initiatives, not necessarily completed projects." }
          ]
        },
        college: { groups: [{ heading: "College", items: ["Open for future leadership experiences. No current college positions or organizational memberships have been added."] }] }
      }
    },
    extracurricular: {
      letter: "D", title: "EXTRACURRICULAR ACTIVITIES", overviewTitle: "EXTRACURRICULAR", shortTitle: "Extracurricular", icon: "bx-compass",
      summary: "Activities beyond the classroom.",
      levels: {
        elementary: { groups: [{ heading: "Elementary", items: ["Boy Scout (2014-2020)."] }] }
      }
    },
    programs: {
      letter: "E", title: "PROGRAMMING, RESEARCH & TECHNOLOGY", overviewTitle: "PROGRAMS & COMPUTER-RELATED PROJECTS", shortTitle: "Programs & Projects", icon: "bx-laptop",
      summary: "Academic research and computer-related work, with space for future projects.",
      levels: {
        elementary: { groups: [{ heading: "Elementary", items: ["No computer-related projects have been added for this level yet."] }] },
        junior: { groups: [{ heading: "Junior High School", items: ["No computer-related projects have been added for this level yet."] }] },
        senior: {
          groups: [{ heading: "Grade 12 · Senior High School", items: ["Capstone Project."] }],
          project: {
            name: "CAPSTONE PROJECT",
            title: "Baguio Breakthrough: Optimizing the Shortest Routes using Bellman-Ford Algorithm.",
            description: "This research explored the use of the Bellman-Ford algorithm to identify optimized routes connecting selected parks and destinations in Baguio City. It demonstrated how graph theory and computer algorithms can be applied to practical routing problems.",
            concepts: ["Bellman-Ford Algorithm", "Graph Theory", "Shortest-Path Optimization", "Route Analysis", "Computer Science Applications"],
            resources: ["Research documentation", "Project photographs", "Graphs and diagrams", "Presentation materials", "Research papers"]
          },
          futureProjects: ["Programming exercises", "Java projects", "Radix conversion", "Logic circuit simulations"]
        },
        college: { groups: [{ heading: "College", items: ["Open for future computer-related project entries. No additional college projects have been added yet."] }] }
      }
    }
  }
};

/* ---------- CERTIFICATES (the moving carousel) ----------
 * Put each file in assets/images/certificates/ and match the name below.
 * title   = bold line shown when you click a certificate
 * caption = the little description under it (leave "" for none)            */
portfolio.certificates = [
    { image: "assets/images/certificates/certificate-01.jpg", title: "English Festival — Tongue Twister (2nd Place)", caption: "Grade 2 · Apolinario Mabini Elementary School · Nov 2015" },
    { image: "assets/images/certificates/certificate-02.jpg", title: "Academic Excellence Award — Grade 3", caption: "With High Honors · 2nd Quarter, SY 2016-2017" },
    { image: "assets/images/certificates/certificate-03.jpg", title: "Metrobank-MTAP-DepEd Math Challenge", caption: "Certificate of Participation · Division Finals, March 2017" },
    { image: "assets/images/certificates/certificate-04.jpg", title: "Nutri-Quiz Bee (2nd Place)", caption: "43rd Nutrition Month · July 2017" },
    { image: "assets/images/certificates/certificate-05.jpg", title: "District Mathematics Festival 2017", caption: "Certificate of Participation · Mabini District, Sept 2017" },
    { image: "assets/images/certificates/certificate-06.jpg", title: "Boy Scouts Backyard Camping", caption: "Certificate of Participation · Sept 2017" },
    { image: "assets/images/certificates/certificate-07.jpg", title: "Academic Excellence Award — Grade 4", caption: "With High Honors · 2nd Grading, SY 2017-2018" },
    { image: "assets/images/certificates/certificate-08.jpg", title: "Academic Excellence Award — Grade 5", caption: "High Honors · 2nd Grading, Nov 2018" },
    { image: "assets/images/certificates/certificate-09.jpg", title: "Certificate of Academic Excellence — Grade 8", caption: "With Honors · SY 2021-2022" },
    { image: "assets/images/certificates/certificate-10.jpg", title: "Honor Certificate — Grade 9", caption: "With High Honors · SY 2022-2023" },
    { image: "assets/images/certificates/certificate-11.jpg", title: "Conduct Award", caption: "SY 2022-2023 · Baguio City National High School" },
    { image: "assets/images/certificates/certificate-12.jpg", title: "District Mathematics Festival — Math Investigation (2nd Place)", caption: "Problem-Based Contest · Oct 2023" },
    { image: "assets/images/certificates/certificate-13.jpg", title: "Division Mathematics Festival — Math Investigation (1st Place)", caption: "Problem-Based, Junior High (Team) · Oct 2023" },
    { image: "assets/images/certificates/certificate-14.jpg", title: "Honor Certificate — Grade 10", caption: "With High Honors · 1st Grading, 2023-2024" },
    { image: "assets/images/certificates/certificate-15.jpg", title: "Certificate of Recognition — Grade 11 STEM", caption: "With High Honors · 1st Semester, SY 2024-2025" },
    { image: "assets/images/certificates/certificate-16.jpg", title: "BIOlympia 2025 — UP Baguio", caption: "Certificate of Participation · March 2025" },
    { image: "assets/images/certificates/certificate-17.jpg", title: "Academic Achievement — With Honors", caption: "SY 2025-2026 · Baguio City High School" },
    { image: "assets/images/certificates/certificate-18.jpg", title: "Outstanding Performance in Mathematics", caption: "SY 2025-2026 · Baguio City High School" },
    { image: "assets/images/certificates/certificate-19.jpg", title: "Award in Capstone Project", caption: "Expanding Rotating Polygonal Flower · SY 2025-2026" },
    { image: "assets/images/certificates/certificate-20.jpg", title: "Leadership Award", caption: "SY 2025-2026 · Baguio City High School" },
];

/* ---------- DIPLOMAS & ACADEMIC MILESTONES (3 larger previews) ----------
 * Put each file in assets/images/diplomas/ and match the name below.        */
portfolio.diplomas = [
  { image: "assets/images/diplomas/diploma-01.jpg", title: "Elementary Diploma", caption: "Apolinario Mabini Elementary School · With Honors" },
  { image: "assets/images/diplomas/diploma-02.jpg", title: "Junior High School Diploma", caption: "Baguio City High School" },
  { image: "assets/images/diplomas/diploma-03.jpg", title: "Senior High School Diploma", caption: "Baguio City High School · STEM" }
];

/* ---------- ALL OTHER WEBSITE TEXT ---------- */
portfolio.text = {
  siteTitle: "Rhaine Kylle Balabag — Portfolio",
  loader: { title: "RHAINE", messages: ["WARMING UP THE ENGINE", "SHIFTING GEARS", "HITTING TOP SPEED", "READY TO LAUNCH"] },
  brand: { initialA: "R", initialB: "B", word: "RHAINE" },
  nav: { home: "Home", about: "Personal Information", education: "Achievements", family: "Family & Friends" },
  cta: "Let's Connect",
  pager: { prev: "Previous", next: "Next", label: "Page navigation" },
  home: {
    name: "Rhaine Kylle Balabag",
    hero: "*IT STUDENT* AND ASPIRING DEVELOPER",
    explore: "Explore My Work",
    cv: "Download CV",
    facts: [
      { title: "IT Student", caption: "Building my foundation" },
      { title: "Web Development", caption: "Learning by creating" },
      { title: "Continuous Learning", caption: "One step at a time" }
    ]
  },
  about: {
    eyebrow: "ABOUT ME / PROFILE", education: "EDUCATION", course: "COURSE", hobbies: "HOBBIES",
    interests: "INTERESTS", skills: "SKILLS", technical: "TECHNICAL SKILLS", statement: "PERSONAL STATEMENT",
    ageSuffix: "years old",
    labels: { birthday: "Birthday", age: "Age", sex: "Sex", location: "Location", status: "Status", height: "Height", weight: "Weight" }
  },
  education: {
    eyebrow: "EDUCATION & ACHIEVEMENTS", title: "MY EDUCATIONAL *JOURNEY*",
    lede: "Choose a school to see its story and achievements.",
    back: "Back to Schools", achievementsTitle: "ACHIEVEMENTS AT THIS SCHOOL", logoCaption: "SCHOOL LOGO",
    stagesTitle: "EDUCATIONAL *STAGES*", certificatesTitle: "*CERTIFICATES*", diplomasTitle: "DIPLOMAS & *ACADEMIC MILESTONES*",
    sections: { academics: "Academic", competitions: "Competition", leadership: "Leadership", extracurricular: "Extracurricular" },
    stageEmpty: "To be added.", buildingCaption: "SCHOOL BUILDING", openDetails: "View full details",
    certificateHint: "Click to enlarge", imageSoon: "Image not added yet", prev: "Previous", next: "Next", close: "Close",
    viewAchievements: "View achievements", empty: "No achievements have been added for this school yet."
  },
  connections: { eyebrow: "THE PEOPLE WHO MAKE THE JOURNEY MEANINGFUL", title: "FAMILY *& FRIENDS*" },
  /* For a photo: put the file in assets/images/family/ and set image: "assets/images/family/mom.jpg" */
  family: {
    eyebrow: "THE PEOPLE CLOSEST TO HOME", title: "MY *FAMILY*",
    subtitle: "More about the people who are part of my story.",
    note: "This space is ready for details you choose to share.",
    slots: [
      { image: "", label: "PHOTO SLOT 01", caption: "Family photo" },
      { image: "", label: "PHOTO SLOT 02", caption: "Add a description later" },
      { image: "", label: "PHOTO SLOT 03", caption: "Add a memory later" }
    ]
  },
  friends: {
    eyebrow: "THE PEOPLE ALONG THE WAY", title: "MY *PEOPLE*",
    subtitle: "Memories, friendships, and the people who make the journey meaningful.",
    note: "This space is ready for details you choose to share.",
    slots: [
      { image: "", label: "PHOTO SLOT 01", caption: "Friends photo" },
      { image: "", label: "PHOTO SLOT 02", caption: "Add a description later" },
      { image: "", label: "PHOTO SLOT 03", caption: "Add a memory later" }
    ]
  }
};
