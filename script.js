/* ============================================================
   CYBERPUNK GAMIFIED PORTFOLIO — script.js
   Michael Angelo Fernandez
   ============================================================ */

'use strict';

const DATA = {
    education: [
        { 
            title: 'BS Information Technology', 
            sub: 'New Era University', 
            date: '2021 – Present', 
            desc: 'Specializing in UI/UX Design and Full-Stack Development. Capstone: FieldCheck App — a real-time field operations platform.' 
        }
    ],
    certifications: [
        { title: 'Oracle Cloud Infrastructure 2023 AI Certified Foundations', link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=D33614317A1563DBE687A89574FA94F57BBD1C8BFA60AA5EE5FF029A344F22EE' },
        { title: 'Oracle Cloud Data Management 2023 Certified Foundations', link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=6AEFC927718C085EA35BDFC1C210740CF08539A3AF43B4A5711C6D3EEC1A2E68' },
        { title: 'Oracle Cloud Infrastructure 2023 Certified Foundations', link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=5E6E16A94080ADEF3BF7E35DC8A16ED253DA9279280F4678DC08CCB3E1B1EE2C' },
        { title: 'SQL and Relational Databases 101', link: 'https://courses.cognitiveclass.ai/certificates/588a392f46ea47abba04f1e6c77298f4' },
        { title: 'NOSQL and DBaaS 101', link: 'https://courses.cognitiveclass.ai/certificates/16302c04c68c4749bc81895410d40ad8' }
    ],
    experience: [
        { title: 'UI/UX Design Lead', sub: 'FieldCheck Project', date: '2023 – 2024', desc: 'Managed end-to-end design flow. Created high-fidelity prototypes for real-time geofencing and offline sync features.' },
        { title: 'Game Tester / QA', sub: 'Personal & Academic Projects', date: '2022 – Present', desc: 'Regression testing and bug documentation for academic game projects.' }
    ],
    projects: [
        { title: 'FieldCheck App', desc: 'Enterprise field-operations platform with real-time geofencing and MongoDB offline sync.', link: 'https://github.com/MichaelAngeloPFernandez/FieldCheck-App' },
        { title: '3D Portfolio', desc: 'Interactive gamified OS environment built with Three.js and GSAP.', link: 'https://github.com/MichaelAngeloPFernandez' },
        { title: 'GitHub Profile', desc: 'Complete portfolio of academic and professional codebases.', link: 'https://github.com/MichaelAngeloPFernandez/MichaelAngeloPFernandez' }
    ],
    contacts: [
        { type: 'EMAIL', value: 'michaelangelofernandez.01082000@gmail.com', link: 'mailto:michaelangelofernandez.01082000@gmail.com', icon: '📧' },
        { type: 'LINKEDIN', value: 'Michael Angelo Fernandez', link: 'https://www.linkedin.com/in/michael-angelo-fernandez-05aaa3299/', icon: '🔗' },
        { type: 'GITHUB', value: '@MichaelAngeloPFernandez', link: 'https://github.com/MichaelAngeloPFernandez', icon: '💻' },
        { type: 'LOCATION', value: 'Quezon City, PH', link: '#', icon: '📍' },
        { type: 'RESUME', value: 'Download PDF', link: 'Michael_Angelo_Fernandez_Resume.pdf', icon: '📄' }
    ]
};

const STATE = {
    xp: 0, level: 1, badges: 0,
    visited: { education: false, experience: false, projects: false, contacts: false },
    mouse: { x: 0, y: 0 }
};

// ── Fullscreen Frame Animation ──────────────────────────────
const FRAMES_DIR = 'ezgif-split/';
const TOTAL_FRAMES = 192;
let frameImages = [];
let currentFrame = 0;
const fCanvas = document.getElementById('frame-canvas');
const fCtx = fCanvas ? fCanvas.getContext('2d') : null;

function sizeFrameCanvas() {
    if (!fCanvas) return;
    fCanvas.width = window.innerWidth;
    fCanvas.height = window.innerHeight;
}

function loadFrames() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const idx = String(i).padStart(3, '0');
        const img = new Image();
        img.onload = () => { frameImages[i] = img; };
        img.onerror = () => {
            const alt = new Image();
            alt.src = `${FRAMES_DIR}frame_${idx}_delay-0.041s.png`;
            alt.onload = () => { frameImages[i] = alt; };
        };
        img.src = `${FRAMES_DIR}frame_${idx}_delay-0.042s.png`;
    }
}

function animateFrames() {
    if (!fCtx) return;
    const img = frameImages[currentFrame];
    if (img && img.complete && img.naturalWidth > 0) {
        fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const cw = fCanvas.width, ch = fCanvas.height;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale, dh = ih * scale;
        fCtx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }
    currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
    setTimeout(() => requestAnimationFrame(animateFrames), 42);
}

// ── Typing effect for tagline ────────────────────────────────
function typeTagline() {
    const el = document.getElementById('tagline');
    if (!el) return;
    const text = 'UI/UX DESIGNER  |  GAME TESTER  |  IT OPERATIONS';
    let i = 0;
    el.textContent = '';
    el.style.borderRight = '2px solid var(--neon-cyan)';
    const iv = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
            clearInterval(iv);
            // Blink cursor then remove it
            setTimeout(() => { el.style.borderRight = 'none'; }, 2000);
        }
    }, 55);
}
let landingScene, landingCamera, landingRenderer, landingParticles;

