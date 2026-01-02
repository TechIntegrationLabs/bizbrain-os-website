'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Shield,
  Clock,
  Mail,
  Zap,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const benefits = [
  '7-module comprehensive course',
  'Full source code & templates',
  'Lifetime updates',
  '30-day money-back guarantee',
];

const urgencyItems = [
  { icon: Clock, text: 'Launch pricing ends soon' },
  { icon: Zap, text: 'Immediate access' },
  { icon: Shield, text: 'Risk-free guarantee' },
];

export function FinalCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubscribed(true);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-surface to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-surface via-surface to-cyan-950/20 p-8 md:p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full" />

            {/* Content */}
            <div className="relative">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400 font-medium">Limited Time Offer</span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Ready to Build Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Business Brain?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/60 mb-8 max-w-2xl"
              >
                Join the next cohort and transform how you run your business with AI-powered operations.
              </motion.p>

              {/* Benefits list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
              >
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link
                  href="/course"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Get the Course
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/demos"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Terminal className="w-4 h-4" />
                  Try the Demos First
                </Link>
              </motion.div>

              {/* Urgency indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 text-sm text-white/40"
              >
                {urgencyItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-white/20" />
                      {item.text}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            Not ready yet? Get the free guide.
          </h3>
          <p className="text-white/60 mb-6">
            5-part email series on building your first Business Brain.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all',
                  isSubmitting
                    ? 'bg-cyan-500/50 text-white/50 cursor-wait'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                )}
              >
                {isSubmitting ? 'Sending...' : 'Get Guide'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
            >
              <CheckCircle className="w-5 h-5" />
              Check your inbox! The guide is on its way.
            </motion.div>
          )}

          <p className="text-xs text-white/30 mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
