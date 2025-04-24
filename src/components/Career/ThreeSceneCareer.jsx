import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"

export default function ThreeScene() {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 5

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 2)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0x4169e1, 2)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)

        // Particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 3000

        const posArray = new Float32Array(particlesCount * 3)
        const colorsArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position
            posArray[i] = (Math.random() - 0.5) * 15
            posArray[i + 1] = (Math.random() - 0.5) * 15
            posArray[i + 2] = (Math.random() - 0.5) * 15

            // Color - gradient from blue to purple
            const ratio = Math.random()
            colorsArray[i] = 0.1 + ratio * 0.2 // R: 0.1-0.3
            colorsArray[i + 1] = 0.3 + ratio * 0.3 // G: 0.3-0.6
            colorsArray[i + 2] = 0.8 - ratio * 0.3 // B: 0.5-0.8
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Grid
        const gridHelper = new THREE.GridHelper(20, 20, 0x0000ff, 0x000066)
        gridHelper.position.y = -2
        scene.add(gridHelper)

        // Animated sphere
        const sphereGeometry = new THREE.SphereGeometry(1, 64, 64)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x0055ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        scene.add(sphere)

        // Animated torus
        const torusGeometry = new THREE.TorusGeometry(3, 0.05, 16, 100)
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0x8800ff,
            transparent: true,
            opacity: 0.2,
        })
        const torus = new THREE.Mesh(torusGeometry, torusMaterial)
        torus.rotation.x = Math.PI / 2
        scene.add(torus)

        // Animated torus 2
        const torus2Geometry = new THREE.TorusGeometry(2.5, 0.03, 16, 100)
        const torus2Material = new THREE.MeshStandardMaterial({
            color: 0x00aaff,
            transparent: true,
            opacity: 0.2,
        })
        const torus2 = new THREE.Mesh(torus2Geometry, torus2Material)
        torus2.rotation.x = Math.PI / 3
        torus2.rotation.y = Math.PI / 3
        scene.add(torus2)

        // GSAP animations
        gsap.to(sphere.rotation, {
            y: Math.PI * 2,
            duration: 10,
            repeat: -1,
            ease: "none",
        })

        gsap.to(sphere.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })

        gsap.to(torus.rotation, {
            z: Math.PI * 2,
            duration: 20,
            repeat: -1,
            ease: "none",
        })

        gsap.to(torus2.rotation, {
            z: Math.PI * 2,
            duration: 15,
            repeat: -1,
            ease: "none",
        })

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        // Mouse move effect
        const handleMouseMove = (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

            gsap.to(particlesMesh.rotation, {
                x: mouseY * 0.1,
                y: mouseX * 0.1,
                duration: 2,
            })

            gsap.to(sphere.position, {
                x: mouseX * 0.5,
                y: mouseY * 0.5,
                duration: 1,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            particlesMesh.rotation.y += 0.0005

            // Pulse effect for particles
            const time = Date.now() * 0.001
            particlesMaterial.size = 0.02 + Math.sin(time) * 0.01

            controls.update()
            renderer.render(scene, camera)
        }

        animate()

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div ref={containerRef} className="absolute inset-0" />
}