function initLandingThree() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    landingScene = new THREE.Scene();
    landingCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    landingCamera.position.z = 8;
    landingRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    landingRenderer.setSize(window.innerWidth, window.innerHeight);
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000 * 3; i++) pos[i] = (Math.random() - 0.5) * 60;
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.05, transparent: true, opacity: 0.3 });
    landingParticles = new THREE.Points(geo, mat);
    landingScene.add(landingParticles);
    function animate() {
        requestAnimationFrame(animate);
        const tx = STATE.mouse.x * 0.5;
        const ty = STATE.mouse.y * 0.5;
        landingCamera.position.x += (tx - landingCamera.position.x) * 0.05;
        landingCamera.position.y += (-ty - landingCamera.position.y) * 0.05;
        landingCamera.lookAt(0, 0, 0);
        landingParticles.rotation.y += 0.001;
        landingRenderer.render(landingScene, landingCamera);
    }
    animate();
}

// ── Game UI Logic ───────────────────────────────────────────
function runLoader() {
    const bar = document.querySelector('.loader-bar-fill');
    const pct = document.getElementById('loader-percent');
    const loaderText = document.getElementById('loader-text');
    const logs = document.getElementById('loader-logs');
    const messages = [
        "Initializing Neural Link...", "Bypassing Security Firewalls...", "Handshaking Port 3000...",
        "Compiling Cyber-Shaders...", "Decrypting Portfolio OS...", "Loading Bio-Metrics...",
        "Establishing Secure Connection...", "Optimizing Grid...", "SYSTEM ONLINE. WELCOME MICHAEL."
    ];
    const statusLabels = [
        "INITIALIZING SYSTEM...", "NEURAL LINK ACTIVE...", "FIREWALL BYPASSED...",
        "SHADERS COMPILED...", "DECRYPTING...", "BIO-METRICS LOADED...",
        "CONNECTION SECURED...", "GRID OPTIMIZED...", "SYSTEM ONLINE."
    ];
    let p = 0; let logIndex = 0;
    const iv = setInterval(() => {
        p += Math.random() * 8 + 1;
        if (p > (logIndex + 1) * 11 && logIndex < messages.length) {
            const line = document.createElement('div');
            line.className = 'log-line';
            line.textContent = `[ OK ] ${messages[logIndex]}`;
            logs.appendChild(line);
            logs.scrollTop = logs.scrollHeight;
            if (loaderText && statusLabels[logIndex]) {
                loaderText.textContent = statusLabels[logIndex];
            }
            logIndex++;
        }
        if (p >= 100) { 
            p = 100; clearInterval(iv); 
            setTimeout(() => { 
                const loaderEl = document.getElementById('loader');
                const flash = document.getElementById('system-flash');
                if (flash) flash.classList.add('flash-active');
                if (loaderEl) {
                    loaderEl.classList.add('fading');
                    loaderEl.style.opacity = '0';
                    setTimeout(() => loaderEl.remove(), 600);
                }
            }, 500); 
        }
        if (bar) bar.style.width = p + '%';
        if (pct) pct.textContent = Math.floor(p) + '%';
    }, 150);
}

