
import subStyleMarket_icon from "../assets/subStyleMarket_icon.png"
import sm_icon from "../assets/SM_icon.png"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    // const {token, user} = useSelector((state) => state.user)
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect for header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation items
    const navItems = [
        { name: 'Profile', href: '/profile', icon: '👤' },
        { name: 'Cart', href: '/cart', icon: '🛒' }
    ];

    return (
        <header className={`
            sticky top-0 z-50 transition-all duration-300 ease-in-out
            ${isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
                : 'bg-white shadow-sm border-b-2 border-gray-200'
            }
        `}>
            {/* Main Header Container */}
            <div className="w-11/12  mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="flex justify-between items-center h-16 sm:h-20">
                    
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link  to="/" className="relative group">
                            <img 
                                src={sm_icon} 
                                alt="SubStyle Market" 
                                className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 ease-in-out group-hover:scale-105 filter drop-shadow-sm"
                            />
                            {/* Animated glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="group relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-600 font-medium text-sm lg:text-base rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md transform hover:scale-105"
                            >
                                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                <span className="text-xl">{item.name}</span>
                                
                                {/* Animated underline */}
                                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="relative w-6 h-6">
                            {/* Hamburger icon with animation */}
                            <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : ''}`}></span>
                            <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : ''}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`
                    md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <nav className="pb-4 pt-2">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item, index) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 font-medium text-base rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-sm transform hover:translate-x-1"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                    
                                    {/* Arrow icon */}
                                    <svg 
                                        className="w-4 h-4 ml-auto text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Gradient border effect */}
            <div className={`
                h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transition-opacity duration-300
                ${isScrolled ? 'opacity-100' : 'opacity-0'}
            `}></div>
        </header>
    );
}