/**
 * Vaddi's Ramen — Interactive 3D Portfolio
 * Rohit Vaddi · Robotics Software Engineer
 * Three.js ramen shop scene
 */

// ═══════════════════════════════════════════
//  RESUME SECTIONS
// ═══════════════════════════════════════════
const SECTIONS = {
  about: {
    stamp: 'ABOUT',
    jp: '自己紹介',
    title: 'Rohit Vaddi',
    sub: 'Senior Robotics Software Engineer · Anaheim, CA',
    items: [
      '6+ years building production-grade automation frameworks for mechatronic systems',
      'Proficient in Python & C++ · Hardware interfaces · Motion coordination',
      'Digital-twin simulations in Gazebo · Calibration tools that accelerate bring-up by 30%',
      'rohitvaddi96@gmail.com · +1 (480) 302-0445',
      'linkedin.com/in/rohit-vaddi-141096 · github.com/thatVaddiguy',
    ],
    tech: [],
  },
  work: {
    stamp: 'EXPERIENCE',
    jp: '職歴',
    title: 'Work Experience',
    sub: '6+ years across robotics, automation & full-stack engineering',
    sections: [
      {
        label: 'Berkshire Grey · Boston, MA · Nov 2023 – Present',
        role: 'Senior Robotics Support Engineer',
        items: [
          'Reduced customer faults from 12 → 3/month via optimized error-handling',
          'RAG-based AI chatbot with CLIP/Vision Transformers for part identification',
          'Python & ROS diagnostic scripts → 40% faster troubleshooting (5 hrs → 3 hrs)',
          'AI assistant on error logs cut incident resolution by 20%',
          'Slack bot (Bolt + OpenAI API) for site-specific engineer guides',
          'ROS digital twins in Gazebo for pre-deployment motion validation',
        ],
        tech: ['Python','ROS','OpenAI API','Langchain','HuggingFace','Pinecone','Kubernetes','Kibana','Gazebo'],
      },
      {
        label: 'Knightscope · Mountain View, CA · Jun 2022 – Jan 2023',
        role: 'Robotics Software Engineer',
        items: [
          'End-to-end video streaming pipeline for autonomous security robots',
          'Docker + Ansible deployment across 10+ robots — 100% config consistency',
          'GStreamer optimized to sub-100ms latency',
          'TensorFlow/OpenCV license-plate detection — 85% parking-lot accuracy',
        ],
        tech: ['Python','GStreamer','Docker','Ansible','TensorFlow','OpenCV','Nimble Streamer'],
      },
      {
        label: 'ABInfoTechnologies · Santa Clarita, CA · Apr – Nov 2023',
        role: 'Senior Python Engineer',
        items: [
          'Full-stack Django + React.js web modules with AWS S3 integration',
          'Pandas time-series data manipulation stored in MongoDB',
        ],
        tech: ['Python','Django','React.js','AWS S3','MongoDB','Pandas'],
      },
      {
        label: 'Astir IT Solutions · New Jersey · Jan – Jun 2022',
        role: 'Python Full Stack Developer',
        items: [
          'Healthcare employee management app: Django + React + MongoDB',
          'AWS serverless: EC2, S3, Lambda, API Gateway',
          'Scalable microservices with Docker & Kubernetes',
        ],
        tech: ['Python','Django','React','AWS','Docker','Kubernetes'],
      },
    ],
  },
  projects: {
    stamp: 'PROJECTS',
    jp: 'プロジェクト',
    title: 'Selected Projects',
    sub: 'Robotics simulations, AI systems & automation tools',
    sections: [
      {
        label: 'Multi-Robot Search · Jun 2022',
        role: 'Cooperative Exploration System',
        items: [
          '3 robots in Webots performing cooperative environment exploration',
          'Flask-based server for cooperative-perception sharing between robots',
          'Collaborative object detection — all agents notified on completion',
        ],
        tech: ['Python','Webots','Flask','ROS'],
      },
      {
        label: '6-DOF Pick & Place Robot · Aug 2019',
        role: 'Robotic Arm Simulation',
        items: [
          'Kinematic chain in ROS + Gazebo replicating human-arm motions',
          'Inverse kinematics algorithms for real-time servo position control',
          'C# GUI for joystick-style robotic arm control with live IK solving',
        ],
        tech: ['ROS','Gazebo','C#','Python','Inverse Kinematics'],
      },
      {
        label: 'Nest Smart Home Chatbot · Jan 2018',
        role: 'Intelligent Home Automation',
        items: [
          'Smart home chatbot using Nest Neuron LLM framework',
          'Google Home API integration; tested with Home Mini + Philips lights',
          'React.js frontend for natural-language command interface',
        ],
        tech: ['Python','Nest Neuron LLM','Google Home API','JavaScript','React.js'],
      },
    ],
  },
  education: {
    stamp: 'EDUCATION',
    jp: '学歴',
    title: 'Education',
    sub: 'Robotics, autonomous systems & information technology',
    sections: [
      {
        label: 'Arizona State University · Dec 2021',
        role: 'M.S. Robotics & Autonomous Systems',
        items: ['Control Systems','Robotic Dynamics & Kinematics','Real-Time Embedded Systems','Digital Twin Simulation'],
        tech: [],
      },
      {
        label: 'Middlesex University · Dec 2019',
        role: 'B.S. Information Technology',
        items: ['Software engineering, networking, and information systems'],
        tech: [],
      },
    ],
  },
  skills: {
    stamp: 'SKILLS',
    jp: '技術',
    title: 'Technical Skills',
    sub: 'Robotics, AI/ML, cloud infrastructure & full-stack development',
    items: [],
    tech: ['Python','C++','ROS','Gazebo','Webots','Docker','Kubernetes','Ansible','AWS','Django','React.js','MongoDB','PostgreSQL','TensorFlow','PyTorch','OpenCV','Langchain','OpenAI API','RAG','Pinecone','HuggingFace','GStreamer','Kibana','Git','SolidWorks','Arduino','Raspberry Pi','CMake','Agentic AI','CLIP','Motion Control','Camera Calibration','Nimble Streamer'],
  },
};