function openRoom(room) {
    const panel = document.getElementById('room-panel');
    const body = document.getElementById('panel-body');
    const title = document.getElementById('panel-title');
    const icon = document.getElementById('panel-icon');

    title.textContent = room.toUpperCase();
    icon.textContent = { education: '🎓', experience: '💼', projects: '🚀', contacts: '📞' }[room];

    // Update minimap active state
    document.querySelectorAll('.mm-cell').forEach(c => c.classList.remove('active'));
    const activeCell = document.getElementById('mm-' + room);
    if (activeCell) activeCell.classList.add('active');

    // Update minimap footer
    const statusMap = { education: 'EDUCATION', experience: 'EXPERIENCE', projects: 'PROJECTS', contacts: 'CONTACTS' };
    const mmStatus = document.getElementById('mm-status');
    if (mmStatus) mmStatus.textContent = '▶ ' + statusMap[room];

    let html = '';
    if (room === 'education') {
        html = DATA.education.map(e => `
            <div class="info-card anim-card">
                <h4>${e.title}</h4>
                <p class="card-sub">${e.sub}</p>
                <p class="card-date">${e.date}</p>
                <p>${e.desc}</p>
            </div>`).join('');
        html += `<div class="cert-header">VERIFIED CERTIFICATIONS</div>`;
        html += DATA.certifications.map(c => `
            <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="cert-link anim-card">
                <span class="cert-icon">📜</span>
                <span class="cert-text">${c.title}</span>
                <span class="cert-arrow">→</span>
            </a>
        `).join('');
    } else if (room === 'contacts') {
        html = DATA.contacts.map(c => {
            const isLink = c.link && c.link !== '#';
            const tag = isLink ? `a href="${c.link}" target="_blank" rel="noopener noreferrer"` : 'div';
            const closeTag = isLink ? 'a' : 'div';
            return `
            <${tag} class="contact-card anim-card">
                <div class="contact-icon">${c.icon}</div>
                <div class="contact-info">
                    <div class="contact-type">${c.type}</div>
                    <div class="contact-value">${c.value}</div>
                </div>
            </${closeTag}>
        `;
        }).join('');
    } else {
        const items = DATA[room] || [];
        html = items.map(i => `
            <div class="info-card anim-card">
                <h4>${i.title}</h4>
                ${i.sub ? `<p class="card-sub">${i.sub}</p>` : ''}
                ${i.date ? `<p class="card-date">${i.date}</p>` : ''}
                <p>${i.desc}</p>
                ${i.link ? `<a href="${i.link}" target="_blank" rel="noopener noreferrer" class="cyber-link">VIEW PROJECT →</a>` : ''}
            </div>
        `).join('');
    }
    
    body.innerHTML = html;
    // Stagger-animate each card in
    body.querySelectorAll('.anim-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 60}ms`;
        el.classList.add('card-enter');
    });
    panel.classList.remove('hidden');
    awardXP(room);
}

function awardXP(room) {
    if (STATE.visited[room]) return;
    STATE.visited[room] = true;
    STATE.xp += 250;
    STATE.badges++;
    document.getElementById('player-xp').textContent = STATE.xp;
    document.getElementById('badge-count').textContent = STATE.badges;
    document.getElementById('xp-bar').style.width = (STATE.xp / 1000 * 100) + '%';
    if (document.getElementById('badge-' + room)) document.getElementById('badge-' + room).classList.add('unlocked');
    if (document.getElementById('mm-' + room)) {
        const cell = document.getElementById('mm-' + room);
        cell.classList.add('visited');
        cell.classList.add('flash');
        setTimeout(() => cell.classList.remove('flash'), 700);
    }
    if (STATE.xp >= 250) {
        STATE.level = Math.floor(STATE.xp / 250) + 1;
        document.getElementById('player-level').textContent = Math.min(STATE.level, 4);
    }
    showAchievement(room.toUpperCase());
    unlockNext(room);
}

function unlockNext(current) {
    const order = ['education', 'experience', 'projects', 'contacts'];
    const idx = order.indexOf(current);
    if (idx < order.length - 1) {
        const next = order[idx + 1];
        const btn = document.getElementById('nav-' + next);
        if (btn) {
            btn.classList.remove('locked-room');
            btn.classList.add('just-unlocked');
            setTimeout(() => btn.classList.remove('just-unlocked'), 2000);
            const lock = document.getElementById('lock-' + next);
            if (lock) lock.textContent = '🔓';
        }
    }
}

