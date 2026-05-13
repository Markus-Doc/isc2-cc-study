import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/GLTFLoader.js'

const MODEL_URL = 'assets/3D_designs_assets/Models_Assets/cyber_tiny_planet_glb_viewer_simple_folder/cyber_tiny_planet_lively_full.glb'
const STORAGE_KEY = 'isc2CyberPlanetRunV1'
const data = window.ISC2_CC_DATA || { domains: [], drills: [], questions: [] }

const els = {
  canvas: document.getElementById('planetCanvas'),
  assetStatus: document.getElementById('assetStatus'),
  activeDomainLabel: document.getElementById('activeDomainLabel'),
  activeDomainMeta: document.getElementById('activeDomainMeta'),
  missionList: document.getElementById('missionList'),
  questionText: document.getElementById('questionText'),
  answerGrid: document.getElementById('answerGrid'),
  feedbackStrip: document.getElementById('feedbackStrip'),
  lockAnswerBtn: document.getElementById('lockAnswerBtn'),
  nextGateBtn: document.getElementById('nextGateBtn'),
  resetRunBtn: document.getElementById('resetRunBtn'),
  scanBtn: document.getElementById('scanBtn'),
  readinessMetric: document.getElementById('readinessMetric'),
  streakMetric: document.getElementById('streakMetric'),
  clearedMetric: document.getElementById('clearedMetric'),
  rankLabel: document.getElementById('rankLabel'),
  xpLabel: document.getElementById('xpLabel'),
  gateLabel: document.getElementById('gateLabel'),
  gateProgress: document.getElementById('gateProgress')
}

const missions = buildMissions()
let run = restoreRun()
let selectedAnswer = null
let answerLocked = false
let currentQuestionIndex = 0

const renderState = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  planetRoot: null,
  missionNodes: [],
  clock: new THREE.Clock(),
  scanUntil: 0
}

function buildMissions() {
  return data.domains.map((domain, index) => {
    const drills = data.drills.filter(item => item.domain === domain)
    const questions = data.questions.filter(item => item.domain === domain)
    return {
      id: slugify(domain),
      domain,
      drills,
      questions,
      angle: (index / Math.max(data.domains.length, 1)) * Math.PI * 2,
      difficulty: Math.max(1, Math.ceil((questions.length + drills.length) / 10))
    }
  })
}

function defaultRun() {
  return {
    activeMissionId: missions[1]?.id || missions[0]?.id || '',
    xp: 0,
    streak: 0,
    cleared: {},
    attempts: {},
    misses: {}
  }
}

function restoreRun() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultRun()
    return { ...defaultRun(), ...JSON.parse(raw) }
  } catch {
    return defaultRun()
  }
}

function saveRun() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(run))
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function activeMission() {
  return missions.find(mission => mission.id === run.activeMissionId) || missions[0]
}

function missionSignal(mission) {
  const attempts = run.attempts[mission.id] || 0
  const misses = run.misses[mission.id] || 0
  const base = mission.questions.length ? 42 : 28
  const score = Math.round(base + attempts * 15 - misses * 12 + (run.cleared[mission.id] ? 40 : 0))
  return Math.max(8, Math.min(100, score))
}

function readiness() {
  if (!missions.length) return 0
  const total = missions.reduce((sum, mission) => sum + missionSignal(mission), 0)
  return Math.round(total / missions.length)
}

function rankForXp(xp) {
  if (xp >= 900) return 'Sentinel'
  if (xp >= 550) return 'Operator'
  if (xp >= 280) return 'Analyst'
  if (xp >= 120) return 'Courier'
  return 'Rookie'
}

function setActiveMission(id) {
  run.activeMissionId = id
  currentQuestionIndex = 0
  selectedAnswer = null
  answerLocked = false
  saveRun()
  renderAll()
  focusMissionNode(id)
}

function currentQuestion() {
  const mission = activeMission()
  if (mission.questions.length) {
    return mission.questions[currentQuestionIndex % mission.questions.length]
  }
  const drill = mission.drills[currentQuestionIndex % Math.max(mission.drills.length, 1)]
  if (!drill) return null
  return {
    id: drill.id,
    domain: drill.domain,
    question: drill.prompt,
    options: [drill.answer, drill.memoryHook || 'Review the source material', 'Skip this packet for later', 'Open full Drill Route'],
    correctIndex: 0,
    explanation: `${drill.answer} ${drill.memoryHook ? `Memory hook: ${drill.memoryHook}` : ''}`,
    confidence: 'drill',
    answerSource: 'local drill deck'
  }
}

