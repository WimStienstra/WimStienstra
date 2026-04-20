# Step 02 — Content Layer

## Objective
Populate all JSON content files in `src/content/` with Wim's real data. This is the single source of truth for every section. Any future content update is done by editing these files only.

---

## Files to Create / Fill

### `src/content/meta.json`
Global site metadata.

```json
{
  "name": "Wim Stienstra",
  "title": "Frontend Developer",
  "taglines": [
    "Angular Monorepo Architect",
    "AI-Assisted Developer",
    "UX & Frontend Engineering"
  ],
  "email": "w.j.stienstra@hotmail.com",
  "linkedin": "https://www.linkedin.com/in/wimstienstra",
  "github": "https://github.com/WimStienstra",
  "location": "Leeuwarden, Friesland, Netherlands",
  "cvUrl": "/assets/cv-wim-stienstra.pdf",
  "about": "Frontend developer with a focus on scalable architecture, user-friendly interfaces, and future-proof solutions. I work at the CJIB on an Angular monorepo platform (EXPO) that unifies new and legacy systems. I care deeply about engineering, structure, and UX working in harmony. I actively explore AI-assisted development — not as a shortcut, but as a tool that requires intentional and skilled use.",
  "avatarUrl": "/assets/avatar.jpg"
}
```

---

### `src/content/experience.json`
Array of work experience entries, newest first. Each entry can optionally include an `imageUrl` (a screenshot, logo, or relevant photo placed in `public/assets/experience/`).

```json
[
  {
    "id": "cjib-frontend",
    "company": "Centraal Justitieel Incassobureau (CJIB)",
    "role": "Frontend Web Developer",
    "period": "Sep 2025 – Present",
    "location": "Leeuwarden, Netherlands",
    "tags": ["Angular", "Monorepo", "TypeScript"],
    "imageUrl": "/assets/experience/cjib.jpg",
    "description": "Joined an innovative frontend team building EXPO — an Angular-based monorepo platform within the Enforcement domain that brings multiple applications together into a single web application. The team operates at the cutting edge of CJIB technology, introducing new tools and practices with a forward-thinking engineering approach."
  },
  {
    "id": "cjib-fullstack",
    "company": "Centraal Justitieel Incassobureau (CJIB)",
    "role": "Full Stack Developer",
    "period": "Sep 2024 – Sep 2025",
    "location": "Leeuwarden, Netherlands",
    "tags": ["Angular", "NX", "Playwright", "Jest", "Java"],
    "imageUrl": "",
    "description": "Modernised the frontend of team Zalm's case-processing application: upgraded Angular 14 → 20, migrated to NX monorepo, redesigned multiple screens, replaced Cucumber → Playwright for E2E and Karma → Jest for unit tests. Backend work included Java microservice maintenance and model improvements."
  },
  {
    "id": "cjib-intern",
    "company": "Centraal Justitieel Incassobureau (CJIB)",
    "role": "Graduate Intern — Frontend Developer",
    "period": "Feb 2024 – Sep 2024",
    "location": "Leeuwarden, Netherlands",
    "tags": ["Angular", "NX", "Domain-Driven Design", "Monorepo"],
    "imageUrl": "",
    "description": "Re-architected the Digitaal Loket Verkeer for the Openbaar Ministerie. Chose an NX monorepo with domain-driven design to support future OM applications. Delivered a proof of concept with redesigned pages, enthusiastically received by the continuation team."
  },
  {
    "id": "chipsoft",
    "company": "ChipSoft",
    "role": "Intern Frontend Developer",
    "period": "Feb 2023 – Jul 2023",
    "location": "Netherlands",
    "tags": ["C# .NET", "Healthcare IT", "UX Research"],
    "imageUrl": "",
    "description": "Designed and built a new management page inside the consult module of HiX (a comprehensive healthcare information system). Conducted user research with consultants and a physician. Used ChipSoft's in-house .NET 6.0 framework."
  },
  {
    "id": "jip",
    "company": "JIP B.V.",
    "role": "Junior Developer",
    "period": "Aug 2019 – Aug 2020",
    "location": "Netherlands",
    "tags": ["Google Dialogflow", "Google Assistant", "Bot-Human Hybrid", ".NET Core"],
    "imageUrl": "/assets/experience/jip-snel.jpg",
    "description": "Updated internal apps to .NET Core and led a side project building 'Jip Snel' — a hybrid AI chatbot using Google Dialogflow and Google Assistant, with a human operator takeover system via a third-party frontend."
  },
  {
    "id": "imagineers",
    "company": "The Imagineers Holland",
    "role": "Intern Frontend Developer",
    "period": "Feb 2019 – Jul 2019",
    "location": "Netherlands",
    "tags": ["React.js", "GraphQL"],
    "imageUrl": "",
    "description": "Built the 'Dreamcatcher' proof-of-concept module for SEP 2.0 — a platform where residents can share opinions about local changes. Developed with React.js and GraphQL."
  },
  {
    "id": "comecer",
    "company": "Comecer",
    "role": "Intern Full Stack Developer",
    "period": "Sep 2017 – Feb 2018",
    "location": "Netherlands",
    "tags": ["Angular", "Node.js", "Firebird"],
    "imageUrl": "",
    "description": "Created the 'IBC Dashboard' from scratch — a real-time overview of Comecer's data systems. Independently chose Angular for the frontend and Node.js for the backend, connecting to the existing Firebird database."
  }
]
```