function showAchievement(name) {
    const pop = document.getElementById('achievement-popup');
    document.getElementById('ach-name').textContent = name;
    // Remove then re-add 'show' so the transition re-triggers on repeat visits
    pop.classList.remove('show');
    pop.classList.remove('hidden');
    // Force reflow so the transition fires fresh
    void pop.offsetWidth;
    pop.classList.add('show');
    setTimeout(() => {
        pop.classList.remove('show');
        setTimeout(() => pop.classList.add('hidden'), 500);
    }, 3500);
}

function enterGame() {
    document.getElementById('landing-page').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('game-interface').classList.remove('hidden');
        if (!gRenderer) initGameThree();
    }, 600);
}

// ── Game Three.js — Holographic Skill Orb ────────────────────
// Skills grouped into orbital rings. Each ring tilts at a
// different angle so they fan out like a gyroscope.
const SKILL_RINGS = [
    {
        skills: ['UI/UX', 'Figma', 'Prototyping', 'Wireframing'],
        radius: 6, speed: 0.004, tiltX: 0.3, tiltZ: 0.1,
        color: 0x00f5ff   // cyan  — design skills
    },
    {
        skills: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
        radius: 8.5, speed: -0.003, tiltX: 1.1, tiltZ: 0.4,
        color: 0xb44fff   // purple — frontend skills
    },
    {
        skills: ['MongoDB', 'Node.js', 'Git', 'QA Testing'],
        radius: 11, speed: 0.0025, tiltX: 0.6, tiltZ: 1.0,
        color: 0xff2d78   // pink   — backend / tools
    }
];

let gScene, gCamera, gRenderer;
// Holds { pivot, labelDiv, angle } for each skill node
let gSkillNodes = [];

function makeSkillLabel(text, color) {
    const div = document.createElement('div');
    div.className = 'skill-label';
    div.textContent = text;
    div.style.color = `#${color.toString(16).padStart(6, '0')}`;
    div.style.borderColor = `#${color.toString(16).padStart(6, '0')}`;
    div.style.boxShadow = `0 0 8px #${color.toString(16).padStart(6, '0')}55`;
    document.getElementById('game-interface').appendChild(div);
    return div;
}

function initGameThree() {
    const canvas = document.getElementById('game-canvas');
    gScene = new THREE.Scene();
    gCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    gCamera.position.set(0, 4, 26);
    gRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    gRenderer.setSize(window.innerWidth, window.innerHeight);
    gRenderer.setClearColor(0x050810);

    // ── Core sphere (pulsing holographic orb) ──
    const coreGeo = new THREE.SphereGeometry(2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.15
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    gScene.add(core);

    // Inner solid glow sphere
    const glowGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff, transparent: true, opacity: 0.08
    });
    gScene.add(new THREE.Mesh(glowGeo, glowMat));

    // ── Orbital ring guides (thin torus per ring) ──
    SKILL_RINGS.forEach(ring => {
        const torusGeo = new THREE.TorusGeometry(ring.radius, 0.015, 8, 120);
        const torusMat = new THREE.MeshBasicMaterial({
            color: ring.color, transparent: true, opacity: 0.18
        });
        const torus = new THREE.Mesh(torusGeo, torusMat);
        torus.rotation.x = ring.tiltX;
        torus.rotation.z = ring.tiltZ;
        gScene.add(torus);

        // ── Skill nodes on this ring ──
        ring.skills.forEach((skill, i) => {
            const angle = (i / ring.skills.length) * Math.PI * 2;

            // Small dot marker in 3D
            const dotGeo = new THREE.SphereGeometry(0.12, 8, 8);
            const dotMat = new THREE.MeshBasicMaterial({ color: ring.color });
            const dot = new THREE.Mesh(dotGeo, dotMat);

            // Pivot group so we can rotate the whole ring
            const pivot = new THREE.Group();
            pivot.rotation.x = ring.tiltX;
            pivot.rotation.z = ring.tiltZ;
            gScene.add(pivot);
            pivot.add(dot);

            // HTML label overlay
            const label = makeSkillLabel(skill, ring.color);

            gSkillNodes.push({ pivot, dot, label, angle, radius: ring.radius, speed: ring.speed });
        });
    });

    // ── Ambient floating particles ──
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(600 * 3);
    for (let i = 0; i < 600 * 3; i++) partPos[i] = (Math.random() - 0.5) * 80;
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
        color: 0x00f5ff, size: 0.06, transparent: true, opacity: 0.25
    });
    gScene.add(new THREE.Points(partGeo, partMat));

    // ── Animation loop ──
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Gentle camera parallax from mouse
        const tx = STATE.mouse.x * 4;
        const ty = STATE.mouse.y * 2;
        gCamera.position.x += (tx - gCamera.position.x) * 0.03;
        gCamera.position.y += (ty + 4 - gCamera.position.y) * 0.03;
        gCamera.lookAt(0, 0, 0);

        // Pulse the core wireframe opacity
        coreMat.opacity = 0.1 + Math.sin(t * 1.8) * 0.06;
        core.rotation.y += 0.003;
        core.rotation.x += 0.001;

        // Update each skill node position and project to screen
        gSkillNodes.forEach(node => {
            node.angle += node.speed;
            const x = Math.cos(node.angle) * node.radius;
            const z = Math.sin(node.angle) * node.radius;
            node.dot.position.set(x, 0, z);

            // Project 3D dot position to 2D screen coords
            const worldPos = new THREE.Vector3();
            node.dot.getWorldPosition(worldPos);
            worldPos.project(gCamera);

            const hw = window.innerWidth / 2;
            const hh = window.innerHeight / 2;
            const sx = worldPos.x * hw + hw;
            const sy = -worldPos.y * hh + hh;

            // Hide label when behind camera
            if (worldPos.z > 1) {
                node.label.style.opacity = '0';
            } else {
                // Depth-based opacity: closer = brighter
                const depth = 1 - (worldPos.z + 1) / 2;
                node.label.style.opacity = (0.4 + depth * 0.6).toFixed(2);
                node.label.style.transform = `translate(-50%, -50%) scale(${(0.7 + depth * 0.4).toFixed(2)})`;
                node.label.style.left = sx + 'px';
                node.label.style.top  = sy + 'px';
            }
        });

        gRenderer.render(gScene, gCamera);
    }
    animate();
}