// ═══════════════════════════════════════════
//  RENDERER / SCENE / CAMERA
// ═══════════════════════════════════════════
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.6;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a1408);
scene.fog = new THREE.Fog(0x2a1408, 12, 35);

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.05, 60);
camera.position.set(0, 4.1, 10);
const CAM_BASE = camera.position.clone();
const lookTarget = new THREE.Vector3(0, 2.9, -0.5);
camera.lookAt(lookTarget);

window.addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

// ═══════════════════════════════════════════
//  TEXTURE GENERATORS
// ═══════════════════════════════════════════
function mkCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function woodTex(w = 1024, h = 512, base = '#2b1008', grain = '#3d1a0a') {
  const c = mkCanvas(w, h);
  const ctx = c.getContext('2d');
  const baseC = new THREE.Color(base);
  const grainC = new THREE.Color(grain);

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 80; i++) {
    const y = Math.random() * h;
    const t = Math.random();
    const r = Math.round((baseC.r + (grainC.r - baseC.r) * t) * 255);
    const g = Math.round((baseC.g + (grainC.g - baseC.g) * t) * 255);
    const b = Math.round((baseC.b + (grainC.b - baseC.b) * t) * 255);
    ctx.strokeStyle = `rgba(${r},${g},${b},${0.3 + t * 0.4})`;
    ctx.lineWidth = 0.5 + Math.random() * 2.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    let px = 0;
    while (px < w) {
      px += 20 + Math.random() * 40;
      ctx.lineTo(px, y + (Math.random() - 0.5) * 6);
    }
    ctx.stroke();
  }

  for (let i = 0; i < 3; i++) {
    const kx = Math.random() * w;
    const ky = Math.random() * h;
    for (let r = 12; r > 0; r -= 2) {
      ctx.beginPath();
      ctx.ellipse(kx, ky, r, r * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(20,6,2,${0.08 * r / 12})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function wallTex() {
  const c = mkCanvas(512, 512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c4906a';
  ctx.fillRect(0, 0, 512, 512);
  for (let x = 0; x < 512; x += 64) {
    ctx.fillStyle = 'rgba(80,30,10,0.25)';
    ctx.fillRect(x, 0, 1, 512);
  }
  for (let y = 0; y < 512; y += 96) {
    ctx.fillStyle = 'rgba(40,18,8,0.15)';
    ctx.fillRect(0, y, 512, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function menuBoardTex() {
  const c = mkCanvas(800, 560);
  const ctx = c.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, 0, 560);
  bg.addColorStop(0, '#0f0904');
  bg.addColorStop(1, '#0c0702');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 800, 560);

  ctx.strokeStyle = '#3a1c08';
  ctx.lineWidth = 18;
  ctx.strokeRect(9, 9, 782, 542);
  ctx.strokeStyle = '#4e2810';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, 764, 524);

  ctx.font = 'bold 38px "Noto Serif JP", serif';
  ctx.fillStyle = '#e8c050';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(232,192,80,0.3)';
  ctx.shadowBlur = 8;
  ctx.fillText('ヴァッディのラーメン', 400, 68);
  ctx.shadowBlur = 0;

  ctx.font = '18px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(232,192,80,0.4)';
  ctx.fillText("VADDI'S RAMEN  ·  PORTFOLIO", 400, 96);

  ctx.strokeStyle = 'rgba(232,192,80,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(50, 114); ctx.lineTo(750, 114); ctx.stroke();

  const items = [
    { jp: '本日のスペシャル', en: "CHEF'S SPECIAL", note: 'About & Contact', mark: '★', color: '#e8c050' },
    { jp: '特製チャーシュー麺', en: 'WORK EXPERIENCE', note: 'Berkshire Grey · Knightscope · More', mark: '●', color: '#ff9944' },
    { jp: '創作ラーメン', en: 'PROJECTS', note: 'Multi-Robot · 6-DOF · Chatbot', mark: '◆', color: '#44ccaa' },
    { jp: '学びの一杯', en: 'EDUCATION', note: 'ASU M.S. · Middlesex B.S.', mark: '▲', color: '#cc88ff' },
    { jp: '素材へのこだわり', en: 'SKILLS', note: 'Python · ROS · AI/ML · Cloud · More', mark: '◉', color: '#ff6644' },
  ];

  items.forEach((item, i) => {
    const y = 148 + i * 78;
    ctx.textAlign = 'left';
    ctx.font = 'bold 22px "Noto Serif JP", serif';
    ctx.fillStyle = item.color;
    ctx.fillText(item.jp, 60, y);

    ctx.font = '600 15px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(240,220,180,0.8)';
    ctx.fillText(item.en, 60, y + 24);

    ctx.font = '12px "Space Grotesk", sans-serif';
    ctx.fillStyle = 'rgba(200,170,120,0.4)';
    ctx.fillText(item.note, 60, y + 42);

    ctx.textAlign = 'right';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.fillStyle = item.color;
    ctx.shadowColor = item.color;
    ctx.shadowBlur = 6;
    ctx.fillText(item.mark, 748, y + 14);
    ctx.shadowBlur = 0;

    if (i < items.length - 1) {
      ctx.strokeStyle = 'rgba(232,192,80,0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(50, y + 58); ctx.lineTo(750, y + 58); ctx.stroke();
    }
  });

  return new THREE.CanvasTexture(c);
}

function norenTex(chars, color = '#1a237e') {
  const c = mkCanvas(256, 512);
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, color);
  grad.addColorStop(1, '#0d1440');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 512);

  ctx.globalAlpha = 0.04;
  for (let y = 0; y < 512; y += 6) {
    ctx.fillStyle = y % 12 === 0 ? '#ffffff' : '#000000';
    ctx.fillRect(0, y, 256, 3);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#e8dcc0';
  ctx.fillRect(0, 0, 256, 22);

  ctx.strokeStyle = 'rgba(232,220,192,0.25)';
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 24, 244, 478);

  ctx.font = 'bold 88px "Noto Serif JP", serif';
  ctx.fillStyle = 'rgba(240,230,200,0.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  chars.split('').forEach((ch, i) => {
    ctx.fillText(ch, 128, 120 + i * 110);
  });

  ctx.fillStyle = '#e8dcc0';
  for (let x = 8; x < 248; x += 14) {
    ctx.fillRect(x, 495, 7, 12);
  }

  return new THREE.CanvasTexture(c);
}