function renderAll() {
  renderMissionList()
  renderMetrics()
  renderQuestion()
  updateSceneSignals()
}

function renderMissionList() {
  const mission = activeMission()
  els.activeDomainLabel.textContent = mission.domain
  els.activeDomainMeta.textContent = `${mission.drills.length} packets / ${mission.questions.length} gates`
  els.missionList.innerHTML = missions.map(item => {
    const active = item.id === mission.id
    const cleared = Boolean(run.cleared[item.id])
    const signal = missionSignal(item)
    return `
      <button class="mission-node${active ? ' active' : ''}${cleared ? ' cleared' : ''}" type="button" data-mission-id="${item.id}">
        <span class="node-orb" style="--signal:${signal}%"></span>
        <span>
          <strong>${escapeHtml(item.domain)}</strong>
          <small>${item.drills.length} packets / ${item.questions.length} gates</small>
        </span>
        <em>${signal}%</em>
      </button>
    `
  }).join('')

  els.missionList.querySelectorAll('[data-mission-id]').forEach(button => {
    button.addEventListener('click', () => setActiveMission(button.dataset.missionId))
  })
}

function renderMetrics() {
  const clearedCount = Object.values(run.cleared).filter(Boolean).length
  els.readinessMetric.textContent = `${readiness()}%`
  els.streakMetric.textContent = run.streak
  els.clearedMetric.textContent = `${clearedCount}/${missions.length}`
  els.rankLabel.textContent = rankForXp(run.xp)
  els.xpLabel.textContent = `${run.xp} XP`
}

function renderQuestion() {
  const mission = activeMission()
  const question = currentQuestion()
  selectedAnswer = null
  answerLocked = false
  els.feedbackStrip.textContent = ''
  els.feedbackStrip.className = 'feedback-strip'

  if (!question) {
    els.questionText.textContent = 'No checkpoint data exists for this district yet.'
    els.answerGrid.innerHTML = ''
    els.gateLabel.textContent = mission.domain
    els.gateProgress.textContent = '0 / 0'
    return
  }

  els.gateLabel.textContent = mission.domain
  els.gateProgress.textContent = `${(currentQuestionIndex % Math.max(mission.questions.length || mission.drills.length, 1)) + 1} / ${Math.max(mission.questions.length || mission.drills.length, 1)}`
  els.questionText.textContent = question.question
  els.answerGrid.innerHTML = question.options.map((option, index) => `
    <button class="answer-option" type="button" data-answer-index="${index}">
      <span>${String.fromCharCode(65 + index)}</span>
      ${escapeHtml(option)}
    </button>
  `).join('')

  els.answerGrid.querySelectorAll('[data-answer-index]').forEach(button => {
    button.addEventListener('click', () => selectAnswer(Number(button.dataset.answerIndex)))
  })
}

function selectAnswer(index) {
  if (answerLocked) return
  selectedAnswer = index
  els.answerGrid.querySelectorAll('.answer-option').forEach((button, optionIndex) => {
    button.classList.toggle('selected', optionIndex === index)
  })
}

function lockAnswer() {
  const mission = activeMission()
  const question = currentQuestion()
  if (!question || selectedAnswer === null || answerLocked) return

  answerLocked = true
  const correct = selectedAnswer === question.correctIndex
  run.attempts[mission.id] = (run.attempts[mission.id] || 0) + 1

  if (correct) {
    run.xp += 35 + Math.min(run.streak * 5, 45)
    run.streak += 1
    if (run.streak >= 2 || run.attempts[mission.id] >= Math.max(1, Math.min(2, mission.questions.length))) {
      run.cleared[mission.id] = true
    }
  } else {
    run.streak = 0
    run.misses[mission.id] = (run.misses[mission.id] || 0) + 1
  }

  saveRun()
  els.answerGrid.querySelectorAll('.answer-option').forEach((button, optionIndex) => {
    button.classList.toggle('correct', optionIndex === question.correctIndex)
    button.classList.toggle('wrong', optionIndex === selectedAnswer && !correct)
  })
  els.feedbackStrip.classList.add(correct ? 'success' : 'danger')
  els.feedbackStrip.textContent = correct
    ? `Gate cleared. ${question.explanation || 'Good route.'}`
    : `Gate blocked. ${question.explanation || 'Review this district, then rerun the gate.'}`
  pulseActiveNode(correct)
  renderMetrics()
  renderMissionList()
}

