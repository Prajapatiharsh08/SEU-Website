import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function Navbar() {
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate(); // ✅ Initialize navigate
    const [pathname, setPathname] = useState(window.location.pathname);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.8,
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo(
                menuRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        } else {
            gsap.to(menuRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
            });
        }
    }, [isMenuOpen]);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        // { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ];

    const handleNavigation = (href) => {
        navigate(href); // ✅ Proper navigation
        setPathname(href);
        setIsMenuOpen(false);
    };

    return (
        <header
            ref={navRef}
            className="container mx-auto px-4 py-4 md:py-6 flex justify-around items-center text-white relative z-50"
        >
            {/* Logo */}
            <div
                onClick={() => handleNavigation("/")}
                className="cursor-pointer z-50 flex items-center"
            >
                <img
                    src="/logo-transparent-svg.svg" // Update this path as per your file structure
                    alt="SEU Logo"
                    className="h-16 sm:h-20 md:h-28 w-auto" // Adjust height for mobile, tablet, and desktop
                />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/15">
                <nav className="flex items-center space-x-6">
                    {navItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <span
                                onClick={() => handleNavigation(item.href)}
                                className={`cursor-pointer text-sm font-medium transition-colors hover:text-white ${pathname === item.href
                                    ? "text-white"
                                    : "text-white/60"
                                    }`}
                            >
                                {item.name}
                            </span>
                            {index < navItems.length - 1 && (
                                <span className="text-white/120 text-sm select-none">·</span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* CTA Button */}
            <button className="hidden md:inline-block rounded-full border border-white/20 hover:bg-white/10 px-4 py-2 text-sm">
            <Link to="/contact" className="block w-full h-full">Let's Collaborate</Link>
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50">
                {isMenuOpen ? (
                    <X size={24} onClick={() => setIsMenuOpen(false)} className="cursor-pointer" />
                ) : (
                    <Menu size={24} onClick={() => setIsMenuOpen(true)} className="cursor-pointer" />
                )}
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`absolute top-20 left-0 w-full px-6 bg-black/90 backdrop-blur-md border-t border-white/10 z-40 ${isMenuOpen ? "block" : "hidden"
                    }`}
            >
                <nav className="flex flex-col space-y-4 py-6">
                    {navItems.map((item, index) => (
                        <span
                            key={index}
                            onClick={() => handleNavigation(item.href)}
                            className={`cursor-pointer text-base font-medium transition-colors hover:text-white/80 ${pathname === item.href
                                ? "text-white"
                                : "text-white/60"
                                }`}
                        >
                            {item.name}
                        </span>
                    ))}
                    <button className="rounded-full border border-white/20 hover:bg-white/10 px-4 py-2 text-sm w-full mt-4">
                        Let's Collaborate
                    </button>
                </nav>
            </div>
        </header>
    );
}
