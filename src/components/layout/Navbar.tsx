import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Users, FileText, BookOpen, Briefcase, Phone, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useCompanyName } from '@/hooks/useDatabaseSettings';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeadershipOpen, setIsLeadershipOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const companyName = useCompanyName();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLeadershipToggle = () => {
    setIsLeadershipOpen(!isLeadershipOpen);
    setIsResourcesOpen(false);
  };

  const handleResourcesToggle = () => {
    setIsResourcesOpen(!isResourcesOpen);
    setIsLeadershipOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-insightBlack hover:text-insightRed transition-colors">
                {companyName}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-insightRed ${
                isActive('/') ? 'text-insightRed border-b-2 border-insightRed pb-1' : 'text-gray-700'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-insightRed ${
                isActive('/about') ? 'text-insightRed border-b-2 border-insightRed pb-1' : 'text-gray-700'
              }`}
            >
              About
            </Link>

            {/* Leadership Dropdown */}
            <div className="relative">
              <button
                onClick={handleLeadershipToggle}
                className={`flex items-center text-sm font-medium transition-colors hover:text-insightRed group ${
                  isActive('/leadership') ? 'text-insightRed' : 'text-gray-700'
                }`}
              >
                Leadership
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isLeadershipOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLeadershipOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <Link
                    to="/leadership"
                    onClick={() => setIsLeadershipOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-insightRed transition-colors"
                  >
                    <Users className="mr-3 h-4 w-4" />
                    Leadership Profiles
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={handleResourcesToggle}
                className="flex items-center text-sm font-medium text-gray-700 transition-colors hover:text-insightRed group"
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <Link
                    to="/articles"
                    onClick={() => setIsResourcesOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-insightRed transition-colors"
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    Articles & Insights
                  </Link>
                  <Link
                    to="/magazine"
                    onClick={() => setIsResourcesOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-insightRed transition-colors"
                  >
                    <BookOpen className="mr-3 h-4 w-4" />
                    Digital Magazine
                  </Link>
                  <Link
                    to="/press-releases"
                    onClick={() => setIsResourcesOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-insightRed transition-colors"
                  >
                    <Briefcase className="mr-3 h-4 w-4" />
                    Press Releases
                  </Link>
                  <Link
                    to="/documentation"
                    onClick={() => setIsResourcesOpen(false)}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-insightRed transition-colors"
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    Documentation
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-insightRed ${
                isActive('/contact') ? 'text-insightRed border-b-2 border-insightRed pb-1' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <Button className="bg-insightRed hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Subscribe
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-insightRed transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block px-3 py-3 text-base font-medium transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md ${
                  isActive('/') ? 'text-insightRed bg-red-50' : 'text-gray-700'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className={`block px-3 py-3 text-base font-medium transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md ${
                  isActive('/about') ? 'text-insightRed bg-red-50' : 'text-gray-700'
                }`}
              >
                About
              </Link>

              <Link
                to="/leadership"
                onClick={closeMenu}
                className={`flex items-center px-3 py-3 text-base font-medium transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md ${
                  isActive('/leadership') ? 'text-insightRed bg-red-50' : 'text-gray-700'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Leadership
              </Link>

              <Link
                to="/articles"
                onClick={closeMenu}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md"
              >
                <FileText className="mr-3 h-5 w-5" />
                Articles
              </Link>

              <Link
                to="/magazine"
                onClick={closeMenu}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Magazine
              </Link>

              <Link
                to="/press-releases"
                onClick={closeMenu}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md"
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Press Releases
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className={`flex items-center px-3 py-3 text-base font-medium transition-colors hover:text-insightRed hover:bg-gray-50 rounded-md ${
                  isActive('/contact') ? 'text-insightRed bg-red-50' : 'text-gray-700'
                }`}
              >
                <Phone className="mr-3 h-5 w-5" />
                Contact
              </Link>

              <div className="pt-4 pb-2">
                <Link to="/contact" onClick={closeMenu}>
                  <Button className="w-full bg-insightRed hover:bg-red-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors">
                    Subscribe
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
