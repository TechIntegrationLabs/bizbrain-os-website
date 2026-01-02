'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Youtube, MessageCircle } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Demos', href: '/demos' },
    { label: 'Pricing', href: '/pricing' },
  ],
  resources: [
    { label: 'Course', href: '/course' },
    { label: 'Documentation', href: '/course' },
    { label: 'Community', href: '#' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-surface/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              BB<span className="text-cyan-400">OS</span>
            </Link>
            <p className="text-white/40 text-sm mb-6 max-w-xs">
              Your business, finally organized. Built with Claude Code. Powered by context.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-white/20 cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-white/20 cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-white/20 cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Tech Integration Labs LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