function nextGate() {
  const mission = activeMission()
  const count = Math.max(mission.questions.length || mission.drills.length, 1)
  currentQuestionIndex = (currentQuestionIndex + 1) % count
  renderQuestion()
}

function resetRun() {
  run = defaultRun()
  currentQuestionIndex = 0
  saveRun()
  renderAll()
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]))
}

function initScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x071116)
  scene.fog = new THREE.Fog(0x071116, 9, 28)

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(5.2, 3.4, 7.6)

  const renderer = new THREE.WebGLRenderer({ canvas: els.canvas, antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.45
  controls.minDistance = 3.6
  controls.maxDistance = 13
  controls.target.set(0, 0.1, 0)

  scene.add(new THREE.HemisphereLight(0xdffcff, 0x10202a, 2.3))
  const key = new THREE.DirectionalLight(0xffffff, 3)
  key.position.set(6, 7, 5)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x48f2d0, 2.2)
  rim.position.set(-5, 2, -4)
  scene.add(rim)

  const starField = makeStarField()
  scene.add(starField)
  scene.add(makeOrbitRings())
  buildMissionNodes(scene)

  renderState.scene = scene
  renderState.camera = camera
  renderState.renderer = renderer
  renderState.controls = controls

  loadPlanetModel(scene)
  resizeScene()
  window.addEventListener('resize', resizeScene)
  renderer.domElement.addEventListener('pointerdown', () => { controls.autoRotate = false })
  animateScene()
}

function loadPlanetModel(scene) {
  const loader = new GLTFLoader()
  loader.load(
    MODEL_URL,
    gltf => {
      const root = gltf.scene
      root.rotation.set(0.08, -0.6, 0)
      root.traverse(child => {
        if (!child.isMesh) return
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material = child.material.clone()
          child.material.metalness = Math.max(child.material.metalness || 0, 0.18)
          child.material.roughness = Math.min(child.material.roughness || 0.62, 0.82)
        }
      })
      normalizeModel(root, 3.1)
      renderState.planetRoot = root
      scene.add(root)
      els.assetStatus.innerHTML = '<span class="hud-label">Asset</span><strong>GLB online</strong><small>Cyber tiny planet loaded</small>'
    },
    event => {
      if (event.total) {
        const pct = Math.round((event.loaded / event.total) * 100)
        els.assetStatus.querySelector('strong').textContent = `Loading ${pct}%`
      }
    },
    () => {
      const fallback = makeFallbackPlanet()
      renderState.planetRoot = fallback
      scene.add(fallback)
      els.assetStatus.innerHTML = '<span class="hud-label">Asset</span><strong>Fallback planet</strong><small>GLB failed, procedural scene active</small>'
    }
  )
}

function normalizeModel(root, targetSize) {
  const box = new THREE.Box3().setFromObject(root)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z, 0.001)
  const scale = targetSize / maxDim
  root.scale.setScalar(scale)
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
}

function makeFallbackPlanet() {
  const root = new THREE.Group()
  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.55, 3),
    new THREE.MeshStandardMaterial({ color: 0x2cb7a6, roughness: 0.56, metalness: 0.18 })
  )
  root.add(globe)

  for (let i = 0; i < 22; i += 1) {
    const angle = (i / 22) * Math.PI * 2
    const height = 0.15 + (i % 5) * 0.08
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(0.11, height, 0.11),
      new THREE.MeshStandardMaterial({ color: i % 3 ? 0xdbeaf0 : 0x67e8c9, roughness: 0.42, metalness: 0.22 })
    )
    tower.position.set(Math.cos(angle) * 1.15, 1.18 + height / 2, Math.sin(angle) * 1.15)
    tower.lookAt(0, 0, 0)
    root.add(tower)
  }
  return root
}

function makeStarField() {
  const geometry = new THREE.BufferGeometry()
  const positions = []
  for (let i = 0; i < 520; i += 1) {
    const radius = 12 + Math.random() * 18
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    )
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0x9ff8ed, size: 0.035, transparent: true, opacity: 0.58 })
  )
}

function makeOrbitRings() {
  const group = new THREE.Group()
  const colors = [0x38f4df, 0xffd35d, 0x8ae768]
  for (let i = 0; i < 3; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.3 + i * 0.45, 0.008, 8, 160),
      new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0.42 })
    )
    ring.rotation.x = Math.PI / 2 + i * 0.16
    ring.rotation.z = i * 0.45
    group.add(ring)
  }
  return group
}