function lanternTex() {
  const c = mkCanvas(256, 256);
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, '#ff8822');
  grad.addColorStop(0.4, '#cc2200');
  grad.addColorStop(1, '#880000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 8; i++) {
    const x = (i / 8) * 256;
    ctx.strokeStyle = 'rgba(80,0,0,0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
  }

  ctx.font = 'bold 100px "Noto Serif JP", serif';
  ctx.fillStyle = 'rgba(255,230,180,0.7)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('福', 128, 128);

  return new THREE.CanvasTexture(c);
}

function bowlTex() {
  const c = mkCanvas(256, 256);
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(128, 80, 10, 128, 128, 140);
  grad.addColorStop(0, '#f5f0e8');
  grad.addColorStop(0.6, '#e8e0d0');
  grad.addColorStop(1, '#c8bca8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(60,80,140,0.15)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(128, 128, 110 + i * 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(c);
}

function brothTex(base = '#3d1a08') {
  const c = mkCanvas(256, 256);
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 140);
  grad.addColorStop(0, '#5a2a10');
  grad.addColorStop(0.5, base);
  grad.addColorStop(1, '#200c04');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = 'rgba(180,120,40,0.08)';
  for (let i = 0; i < 8; i++) {
    const ex = 60 + Math.random() * 130;
    const ey = 60 + Math.random() * 130;
    ctx.beginPath();
    ctx.ellipse(ex, ey, 15 + Math.random() * 25, 5 + Math.random() * 10, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function namePlateTex(jpName, enName) {
  const c = mkCanvas(320, 128);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, '#3d1c08');
  g.addColorStop(1, '#2a1206');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 320, 128);
  ctx.strokeStyle = '#5a2a10';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 312, 120);

  ctx.font = 'bold 34px "Noto Serif JP", serif';
  ctx.fillStyle = '#e8c050';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(232,192,80,0.4)'; ctx.shadowBlur = 6;
  ctx.fillText(jpName, 160, 52);
  ctx.shadowBlur = 0;

  ctx.font = '500 18px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(232,192,80,0.55)';
  ctx.fillText(enName, 160, 88);

  return new THREE.CanvasTexture(c);
}

function makeWallSign(text1, text2, color) {
  const c = mkCanvas(512, 256);
  const ctx = c.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 0, 256);
  bg.addColorStop(0, '#0e0806'); bg.addColorStop(1, '#0a0604');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = color; ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 240);
  ctx.strokeStyle = `${color}44`; ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, 480, 224);
  ctx.font = 'bold 52px "Noto Serif JP", serif';
  ctx.fillStyle = color; ctx.textAlign = 'center';
  ctx.shadowColor = color; ctx.shadowBlur = 10;
  ctx.fillText(text1, 256, 98);
  ctx.shadowBlur = 0;
  ctx.font = '600 26px "Space Grotesk", sans-serif';
  ctx.fillStyle = `${color}aa`;
  ctx.fillText(text2, 256, 152);
  ctx.font = '14px "Space Grotesk", sans-serif';
  ctx.fillStyle = `${color}55`;
  ctx.fillText('▶ CLICK TO VIEW', 256, 210);
  return new THREE.CanvasTexture(c);
}

// ═══════════════════════════════════════════
//  BUILD SCENE
// ═══════════════════════════════════════════