> **Image placement:** Drop any experience screenshots or company photos into `public/assets/experience/` and set the filename in `imageUrl`. Entries with an empty `imageUrl` simply render without an image.

---

### `src/content/projects.json`
Highlighted projects for the Projects section.

```json
[
  {
    "id": "expo-monorepo",
    "title": "EXPO — Angular Monorepo Platform",
    "description": "Angular-based monorepo platform at the CJIB unifying enforcement applications and legacy systems into a single web application. Focus on scalability, consistency, and long-term maintainability.",
    "tags": ["Angular", "NX", "TypeScript", "Monorepo"],
    "type": "Professional",
    "imageUrl": "",
    "featured": true
  },
  {
    "id": "digitaal-loket",
    "title": "Digitaal Loket Verkeer — Rearchitecture",
    "description": "Re-architecture of the Openbaar Ministerie's traffic portal: introduced NX monorepo and domain-driven design, reducing legacy coupling and enabling future OM application integration.",
    "tags": ["Angular", "NX", "Domain-Driven Design"],
    "type": "Professional",
    "imageUrl": "",
    "featured": true
  },
  {
    "id": "jip-snel",
    "title": "Jip Snel — Hybrid AI Chatbot",
    "description": "A Friday-afternoon project turned working prototype: a Google Dialogflow + Google Assistant chatbot with a live human operator handover system via a third-party frontend.",
    "tags": ["Google Dialogflow", "Google Assistant", "Bot-Human Hybrid"],
    "type": "Personal",
    "imageUrl": "/assets/experience/jip-snel.jpg",
    "featured": true
  },
  {
    "id": "game-jam",
    "title": "The Shadow of What I Once Was",
    "description": "Pirate Software Game Jam 15 entry. A game built under time pressure, exploring game development as a creative outlet.",
    "tags": ["Godot", "GDScript", "Pixel Art", "Game Dev"],
    "type": "Personal",
    "imageUrl": "/assets/hobbies/game-jam-screenshot.jpg",
    "featured": false
  },
  {
    "id": "ibc-dashboard",
    "title": "IBC Dashboard",
    "description": "A real-time data overview dashboard for Comecer, independently designed and built with Angular + Node.js using the existing Firebird database.",
    "tags": ["Angular", "Node.js", "Firebird"],
    "type": "Professional",
    "imageUrl": "",
    "featured": false
  },
  {
    "id": "quiz-museum",
    "title": "Quiz Modelspoorwegmuseum",
    "description": "Interactive quiz application built for a Dutch model railway museum as a study project.",
    "tags": ["Web Development"],
    "type": "Study",
    "imageUrl": "",
    "featured": false
  }
]
```

---

### `src/content/skills.json`
Skills grouped by category, with an optional proficiency level (1–5) and an optional `imageUrl` for each **category** (e.g., a collage or icon set screenshot in `public/assets/skills/`).

```json
{
  "core": {
    "imageUrl": "/assets/skills/angular-stack.png",
    "items": [
      { "name": "Angular", "level": 5 },
      { "name": "TypeScript", "level": 5 },
      { "name": "NX Monorepo", "level": 5 },
      { "name": "RxJS", "level": 4 }
    ]
  },
  "testing": {
    "imageUrl": "",
    "items": [
      { "name": "Playwright", "level": 5 },
      { "name": "Jest", "level": 4 },
      { "name": "Cypress", "level": 3 }
    ]
  },
  "ecosystem": {
    "imageUrl": "",
    "items": [
      { "name": "React.js", "level": 3 },
      { "name": "Node.js", "level": 3 },
      { "name": "GraphQL", "level": 3 },
      { "name": "Spring Boot / Java", "level": 2 }
    ]
  },
  "tooling": {
    "imageUrl": "",
    "items": [
      { "name": "Git", "level": 5 },
      { "name": "GitHub Actions / CI-CD", "level": 4 },
      { "name": "Docker", "level": 3 }
    ]
  },
  "ai": {
    "imageUrl": "/assets/skills/ai-tools.png",
    "items": [
      { "name": "AI-Assisted Coding", "level": 5 },
      { "name": "Structured Prompting", "level": 4 },
      { "name": "MCP / Agent Workflows", "level": 4 },
      { "name": "Google Dialogflow", "level": 3 }
    ]
  },
  "soft": {
    "imageUrl": "",
    "items": [
      { "name": "Scrum / PSM I", "level": 5 },
      { "name": "UX Thinking", "level": 4 },
      { "name": "Technical Documentation", "level": 4 }
    ]
  }
}
```