function buildMissionNodes(scene) {
  const active = activeMission()
  missions.forEach((mission, index) => {
    const signal = missionSignal(mission)
    const node = new THREE.Group()
    const activeColor = mission.id === active.id ? 0xffd35d : 0x38f4df
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.09 + signal / 1500, 24, 16),
      new THREE.MeshStandardMaterial({
        color: activeColor,
        emissive: activeColor,
        emissiveIntensity: mission.id === active.id ? 1.6 : 0.7,
        roughness: 0.35,
        metalness: 0.18
      })
    )
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.006, 8, 32),
      new THREE.MeshBasicMaterial({ color: activeColor, transparent: true, opacity: 0.72 })
    )
    ring.rotation.x = Math.PI / 2
    node.add(sphere, ring)
    positionNode(node, mission.angle, index)
    node.userData = { missionId: mission.id, sphere, ring }
    renderState.missionNodes.push(node)
    scene.add(node)
  })
}

function positionNode(node, angle, index) {
  const radius = 2.55 + (index % 3) * 0.17
  const y = Math.sin(angle * 1.7) * 0.42 + (index % 2 ? 0.16 : -0.08)
  node.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
}

function updateSceneSignals() {
  if (!renderState.missionNodes.length) return
  const active = activeMission()
  renderState.missionNodes.forEach(node => {
    const mission = missions.find(item => item.id === node.userData.missionId)
    if (!mission) return
    const selected = mission.id === active.id
    const cleared = Boolean(run.cleared[mission.id])
    const color = new THREE.Color(cleared ? 0x8ae768 : selected ? 0xffd35d : 0x38f4df)
    node.userData.sphere.material.color.copy(color)
    node.userData.sphere.material.emissive.copy(color)
    node.userData.sphere.material.emissiveIntensity = selected ? 1.7 : cleared ? 1.25 : 0.68
    node.userData.ring.material.color.copy(color)
    node.scale.setScalar(selected ? 1.45 : cleared ? 1.2 : 1)
  })
}

function focusMissionNode(id) {
  const node = renderState.missionNodes.find(item => item.userData.missionId === id)
  if (!node || !renderState.controls || !renderState.camera) return
  renderState.controls.autoRotate = false
  renderState.controls.target.copy(node.position).multiplyScalar(0.24)
  renderState.camera.position.lerp(new THREE.Vector3(node.position.x * 1.9, 2.6, node.position.z * 1.9), 0.4)
  renderState.controls.update()
}

function pulseActiveNode(success) {
  const node = renderState.missionNodes.find(item => item.userData.missionId === run.activeMissionId)
  if (!node) return
  node.userData.pulse = success ? 1 : -1
}

function resizeScene() {
  if (!renderState.renderer || !renderState.camera) return
  const rect = els.canvas.parentElement.getBoundingClientRect()
  renderState.renderer.setSize(rect.width, rect.height, false)
  renderState.camera.aspect = rect.width / Math.max(rect.height, 1)
  renderState.camera.updateProjectionMatrix()
}

function animateScene() {
  requestAnimationFrame(animateScene)
  const elapsed = renderState.clock.getElapsedTime()
  if (renderState.planetRoot) {
    renderState.planetRoot.rotation.y += 0.0016
  }
  renderState.missionNodes.forEach((node, index) => {
    node.position.y += Math.sin(elapsed * 1.8 + index) * 0.0009
    node.rotation.y = elapsed * 0.65
    if (node.userData.pulse) {
      const direction = node.userData.pulse > 0 ? 1 : -1
      const color = direction > 0 ? 0x8ae768 : 0xff715f
      node.userData.sphere.material.color.setHex(color)
      node.scale.setScalar(1.25 + Math.sin(elapsed * 14) * 0.22)
      node.userData.pulse *= 0.94
      if (Math.abs(node.userData.pulse) < 0.05) {
        node.userData.pulse = 0
        updateSceneSignals()
      }
    }
  })
  if (Date.now() < renderState.scanUntil) {
    renderState.missionNodes.forEach((node, index) => {
      node.scale.setScalar(1 + Math.max(0, Math.sin(elapsed * 5 - index * 0.55)) * 0.5)
    })
  }
  renderState.controls.update()
  renderState.renderer.render(renderState.scene, renderState.camera)
}

function scanMissions() {
  renderState.scanUntil = Date.now() + 1800
  if (renderState.controls) renderState.controls.autoRotate = true
}

els.lockAnswerBtn.addEventListener('click', lockAnswer)
els.nextGateBtn.addEventListener('click', nextGate)
els.resetRunBtn.addEventListener('click', resetRun)
els.scanBtn.addEventListener('click', scanMissions)

initScene()
renderAll()
