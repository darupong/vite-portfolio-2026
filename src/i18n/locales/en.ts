const en = {
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  header: {
    hireMe: "Hire me",
  },
  hero: {
    available: "Available for new opportunities",
    title: "Full Stack Engineer",
    location: "Bangkok, Thailand",
    bio: "I started out building Unity games and AR filters for Instagram and TikTok, then moved into web — shipping virtual tours, e-commerce sites, and a dating app. Now I work at the intersection of AI and product, building Stable Diffusion pipelines and consumer-facing web apps. I care about the full journey from idea to deployed product.",
    viewProjects: "View Projects",
    getInTouch: "Get in touch",
    scroll: "Scroll",
    stats: {
      years: "Years experience",
      projects: "Projects shipped",
      companies: "Companies",
    },
  },
  experience: {
    label: "Work History",
    title: "Experience",
    subtitle: "Companies and roles where I've grown as an engineer",
    location: "Location",
    items: {
      imai: {
        role: "Full Stack Developer",
        highlights: [
          "Developing full-stack web applications using Next.js and FastAPI",
        ],
      },
      vr: {
        role: "Full Stack Developer",
        highlights: [
          "Built an AI face mapping web platform using Next.js and Stable Diffusion, enabling real-time image generation",
          "Developed kiosk photobooth system with touchscreen UI and cloud image delivery",
          "Architected backend APIs with FastAPI, reducing response latency by optimizing inference pipelines",
        ],
      },
      pirsquare: {
        role: "Frontend Developer",
        highlights: [
          "Built responsive shopping and landing page websites using Next.js",
          "Developed a feature-rich dating application UI with React",
        ],
      },
      viz: {
        role: "Game Developer & Programmer (Intern)",
        highlights: [
          "Developed WordPress-based virtual tour and 3D interactive websites",
          "Built Unity mobile games published to iOS and Android",
          "Created Instagram and TikTok AR filters with Spark AR",
        ],
      },
    },
  },
  projects: {
    label: "Portfolio",
    title: "Projects",
    subtitle: "Things I've built — AI tools, web platforms, mobile apps, and more",
    showMore: "Show {{count}} more",
    filterAll: "All",
    filterWeb: "Web",
    filterMobile: "Mobile",
    filterGame: "Game",
    filterAr: "AR & Filters",
    filterOther: "Other",
    viewWebsite: "Visit Website",
    viewProject: "View Project",
    watchDemo: "Watch Demo",
    downloadApp: "Download App",
    close: "Close",
    backToProjects: "Back to projects",
    builtWith: "Built with",
    links: "Links",
    aboutProject: "About this project",
    otherProjects: "Other Projects",
    items: {
      looklike: {
        description: "AI photobooth image generator that creates styled portraits from user selfies using Stable Diffusion and ComfyUI.",
        detail: "Looklike.ai lets users upload a selfie and receive a high-quality AI-generated portrait styled in various themes. Built with Next.js on the frontend and FastAPI + Stable Diffusion for the inference pipeline.",
      },
      lays: {
        description: "Campaign microsite for Lay's Thailand — users generate personalized AI wallpapers using their photo for Valentine's Day.",
        detail: "Valentine's Day event site (14 February 2025) for Lay's Thailand. Users upload a photo and receive a custom AI-generated wallpaper with a Valentine theme, powered by ComfyUI.",
      },
      sathumart: {
        description: "Web platform for generating custom Ganesha-themed wallpapers with AI, combining Thai cultural aesthetics with generative art.",
        detail: "Sathumart generates auspicious Ganesha wallpapers using AI. Users select styles and receive high-resolution wallpapers blending Thai cultural aesthetics with generative diffusion models.",
      },
      gama: {
        description: "Website for the Association of Life Insurance Business Executives and Financial Advisors — featuring subscription, login, and award systems.",
        detail: "Full-featured association platform with member subscription management, registration, authentication, and an award tracking system. The back-office is managed via a React-based admin panel.",
      },
      kooboon: {
        description: "Cross-platform iOS/Android dating application with real-time messaging, profile matching, and location-based discovery.",
        detail: "Kooboon is a full-featured dating application available on iOS and Android. Built with React Native for the client and NestJS for the backend, featuring real-time chat and profile matching.",
      },
      gssd: {
        description: "The 3D walkthrough experience for the GSSD Expo 2022 — the largest virtual tour with Thailand as first co-host in Asia-Pacific.",
        detail: "A 3D virtual tour website for the Global South-South Development Expo 2022. Built with WordPress and PlayCanvas, allowing international participants to explore pavilions and exhibits online.",
      },
      hiddenGhost: {
        description: "Promotional website for a detective mystery mobile game — inspired by Phasmophobia, developed during internship at VIZ STUDIO.",
        detail: "A website promoting The Hidden Ghost, a detective mobile game developed with Unity during an internship at VIZ STUDIO. The game is inspired by Phasmophobia and available on iOS and Android.",
      },
      tomthanet: {
        description: "E-commerce website for Tom Thanet, a Thai fashion brand — built with Next.js during work at Pi R Square.",
        detail: "A responsive shopping website for Tom Thanet built with Next.js and Tailwind CSS during my time at Pi R Square.",
      },
      pirfloww: {
        description: "Sub-domain web project for Flowwsquare — a Next.js landing page built at Pi R Square.",
        detail: "A sub-domain landing page built for Flowwsquare using Next.js and React during my time at Pi R Square.",
      },
      alpsAlpine: {
        description: "Interactive 3D virtual tour website for Alps Alpine's showroom — built with WordPress and WebGL.",
        detail: "A 3D virtual tour experience for Alps Alpine's showroom, built during internship at VIZ STUDIO using WordPress and a custom WebGL viewer.",
      },
      siap: {
        description: "3D virtual tour website for S.I. ASIA PACIFIC CO., LTD. — an immersive walkthrough of their facilities.",
        detail: "An interactive 3D virtual tour for S.I. ASIA PACIFIC, built during internship at VIZ STUDIO using WordPress and PlayCanvas.",
      },
      doneEngineering: {
        description: "Corporate virtual tour website for Done Engineering and Service Co., Ltd.",
        detail: "A virtual tour website for Done Engineering and Service Co., Ltd., built during internship at VIZ STUDIO.",
      },
      zombieEvil: {
        description: "Multiplayer zombie survival game built with Unity and Photon — players fight waves of zombies online.",
        detail: "Zombie Evil is a real-time multiplayer game built with Unity and Photon Networking. Players join online rooms and fight waves of zombies together. Developed as a student project.",
      },
      guessNumber: {
        description: "Multiplayer number guessing game built with Unity and Photon Networking.",
        detail: "A real-time multiplayer number guessing game using Unity and Photon. Players compete online to guess the correct number.",
      },
      ellenRaider: {
        description: "2D action platformer game built with Unity — a student project featuring a female protagonist.",
        detail: "Ellen Raider is a 2D action platformer developed with Unity as a student project. Features a female protagonist fighting through levels.",
      },
      eclipse: {
        description: "2D game developed with Unity in 2021 as a student project.",
        detail: "Eclipse is a 2D game developed with Unity in 2021 during my undergraduate studies at Rangsit University.",
      },
      adventureIsland: {
        description: "Remake of the classic Adventure Island game, built with Unity in 2020 as a student project.",
        detail: "A Unity remake of the classic Adventure Island game, developed as a student project in 2020 during undergraduate studies.",
      },
      intoZombieland: {
        description: "2D zombie survival game built with Unity — an early student project from undergraduate studies.",
        detail: "Into The Zombieland is an early 2D Unity game created during undergraduate studies at Rangsit University.",
      },
      jaspal: {
        description: "Instagram AR filter for Jaspal × Orla Kiely fashion collaboration — created with Spark AR.",
        detail: "An Instagram AR filter created for the Jaspal × Orla Kiely fashion collaboration using Spark AR Studio. The filter lets users try on the collection virtually.",
      },
      lazada10years: {
        description: "Instagram AR filter for Lazada's 10th anniversary campaign — created with Spark AR.",
        detail: "A celebratory AR filter for Lazada's 10th anniversary (#10YearsWithLazada) built with Spark AR Studio for use on Instagram and Facebook.",
      },
      ccooDisney: {
        description: "TikTok AR filter for CC-OO × Disney collaboration — created with Spark AR.",
        detail: "An AR filter for the CC-OO × Disney collaboration, built with Spark AR Studio and deployed on TikTok and Instagram.",
      },
      durexPride: {
        description: "Instagram AR filter for Durex's Come with Pride campaign — celebrating Pride Month.",
        detail: "A Pride Month AR filter created for Durex Thailand's Come with Pride campaign using Spark AR Studio. Deployed on Instagram.",
      },
      fifaQatar: {
        description: "Instagram AR filter for FIFA World Cup Qatar 2022 — a face filter to guess the match result.",
        detail: "An AR filter for the FIFA World Cup Qatar 2022, letting users guess match results via a fun face-tracking effect built with Spark AR.",
      },
      chadchartDance: {
        description: "Viral TikTok AR dance filter for Chadchart Sittipunt's Bangkok gubernatorial campaign.",
        detail: "A viral AR dance filter created for Chadchart Sittipunt's Bangkok governor campaign. Users could overlay their face and dance along. Built with Spark AR.",
      },
      chadchartMask: {
        description: "Instagram AR mask filter for Chadchart Sittipunt's Bangkok gubernatorial campaign.",
        detail: "An Instagram AR mask filter for Chadchart Sittipunt's governor campaign. Built with Spark AR Studio.",
      },
      portfolio3d: {
        description: "Experimental 3D portfolio website built with Three.js and WebGL — beta version from 2023.",
        detail: "An experimental 3D interactive portfolio built with Three.js and WebGL as a creative exploration in 2023.",
      },
      covid19: {
        description: "2D animation video about COVID-19 prevention — created as a student project in 2020.",
        detail: "A 2D animated short film about COVID-19 prevention measures, created as a student project during undergraduate studies.",
      },
    },
  },
  skills: {
    label: "Tech Stack",
    title: "Skills",
    subtitle: "Technologies and tools I work with regularly",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      mobileDesktop: "Mobile & Desktop",
      aiCreative: "AI & Creative",
      dataCloud: "Data & Cloud",
      tools: "Tools",
    },
  },
  education: {
    label: "Background",
    title: "Education",
    subtitle: "Academic foundation and language certifications",
    universityLabel: "University",
    universityName: "Rangsit University, Bangkok",
    certsLabel: "Certifications",
    certsTitle: "Language & Proficiency",
    items: [
      {
        institution: "Rangsit University",
        degree: "Master of Science",
        field: "Management Information Systems (MIS)",
        period: "2022 – 2024",
        highlights: [
          "Graduate research in information systems",
          "Focus on enterprise software architecture",
        ],
      },
      {
        institution: "Rangsit University",
        degree: "Bachelor of Science",
        field: "Information Technology",
        period: "2018 – 2022",
        highlights: [
          "Graduated with honors",
          "Specialized in software engineering & game development",
        ],
      },
    ],
    certifications: [
      {
        name: "RSU-PET B2",
        framework: "CEFR",
        issuer: "Rangsit University",
        description: "English Proficiency — Upper Intermediate",
        year: "2023",
      },
    ],
  },
  contact: {
    label: "Get in Touch",
    title: "Let's work together",
    subtitle:
      "I'm currently open to new opportunities. Whether you have a project in mind or just want to say hi — my inbox is always open.",
    location: "Bangkok, Thailand",
  },
  footer: {
    built: "Built with Vite 8 · React · Tailwind CSS",
  },
} as const;

export default en;