function wireEvents() {
    document.getElementById('press-start').addEventListener('click', enterGame);
    document.getElementById('back-to-landing').addEventListener('click', () => {
        // Close room panel first if open
        document.getElementById('room-panel').classList.add('hidden');
        // Remove floating skill labels
        document.querySelectorAll('.skill-label').forEach(el => el.remove());
        gSkillNodes = [];
        // Properly dispose WebGL context to free GPU memory
        if (gRenderer) {
            gRenderer.dispose();
            gRenderer.forceContextLoss();
            gRenderer = null;
            gScene = null;
            gCamera = null;
        }
        document.getElementById('game-interface').classList.add('hidden');
        document.getElementById('landing-page').classList.remove('hidden');
        setTimeout(() => document.getElementById('landing-page').style.opacity = '1', 50);
    });
    document.getElementById('close-panel').addEventListener('click', () => {
        document.getElementById('room-panel').classList.add('hidden');
        document.querySelectorAll('.mm-cell').forEach(c => c.classList.remove('active'));
        const mmStatus = document.getElementById('mm-status');
        if (mmStatus) mmStatus.textContent = 'EXPLORE TO UNLOCK';
    });
    document.querySelectorAll('.room-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('locked-room')) openRoom(btn.dataset.room);
        });
    });
    // Close panel on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('room-panel').classList.add('hidden');
            document.querySelectorAll('.mm-cell').forEach(c => c.classList.remove('active'));
            const mmStatus = document.getElementById('mm-status');
            if (mmStatus) mmStatus.textContent = 'EXPLORE TO UNLOCK';
        }
    });
    window.addEventListener('mousemove', (e) => {
        STATE.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        STATE.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
    // Touch support for parallax on mobile
    window.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        STATE.mouse.x = (t.clientX / window.innerWidth) * 2 - 1;
        STATE.mouse.y = (t.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
    // Tap to open rooms on touch devices (touchend fires before click, no double-fire)
    document.querySelectorAll('.room-btn').forEach(btn => {
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!btn.classList.contains('locked-room')) openRoom(btn.dataset.room);
        }, { passive: false });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    sizeFrameCanvas(); loadFrames(); initLandingThree(); wireEvents(); runLoader(); animateFrames();
    typeTagline();
});

window.addEventListener('resize', () => {
    sizeFrameCanvas();
    if (landingRenderer) {
        landingCamera.aspect = window.innerWidth / window.innerHeight;
        landingCamera.updateProjectionMatrix();
        landingRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    if (gRenderer) {
        gCamera.aspect = window.innerWidth / window.innerHeight;
        gCamera.updateProjectionMatrix();
        gRenderer.setSize(window.innerWidth, window.innerHeight);
    }
});
