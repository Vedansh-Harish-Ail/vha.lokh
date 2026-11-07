'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from 'lucide-react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Environment, Lightformer, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import type { RapierRigidBody, RigidBodyProps } from '@react-three/rapier'

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const focusRing =
  'focus-visible:ring-ring/60 focus-visible:border-ring outline-none focus-visible:ring-[3px]'

/* -------------------------------------------------------------------------- */
/*                                  ID card                                   */
/* -------------------------------------------------------------------------- */

// Physics-driven hanging badge: a card clipped to a cord that swings under gravity and can be dragged.
// Adapted from React Bits' "Lanyard" example. Every RigidBody uses `colliders: false` so Rapier's
// auto-collider doesn't fight the manual ones, and angular velocity is counter-rotated instead of
// locking rotations.

const PIN_IMAGE_URL = 'https://cdn.21st.dev/assets/mirror/ad/ad5d58b0ab86bd893f0ab4792d68136796a8a319061f9a834bbee109941617c0.png'

const ROPE_RADIUS = 0.1
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

// Card face in the group's local space (the group is scaled x4 below).
const CARD_WIDTH = 0.716
const CARD_HEIGHT = 1
const CARD_BOTTOM_Y = 0.023
const CARD_CORNER_RADIUS = 0.05
const CARD_CANVAS_SCALE = 1000
const ACCENT_STRIPE_HEIGHT_RATIO = 0.03

// Rounded-rectangle face with UVs spanning the full texture.
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

// TubeGeometry with a per-ring radius that tapers to 0 at t=0, instead of a flat cut.
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

// Resolves any CSS colour (including oklch from the theme tokens) to an rgb() string three.js can parse.
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
  isMobile: boolean
  colors: CardColors
}

const Band = ({ frontImage, isMobile, colors }: BandProps) => {
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
      glow.addColorStop(0, 'rgba(99, 102, 241, 0.35)')
      glow.addColorStop(1, 'rgba(99, 102, 241, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // 3. Draw the brand logo ribbon mark
      const maxLogoW = width * 0.62
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

      // Keeps the rope glued to the pin at any card orientation.
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
      <group position={[0, 4, 0]}>
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
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              ;(e.target as Element).releasePointerCapture(e.pointerId)
              drag(false)
              document.body.style.userSelect = ''
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              ;(e.target as Element).setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())))
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

      {/* Geometry is swapped imperatively each frame, so there is no JSX tubeGeometry child. */}
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

const REFERENCE_HEIGHT_PX = 520
const CAMERA_Z = 20
const CAMERA_FOV_DEG = 20
const WORLD_UNITS_PER_PX = (2 * CAMERA_Z * Math.tan((CAMERA_FOV_DEG / 2) * (Math.PI / 180))) ** -1
const PX_PER_WORLD_UNIT = REFERENCE_HEIGHT_PX * WORLD_UNITS_PER_PX
const TARGET_FROM_RIGHT_FRACTION = 0.3
const TARGET_FROM_RIGHT_FRACTION_AT_LG = 0.15
const LG_BREAKPOINT_PX = 1024
const XL_BREAKPOINT_PX = 1280

const CameraAlign = () => {
  useFrame(state => {
    const widthT = THREE.MathUtils.clamp(
      (state.size.width - LG_BREAKPOINT_PX) / (XL_BREAKPOINT_PX - LG_BREAKPOINT_PX),
      0,
      1
    )

    const targetFromRightFraction = THREE.MathUtils.lerp(
      TARGET_FROM_RIGHT_FRACTION_AT_LG,
      TARGET_FROM_RIGHT_FRACTION,
      widthT
    )

    const targetFromRightPx = targetFromRightFraction * state.size.width

    state.camera.position.x = (targetFromRightPx - state.size.width / 2) / PX_PER_WORLD_UNIT
    state.camera.position.z = CAMERA_Z * (state.size.height / REFERENCE_HEIGHT_PX)
  })

  return null
}

