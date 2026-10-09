import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * SENTINEL ASSEMBLY - Ultra-Realistic Unified 3D Product Assembly Scene
 * 
 * Features:
 * - 1 Unified 3D Scene with 7 Coordinated IoT Device Components:
 *   1. Control Unit (Central Chassis & PCB)
 *   2. Environmental Sensor (Temp & Humidity Module)
 *   3. Proximity Sensor (Dual Transducer Ultrasonic Module)
 *   4. Motion Sensor (IMU Accelerometer Module)
 *   5. Status Indicator (Green Trusted Optical LED)
 *   6. Alert Indicator (Red Fault Optical LED)
 *   7. Audible Alert (Piezoelectric Audio Buzzer)
 *   Plus Protective Smoked Acrylic Top Shell
 * 
 * - Ultra-Realistic PBR Rendering: Anodized aluminum alloy housing, brushed silver chamfers, FR4 dark teal PCB substrate, gold-plated headers, optical LED lenses
 * - Scroll-Driven Assembly Animation (progress 0.0 -> 0.5)
 * - 360-Degree Inspection & Mouse/Touch Drag Rotation (progress 0.5 -> 1.0)
 * - Studio HDRI-Style Lighting & Soft Contact Shadows
 */
export default function SentinelAssembly({ progress = 0, className = '' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [webGlSupported, setWebGlSupported] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [activePhase, setActivePhase] = useState('EXPLODED VIEW')

  const stateRef = useRef({
    progress: 0,
    targetDragX: 0,
    targetDragY: 0,
    dragX: 0,
    dragY: 0,
    isPointerDown: false,
    lastPointerX: 0,
    lastPointerY: 0,
    components: {},
    scene: null,
    renderer: null,
    camera: null,
    modelGroup: null,
    rafId: null,
  })

  useEffect(() => {
    stateRef.current.progress = progress
  }, [progress])

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement('canvas')
        return !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')))
      } catch (e) {
        return false
      }
    }

    if (!checkWebGL()) {
      setWebGlSupported(false)
      return
    }

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. Setup Three.js Scene & Camera
    const scene = new THREE.Scene()
    stateRef.current.scene = scene

    const width = container.clientWidth || 800
    const height = container.clientHeight || 600

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
    camera.position.set(0, 0.8, 7.2)
    stateRef.current.camera = camera

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    stateRef.current.renderer = renderer

    // 2. Cinematic Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0x507090, 0x121824, 2.5)
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5)
    keyLight.position.set(4.5, 8.5, 5.5)
    keyLight.castShadow = true
    keyLight.shadow.bias = -0.0006
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x8cb0d0, 1.8)
    fillLight.position.set(-5.5, 3.5, 4.5)
    scene.add(fillLight)

    const topLight = new THREE.DirectionalLight(0xd5ebff, 2.4)
    topLight.position.set(0, 8.5, 1.5)
    scene.add(topLight)

    const cyanRimRight = new THREE.DirectionalLight(0x00f0ff, 5.0)
    cyanRimRight.position.set(6.5, 2.5, -5.5)
    scene.add(cyanRimRight)

    const cyanRimLeft = new THREE.DirectionalLight(0x00f0ff, 3.8)
    cyanRimLeft.position.set(-6.5, -2.5, -5.5)
    scene.add(cyanRimLeft)

    const cyanLight1 = new THREE.PointLight(0x00f0ff, 4.5, 6.0)
    cyanLight1.position.set(0, 0.4, 0)
    scene.add(cyanLight1)

    // 3. Subtle Background Radial Glow Halo
    const backdropGeo = new THREE.PlaneGeometry(16, 12)
    const canvasTexture = document.createElement('canvas')
    canvasTexture.width = 512
    canvasTexture.height = 512
    const ctx = canvasTexture.getContext('2d')
    const gradient = ctx.createRadialGradient(256, 256, 20, 256, 256, 240)
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.16)')
    gradient.addColorStop(0.4, 'rgba(0, 240, 255, 0.05)')
    gradient.addColorStop(1, 'rgba(4, 6, 11, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)

    const haloTexture = new THREE.CanvasTexture(canvasTexture)
    const backdropMat = new THREE.MeshBasicMaterial({ map: haloTexture, transparent: true, depthWrite: false })
    const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat)
    backdropMesh.position.set(0, 0, -4.2)
    scene.add(backdropMesh)

    // Ground Shadow & Grid Ring
    const shadowGeo = new THREE.PlaneGeometry(12, 12)
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.48 })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -2.2
    shadowMesh.receiveShadow = true
    scene.add(shadowMesh)

    const ringGeo = new THREE.RingGeometry(2.2, 2.26, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = -Math.PI / 2
    ringMesh.position.y = -2.19
    scene.add(ringMesh)

    // 4. Ultra-Realistic PBR Materials Palette
    const matAnodizedBase = new THREE.MeshStandardMaterial({ color: 0x161a22, roughness: 0.28, metalness: 0.65 })
    const matBrushedAluminum = new THREE.MeshStandardMaterial({ color: 0xc4d0df, roughness: 0.12, metalness: 0.95 })
    const matPcbDarkTeal = new THREE.MeshStandardMaterial({ color: 0x051a20, roughness: 0.22, metalness: 0.35 })
    const matGoldPlated = new THREE.MeshStandardMaterial({ color: 0xf0c842, roughness: 0.14, metalness: 0.95 })
    const matPolishedSilver = new THREE.MeshStandardMaterial({ color: 0xe6eef8, roughness: 0.08, metalness: 0.98 })
    const matIcEpoxy = new THREE.MeshStandardMaterial({ color: 0x1e2430, roughness: 0.32, metalness: 0.25 })
    const matBlackAluminumHeatsink = new THREE.MeshStandardMaterial({ color: 0x222a36, roughness: 0.18, metalness: 0.9 })
    const matTerminalHousing = new THREE.MeshStandardMaterial({ color: 0x16362a, roughness: 0.4, metalness: 0.25 })

    const matLedCyanLens = new THREE.MeshPhysicalMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 4.2, roughness: 0.1, transmission: 0.4, transparent: true })
    const matLedGreenLens = new THREE.MeshPhysicalMaterial({ color: 0x3dffa2, emissive: 0x3dffa2, emissiveIntensity: 4.2, roughness: 0.1, transmission: 0.4, transparent: true })
    const matLedRedLens = new THREE.MeshPhysicalMaterial({ color: 0xff5d5d, emissive: 0xff5d5d, emissiveIntensity: 4.2, roughness: 0.1, transmission: 0.4, transparent: true })
    const matSmokedAcrylicTop = new THREE.MeshPhysicalMaterial({ color: 0x1c2432, roughness: 0.22, metalness: 0.45, transparent: true, opacity: 0.88, clearcoat: 1.0 })

    const modelGroup = new THREE.Group()
    stateRef.current.modelGroup = modelGroup
    scene.add(modelGroup)

    // --- COMPONENT 1: CONTROL UNIT (Central Hub) ---
    const controlUnit = new THREE.Group()
    
    const chassisGeo = new THREE.BoxGeometry(4.2, 0.5, 3.2)
    const chassisMesh = new THREE.Mesh(chassisGeo, matAnodizedBase)
    chassisMesh.position.y = -0.25
    chassisMesh.castShadow = true
    controlUnit.add(chassisMesh)

    const bezelGeo = new THREE.BoxGeometry(4.24, 0.04, 3.24)
    const bezelMesh = new THREE.Mesh(bezelGeo, matBrushedAluminum)
    bezelMesh.position.y = 0.0
    controlUnit.add(bezelMesh)

    const pcbGeo = new THREE.BoxGeometry(3.8, 0.08, 2.8)
    const pcbMesh = new THREE.Mesh(pcbGeo, matPcbDarkTeal)
    pcbMesh.position.y = 0.05
    pcbMesh.castShadow = true
    controlUnit.add(pcbMesh)

    const icGeo = new THREE.BoxGeometry(1.0, 0.12, 1.0)
    const icMesh = new THREE.Mesh(icGeo, matIcEpoxy)
    icMesh.position.set(-0.6, 0.15, -0.2)
    controlUnit.add(icMesh)

    const heatsinkGeo = new THREE.BoxGeometry(0.9, 0.3, 0.9)
    const heatsinkMesh = new THREE.Mesh(heatsinkGeo, matBlackAluminumHeatsink)
    heatsinkMesh.position.set(0.6, 0.2, -0.2)
    controlUnit.add(heatsinkMesh)

    modelGroup.add(controlUnit)

    // --- COMPONENT 2: ENVIRONMENTAL SENSOR (Temp & Humidity Pod) ---
    const envSensor = new THREE.Group()
    const envBody = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.35, 0.85), matAnodizedBase)
    envBody.castShadow = true
    envSensor.add(envBody)

    const envGrill = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.05, 0.65), new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2, emissive: 0x003344 }))
    envGrill.position.y = 0.18
    envSensor.add(envGrill)

    ;[-0.2, 0, 0.2].forEach((x) => {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8), matGoldPlated)
      pin.position.set(x, -0.25, 0.3)
      envSensor.add(pin)
    })
    modelGroup.add(envSensor)

    // --- COMPONENT 3: PROXIMITY SENSOR (Dual Ultrasonic Transducers) ---
    const proxSensor = new THREE.Group()
    const proxBoard = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.7), matPcbDarkTeal)
    proxSensor.add(proxBoard)

    const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.45, 24), matPolishedSilver)
    t1.rotation.x = Math.PI / 2
    t1.position.set(-0.38, 0.25, 0)
    proxSensor.add(t1)

    const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.45, 24), matPolishedSilver)
    t2.rotation.x = Math.PI / 2
    t2.position.set(0.38, 0.25, 0)
    proxSensor.add(t2)
    modelGroup.add(proxSensor)

    // --- COMPONENT 4: MOTION SENSOR (IMU Accelerometer) ---
    const motionSensor = new THREE.Group()
    const motionBoard = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.7), matPcbDarkTeal)
    motionSensor.add(motionBoard)

    const accelChip = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.35), matIcEpoxy)
    accelChip.position.y = 0.09
    motionSensor.add(accelChip)

    ;[[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].forEach(([x, z]) => {
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.09, 12), matGoldPlated)
      pad.position.set(x, 0, z)
      motionSensor.add(pad)
    })
    modelGroup.add(motionSensor)

    // --- COMPONENT 5: STATUS INDICATOR (Green Optical LED) ---
    const statusLed = new THREE.Group()
    const ledCollar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16), matBrushedAluminum)
    statusLed.add(ledCollar1)

    const greenDiode = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), matLedGreenLens)
    greenDiode.position.y = 0.1
    statusLed.add(greenDiode)
    modelGroup.add(statusLed)

    // --- COMPONENT 6: ALERT INDICATOR (Red Optical LED) ---
    const alertLed = new THREE.Group()
    const ledCollar2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16), matBrushedAluminum)
    alertLed.add(ledCollar2)

    const redDiode = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), matLedRedLens)
    redDiode.position.y = 0.1
    alertLed.add(redDiode)
    modelGroup.add(alertLed)

    // --- COMPONENT 7: AUDIBLE ALERT (Piezo Buzzer) ---
    const audioBuzzer = new THREE.Group()
    const buzzerMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.35, 32), matAnodizedBase)
    audioBuzzer.add(buzzerMesh)

    const portMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), matIcEpoxy)
    portMesh.position.y = 0.18
    audioBuzzer.add(portMesh)
    modelGroup.add(audioBuzzer)

    // --- PROTECTIVE TOP COVER SHELL ---
    const topCoverGroup = new THREE.Group()
    const coverMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 3.2), matSmokedAcrylicTop)
    coverMesh.position.y = 0.25
    topCoverGroup.add(coverMesh)

    const line1 = new THREE.Mesh(new THREE.BoxGeometry(4.22, 0.05, 0.1), new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.15, metalness: 0.85, emissive: 0x005577 }))
    line1.position.set(0, 0.42, 1.58)
    topCoverGroup.add(line1)
    modelGroup.add(topCoverGroup)

    // Transformation Targets
    const transformTargets = {
      controlUnit: { exploded: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 }, assembled: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 } },
      envSensor: { exploded: { x: -3.2, y: 2.2, z: -1.2, rx: 0.3, ry: 0.5, rz: 0.2 }, assembled: { x: -1.3, y: 0.32, z: -0.6, rx: 0, ry: 0, rz: 0 } },
      proxSensor: { exploded: { x: 0, y: 3.2, z: -2.4, rx: -0.4, ry: 0, rz: 0 }, assembled: { x: 0, y: 0.38, z: -1.0, rx: 0, ry: 0, rz: 0 } },
      motionSensor: { exploded: { x: 3.2, y: 1.8, z: -1.0, rx: 0.2, ry: -0.4, rz: -0.3 }, assembled: { x: 1.3, y: 0.3, z: -0.5, rx: 0, ry: 0, rz: 0 } },
      statusLed: { exploded: { x: -2.8, y: -1.6, z: 1.8, rx: 0.5, ry: 0.2, rz: 0 }, assembled: { x: -1.4, y: 0.32, z: 0.8, rx: 0, ry: 0, rz: 0 } },
      alertLed: { exploded: { x: -1.6, y: -2.2, z: 2.2, rx: 0.4, ry: -0.3, rz: 0 }, assembled: { x: -0.9, y: 0.32, z: 0.8, rx: 0, ry: 0, rz: 0 } },
      audioBuzzer: { exploded: { x: 2.8, y: -1.8, z: 1.8, rx: -0.3, ry: 0.4, rz: 0.2 }, assembled: { x: 1.2, y: 0.38, z: 0.7, rx: 0, ry: 0, rz: 0 } },
      topCoverGroup: { exploded: { x: 0, y: 3.8, z: 0, rx: -0.15, ry: 0, rz: 0 }, assembled: { x: 0, y: 0.55, z: 0, rx: 0, ry: 0, rz: 0 } },
    }

    stateRef.current.components = { controlUnit, envSensor, proxSensor, motionSensor, statusLed, alertLed, audioBuzzer, topCoverGroup }
    const lerp = (start, end, amt) => start + (end - start) * amt

    // 5. Render & Animation Loop
    const animate = () => {
      stateRef.current.rafId = requestAnimationFrame(animate)

      const curProgress = stateRef.current.progress
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const asmTarget = isReducedMotion ? 1 : Math.min(1, curProgress / 0.48)
      const easeAsm = 1 - Math.pow(1 - asmTarget, 3)

      const compMap = stateRef.current.components
      Object.keys(transformTargets).forEach((key) => {
        const comp = compMap[key]
        const target = transformTargets[key]
        if (!comp || !target) return

        comp.position.x = lerp(target.exploded.x, target.assembled.x, easeAsm)
        comp.position.y = lerp(target.exploded.y, target.assembled.y, easeAsm)
        comp.position.z = lerp(target.exploded.z, target.assembled.z, easeAsm)

        comp.rotation.x = lerp(target.exploded.rx, target.assembled.rx, easeAsm)
        comp.rotation.y = lerp(target.exploded.ry, target.assembled.ry, easeAsm)
        comp.rotation.z = lerp(target.exploded.rz, target.assembled.rz, easeAsm)
      })

      const rotProgress = isReducedMotion ? 0 : Math.max(0, (curProgress - 0.45) / 0.55)
      const scrollRotY = rotProgress * Math.PI * 2
      const scrollRotX = 0.35 + Math.sin(rotProgress * Math.PI * 2) * 0.12

      const s = stateRef.current
      s.dragX += (s.targetDragX - s.dragX) * 0.1
      s.dragY += (s.targetDragY - s.dragY) * 0.1

      modelGroup.rotation.y = scrollRotY + s.dragY
      modelGroup.rotation.x = scrollRotX + s.dragX

      if (asmTarget >= 0.98 && !s.isPointerDown) {
        modelGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.08
      } else {
        modelGroup.position.y = 0
      }

      if (curProgress < 0.15) setActivePhase('EXPLODED VIEW')
      else if (curProgress < 0.5) setActivePhase('SMOOTH ASSEMBLY')
      else if (curProgress >= 0.9) setActivePhase('FULLY ASSEMBLED')
      else setActivePhase('360° INSPECT')

      renderer.render(scene, camera)
    }

    animate()

    // 6. Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth || 800
      const h = container.clientHeight || 600
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId)
      resizeObserver.disconnect()

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
    }
  }, [])

  const handlePointerDown = (e) => {
    setIsDragging(true)
    const s = stateRef.current
    s.isPointerDown = true
    s.lastPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    s.lastPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0
  }

  const handlePointerMove = (e) => {
    const s = stateRef.current
    if (!s.isPointerDown) return

    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

    const deltaX = clientX - s.lastPointerX
    const deltaY = clientY - s.lastPointerY

    s.lastPointerX = clientX
    s.lastPointerY = clientY

    s.targetDragY += deltaX * 0.008
    s.targetDragX += deltaY * 0.008

    s.targetDragX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, s.targetDragX))
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    stateRef.current.isPointerDown = false
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[400px] flex items-center justify-center select-none overflow-hidden ${className}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {webGlSupported ? (
        <>
          <canvas ref={canvasRef} className="w-full h-full block touch-none" />

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#00f0ff]/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-mono text-xs text-[#00f0ff] tracking-wider uppercase font-semibold">{activePhase}</span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 text-white/70 text-[11px] font-mono pointer-events-none backdrop-blur-sm">
            <span>DRAG TO ROTATE 360°</span>
          </div>
        </>
      ) : (
        <div className="w-full max-w-md p-8 rounded-xl bg-[#0a0f18] border border-[#00f0ff]/30 text-center flex flex-col items-center gap-4">
          <span className="font-mono text-lg font-semibold text-white tracking-widest uppercase">SENTINEL IoT DEVICE</span>
          <p className="text-sm font-mono text-[#00f0ff]/70 mt-1">7-COMPONENT UNIFIED SYSTEM</p>
        </div>
      )}
    </div>
  )
}
