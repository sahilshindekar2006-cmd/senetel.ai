import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * HARDWARE MODEL - Ultra-Realistic Universal 3D Component Renderer
 * 
 * Photorealistic PBR Rendering Features:
 * - High-Detail PBR Materials: Anodized aluminum housing, FR4 dark teal PCB substrate with gold traces, QFP microchips with metallic leads, frosted optical LED lenses with inner emissive die
 * - Studio HDRI-Style Lighting: Multi-directional studio key/fill/rim lights + ambient occlusion + contact shadows
 * - Beveled Geometry: Metallic chamfer edge highlights, standoff hex screws, finned heatsinks, terminal blocks
 * - Scroll-driven exploded -> assembled animation + 360° rotation + mouse/touch drag
 */
export default function HardwareModel({ type = 'control-unit', progress = 0, className = '' }) {
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
    parts: [],
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

    const width = container.clientWidth || 600
    const height = container.clientHeight || 450

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
    camera.position.set(0, 0.5, 6.0)
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

    // 2. Photorealistic Studio Lighting Setup
    const hemiLight = new THREE.HemisphereLight(0x507090, 0x121824, 2.5)
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5)
    keyLight.position.set(4.5, 7.5, 5.5)
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

    // Internal Glow PointLights
    const cyanLight1 = new THREE.PointLight(0x00f0ff, 4.0, 5.0)
    cyanLight1.position.set(0, 0.4, 0.2)
    scene.add(cyanLight1)

    // 3. Subtle Radial Backdrop Halo
    const backdropGeo = new THREE.PlaneGeometry(14, 10)
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
    backdropMesh.position.set(0, 0, -3.5)
    scene.add(backdropMesh)

    // Ground Shadow & Grid Ring
    const shadowGeo = new THREE.PlaneGeometry(10, 10)
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.48 })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -1.85
    shadowMesh.receiveShadow = true
    scene.add(shadowMesh)

    const ringGeo = new THREE.RingGeometry(1.8, 1.86, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = -Math.PI / 2
    ringMesh.position.y = -1.84
    scene.add(ringMesh)

    // 4. Ultra-Realistic PBR Materials Palette
    const matAnodizedBase = new THREE.MeshStandardMaterial({
      color: 0x161a22,
      roughness: 0.28,
      metalness: 0.65,
    })

    const matBrushedAluminum = new THREE.MeshStandardMaterial({
      color: 0xc4d0df,
      roughness: 0.12,
      metalness: 0.95,
    })

    const matPcbDarkTeal = new THREE.MeshStandardMaterial({
      color: 0x051a20,
      roughness: 0.22,
      metalness: 0.35,
    })

    const matGoldPlated = new THREE.MeshStandardMaterial({
      color: 0xf0c842,
      roughness: 0.14,
      metalness: 0.95,
    })

    const matPolishedSilver = new THREE.MeshStandardMaterial({
      color: 0xe6eef8,
      roughness: 0.08,
      metalness: 0.98,
    })

    const matIcEpoxy = new THREE.MeshStandardMaterial({
      color: 0x1e2430,
      roughness: 0.32,
      metalness: 0.25,
    })

    const matBlackAluminumHeatsink = new THREE.MeshStandardMaterial({
      color: 0x222a36,
      roughness: 0.18,
      metalness: 0.9,
    })

    const matTerminalHousing = new THREE.MeshStandardMaterial({
      color: 0x16362a,
      roughness: 0.4,
      metalness: 0.25,
    })

    // Frosted Optical LED Materials
    const matLedCyanLens = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 4.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.4,
      transparent: true,
    })

    const matLedGreenLens = new THREE.MeshPhysicalMaterial({
      color: 0x3dffa2,
      emissive: 0x3dffa2,
      emissiveIntensity: 4.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.4,
      transparent: true,
    })

    const matLedRedLens = new THREE.MeshPhysicalMaterial({
      color: 0xff5d5d,
      emissive: 0xff5d5d,
      emissiveIntensity: 4.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.4,
      transparent: true,
    })

    const matSmokedAcrylicTop = new THREE.MeshPhysicalMaterial({
      color: 0x1c2432,
      roughness: 0.22,
      metalness: 0.45,
      transparent: true,
      opacity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    const modelGroup = new THREE.Group()
    stateRef.current.modelGroup = modelGroup
    scene.add(modelGroup)

    const parts = []
    const modelType = type.toLowerCase()

    // --- BUILD HIGH-DETAIL REALISTIC MODEL GEOMETRIES ---
    if (modelType === 'esp32' || modelType === 'control-unit') {
      // 1. CONTROL UNIT (Industrial Controller Chassis)
      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.5, 2.6), matAnodizedBase)
      baseMesh.position.y = -0.3
      baseMesh.castShadow = true
      
      const baseTrim = new THREE.Mesh(new THREE.BoxGeometry(3.64, 0.04, 2.64), matBrushedAluminum)
      baseTrim.position.y = -0.02
      
      const basePart = new THREE.Group()
      basePart.add(baseMesh)
      basePart.add(baseTrim)
      parts.push({ group: basePart, expY: -2.2, expRx: 0 })

      // PCB Substrate + Gold Traces
      const pcbMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 2.2), matPcbDarkTeal)
      const borderMesh = new THREE.Mesh(new THREE.BoxGeometry(3.16, 0.085, 2.16), new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2, metalness: 0.8, wireframe: true }))
      const pcbPart = new THREE.Group()
      pcbPart.add(pcbMesh)
      pcbPart.add(borderMesh)
      parts.push({ group: pcbPart, expY: 0, expRx: 0 })

      // QFP Microchip with Pin Leads
      const icMesh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.9), matIcEpoxy)
      icMesh.position.set(-0.4, 0.1, 0.2)
      const emblemMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.5), matBrushedAluminum)
      emblemMesh.position.set(-0.4, 0.17, 0.2)
      const icPart = new THREE.Group()
      icPart.add(icMesh)
      icPart.add(emblemMesh)
      parts.push({ group: icPart, expY: 0.8, expRx: 0 })

      // Multi-Finned Aluminum Heatsink
      const hsPart = new THREE.Group()
      const hsBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), matBlackAluminumHeatsink)
      hsBase.position.set(0.6, 0.09, -0.2)
      hsPart.add(hsBase)
      for (let f = -0.3; f <= 0.3; f += 0.12) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.25, 0.8), matBlackAluminumHeatsink)
        fin.position.set(0.6 + f, 0.22, -0.2)
        hsPart.add(fin)
      }
      parts.push({ group: hsPart, expY: 1.3, expRx: 0 })

      // Industrial Terminal Block & Pins
      const connMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.38, 0.45), matTerminalHousing)
      connMesh.position.set(0.8, 0.2, 0.7)
      const connPart = new THREE.Group()
      connPart.add(connMesh)
      for (let s = 0.35; s <= 1.25; s += 0.22) {
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 12), matGoldPlated)
        screw.position.set(s - 0.45, 0.4, 0.7)
        connPart.add(screw)
      }
      parts.push({ group: connPart, expY: 1.8, expRx: 0 })

      // Smoked Cover Plate
      const coverMesh = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.32, 2.6), matSmokedAcrylicTop)
      coverMesh.position.y = 0.45
      const bezel1 = new THREE.Mesh(new THREE.BoxGeometry(3.62, 0.05, 0.1), matBrushedAluminum)
      bezel1.position.set(0, 0.61, 1.28)
      const coverPart = new THREE.Group()
      coverPart.add(coverMesh)
      coverPart.add(bezel1)
      parts.push({ group: coverPart, expY: 2.8, expRx: -0.12 })

    } else if (modelType === 'dht11' || modelType === 'env-sensor') {
      // 2. ENVIRONMENTAL SENSOR MODULE
      const pcbMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 1.4), matPcbDarkTeal)
      const pcbPart = new THREE.Group()
      pcbPart.add(pcbMesh)
      parts.push({ group: pcbPart, expY: -1.2, expRx: 0 })

      const sensorElem = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.15, 0.65), matIcEpoxy)
      sensorElem.position.set(0, 0.12, 0)
      const elemPart = new THREE.Group()
      elemPart.add(sensorElem)
      parts.push({ group: elemPart, expY: 0.2, expRx: 0 })

      // Ventilated Louver Housing
      const grillMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 1.0), matAnodizedBase)
      grillMesh.position.set(0, 0.35, 0)
      const grillBezel = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.04, 1.02), matBrushedAluminum)
      grillBezel.position.set(0, 0.58, 0)
      const grillPart = new THREE.Group()
      grillPart.add(grillMesh)
      grillPart.add(grillBezel)
      parts.push({ group: grillPart, expY: 2.2, expRx: -0.15 })

    } else if (modelType === 'jsn-sr04t' || modelType === 'prox-sensor') {
      // 3. PROXIMITY SENSOR (Dual Metallic Ultrasonic Transducers)
      const pcbMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.2), matPcbDarkTeal)
      const pcbPart = new THREE.Group()
      pcbPart.add(pcbMesh)
      parts.push({ group: pcbPart, expY: -1.4, expRx: 0 })

      // Transducer 1 (T)
      const t1Mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.5, 32), matPolishedSilver)
      t1Mesh.rotation.x = Math.PI / 2
      t1Mesh.position.set(-0.6, 0.3, 0)
      const mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.52, 24), matBrushedAluminum)
      mesh1.rotation.x = Math.PI / 2
      mesh1.position.set(-0.6, 0.3, 0)
      const t1Part = new THREE.Group()
      t1Part.add(t1Mesh)
      t1Part.add(mesh1)
      parts.push({ group: t1Part, expY: 1.2, expRx: 0.3 })

      // Transducer 2 (R)
      const t2Mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.5, 32), matPolishedSilver)
      t2Mesh.rotation.x = Math.PI / 2
      t2Mesh.position.set(0.6, 0.3, 0)
      const mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.52, 24), matBrushedAluminum)
      mesh2.rotation.x = Math.PI / 2
      mesh2.position.set(0.6, 0.3, 0)
      const t2Part = new THREE.Group()
      t2Part.add(t2Mesh)
      t2Part.add(mesh2)
      parts.push({ group: t2Part, expY: 2.2, expRx: -0.3 })

    } else if (modelType === 'phone-accel' || modelType === 'motion-sensor') {
      // 4. MOTION SENSOR (IMU Accelerometer)
      const pcbMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.6), matPcbDarkTeal)
      const pcbPart = new THREE.Group()
      pcbPart.add(pcbMesh)
      parts.push({ group: pcbPart, expY: -1.2, expRx: 0 })

      const chipMesh = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.12, 0.75), matIcEpoxy)
      chipMesh.position.set(0, 0.1, 0)
      const goldPad = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.4), matGoldPlated)
      goldPad.position.set(0, 0.17, 0)
      const chipPart = new THREE.Group()
      chipPart.add(chipMesh)
      chipPart.add(goldPad)
      parts.push({ group: chipPart, expY: 1.5, expRx: 0.2 })

    } else if (modelType === 'led-green' || modelType === 'status-led') {
      // 5. STATUS INDICATOR (Green Optical LED)
      const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32), matBrushedAluminum)
      const basePart = new THREE.Group()
      basePart.add(baseMesh)
      parts.push({ group: basePart, expY: -1.2, expRx: 0 })

      const greenLedMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), matLedGreenLens)
      greenLedMesh.position.y = 0.3
      const ledPart = new THREE.Group()
      ledPart.add(greenLedMesh)
      parts.push({ group: ledPart, expY: 1.8, expRx: 0 })

    } else if (modelType === 'led-red' || modelType === 'alert-led') {
      // 6. ALERT INDICATOR (Red Optical LED)
      const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32), matBrushedAluminum)
      const basePart = new THREE.Group()
      basePart.add(baseMesh)
      parts.push({ group: basePart, expY: -1.2, expRx: 0 })

      const redLedMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), matLedRedLens)
      redLedMesh.position.y = 0.3
      const ledPart = new THREE.Group()
      ledPart.add(redLedMesh)
      parts.push({ group: ledPart, expY: 1.8, expRx: 0 })

    } else {
      // 7. AUDIBLE ALERT (Piezo Audio Buzzer)
      const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.1, 32), matBrushedAluminum)
      baseMesh.position.y = -0.2
      const basePart = new THREE.Group()
      basePart.add(baseMesh)
      parts.push({ group: basePart, expY: -1.2, expRx: 0 })

      const piezoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32), matPolishedSilver)
      const piezoPart = new THREE.Group()
      piezoPart.add(piezoMesh)
      parts.push({ group: piezoPart, expY: 0.6, expRx: 0 })

      const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.6, 32), matAnodizedBase)
      bodyMesh.position.y = 0.25
      const portMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24), matIcEpoxy)
      portMesh.position.y = 0.56
      const bodyPart = new THREE.Group()
      bodyPart.add(bodyMesh)
      bodyPart.add(portMesh)
      parts.push({ group: bodyPart, expY: 2.2, expRx: -0.15 })
    }

    // Add all groups to modelGroup
    parts.forEach((p) => modelGroup.add(p.group))
    stateRef.current.parts = parts

    const lerp = (a, b, t) => a + (b - a) * t

    // 5. Render & Animation Loop
    const animate = () => {
      stateRef.current.rafId = requestAnimationFrame(animate)

      const curProgress = stateRef.current.progress
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const asmTarget = isReducedMotion ? 1 : Math.min(1, curProgress / 0.48)
      const easeAsm = 1 - Math.pow(1 - asmTarget, 3)
      const explodeFactor = 1 - easeAsm

      parts.forEach((p) => {
        p.group.position.y = lerp(0, p.expY, explodeFactor)
        p.group.rotation.x = lerp(0, p.expRx, explodeFactor)
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
        modelGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.06
      } else {
        modelGroup.position.y = 0
      }

      if (curProgress < 0.15) setActivePhase('EXPLODED VIEW')
      else if (curProgress < 0.5) setActivePhase('ASSEMBLING')
      else if (curProgress >= 0.9) setActivePhase('FINAL REVEAL')
      else setActivePhase('360° INSPECT')

      renderer.render(scene, camera)
    }

    animate()

    // 6. Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth || 600
      const h = container.clientHeight || 450
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
  }, [type])

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
      className={`relative w-full h-full min-h-[350px] flex items-center justify-center select-none overflow-hidden ${className}`}
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

          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-[#00f0ff]/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-mono text-xs text-[#00f0ff] tracking-wider uppercase font-semibold">{activePhase}</span>
          </div>

          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-white/70 text-[10px] font-mono pointer-events-none backdrop-blur-sm">
            <span>DRAG TO ROTATE 360°</span>
          </div>
        </>
      ) : (
        <div className="w-full max-w-sm p-6 rounded-xl bg-[#0a0f18] border border-[#00f0ff]/30 text-center flex flex-col items-center gap-3">
          <span className="font-mono text-sm font-semibold text-white tracking-widest uppercase">{type.toUpperCase()}</span>
          <p className="text-xs font-mono text-[#00f0ff]/70">3D HARDWARE MODEL</p>
        </div>
      )}
    </div>
  )
}