// ── Textures ──
const T_WOOD_DARK  = woodTex(1024, 512, '#5a2e10', '#7a4020');
const T_WOOD_MED   = woodTex(1024, 512, '#7a4820', '#9a5a28');
const T_WOOD_LIGHT = woodTex(1024, 512, '#8a5428', '#a86a34');
const T_FLOOR      = woodTex(1024, 1024, '#4a2c14', '#6a3c1c');
const T_WALL       = wallTex();
const T_MENU       = menuBoardTex();
const T_LANTERN    = lanternTex();
const T_BOWL       = bowlTex();
const T_NOREN_L    = norenTex('職人', '#1a237e');
const T_NOREN_R    = norenTex('技術', '#1a3722');

T_FLOOR.repeat.set(3, 3);
T_WALL.repeat.set(4, 2);

// ── Materials ──
const M_DARK_WOOD  = new THREE.MeshStandardMaterial({ map: T_WOOD_DARK, roughness: 0.6, metalness: 0.1 });
const M_MED_WOOD   = new THREE.MeshStandardMaterial({ map: T_WOOD_MED, roughness: 0.5, metalness: 0.15 });
const M_LIGHT_WOOD = new THREE.MeshStandardMaterial({ map: T_WOOD_LIGHT, roughness: 0.45, metalness: 0.2 });
const M_FLOOR      = new THREE.MeshStandardMaterial({ map: T_FLOOR, roughness: 0.8, metalness: 0.05 });
const M_WALL       = new THREE.MeshStandardMaterial({ map: T_WALL, roughness: 0.9, metalness: 0.0 });
const M_BRASS      = new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.3, metalness: 0.9 });

// ── Room ──
const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 20), M_FLOOR);
floor.rotation.x = -Math.PI / 2;
floor.position.z = -2;
floor.receiveShadow = true;
scene.add(floor);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(24, 10), M_WALL);
backWall.position.set(0, 5, -8);
backWall.receiveShadow = true;
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), M_WALL);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-12, 5, -2);
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), M_WALL);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(12, 5, -2);
scene.add(rightWall);

const M_CEIL = new THREE.MeshStandardMaterial({ color: 0x1e0e06, roughness: 1 });
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(24, 20), M_CEIL);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(0, 9, -2);
scene.add(ceiling);

for (let x = -8; x <= 8; x += 8) {
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 20), M_DARK_WOOD);
  beam.position.set(x, 8.75, -2);
  beam.castShadow = true;
  scene.add(beam);
}

// ── Counter ──
const counterGroup = new THREE.Group();
scene.add(counterGroup);

const counterBody = new THREE.Mesh(new THREE.BoxGeometry(15, 2.8, 2.2), M_DARK_WOOD);
counterBody.position.set(0, 1.4, -1.6);
counterBody.castShadow = true;
counterBody.receiveShadow = true;
counterGroup.add(counterBody);

const counterTop = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.22, 2.6), M_MED_WOOD);
counterTop.position.set(0, 2.9, -1.5);
counterTop.castShadow = true;
counterTop.receiveShadow = true;
counterGroup.add(counterTop);

const lip = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.12, 0.06), M_LIGHT_WOOD);
lip.position.set(0, 2.82, -0.31);
counterGroup.add(lip);

const footBar = new THREE.Mesh(new THREE.BoxGeometry(14.8, 0.12, 0.12), M_BRASS);
footBar.position.set(0, 0.7, -0.35);
counterGroup.add(footBar);

const shelfBack = new THREE.Mesh(new THREE.BoxGeometry(15, 3.5, 0.15), M_DARK_WOOD);
shelfBack.position.set(0, 4.25, -4.0);
shelfBack.receiveShadow = true;
scene.add(shelfBack);

[3.2, 5.2, 7.0].forEach(y => {
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.1, 0.9), M_MED_WOOD);
  shelf.position.set(0, y, -3.65);
  shelf.castShadow = true;
  shelf.receiveShadow = true;
  scene.add(shelf);
});

// ── Sake bottles ──
const bottlePositions = [-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6];
bottlePositions.forEach((x, i) => {
  const h = 0.5 + Math.random() * 0.35;
  const r = 0.08 + Math.random() * 0.04;
  const hue = [0.04, 0.12, 0.55, 0.6, 0.08][i % 5];
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(hue, 0.6, 0.2),
    roughness: 0.1, metalness: 0.0, transparent: true, opacity: 0.75,
  });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), mat);
  body.position.set(x, 3.25 + h / 2, -3.7);
  body.castShadow = true;
  scene.add(body);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.5, r * 0.6, h * 0.3, 8), mat);
  neck.position.set(x, 3.25 + h + h * 0.15, -3.7);
  scene.add(neck);

  if (Math.random() > 0.4) {
    const lblC = mkCanvas(64, 64);
    const lctx = lblC.getContext('2d');
    lctx.fillStyle = '#f0e8d0';
    lctx.fillRect(0, 0, 64, 64);
    lctx.fillStyle = '#8b1a1a';
    lctx.font = 'bold 22px "Noto Serif JP", serif';
    lctx.textAlign = 'center'; lctx.textBaseline = 'middle';
    lctx.fillText(['酒','旨','福','愛','技'][i % 5], 32, 32);
    const lblTex = new THREE.CanvasTexture(lblC);
    const lblMat = new THREE.MeshBasicMaterial({ map: lblTex, transparent: true });
    const lbl = new THREE.Mesh(new THREE.PlaneGeometry(r * 1.8, h * 0.4), lblMat);
    lbl.position.set(x, 3.25 + h * 0.5, -3.7 + r + 0.01);
    scene.add(lbl);
  }
});

