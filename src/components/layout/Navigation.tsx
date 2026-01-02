'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

const navLinks = [
  { label: 'Features', href: '/features', homeAnchor: '#features' },
  { label: 'Demos', href: '/demos', homeAnchor: '#demo' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Course', href: '/course' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.span
                className="text-xl font-bold tracking-tighter cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                BB<span className="text-cyan-400">OS</span>
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                isHomePage && link.homeAnchor ? (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.homeAnchor!)}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href="/pricing">
                <MagneticButton
                  variant="secondary"
                  className="!px-4 !py-2 text-sm"
                >
                  Get Started
                </MagneticButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden pt-20"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  isHomePage && link.homeAnchor ? (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.homeAnchor!)}
                      className="text-2xl font-medium text-white/80 hover:text-white text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-medium text-white/80 hover:text-white text-left"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                <div className="pt-6 border-t border-white/10">
                  <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                    <MagneticButton className="w-full justify-center">
                      Get Started
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
