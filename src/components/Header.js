import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" data-testid="header">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img
              src="https://customer-assets.emergentagent.com/job_9afac99a-4669-4907-a27b-d6d8df89e2a2/artifacts/bkkinign_Dentis3%20Care%20Logo%20%28Small%20logo%29-01.png"
              alt="Dentis3 Care Logo"
              className="h-12 md:h-16"
            />
          </Link>

          {/* Desktop Navigation with increased spacing */}
<nav className="hidden md:flex items-center gap-14" data-testid="desktop-nav">
  {navLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className={`relative font-heading font-semibold text-lg transition-all duration-300 hover:text-primary ${
        isActive(link.path) ? 'text-primary' : 'text-secondary'
      }`}
    >
      {link.name}
    </Link>
  ))}
</nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
              data-testid="mobile-nav"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                    className={`font-heading font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 ${
                      isActive(link.path)
                        ? 'bg-accent text-primary'
                        : 'text-secondary hover:bg-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;