export const IdCard = ({ frontImage, className }: { frontImage: string; className?: string }) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [contextLossKey, setContextLossKey] = useState(0)
  const eventSourceRef = useRef<HTMLElement | null>(typeof document !== 'undefined' ? document.body : null)

  // Hidden elements that bridge resolved Tailwind theme colours into canvas / three.js.
  const primaryProbeRef = useRef<HTMLSpanElement>(null)
  const foregroundProbeRef = useRef<HTMLSpanElement>(null)
  const [colors, setColors] = useState<CardColors>({ accent: '#6366F1', rope: '#0F172A' })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const updateColors = () => {
      if (!primaryProbeRef.current || !foregroundProbeRef.current) return

      const accent = resolveRgb(getComputedStyle(primaryProbeRef.current).fill || '#6366F1')
      const rope = resolveRgb(getComputedStyle(foregroundProbeRef.current).fill || '#0F172A')

      setColors(prev => (prev.accent === accent && prev.rope === rope ? prev : { accent, rope }))
    }

    updateColors()

    // Watches ancestors' class/style so light/dark switches re-colour the card and rope.
    const observers: MutationObserver[] = []

    for (let node: HTMLElement | null = primaryProbeRef.current; node; node = node.parentElement) {
      const observer = new MutationObserver(updateColors)

      observer.observe(node, { attributes: true, attributeFilter: ['class', 'style'] })
      observers.push(observer)
    }

    return () => observers.forEach(observer => observer.disconnect())
  }, [])

  return (
    <div aria-hidden='true' className={cn('pointer-events-none drop-shadow-xl', className)}>
      <span ref={primaryProbeRef} className='fill-indigo-600 hidden' />
      <span ref={foregroundProbeRef} className='fill-slate-900 hidden' />
      <Canvas
        key={contextLossKey}
        eventSource={eventSourceRef as RefObject<HTMLElement>}
        camera={{ position: [0, 0, 20], fov: 20 }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
        onCreated={state => {
          state.gl.setClearAlpha(0)

          state.gl.domElement.addEventListener('webglcontextlost', event => {
            event.preventDefault()
            setContextLossKey(key => key + 1)
          })

          // Pointer NDC from the canvas's own rect, since eventSource is document.body.
          state.setEvents({
            compute: (event, s) => {
              const rect = s.gl.domElement.getBoundingClientRect()
              const x = event.clientX - rect.left
              const y = event.clientY - rect.top

              s.pointer.set((x / s.size.width) * 2 - 1, -(y / s.size.height) * 2 + 1)
              s.raycaster.setFromCamera(s.pointer, s.camera)
            }
          })
        }}
      >
        <CameraAlign />
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band frontImage={frontImage} isMobile={isMobile} colors={colors} />
        </Physics>
        <StudioLighting />
      </Canvas>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Greeting rotator                             */
/* -------------------------------------------------------------------------- */

export const GreetingWord = ({ greetings, intervalMs = 2200 }: { greetings: string[]; intervalMs?: number }) => {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || greetings.length < 2) return

    const timer = setInterval(() => setIndex(prev => (prev + 1) % greetings.length), intervalMs)

    return () => clearInterval(timer)
  }, [greetings.length, intervalMs, reduceMotion])

  return (
    <>
      <span className='sr-only'>{greetings[0]}</span>
      <span aria-hidden='true' className='mr-2 inline-grid overflow-hidden align-bottom'>
        {/* Invisible sizers reserve space for the widest greeting so surrounding text doesn't shift */}
        {greetings.map(word => (
          <span key={word} className='invisible col-start-1 row-start-1 whitespace-nowrap'>
            {word}
          </span>
        ))}

        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={greetings[index]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='col-start-1 row-start-1 inline-block whitespace-nowrap'
          >
            {greetings[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Marquee                                   */
/* -------------------------------------------------------------------------- */

const MARQUEE_REPEAT = 4
const MARQUEE_GAP_REM = 2

export const LogoMarquee = ({ logos, durationSeconds = 25 }: { logos: BrandLogo[]; durationSeconds?: number }) => (
  <div
    className='group flex overflow-hidden p-3'
    style={{ gap: `${MARQUEE_GAP_REM}rem` }}
    role='group'
    aria-label='Technology stack'
  >
    <style>{`@keyframes hero-section-44-marquee{from{transform:translateX(0)}to{transform:translateX(calc(-100% - ${MARQUEE_GAP_REM}rem))}}@media (prefers-reduced-motion:reduce){.hero-section-44-marquee{animation:none!important}}`}</style>
    {Array.from({ length: MARQUEE_REPEAT }, (_, copy) => (
      <div
        key={copy}
        aria-hidden={copy > 0 || undefined}
        className='hero-section-44-marquee flex shrink-0 justify-around group-hover:[animation-play-state:paused]'
        style={{
          gap: `${MARQUEE_GAP_REM}rem`,
          animation: `hero-section-44-marquee ${durationSeconds}s linear infinite`
        }}
      >
        {logos.map((logo, index) => (
          <div key={`${logo.image}-${index}`} className='bg-slate-100 flex size-16 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 shadow-2xs'>
            <img
              src={logo.image}
              alt={copy === 0 ? logo.name : ''}
              loading='lazy'
              className='size-10 object-contain'
            />
          </div>
        ))}
      </div>
    ))}
  </div>
)

/* -------------------------------------------------------------------------- */
/*                                 Hero section                               */
/* -------------------------------------------------------------------------- */

export type BrandLogo = {
  image: string
  name: string
}

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
  brandLogos?: BrandLogo[]
  className?: string
}

const CDN_BASE = 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/zolt'

const DEFAULT_BRAND_LOGOS: BrandLogo[] = Array.from({ length: 20 }, (_, index) => {
  const position = String(index + 1).padStart(2, '0')

  return { image: `${CDN_BASE}/logo-${position}.png`, name: `Tech stack logo ${position}` }
})

export const HeroSection44 = ({
  greetings = ['Hello', 'नमस्ते', 'Hey', 'Welcome'],
  name = 'vha.lokh',
  role = 'Where Ideas Take Shape.',
  description = "Need a custom website or digital solution? Alongside software engineering, I undertake select freelance engagements under my independent brand vha.lokh. I collaborate with small businesses, events, and individuals to create responsive websites, bespoke wedding portals, promotional posters, and provide end-to-end IT support.",
  availabilityLabel = 'Accepting Projects • Mangaluru, IN',
  profileImage = '/assets/brand/vha-lokh-symbol-transparent.png',
  downloadAction = { label: 'Explore Works', href: '#work' },
  connectAction = { label: "Let's Connect", href: '#contact' },
  brandLogos = DEFAULT_BRAND_LOGOS,
  className
}: HeroSection44Props) => {
  return (
    <section className={cn('bg-[#F8FAFC] text-slate-900 overflow-x-clip lg:relative border-b border-slate-200', className)}>
      <div className='max-sm:pt-16 sm:py-14 lg:pt-24 lg:pb-20'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='space-y-6 lg:max-w-xl'>
            <span className='bg-white text-indigo-900 border-indigo-100 shadow-2xs inline-flex h-7 w-fit items-center gap-1.5 rounded-full border px-3 text-xs font-semibold'>
              <span className='relative inline-flex size-2' aria-hidden='true'>
                <span className='bg-indigo-400 absolute -inset-0.5 rounded-full opacity-75 motion-safe:animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]' />
                <span className='bg-indigo-600 relative inline-flex size-2 rounded-full' />
              </span>
              {availabilityLabel}
            </span>

            <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 leading-[1.12]'>
              <GreetingWord greetings={greetings} />
              <span className='bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                {name}
              </span>
            </h1>

            <p className='text-slate-700 text-xl font-bold sm:text-2xl'>{role}</p>

            <p className='text-slate-600 mb-4 max-w-2xl text-base leading-relaxed'>{description}</p>

            {/* 4 Core Offerings Pills */}
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                Small Business Websites
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Wedding Portals & Cards
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                Posters & Marketing
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Digital & IT Support
              </span>
            </div>

            <div className='flex items-center gap-3 pt-2'>
              <a
                href={downloadAction.href}
                onClick={(e) => {
                  if (downloadAction.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(downloadAction.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={cn(
                  'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 inline-flex h-12 items-center justify-center rounded-xl border px-6 text-sm font-bold whitespace-nowrap transition-colors shadow-2xs',
                  focusRing
                )}
              >
                {downloadAction.label}
              </a>

              <a
                href={connectAction.href}
                onClick={(e) => {
                  if (connectAction.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(connectAction.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={cn(
                  'bg-slate-900 text-white hover:bg-indigo-600 group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-transparent px-6 text-sm font-bold whitespace-nowrap shadow-md transition-all duration-300',
                  focusRing
                )}
              >
                <span>{connectAction.label}</span>
                <ArrowRightIcon
                  aria-hidden='true'
                  className='size-4 transition-transform duration-300 group-hover:translate-x-1'
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <IdCard
        frontImage={profileImage}
        className='mx-auto mt-8 aspect-4/5 w-full max-w-80 max-lg:hidden lg:absolute lg:-top-31 lg:right-0 lg:left-0 lg:z-10 lg:mt-0 lg:aspect-auto lg:h-182 lg:max-w-none'
      />

      {brandLogos && brandLogos.length > 0 && (
        <div className='relative mx-auto mt-6 mb-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='from-[#F8FAFC] pointer-events-none absolute inset-y-0 left-0 z-1 w-16 bg-gradient-to-r to-transparent sm:w-28' />
          <div className='from-[#F8FAFC] pointer-events-none absolute inset-y-0 right-0 z-1 w-16 bg-gradient-to-l to-transparent sm:w-28' />
          <div className='mx-auto w-full overflow-hidden'>
            <LogoMarquee logos={brandLogos} />
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection44
