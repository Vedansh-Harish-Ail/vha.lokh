'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, ArrowDown, Globe, HeartHandshake, Image as ImageIcon, Headphones } from 'lucide-react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Environment, Lightformer, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import type { RapierRigidBody, RigidBodyProps } from '@react-three/rapier'
import { InfiniteMarquee } from './InfiniteMarquee'

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const focusRing =
  'focus-visible:ring-ring/60 focus-visible:border-ring outline-none focus-visible:ring-[3px]'

/* -------------------------------------------------------------------------- */
/*                                  ID card                                   */
/* -------------------------------------------------------------------------- */

const PIN_IMAGE_URL = 'https://cdn.21st.dev/assets/mirror/ad/ad5d58b0ab86bd893f0ab4792d68136796a8a319061f9a834bbee109941617c0.png'

const ROPE_RADIUS = 0.08
const ROPE_RADIAL_SEGMENTS = 24
const ROPE_TAPER_FRACTION = 0.06
const CARD_ROPE_ANCHOR_Y = 1.1
const ROPE_TOP_EXTENSION = -0.5

const PIN_IMAGE_ASPECT = 1024 / 1536
const PIN_IMAGE_BOTTOM_PAD_FRACTION = (1536 - 1432) / 1536
const CARD_TOP_EDGE_Y = 0.93
const PIN_PLANE_HEIGHT = 1.4
const PIN_PLANE_WIDTH = PIN_PLANE_HEIGHT * PIN_IMAGE_ASPECT
const PIN_PLANE_Y = CARD_TOP_EDGE_Y + PIN_PLANE_HEIGHT * -PIN_IMAGE_BOTTOM_PAD_FRACTION
const PIN_PLANE_X = 0
const PIN_PLANE_Z = ROPE_RADIUS + 0.06

const CARD_WIDTH = 0.716
const CARD_HEIGHT = 1
const CARD_BOTTOM_Y = 0.023
const CARD_CORNER_RADIUS = 0.05
const CARD_CANVAS_SCALE = 1000
const ACCENT_STRIPE_HEIGHT_RATIO = 0.03

const buildCardFaceGeometry = () => {
  const x0 = -CARD_WIDTH / 2
  const x1 = CARD_WIDTH / 2
  const y0 = CARD_BOTTOM_Y
  const y1 = CARD_BOTTOM_Y + CARD_HEIGHT
  const r = CARD_CORNER_RADIUS
  const shape = new THREE.Shape()

  shape.moveTo(x0 + r, y0)
  shape.lineTo(x1 - r, y0)
  shape.quadraticCurveTo(x1, y0, x1, y0 + r)
  shape.lineTo(x1, y1 - r)
  shape.quadraticCurveTo(x1, y1, x1 - r, y1)
  shape.lineTo(x0 + r, y1)
  shape.quadraticCurveTo(x0, y1, x0, y1 - r)
  shape.lineTo(x0, y0 + r)
  shape.quadraticCurveTo(x0, y0, x0 + r, y0)

  const geometry = new THREE.ShapeGeometry(shape, 12)
  const position = geometry.getAttribute('position')
  const uv = geometry.getAttribute('uv')

  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, (position.getX(i) - x0) / CARD_WIDTH, (position.getY(i) - y0) / CARD_HEIGHT)
  }

  return geometry
}

type LanyardRigidBody = RapierRigidBody & { lerped?: THREE.Vector3 }

const getLerped = (body: LanyardRigidBody) => {
  if (!body.lerped) {
    body.lerped = new THREE.Vector3().copy(body.translation())
  }
  return body.lerped
}

