import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, FilePlus, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlassMorphism } from "@/components/ui/GlassMorphism";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const researchDropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (researchDropdownRef.current && !researchDropdownRef.current.contains(event.target as Node)) {
        setResearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
    setResearchDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { 
      name: "Research", 
      path: "/research",
      hasDropdown: true,
      dropdownItems: [
        { name: "Browse Research", path: "/research", icon: <Search className="h-4 w-4 mr-2" /> },
        { name: "Submit Paper", path: "/submit-research", icon: <FilePlus className="h-4 w-4 mr-2" /> },
      ]
    },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/70 backdrop-blur-lg border-b border-white/20"
          : "bg-white/70 backdrop-blur-lg"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">EduPlatform</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.path} className="relative" ref={researchDropdownRef}>
                    <button
                      onClick={() => setResearchDropdownOpen(!researchDropdownOpen)}
                      className={cn(
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                        (location === link.path || location.startsWith('/research'))
                          ? "text-primary border-primary"
                          : "text-text-secondary hover:text-primary border-transparent hover:border-primary"
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        researchDropdownOpen && "transform rotate-180"
                      )} />
                    </button>
                    {researchDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md z-10">
                        <GlassMorphism intensity="medium" className="py-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="space-y-1 p-2">
                            {link.dropdownItems?.map((item) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-primary/10 rounded-md transition-colors duration-150"
                              >
                                {item.icon}
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </GlassMorphism>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                      location === link.path
                        ? "text-primary border-primary"
                        : "text-text-secondary hover:text-primary border-transparent hover:border-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Button>Sign In</Button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-primary focus:outline-none"
                aria-expanded="false"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "" : "hidden"} bg-white/70 backdrop-blur-lg`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div key={link.path} className="space-y-1">
                <div
                  className={cn(
                    "flex items-center justify-between pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer",
                    (location === link.path || location.startsWith('/research'))
                      ? "text-primary border-primary"
                      : "text-text-secondary hover:text-primary border-transparent hover:border-primary"
                  )}
                  onClick={() => setResearchDropdownOpen(!researchDropdownOpen)}
                >
                  {link.name}
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    researchDropdownOpen && "transform rotate-180"
                  )} />
                </div>
                {researchDropdownOpen && (
                  <div className="pl-8 space-y-1 bg-gray-50 py-2">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="flex items-center px-3 py-2 text-sm text-gray-800 hover:text-primary"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                  location === link.path
                    ? "text-primary border-primary"
                    : "text-text-secondary hover:text-primary border-transparent hover:border-primary"
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <Button className="mx-3 w-[calc(100%-24px)]">Sign In</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
