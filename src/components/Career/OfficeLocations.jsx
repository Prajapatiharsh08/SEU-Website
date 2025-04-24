import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const locations = [
    {
        id: "sf",
        city: "San Francisco",
        country: "United States",
        address: "101 Market Street, Suite 700", 
        teams: ["Engineering", "Product", "Design"],
        coordinates: { lat: 37.7749, lng: -122.4194 },
        isHeadquarters: true,
    },
    {
        id: "ny",
        city: "New York",
        country: "United States",
        address: "22 W 38th Street, 11th Floor",
        teams: ["Sales", "Marketing", "Customer Success"],
        coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
        id: "ld",
        city: "London",
        country: "United Kingdom",
        address: "10 Finsbury Square, EC2A 1AF",
        teams: ["Engineering", "Sales", "Customer Success"],
        coordinates: { lat: 51.5074, lng: -0.1278 },
    },
    {
        id: "tk",
        city: "Tokyo",
        country: "Japan",
        address: "Shibuya Scramble Square, 2-24-12 Shibuya",
        teams: ["Engineering", "Product", "Design"],
        coordinates: { lat: 35.6762, lng: 139.6503 },
    },
    {
        id: "sg",
        city: "Singapore",
        country: "Singapore",
        address: "1 Raffles Place, #20-61",
        teams: ["Engineering", "Sales", "Customer Success"],
        coordinates: { lat: 1.3521, lng: 103.8198 },
    },
    {
        id: "br",
        city: "Berlin",
        country: "Germany",
        address: "Friedrichstraße 68, 10117",
        teams: ["Engineering", "Product"],
        coordinates: { lat: 52.52, lng: 13.405 },
    },
]

export default function OfficeLocations() {
    const [activeLocation, setActiveLocation] = useState(locations[0].id)
    const globeRef = useRef(null)

    // Convert lat/lng to 3D coordinates on a sphere
    const latLngToVector3 = (lat, lng, radius) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180) * (Math.PI / 180)

        const x = -radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.cos(phi)
        const z = radius * Math.sin(phi) * Math.sin(theta)

        return new THREE.Vector3(x, y, z)
    }

    useEffect(() => {
        if (!globeRef.current) return

        // Scene setup
        const scene = new THREE.Scene()

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            globeRef.current.clientWidth / globeRef.current.clientHeight,
            0.1,
            1000,
        )
        camera.position.z = 5

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        globeRef.current.appendChild(renderer.domElement)

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

        // Earth
        const radius = 2
        const earthGeometry = new THREE.SphereGeometry(radius, 64, 64)
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: 0x0c1445,
            metalness: 0.1,
            roughness: 0.8,
            transparent: true,
            opacity: 0.8,
        })
        const earth = new THREE.Mesh(earthGeometry, earthMaterial)
        scene.add(earth)

        // Grid lines
        const gridMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 })

        // Longitude lines
        for (let i = 0; i < 24; i++) {
            const longitude = (i / 24) * Math.PI * 2
            const points = []
            for (let j = 0; j <= 180; j++) {
                const latitude = (j / 180) * Math.PI
                const x = radius * Math.sin(latitude) * Math.cos(longitude)
                const y = radius * Math.cos(latitude)
                const z = radius * Math.sin(latitude) * Math.sin(longitude)
                points.push(new THREE.Vector3(x, y, z))
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            const line = new THREE.Line(geometry, gridMaterial)
            scene.add(line)
        }

        // Latitude lines
        for (let i = 0; i < 12; i++) {
            const latitude = ((i + 1) / 13) * Math.PI
            const points = []
            for (let j = 0; j <= 360; j++) {
                const longitude = (j / 360) * Math.PI * 2
                const x = radius * Math.sin(latitude) * Math.cos(longitude)
                const y = radius * Math.cos(latitude)
                const z = radius * Math.sin(latitude) * Math.sin(longitude)
                points.push(new THREE.Vector3(x, y, z))
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            const line = new THREE.Line(geometry, gridMaterial)
            scene.add(line)
        }

        // Location markers
        locations.forEach((location) => {
            const position = latLngToVector3(location.coordinates.lat, location.coordinates.lng, radius)

            // Marker
            const markerGeometry = new THREE.SphereGeometry(0.03, 16, 16)
            const markerMaterial = new THREE.MeshBasicMaterial({
                color: location.id === activeLocation ? 0xff3366 : 0x3b82f6,
            })
            const marker = new THREE.Mesh(markerGeometry, markerMaterial)
            marker.position.copy(position)
            scene.add(marker)

            // Pulse effect
            const pulseGeometry = new THREE.SphereGeometry(0.02, 16, 16)
            const pulseMaterial = new THREE.MeshBasicMaterial({
                color: location.id === activeLocation ? 0xff3366 : 0x3b82f6,
                transparent: true,
                opacity: 0.6,
            })
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
            pulse.position.copy(position)
            pulse.scale.set(1, 1, 1)
            scene.add(pulse)

            // Animation for pulse
            const animate = () => {
                pulse.scale.x += 0.01
                pulse.scale.y += 0.01
                pulse.scale.z += 0.01

                if (pulse.scale.x > 2) {
                    pulse.scale.set(1, 1, 1)
                }

                pulseMaterial.opacity = 0.6 * (1 - (pulse.scale.x - 1) / 1)
            }

            // Add to animation loop
            const animationId = setInterval(animate, 20)

            // Cleanup
            return () => {
                clearInterval(animationId)
            }
        })

        // Handle resize
        const handleResize = () => {
            if (!globeRef.current) return
            camera.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight)
        }

        window.addEventListener("resize", handleResize)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize)
            if (globeRef.current) {
                globeRef.current.removeChild(renderer.domElement)
            }
        }
    }, [activeLocation])

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/40">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">Our Global Offices</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-950/30">
                            {locations.map((location) => (
                                <motion.button
                                    key={location.id}
                                    onClick={() => setActiveLocation(location.id)}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${activeLocation === location.id
                                            ? "bg-gradient-to-r from-blue-900/50 to-purple-900/30 border-l-4 border-blue-500"
                                            : "hover:bg-blue-900/30 border-l-4 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 ${activeLocation === location.id ? "text-pink-500" : "text-blue-500"}`}>
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-white">{location.city}</h3>
                                                {location.isHeadquarters && (
                                                    <span className="text-xs bg-blue-900/70 text-blue-300 px-2 py-0.5 rounded-full">
                                                        Headquarters
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-blue-300">{location.country}</p>
                                            <p className="text-sm text-blue-400 mt-1">{location.address}</p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {location.teams.map((team, index) => (
                                                    <span key={index} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
                                                        {team}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[400px] rounded-xl overflow-hidden border border-blue-500/30 bg-blue-950/20">
                        <div ref={globeRef} className="w-full h-full"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
