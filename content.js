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
      school: "Apolinario Mabini Elementary School",
      mark: "AM",
      logoPath: "assets/images/education/apolinario-mabini-logo.jpg",
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

/* ---------- ALL OTHER WEBSITE TEXT ---------- */
portfolio.text = {
  siteTitle: "Rhaine Kylle Balabag — Portfolio",
  loader: { title: "RHAINE", messages: ["WARMING UP THE ENGINE", "SHIFTING GEARS", "HITTING TOP SPEED", "READY TO LAUNCH"] },
  brand: { initialA: "R", initialB: "B", word: "RHAINE" },
  nav: { home: "Home", about: "Personal Information", education: "Achievements", family: "Family & Friends" },
  cta: "Let's Connect",
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