const buildTaperedTubeGeometry = (
  curve: THREE.CatmullRomCurve3,
  tubularSegments: number,
  radius: number,
  radialSegments: number,
  taperFraction: number
) => {
  const frames = curve.computeFrenetFrames(tubularSegments, false)
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  const vertex = new THREE.Vector3()
  const normal = new THREE.Vector3()

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments
    const point = curve.getPointAt(t)
    const N = frames.normals[i]
    const B = frames.binormals[i]
    const ringRadius = t < taperFraction ? radius * (t / taperFraction) : radius

    for (let j = 0; j <= radialSegments; j++) {
      const angle = (j / radialSegments) * Math.PI * 2
      const sin = Math.sin(angle)
      const cos = -Math.cos(angle)

      normal.x = cos * N.x + sin * B.x
      normal.y = cos * N.y + sin * B.y
      normal.z = cos * N.z + sin * B.z
      normal.normalize()
      normals.push(normal.x, normal.y, normal.z)

      vertex.x = point.x + ringRadius * normal.x
      vertex.y = point.y + ringRadius * normal.y
      vertex.z = point.z + ringRadius * normal.z
      positions.push(vertex.x, vertex.y, vertex.z)

      uvs.push(t, j / radialSegments)
    }
  }

  for (let j = 1; j <= tubularSegments; j++) {
    for (let i = 1; i <= radialSegments; i++) {
      const a = (radialSegments + 1) * (j - 1) + (i - 1)
      const b = (radialSegments + 1) * j + (i - 1)
      const c = (radialSegments + 1) * j + i
      const d = (radialSegments + 1) * (j - 1) + i

      indices.push(a, b, d)
      indices.push(b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

  return geometry
}

const resolveRgb = (cssColor: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return 'rgb(0 0 0)'
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = cssColor
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `rgb(${r}, ${g}, ${b})`
}

type CardColors = { accent: string; rope: string }

type BandProps = {
  frontImage: string
  colors: CardColors
  onHover: (hovered: boolean) => void
  onDrag: (dragging: boolean) => void
}

const Band = ({ frontImage, colors, onHover, onDrag }: BandProps) => {
  const { viewport } = useThree()
  const isMobile = viewport.width < 10

  // Position anchor in top-right area (around 72% across the screen)
  const anchorX = isMobile ? 0 : Math.min(viewport.width * 0.23, 4.6)
  const anchorY = viewport.height / 2 + 0.8

  const rope = useRef<THREE.Mesh>(null!)
  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<LanyardRigidBody>(null!)
  const j2 = useRef<LanyardRigidBody>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const cardQuat = new THREE.Quaternion()

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 1.5,
    linearDamping: 1.5
  }

  const frontTexture = useTexture(frontImage)
  const pinTexture = useTexture(PIN_IMAGE_URL)
  const cardGeometry = useMemo(() => buildCardFaceGeometry(), [])

  const cardMap = useMemo(() => {
    const width = Math.round(CARD_WIDTH * CARD_CANVAS_SCALE)
    const height = Math.round(CARD_HEIGHT * CARD_CANVAS_SCALE)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    const image = frontTexture.image as HTMLImageElement

    if (ctx) {
      // 1. Draw elegant dark slate background
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#0F172A')
      grad.addColorStop(1, '#020617')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // 2. Draw soft ambient radial glow behind the logo
      const glow = ctx.createRadialGradient(width / 2, height * 0.38, 10, width / 2, height * 0.38, 280)
      glow.addColorStop(0, 'rgba(99, 102, 241, 0.45)')
      glow.addColorStop(1, 'rgba(99, 102, 241, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // 3. Draw the brand logo ribbon mark
      const maxLogoW = width * 0.65
      const logoScale = Math.min(maxLogoW / (image.width || 1), 320 / (image.height || 1))
      const dw = image.width * logoScale
      const dh = image.height * logoScale
      const dx = (width - dw) / 2
      const dy = height * 0.36 - dh / 2
      ctx.drawImage(image, dx, dy, dw, dh)

      // 4. Studio Brand Typography
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 46px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('vha.lokh', width / 2, height * 0.60)

      ctx.fillStyle = '#94A3B8'
      ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      ctx.fillText('Where Ideas Take Shape.', width / 2, height * 0.66)

      ctx.fillStyle = '#6366F1'
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      ctx.fillText('STUDIO • MANGALURU, IN', width / 2, height * 0.73)

      // 5. Card divider line & badge label
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(width * 0.15, height * 0.81)
      ctx.lineTo(width * 0.85, height * 0.81)
      ctx.stroke()

      ctx.fillStyle = '#64748B'
      ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      ctx.fillText('FREELANCE DIGITAL PRACTICE', width / 2, height * 0.87)

      // 6. Accent stripe along the top edge
      ctx.fillStyle = colors.accent || '#6366F1'
      ctx.fillRect(0, 0, width, height * ACCENT_STRIPE_HEIGHT_RATIO)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.needsUpdate = true

    return texture
  }, [frontTexture, colors.accent])

  const [curve] = useState(() => {
    const ropeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ])
    ropeCurve.curveType = 'chordal'
    return ropeCurve
  })

  const [dragged, drag] = useState<THREE.Vector3 | false>(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.85])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD_ROPE_ANCHOR_Y, 0]
  ])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }

    if (fixed.current) {
      ;[j1, j2].forEach(ref => {
        const lerped = getLerped(ref.current)
        const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())))
        lerped.lerp(ref.current.translation(), delta * 50 * clampedDistance)
      })

      const cardPos = card.current.translation()
      const cardRot = card.current.rotation()

      cardQuat.set(cardRot.x, cardRot.y, cardRot.z, cardRot.w)
      curve.points[0]
        .set(0, CARD_ROPE_ANCHOR_Y + ROPE_TOP_EXTENSION, 0)
        .applyQuaternion(cardQuat)
        .add(vec.set(cardPos.x, cardPos.y, cardPos.z))
      curve.points[1].copy(getLerped(j2.current))
      curve.points[2].copy(getLerped(j1.current))
      curve.points[3].copy(fixed.current.translation())

      const oldRopeGeometry = rope.current.geometry

      rope.current.geometry = buildTaperedTubeGeometry(
        curve,
        isMobile ? 16 : 32,
        ROPE_RADIUS,
        ROPE_RADIAL_SEGMENTS,
        ROPE_TAPER_FRACTION
      )
      oldRopeGeometry.dispose()

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation() as unknown as THREE.Vector3)
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  return (
    <>
      <group position={[anchorX, anchorY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type='fixed' />
        <RigidBody position={[0.425, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.85, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.275, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.7, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.42, 2.0, 0.018]} />
          <group
            scale={4}
            position={[0, -3.16, -0.09]}
            onPointerOver={() => onHover(true)}
            onPointerOut={() => {
              if (!dragged) onHover(false)
            }}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              ;(e.target as Element).releasePointerCapture(e.pointerId)
              drag(false)
              onDrag(false)
              onHover(false)
              document.body.style.userSelect = ''
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              ;(e.target as Element).setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())))
              onDrag(true)
              document.body.style.userSelect = 'none'
            }}
          >
            <mesh geometry={cardGeometry} position={[0, 0, 0.004]}>
              <meshBasicMaterial map={cardMap} toneMapped={false} />
            </mesh>
            <mesh geometry={cardGeometry} position={[0, 0, 0.001]} rotation={[0, Math.PI, 0]}>
              <meshBasicMaterial map={cardMap} toneMapped={false} />
            </mesh>
          </group>

          <mesh position={[PIN_PLANE_X, PIN_PLANE_Y, PIN_PLANE_Z]}>
            <planeGeometry args={[PIN_PLANE_WIDTH, PIN_PLANE_HEIGHT]} />
            <meshBasicMaterial map={pinTexture} transparent alphaTest={0.1} toneMapped={false} />
          </mesh>
        </RigidBody>
      </group>

      <mesh ref={rope} frustumCulled={false}>
        <meshStandardMaterial color={colors.rope} roughness={0.55} metalness={0.15} />
      </mesh>
    </>
  )
}