// ── Menu board ──
const menuBoard = new THREE.Mesh(
  new THREE.PlaneGeometry(6.5, 4.5),
  new THREE.MeshStandardMaterial({ map: T_MENU, roughness: 0.85, metalness: 0.0 })
);
menuBoard.position.set(0, 5.8, -7.9);
menuBoard.receiveShadow = true;
scene.add(menuBoard);

const frameMatM = new THREE.MeshStandardMaterial({ color: 0x2a1008, roughness: 0.7, metalness: 0.1 });
[
  [6.8, 0.2, 0.1, 0, 5.8, -7.85],
  [6.8, 0.2, 0.1, 0, 3.55, -7.85],
  [0.2, 4.7, 0.1, -3.4, 4.7, -7.85],
  [0.2, 4.7, 0.1, 3.4, 4.7, -7.85],
].forEach(([w, h, d, x, y, z]) => {
  const f = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), frameMatM);
  f.position.set(x, y, z);
  scene.add(f);
});

// ── Noren curtains ──
function addNoren(x, tex) {
  const norenMat = new THREE.MeshStandardMaterial({
    map: tex, roughness: 0.9, metalness: 0.0,
    side: THREE.DoubleSide, transparent: true, alphaTest: 0.01,
  });
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.1, 0.08), M_DARK_WOOD);
  topBar.position.set(x, 6.4, -7.0);
  scene.add(topBar);
  [-0.65, 0.65].forEach(ox => {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 3.8), norenMat);
    panel.position.set(x + ox, 4.6, -7.0);
    scene.add(panel);
  });
}

addNoren(-5.5, T_NOREN_L);
addNoren(5.5, T_NOREN_R);

// ── Lanterns ──
const lanternMat = new THREE.MeshStandardMaterial({
  map: T_LANTERN, roughness: 0.8, metalness: 0.0,
  emissive: new THREE.Color(0xff4400), emissiveIntensity: 0.3,
});
const lanternCapMat = new THREE.MeshStandardMaterial({ color: 0x1a0804, roughness: 0.7 });
const lanternLights = [];
const lanternGroups = [];

[[-4.5, 0], [0, 0], [4.5, 0]].forEach(([lx, lz]) => {
  const lg = new THREE.Group();
  lg.position.set(lx, 8.2, lz - 1.5);
  scene.add(lg);

  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.2, 6), M_DARK_WOOD);
  cord.position.y = -0.6;
  lg.add(cord);

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.0, 14), lanternMat);
  body.position.y = -1.7;
  lg.add(body);

  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 0.1, 12), lanternCapMat);
  topCap.position.y = -1.15;
  lg.add(topCap);

  const botCap = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.22, 0.1, 12), lanternCapMat);
  botCap.position.y = -2.25;
  lg.add(botCap);

  const ptLight = new THREE.PointLight(0xff6600, 6, 18);
  ptLight.position.set(0, -1.7, 0);
  ptLight.castShadow = true;
  ptLight.shadow.mapSize.set(512, 512);
  lg.add(ptLight);
  lanternLights.push(ptLight);
  lanternGroups.push(lg);
});

// ── Ramen Bowls ──
function makeRamenBowl(sectionId, jpName, enName, brothColor) {
  const group = new THREE.Group();
  group.userData.sectionId = sectionId;
  group.userData.interactive = true;
  group.userData.label = enName;
  group.userData.labelJp = jpName;

  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    pts.push(new THREE.Vector2(0.22 + 0.78 * Math.pow(t, 0.55), t * 0.9));
  }
  const bowlMesh = new THREE.Mesh(
    new THREE.LatheGeometry(pts, 32),
    new THREE.MeshStandardMaterial({ map: T_BOWL, roughness: 0.35, metalness: 0.05, side: THREE.DoubleSide })
  );
  bowlMesh.castShadow = true;
  group.add(bowlMesh);

  const broth = new THREE.Mesh(
    new THREE.CircleGeometry(0.95, 32),
    new THREE.MeshStandardMaterial({ map: brothTex(brothColor), roughness: 0.15, metalness: 0.2 })
  );
  broth.rotation.x = -Math.PI / 2;
  broth.position.y = 0.76;
  group.add(broth);

  for (let i = 0; i < 2; i++) {
    const pork = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.06, 10),
      new THREE.MeshStandardMaterial({ color: 0x8b3010, roughness: 0.6 })
    );
    pork.position.set((i - 0.5) * 0.55, 0.79, (Math.random() - 0.5) * 0.35);
    pork.rotation.x = 0.1;
    group.add(pork);
  }

  const nori = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.38, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x0a1a06, roughness: 0.8 })
  );
  nori.position.set(0.5, 0.96, 0.2);
  nori.rotation.z = 0.15;
  group.add(nori);

  const egg = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xf5e880, roughness: 0.5 })
  );
  egg.position.set(-0.55, 0.94, -0.1);
  egg.scale.set(1, 0.85, 1);
  group.add(egg);

  const scallionMat = new THREE.MeshStandardMaterial({ color: 0x4a8020, roughness: 0.7 });
  for (let i = 0; i < 5; i++) {
    const sc = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.04, 0.3 + Math.random() * 0.2),
      scallionMat
    );
    sc.position.set((Math.random() - 0.5) * 1.2, 0.8, (Math.random() - 0.5) * 1.2);
    sc.rotation.y = Math.random() * Math.PI;
    group.add(sc);
  }

  const glowRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.03, 8, 40),
    new THREE.MeshBasicMaterial({ color: 0xe8c050, transparent: true, opacity: 0, depthWrite: false })
  );
  glowRing.rotation.x = Math.PI / 2;
  glowRing.position.y = 0.08;
  glowRing.userData.isGlowRing = true;
  group.add(glowRing);

  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.64),
    new THREE.MeshStandardMaterial({ map: namePlateTex(jpName, enName), roughness: 0.8, transparent: true })
  );
  plate.rotation.x = -Math.PI * 0.35;
  plate.position.set(0, 0.26, 1.15);
  group.add(plate);

  return group;
}

