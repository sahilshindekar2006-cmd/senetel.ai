import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * CONTROL UNIT - Ultra-Realistic PBR 3D Component Model
 */
export default function ControlUnit3D({ progress = 0, className = '' }) {
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
    parts: {},
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

    const scene = new THREE.Scene()
    stateRef.current.scene = scene

    const width = container.clientWidth || 800
    const height = container.clientHeight || 600

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.6, 6.8)
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

    // Lighting
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

    const cyanLight1 = new THREE.PointLight(0x00f0ff, 5.0, 6.0)
    cyanLight1.position.set(0.6, 0.4, 0.4)
    scene.add(cyanLight1)

    // Halo Backdrop
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
    backdropMesh.position.set(0, 0, -3.8)
    scene.add(backdropMesh)

    // Shadow & Grid Ring
    const shadowGeo = new THREE.PlaneGeometry(12, 12)
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.5 })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -2.1
    shadowMesh.receiveShadow = true
    scene.add(shadowMesh)

    const ringGeo = new THREE.RingGeometry(2.0, 2.06, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = -Math.PI / 2
    ringMesh.position.y = -2.09
    scene.add(ringMesh)

    // Materials Palette
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

    // Base Enclosure
    const enclosureBaseGroup = new THREE.Group()
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.6, 2.8), matAnodizedBase)
    baseMesh.position.y = -0.3
    baseMesh.castShadow = true
    enclosureBaseGroup.add(baseMesh)

    const baseTrimMesh = new THREE.Mesh(new THREE.BoxGeometry(3.84, 0.04, 2.84), matBrushedAluminum)
    baseTrimMesh.position.y = -0.01
    enclosureBaseGroup.add(baseTrimMesh)
    modelGroup.add(enclosureBaseGroup)

    // PCB
    const pcbGroup = new THREE.Group()
    const pcbMesh = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 2.4), matPcbDarkTeal)
    pcbGroup.add(pcbMesh)
    const borderMesh = new THREE.Mesh(new THREE.BoxGeometry(3.36, 0.085, 2.36), new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.2, metalness: 0.8, wireframe: true }))
    pcbGroup.add(borderMesh)
    modelGroup.add(pcbGroup)

    // Components
    const componentsGroup = new THREE.Group()
    const icMesh = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.12, 0.95), matIcEpoxy)
    icMesh.position.set(-0.4, 0.1, 0.2)
    componentsGroup.add(icMesh)

    const emblemMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.5), matBrushedAluminum)
    emblemMesh.position.set(-0.4, 0.17, 0.2)
    componentsGroup.add(emblemMesh)

    const heatsinkBase = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.1, 0.85), matBlackAluminumHeatsink)
    heatsinkBase.position.set(0.7, 0.09, -0.3)
    componentsGroup.add(heatsinkBase)

    for (let f = -0.32; f <= 0.32; f += 0.13) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.85), matBlackAluminumHeatsink)
      fin.position.set(0.7 + f, 0.25, -0.3)
      componentsGroup.add(fin)
    }
    modelGroup.add(componentsGroup)

    // Connectors
    const connectorsGroup = new THREE.Group()
    const termBlock = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 0.5), matTerminalHousing)
    termBlock.position.set(1.0, 0.24, 0.7)
    connectorsGroup.add(termBlock)
    for (let sx = 0.55; sx <= 1.45; sx += 0.22) {
      const ts = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 12), matGoldPlated)
      ts.position.set(sx, 0.46, 0.7)
      connectorsGroup.add(ts)
    }
    modelGroup.add(connectorsGroup)

    // LEDs
    const statusLedsGroup = new THREE.Group()
    const ledCyan = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16), matLedCyanLens)
    ledCyan.position.set(-1.4, 0.12, -0.8)
    statusLedsGroup.add(ledCyan)

    const ledGreen = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16), matLedGreenLens)
    ledGreen.position.set(-1.18, 0.12, -0.8)
    statusLedsGroup.add(ledGreen)

    const ledRed = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16), matLedRedLens)
    ledRed.position.set(-0.96, 0.12, -0.8)
    statusLedsGroup.add(ledRed)
    modelGroup.add(statusLedsGroup)

    // Screws
    const screwsGroup = new THREE.Group()
    ;[[-1.5, -1.0], [1.5, -1.0], [-1.5, 1.0], [1.5, 1.0]].forEach(([x, z]) => {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.14, 16), matPolishedSilver)
      screw.position.set(x, 0.45, z)
      screwsGroup.add(screw)
    })
    modelGroup.add(screwsGroup)

    // Top Cover
    const topCoverGroup = new THREE.Group()
    const coverMain = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.35, 2.8), matSmokedAcrylicTop)
    coverMain.position.y = 0.5
    topCoverGroup.add(coverMain)

    const bezel1 = new THREE.Mesh(new THREE.BoxGeometry(3.82, 0.06, 0.12), matBrushedAluminum)
    bezel1.position.set(0, 0.66, 1.38)
    topCoverGroup.add(bezel1)
    modelGroup.add(topCoverGroup)

    stateRef.current.parts = { enclosureBaseGroup, pcbGroup, componentsGroup, connectorsGroup, statusLedsGroup, screwsGroup, topCoverGroup }

    // Render loop
    const animate = () => {
      stateRef.current.rafId = requestAnimationFrame(animate)

      const curProgress = stateRef.current.progress
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const asmTarget = isReducedMotion ? 1 : Math.min(1, curProgress / 0.48)
      const easeAsm = 1 - Math.pow(1 - asmTarget, 3)
      const explodeFactor = 1 - easeAsm

      topCoverGroup.position.y = 3.2 * explodeFactor
      topCoverGroup.rotation.x = -0.12 * explodeFactor

      screwsGroup.position.y = 2.2 * explodeFactor
      statusLedsGroup.position.y = 1.6 * explodeFactor
      connectorsGroup.position.y = 1.2 * explodeFactor
      componentsGroup.position.y = 0.8 * explodeFactor
      pcbGroup.position.y = 0.0
      enclosureBaseGroup.position.y = -2.4 * explodeFactor

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
      else if (curProgress < 0.5) setActivePhase('ASSEMBLING')
      else if (curProgress >= 0.9) setActivePhase('FINAL REVEAL')
      else setActivePhase('360° INSPECT')

      renderer.render(scene, camera)
    }

    animate()

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
          <span className="font-mono text-lg font-semibold text-white tracking-widest uppercase">CONTROL UNIT</span>
        </div>
      )}
    </div>
  )
}