> **Note on the skills schema change:** Each category is now an object with `imageUrl` and `items` (array of skills) instead of a plain array. All components reading this file must access `skills[category].items` instead of `skills[category]`.

---

### `src/content/hobbies.json`
Hobbies grouped by category. Each hobby has a title, description, and an array of `media` items (images or videos from `public/assets/hobbies/`).

```json
[
  {
    "id": "game-mods",
    "title": "Game Modding",
    "icon": "🎮",
    "description": "I create mods for games I love. From quality-of-life tweaks to larger content additions — modding scratches the same engineering itch as software development, but with immediate creative payoff.",
    "media": [
      {
        "type": "image",
        "url": "/assets/hobbies/rimworld-mod-1.jpg",
        "caption": "RimWorld mod — custom colonist behaviour system"
      },
      {
        "type": "image",
        "url": "/assets/hobbies/rimworld-mod-2.jpg",
        "caption": "RimWorld mod — UI redesign"
      },
      {
        "type": "image",
        "url": "/assets/hobbies/blade-sorcery-mod-1.jpg",
        "caption": "Blade & Sorcery — custom weapon mod"
      }
    ],
    "links": [
      { "label": "Nexus Mods Profile", "url": "https://www.nexusmods.com/users/YOUR_ID" }
    ]
  },
  {
    "id": "drone",
    "title": "Drone Flying & Videography",
    "icon": "🚁",
    "description": "I hold a ROC Light drone licence (EuroUSC). I fly and edit cinematic drone footage of Frisian landscapes, travel destinations, and aerial photography. Patience, precision, and a good eye for composition translate directly into my UX work.",
    "media": [
      {
        "type": "image",
        "url": "/assets/hobbies/drone-friesland-1.jpg",
        "caption": "Aerial view of the Frisian lakes"
      },
      {
        "type": "image",
        "url": "/assets/hobbies/drone-travel-1.jpg",
        "caption": "Travel vlog footage — mountains"
      },
      {
        "type": "video",
        "url": "/assets/hobbies/drone-reel.mp4",
        "poster": "/assets/hobbies/drone-reel-poster.jpg",
        "caption": "Drone reel 2024"
      }
    ],
    "links": []
  },
  {
    "id": "music",
    "title": "Music Production",
    "icon": "🎵",
    "description": "I produce electronic music as a creative outlet — arranging, sound design, and mixing. Like coding, it's about building something layered and coherent from individual parts.",
    "media": [
      {
        "type": "image",
        "url": "/assets/hobbies/music-studio.jpg",
        "caption": "Home studio setup"
      }
    ],
    "links": []
  },
  {
    "id": "game-dev",
    "title": "Game Development",
    "icon": "👾",
    "description": "I make games in Godot with GDScript, exploring pixel art and mechanics design. My Pirate Software Game Jam 15 entry 'The Shadow of What I Once Was' was built solo under a 72-hour deadline.",
    "media": [
      {
        "type": "image",
        "url": "/assets/hobbies/game-jam-screenshot.jpg",
        "caption": "The Shadow of What I Once Was — Game Jam 15 entry"
      }
    ],
    "links": [
      { "label": "Game Jam Entry", "url": "https://itch.io/YOUR_ENTRY" }
    ]
  }
]
```

> **Media placement:** Drop images into `public/assets/hobbies/` and update the `url` fields. For drone videos, short MP4 clips work well; use a `poster` image for the video thumbnail. Empty `media` arrays simply render no gallery.

---

## How Content Updates Work (for Wim)
- Open the relevant `.json` file in `src/content/` on GitHub or in VS Code
- Edit the data directly (e.g., add a new project, update a job description)
- Drop any new images/videos into the relevant `public/assets/<section>/` folder
- Save and commit → GitHub Actions rebuilds and deploys automatically

---

## Acceptance Criteria
- [ ] All five JSON files exist and contain Wim's real data
- [ ] Each file is valid JSON (parseable with `JSON.parse`)
- [ ] `experience.json` has an `imageUrl` field (empty string or path) on every entry
- [ ] `skills.json` uses the `{ imageUrl, items }` object structure per category
- [ ] `hobbies.json` has at least 4 hobby categories with media arrays
- [ ] At least 3 projects are marked `"featured": true`