const bowlData = [
  { id: 'about',    jp: '本日の特製',   en: "CHEF'S SPECIAL", broth: '#2a1204', x: -4.5 },
  { id: 'work',     jp: 'チャーシュー麺', en: 'WORK RAMEN',    broth: '#3d1a08', x: 0 },
  { id: 'projects', jp: '創作ラーメン',  en: 'PROJECT RAMEN', broth: '#0e2415', x: 4.5 },
];

const bowlMeshes = [];
bowlData.forEach(bd => {
  const bowl = makeRamenBowl(bd.id, bd.jp, bd.en, bd.broth);
  bowl.position.set(bd.x, 2.9, -1.9);
  scene.add(bowl);
  bowlMeshes.push(bowl);
});

// ── Wall signs (Education + Skills) ──
const eduSign = new THREE.Mesh(
  new THREE.PlaneGeometry(2.8, 1.4),
  new THREE.MeshStandardMaterial({
    map: makeWallSign('学歴', 'EDUCATION', '#cc88ff'),
    roughness: 0.8,
    emissive: new THREE.Color(0x220033), emissiveIntensity: 0.15,
  })
);
eduSign.position.set(-3.8, 3.8, -7.85);
eduSign.userData.interactive = true;
eduSign.userData.sectionId = 'education';
eduSign.userData.label = 'EDUCATION';
eduSign.userData.labelJp = '学歴';
scene.add(eduSign);

const skillsSign = new THREE.Mesh(
  new THREE.PlaneGeometry(2.8, 1.4),
  new THREE.MeshStandardMaterial({
    map: makeWallSign('技術', 'SKILLS', '#ff6644'),
    roughness: 0.8,
    emissive: new THREE.Color(0x330a00), emissiveIntensity: 0.15,
  })
);
skillsSign.position.set(3.8, 3.8, -7.85);
skillsSign.userData.interactive = true;
skillsSign.userData.sectionId = 'skills';
skillsSign.userData.label = 'SKILLS';
skillsSign.userData.labelJp = '技術';
scene.add(skillsSign);

// ── Counter decorations ──
scene.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), M_MED_WOOD), { position: new THREE.Vector3(-6.5, 3.07, -2.0) }));

const cup = new THREE.Mesh(
  new THREE.CylinderGeometry(0.12, 0.1, 0.22, 12),
  new THREE.MeshStandardMaterial({ color: 0xd4c8b4, roughness: 0.4 })
);
cup.position.set(-6.5, 3.02, -1.4);
cup.castShadow = true;
scene.add(cup);

function makeBonsai(x, z) {
  const potMat = new THREE.MeshStandardMaterial({ color: 0x6b3010, roughness: 0.7 });
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.22, 10), potMat);
  pot.position.set(x, 3.0, z);
  scene.add(pot);
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.2, 12),
    new THREE.MeshStandardMaterial({ color: 0x1a0e06, roughness: 1 }));
  soil.rotation.x = -Math.PI / 2;
  soil.position.set(x, 3.12, z);
  scene.add(soil);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.5, 6),
    new THREE.MeshStandardMaterial({ color: 0x3d1a08, roughness: 0.9 }));
  trunk.position.set(x, 3.38, z);
  scene.add(trunk);
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1a4010, roughness: 0.9 });
  [[0, 0.65, 0], [-0.12, 0.55, 0.08], [0.12, 0.55, -0.06]].forEach(([ox, oy, oz]) => {
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.14 + Math.random() * 0.06, 8, 6), foliageMat);
    f.position.set(x + ox, 3.1 + oy, z + oz);
    scene.add(f);
  });
}
makeBonsai(-6.8, -1.65);
makeBonsai(6.8, -1.65);

// ── Lighting ──
scene.add(new THREE.AmbientLight(0xffcc88, 10));
scene.add(new THREE.HemisphereLight(0xffcc66, 0x4a2810, 2.5));

const fillLight = new THREE.DirectionalLight(0xff8833, 3.0);
fillLight.position.set(2, 8, 6);
scene.add(fillLight);

const backLight = new THREE.DirectionalLight(0x0a0520, 0.3);
backLight.position.set(-4, 6, -10);
scene.add(backLight);