const LIGHT = new THREE.Color().setRGB(1, 1, 1)

const StudioLighting = () => (
  <Environment blur={0.75}>
    <Lightformer intensity={2} color={LIGHT} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
    <Lightformer intensity={3} color={LIGHT} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
    <Lightformer intensity={3} color={LIGHT} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
    <Lightformer
      intensity={10}
      color={LIGHT}
      position={[-10, 0, 14]}
      rotation={[0, Math.PI / 2, Math.PI / 3]}
      scale={[100, 10, 1]}
    />
  </Environment>
)

export const IdCard = ({ frontImage, className }: { frontImage: string; className?: string }) => {
  const [contextLossKey, setContextLossKey] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const primaryProbeRef = useRef<HTMLSpanElement>(null)
  const foregroundProbeRef = useRef<HTMLSpanElement>(null)
  const [colors, setColors] = useState<CardColors>({ accent: '#6366F1', rope: '#0F172A' })

  useEffect(() => {
    const updateColors = () => {
      if (!primaryProbeRef.current || !foregroundProbeRef.current) return
      const accent = resolveRgb(getComputedStyle(primaryProbeRef.current).fill || '#6366F1')
      const rope = resolveRgb(getComputedStyle(foregroundProbeRef.current).fill || '#0F172A')
      setColors(prev => (prev.accent === accent && prev.rope === rope ? prev : { accent, rope }))
    }

    updateColors()

    const observers: MutationObserver[] = []
    for (let node: HTMLElement | null = primaryProbeRef.current; node; node = node.parentElement) {
      const observer = new MutationObserver(updateColors)
      observer.observe(node, { attributes: true, attributeFilter: ['class', 'style'] })
      observers.push(observer)
    }

    return () => observers.forEach(observer => observer.disconnect())
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full select-none z-20 pointer-events-none', className)}
    >
      <span ref={primaryProbeRef} className='fill-indigo-600 hidden' />
      <span ref={foregroundProbeRef} className='fill-slate-900 hidden' />
      <Canvas
        key={contextLossKey}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        camera={{ position: [0, 0, 20], fov: 24 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
        style={{
          pointerEvents: isHovered || isDragging ? 'auto' : 'none',
          cursor: isDragging ? 'grabbing' : isHovered ? 'grab' : 'default',
        }}
        onCreated={state => {
          state.gl.setClearAlpha(0)

          state.gl.domElement.addEventListener('webglcontextlost', event => {
            event.preventDefault()
            setContextLossKey(key => key + 1)
          })

          state.setEvents({
            compute: (event, s) => {
              const rect = s.gl.domElement.getBoundingClientRect()
              const x = event.clientX - rect.left
              const y = event.clientY - rect.top
              s.pointer.set((x / (rect.width || 1)) * 2 - 1, -(y / (rect.height || 1)) * 2 + 1)
              s.raycaster.setFromCamera(s.pointer, s.camera)
            }
          })
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -36, 0]} timeStep={1 / 60}>
          <Band
            frontImage={frontImage}
            colors={colors}
            onHover={setIsHovered}
            onDrag={setIsDragging}
          />
        </Physics>
        <StudioLighting />
      </Canvas>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Greeting rotator                             */
/* -------------------------------------------------------------------------- */

export const GreetingWord = ({ greetings, intervalMs = 2400 }: { greetings: string[]; intervalMs?: number }) => {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || greetings.length < 2) return
    const timer = setInterval(() => setIndex(prev => (prev + 1) % greetings.length), intervalMs)
    return () => clearInterval(timer)
  }, [greetings.length, intervalMs, reduceMotion])

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={greetings[index]}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="inline-block"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Hero section                               */
/* -------------------------------------------------------------------------- */

export type ActionLink = {
  label: string
  href: string
}

export type HeroSection44Props = {
  greetings?: string[]
  name?: string
  role?: string
  description?: ReactNode
  availabilityLabel?: string
  profileImage?: string
  downloadAction?: ActionLink
  connectAction?: ActionLink
  className?: string
}

export const HeroSection44 = ({
  greetings = ['Namaskara', 'Hello', 'नमस्ते', 'Hey'],
  role = 'Where Ideas Take Shape.',
  description = "Need a custom website or digital solution? Alongside software engineering, I undertake select freelance engagements under my independent brand vha.lokh. I collaborate with small businesses, events, and individuals to create responsive websites, bespoke wedding portals, promotional posters, and provide end-to-end IT support.",
  availabilityLabel = 'Accepting Engagements • Mangaluru, IN',
  profileImage = '/assets/brand/vha-lokh-symbol-transparent.png',
  downloadAction = { label: 'See Selected Work', href: '#work' },
  connectAction = { label: 'Discuss a Project', href: '#contact' },
  className
}: HeroSection44Props) => {
  return (
    <section className={cn('bg-[#F8FAFC] text-slate-900 overflow-hidden border-b border-slate-200 relative pt-12 pb-0 md:pt-16 md:pb-0 min-h-[580px] lg:min-h-[660px]', className)}>
      {/* Background subtle ambient glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

      {/* Free 3D Physics Lanyard Card (NO container box, stretches over whole screen) */}
      <IdCard
        frontImage={profileImage}
        className="absolute inset-0 w-full h-full z-20"
      />

      {/* Widen container: max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Role, Badges, CTAs (z-30 pointer-events-auto) */}
          <div className="lg:col-span-7 space-y-6 relative z-30 pointer-events-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50/90 border border-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-900 shadow-2xs backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </span>
              <span className="font-bold">vha.lokh</span>
              <span className="text-indigo-300">•</span>
              <span>{role}</span>
              <span className="text-indigo-300">•</span>
              <span className="text-indigo-700 font-normal">{availabilityLabel}</span>
            </div>

            {/* Clear Headline with Greeting */}
            <div className="space-y-1">
              <div className="text-base font-bold text-indigo-600 flex items-center gap-1.5">
                <GreetingWord greetings={greetings} />
                <span>👋🏻 Welcome to vha.lokh</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Web Solutions That{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Work for You.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              {description}
            </p>

            {/* 4 Core Offerings Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                Small Business Websites
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Wedding Portals & Cards
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                Posters & Marketing
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Digital & IT Support
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={downloadAction.href}
                onClick={(e) => {
                  if (downloadAction.href.startsWith('#')) {
                    e.preventDefault()
                    document.getElementById(downloadAction.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={cn(
                  'bg-slate-900 text-white hover:bg-indigo-600 group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold whitespace-nowrap shadow-md transition-colors',
                  focusRing
                )}
              >
                <span>{downloadAction.label}</span>
                <ArrowDown className="size-4" />
              </a>

              <a
                href={connectAction.href}
                onClick={(e) => {
                  if (connectAction.href.startsWith('#')) {
                    e.preventDefault()
                    document.getElementById(connectAction.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={cn(
                  'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-6 text-sm font-bold whitespace-nowrap transition-colors shadow-2xs',
                  focusRing
                )}
              >
                <span>{connectAction.label}</span>
                <ArrowRightIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Open canvas area reserved for the 3D free badge hanging */}
          <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[460px] pointer-events-none relative flex items-center justify-center">
            {/* Subtle floating hint */}
            <div className="hidden lg:flex items-center gap-2 absolute top-4 right-4 text-[11px] font-semibold text-slate-400 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs pointer-events-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive 3D Lanyard • Drag anywhere</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars Trust Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-indigo-600">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Small Business Websites</h4>
              <p className="text-xs text-slate-500 mt-0.5">Mobile-first, fast, with WhatsApp booking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Wedding Portals & Cards</h4>
              <p className="text-xs text-slate-500 mt-0.5">Live RSVP tracking & countdowns.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-indigo-600">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Posters & Marketing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Promotional flyers & social graphics.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Digital & IT Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Domains, hosting & tech consulting.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Infinite Scrolling Trust Marquee Ribbon */}
      <InfiniteMarquee />
    </section>
  )
}

export default HeroSection44
