// Each case study renders as a card that expands in place ("folio").
// Add/remove entries here — no layout code needs to change.

export const caseStudies = [
  {
    id: "navsense",
    number: "01",
    tag: "EMBEDDED SYSTEMS / ROBOTICS",
    title: "NavSense — Wearable Navigation for the Visually Impaired",
    summary:
      "A wearable device fusing LiDAR, IMU, and edge AI to guide visually impaired users in real time, through haptic and bilingual audio feedback.",
    stack: ["Raspberry Pi 5", "Hailo-8 AI HAT", "YDLiDAR SDM18", "BNO055 IMU", "KiCad"],
    status: "Prototype demo complete | Final Year Project",
    body: [
      "NavSense addresses a specific gap: existing assistive navigation tools are either too coarse (a white cane) or too dependent on constant connectivity. NavSense runs its perception pipeline entirely on-device, so it keeps working the moment it matters most.",
      "The current iteration (v2) pairs a YDLiDAR SDM18 and BNO055 IMU for spatial sensing with a Hailo-8 AI HAT for on-device inference, and drives feedback through bone-conduction haptics — leaving the ears free to hear the environment.",
    ],
    highlights: [
      "Semantic node mapping with a tiered vision pipeline for real-time scene understanding",
      "Graceful degradation when a sensor drops out, rather than a hard failure",
      "Bilingual (English/Setswana) guidance templates",
      "Full KiCad schematic documentation for the hardware layer",
      "Reached a working end-to-end prototype demo — the project's first major milestone",
    ],
  },
  {
    id: "phantom-banking",
    number: "02",
    tag: "BACKEND & SYSTEMS INTEGRATION",
    title: "Phantom Banking — Banking-as-a-Service Platform",
    summary:
      "A BaaS platform built for the FNB Hackathon, letting businesses spin up sub-accounts and wallets for every customer — including the unbanked — under their own FNB merchant profile.",
    stack: ["Django", "Django REST Framework", "PostgreSQL", "React (Vite)", "Docusaurus"],
    status: "FNB Hackathon",
    body: [
      "Phantom Banking lets a business serve customers who don't have a formal bank account, by issuing them a wallet under the business's own FNB merchant profile — with an optional KYC path to upgrade into a full account later.",
      "As lead backend developer and integrator, the work centered on wallet logic and backend orchestration: making sure a wallet spawned correctly, stayed reconciled against the merchant profile, and could accept payment through multiple rails without leaking state between customers.",
    ],
    highlights: [
      "Wallets accept QR, EFT, and other payment methods, with optional KYC upgrade to a full account",
      "Backend built on Django + DRF + PostgreSQL, with a React/Vite + Tailwind frontend",
      "API documented with Swagger/Postman; workflows mapped in BPMN, Camunda-ready",
      "Team shortlisted as one of the top 10 teams at the FNB Hackathon",
    ],
  },
  {
    id: "rl-pong",
    number: "03",
    tag: "MACHINE LEARNING / SIMULATION",
    title: "RL Pong — Reinforcement Learning Arcade",
    summary:
      "A modular reinforcement-learning project where agents learn to play Pong from scratch, wrapped in a full interactive game experience rather than a bare training script.",
    stack: ["Python", "Pygame", "Gymnasium", "PPO", "DQN"],
    status: "Active project",
    body: [
      "Most RL demos stop at a training curve. RL Pong keeps the game itself as a first-class citizen: a custom Pygame implementation wrapped as a Gymnasium-compatible environment, with an interactive menu system, timed match modes, and a real win screen.",
      "The environment supports both low-dimensional and pixel-based observation spaces, so the same game can train and compare multiple algorithms — PPO, DQN, and others — under consistent conditions.",
    ],
    highlights: [
      "Custom Gymnasium-compatible Pong environment, low-dim and pixel observation modes",
      "Training, evaluation, and analysis scripts — benchmarking, training-curve plots, video generation",
      "Interactive menu with time-based match modes and a color-coded real-time timer",
      "Full test suite alongside the training pipeline",
    ],
  },
];