const counterSpot = new THREE.SpotLight(0xffdd88, 8, 12, Math.PI / 5, 0.7);
counterSpot.position.set(0, 7.5, -0.5);
counterSpot.target.position.set(0, 2.9, -1.9);
counterSpot.castShadow = true;
counterSpot.shadow.mapSize.set(1024, 1024);
scene.add(counterSpot);
scene.add(counterSpot.target);

bowlData.forEach(bd => {
  const bl = new THREE.PointLight(0xff9944, 2.5, 5);
  bl.position.set(bd.x, 4.2, -1.9);
  scene.add(bl);
});

const eduLight = new THREE.PointLight(0xcc88ff, 1.2, 5);
eduLight.position.set(-3.8, 4.5, -7.2);
scene.add(eduLight);

const skillLight = new THREE.PointLight(0xff6644, 1.2, 5);
skillLight.position.set(3.8, 4.5, -7.2);
scene.add(skillLight);

// ═══════════════════════════════════════════
//  STEAM PARTICLE SYSTEM
// ═══════════════════════════════════════════
const MAX_STEAM = 20;
const steamCanvas = mkCanvas(64, 64);
const steamCtx = steamCanvas.getContext('2d');
const sg = steamCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
sg.addColorStop(0, 'rgba(255,255,255,0.6)');
sg.addColorStop(0.5, 'rgba(255,255,255,0.15)');
sg.addColorStop(1, 'rgba(255,255,255,0)');
steamCtx.fillStyle = sg;
steamCtx.fillRect(0, 0, 64, 64);
const steamTex = new THREE.CanvasTexture(steamCanvas);

class SteamSystem {
  constructor(origin) {
    this.origin = origin.clone();
    const geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(MAX_STEAM * 3);
    this.vel = Array.from({ length: MAX_STEAM }, () => ({ x:0, y:0, z:0, age:0, life:0, alive:false, vx:0, vy:0, vz:0 }));
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.mat = new THREE.PointsMaterial({
      map: steamTex, size: 0.55, transparent: true,
      opacity: 0.25, depthWrite: false, sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(geo, this.mat);
    scene.add(this.points);
    this.timer = 0;
    for (let i = 0; i < MAX_STEAM; i++) this.pos[i * 3 + 1] = -999;
    this.points.geometry.attributes.position.needsUpdate = true;
  }

  update(dt) {
    this.timer += dt;
    if (this.timer > 0.15) {
      for (let i = 0; i < MAX_STEAM; i++) {
        if (!this.vel[i].alive) {
          const v = this.vel[i];
          v.alive = true; v.age = 0;
          v.life = 2.2 + Math.random() * 1.8;
          v.x = this.origin.x + (Math.random() - 0.5) * 0.7;
          v.y = this.origin.y;
          v.z = this.origin.z + (Math.random() - 0.5) * 0.7;
          v.vx = (Math.random() - 0.5) * 0.006;
          v.vy = 0.018 + Math.random() * 0.01;
          v.vz = (Math.random() - 0.5) * 0.006;
          break;
        }
      }
      this.timer = 0;
    }
    for (let i = 0; i < MAX_STEAM; i++) {
      const v = this.vel[i];
      if (!v.alive) { this.pos[i * 3 + 1] = -999; continue; }
      v.age += dt;
      if (v.age >= v.life) { v.alive = false; this.pos[i * 3 + 1] = -999; continue; }
      v.x += v.vx + (Math.random() - 0.5) * 0.003;
      v.y += v.vy;
      v.z += v.vz;
      this.pos[i * 3] = v.x;
      this.pos[i * 3 + 1] = v.y;
      this.pos[i * 3 + 2] = v.z;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.mat.opacity = 0.18 + Math.abs(Math.sin(Date.now() * 0.001)) * 0.12;
  }
}

const steamSystems = bowlMeshes.map(b =>
  new SteamSystem(new THREE.Vector3(b.position.x, b.position.y + 0.82, b.position.z))
);

// ═══════════════════════════════════════════
//  INTERACTION (raycasting, hover, click)
// ═══════════════════════════════════════════
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

const cursorEl    = document.getElementById('cursor');
const cursorRing  = document.getElementById('cursor-ring');
const tooltipEl   = document.getElementById('tooltip');
const tooltipEn   = document.getElementById('tooltip-en');
const tooltipJp   = document.getElementById('tooltip-jp');

window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  cursorEl.style.left   = e.clientX + 'px';
  cursorEl.style.top    = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
  tooltipEl.style.left  = e.clientX + 'px';
  tooltipEl.style.top   = e.clientY + 'px';
});

window.addEventListener('click', () => {
  if (hovered) {
    const sid = hovered.userData.sectionId;
    if (sid) openPanel(sid);
  }
});

function getInteractives() {
  const result = [];
  [...bowlMeshes, eduSign, skillsSign].forEach(item => {
    item.traverse(child => {
      if (child.isMesh && !child.userData.isGlowRing) result.push(child);
    });
  });
  return result;
}

function checkHover() {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(getInteractives(), false);

  let newHovered = null;
  if (hits.length > 0) {
    let obj = hits[0].object;
    while (obj.parent && !obj.userData.interactive) obj = obj.parent;
    if (obj.userData.interactive) newHovered = obj;
  }

  if (newHovered !== hovered) {
    if (hovered) {
      hovered.traverse(c => {
        if (c.userData.isGlowRing) c.material.opacity = 0;
        if (c.isMesh && c.material.emissive) c.material.emissiveIntensity = (c.userData._baseEmissive ?? 0);
      });
      cursorEl.classList.remove('hover');
      cursorRing.classList.remove('hover');
      tooltipEl.classList.remove('on');
    }
    hovered = newHovered;
    if (hovered) {
      hovered.traverse(c => {
        if (c.userData.isGlowRing) c.material.opacity = 0.6;
        if (c.isMesh && c.material.emissive) {
          c.userData._baseEmissive = c.material.emissiveIntensity;
          c.material.emissiveIntensity = 0.25;
        }
      });
      cursorEl.classList.add('hover');
      cursorRing.classList.add('hover');
      tooltipJp.textContent = hovered.userData.labelJp || '';
      tooltipEn.textContent = hovered.userData.label || '';
      tooltipEl.classList.add('on');
    }
  }
}

// ═══════════════════════════════════════════
//  PANEL
// ═══════════════════════════════════════════
window.closePanel = function() {
  document.getElementById('panel').classList.remove('open');
};

function openPanel(id) {
  const sec = SECTIONS[id];
  if (!sec) return;
  const inner = document.getElementById('panel-inner');

  let html = `
    <div class="p-stamp">${sec.stamp}</div>
    <div class="p-jp">${sec.jp}</div>
    <div class="p-title">${sec.title}</div>
    <div class="p-sub">${sec.sub}</div>`;

  if (sec.sections) {
    sec.sections.forEach(s => {
      html += `
        <hr class="p-rule">
        <div class="p-section-title">${s.label}</div>
        <div class="p-title" style="font-size:1.05rem;margin-bottom:6px;">${s.role}</div>
        ${s.items.map(i => `<div class="p-item"><span class="p-dot">▸</span><span>${i}</span></div>`).join('')}
        ${s.tech.length ? `<div class="p-chips">${s.tech.map(t => `<span class="p-chip">${t}</span>`).join('')}</div>` : ''}`;
    });
  } else if (sec.items && sec.items.length) {
    html += `<hr class="p-rule">`;
    html += sec.items.map(i => `<div class="p-item"><span class="p-dot">▸</span><span>${i}</span></div>`).join('');
  }

  if (sec.tech && sec.tech.length) {
    html += `<hr class="p-rule"><div class="p-chips">${sec.tech.map(t => `<span class="p-chip">${t}</span>`).join('')}</div>`;
  }

  inner.innerHTML = html;
  document.getElementById('panel').classList.add('open');
}

// ═══════════════════════════════════════════
//  MOUSE PARALLAX CAMERA
// ═══════════════════════════════════════════
const camOffset = new THREE.Vector3();

function updateCamera() {
  camOffset.x += (mouse.x * 0.55 - camOffset.x) * 0.04;
  camOffset.y += (mouse.y * 0.22 - camOffset.y) * 0.04;
  camera.position.x = CAM_BASE.x + camOffset.x;
  camera.position.y = CAM_BASE.y + camOffset.y;
  camera.lookAt(lookTarget);
}

// ═══════════════════════════════════════════
//  LOADING
// ═══════════════════════════════════════════
const loadFill = document.getElementById('lfill');
const loadEl   = document.getElementById('loading');
const nametag  = document.getElementById('nametag');
const hintEl   = document.getElementById('hint');
let sceneReady = false;

async function doLoad() {
  for (let p = 0; p <= 100; p += Math.random() * 7 + 4) {
    loadFill.style.width = Math.min(p, 100) + '%';
    await new Promise(r => setTimeout(r, 55 + Math.random() * 50));
  }
  loadFill.style.width = '100%';
  await new Promise(r => setTimeout(r, 500));
  loadEl.classList.add('out');
  setTimeout(() => {
    loadEl.style.display = 'none';
    nametag.classList.add('on');
    hintEl.classList.add('on');
    sceneReady = true;
  }, 1500);
}
doLoad();

// ═══════════════════════════════════════════
//  ANIMATION LOOP
// ═══════════════════════════════════════════
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  steamSystems.forEach(s => s.update(dt));

  lanternGroups.forEach((lg, i) => {
    lg.rotation.z = Math.sin(t * 0.5 + i * 1.2) * 0.03;
    lg.rotation.x = Math.sin(t * 0.38 + i) * 0.015;
  });
  lanternLights.forEach((l, i) => {
    l.intensity = 5.8 + Math.sin(t * 4.5 + i * 2.1) * 0.4 + Math.sin(t * 11 + i) * 0.2;
  });

  if (hovered) {
    hovered.traverse(c => {
      if (c.userData.isGlowRing) c.material.opacity = 0.4 + Math.sin(t * 5) * 0.2;
    });
  }

  eduSign.material.emissiveIntensity   = 0.12 + Math.sin(t * 2) * 0.05;
  skillsSign.material.emissiveIntensity = 0.12 + Math.sin(t * 2.3 + 1) * 0.05;

  if (sceneReady) {
    updateCamera();
    checkHover();
  }

  renderer.render(scene, camera);
}

animate();
