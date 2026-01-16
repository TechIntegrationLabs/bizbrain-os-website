'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Zap,
  Building2,
  HelpCircle,
  ChevronDown,
  Star,
  Shield,
  Clock,
  Users,
  MessageCircle,
  BookOpen,
  Code,
  Headphones,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { FAQAccordion, FAQItem } from '@/components/ui/FAQAccordion';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number | string;
  originalPrice?: number;
  period: string;
  icon: React.ElementType;
  color: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  cta: string;
  ctaLink: string;
}

const tiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for freelancers getting started with AI operations',
    price: 0,
    period: 'forever',
    icon: Sparkles,
    color: '#06b6d4',
    features: [
      { text: 'Core folder structure', included: true },
      { text: 'Basic slash commands (10)', included: true },
      { text: 'Intake processing', included: true },
      { text: 'Version control basics', included: true },
      { text: 'Community Discord access', included: true },
      { text: 'Advanced MCP integrations', included: false },
      { text: 'Full course access', included: false },
      { text: 'Enterprise templates', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started Free',
    ctaLink: '/course',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Complete Business Brain system with full course',
    price: 297,
    originalPrice: 497,
    period: 'one-time',
    icon: Zap,
    color: '#10b981',
    popular: true,
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Full 7-module course', included: true, highlight: true },
      { text: 'All 25+ slash commands', included: true },
      { text: '19 MCP integrations', included: true },
      { text: 'Entity system (CRM)', included: true },
      { text: 'Document generation', included: true },
      { text: 'Time tracking system', included: true },
      { text: 'Content Factory', included: true },
      { text: 'Lifetime updates', included: true, highlight: true },
      { text: 'Priority support (6 months)', included: true },
    ],
    cta: 'Get Pro Access',
    ctaLink: '/course',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom implementation for teams and agencies',
    price: 'Custom',
    period: 'contact',
    icon: Building2,
    color: '#8b5cf6',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Custom implementation', included: true, highlight: true },
      { text: 'Team training sessions', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated support', included: true, highlight: true },
      { text: 'SLA guarantees', included: true },
      { text: 'Custom templates', included: true },
      { text: 'White-label options', included: true },
      { text: 'On-site consulting', included: true },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Is this a SaaS or a one-time purchase?',
    answer: 'The Pro tier is a one-time purchase. You get lifetime access to the course, templates, and all future updates. No recurring fees.',
  },
  {
    question: 'What exactly do I get with the course?',
    answer: 'You get the complete 7-module course covering everything from setup to advanced automation. Plus, you get all the source code, templates, MCP configurations, and the full Business Brain folder structure.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'Basic familiarity with command line helps, but the course is designed to be accessible. We walk through everything step-by-step, and the system works with natural language commands.',
  },
  {
    question: 'What if I\'m not satisfied?',
    answer: 'We offer a 30-day money-back guarantee. If the Business Brain system isn\'t working for you, just reach out and we\'ll refund your purchase.',
  },
  {
    question: 'Can I use this with my existing tools?',
    answer: 'Yes! The MCP integration system connects with Notion, Google Suite, GoHighLevel, and many more. We also show you how to build custom integrations.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Basic setup takes about 30 minutes. Full implementation with all integrations typically takes 2-3 hours. The course guides you through everything.',
  },
];

const guarantees = [
  { icon: Shield, text: '30-day money-back guarantee' },
  { icon: Clock, text: 'Lifetime updates included' },
  { icon: Headphones, text: '6 months priority support' },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div className="w-px h-6 bg-white/10" />
              <h1 className="font-semibold text-white">Pricing</h1>
            </div>

            <Link
              href="/features"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              View Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Launch Pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Simple,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Transparent
            </span>{' '}
            Pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            One-time purchase. Lifetime access. No subscriptions.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {tiers.map((tier, index) => {
            const Icon = tier.icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className={cn(
                  'relative rounded-2xl border overflow-hidden',
                  tier.popular
                    ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-surface'
                    : 'border-white/10 bg-surface/50'
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 py-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-center text-sm text-white font-medium">
                    Most Popular
                  </div>
                )}

                <div className={cn('p-6', tier.popular && 'pt-12')}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tier.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tier.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                      <p className="text-sm text-white/40">{tier.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {typeof tier.price === 'number' ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          ${tier.price}
                        </span>
                        {tier.originalPrice && (
                          <span className="text-lg text-white/40 line-through">
                            ${tier.originalPrice}
                          </span>
                        )}
                        <span className="text-white/40">/{tier.period}</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-white">{tier.price}</div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={tier.ctaLink}
                    className={cn(
                      'block w-full py-3 rounded-xl font-semibold text-center transition-all',
                      tier.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-emerald-500/25'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    )}
                  >
                    {tier.cta}
                  </Link>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    {tier.features.map((feature, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex items-start gap-3 text-sm',
                          feature.included ? 'text-white/80' : 'text-white/30'
                        )}
                      >
                        {feature.included ? (
                          <Check className={cn(
                            'w-5 h-5 flex-shrink-0 mt-0.5',
                            feature.highlight ? 'text-emerald-400' : 'text-white/40'
                          )} />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-white/20" />
                        )}
                        <span className={feature.highlight ? 'text-white font-medium' : ''}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {guarantees.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60"
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                {item.text}
              </div>
            );
          })}
        </motion.div>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Compare Plans
          </h2>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-white/5 border-b border-white/10">
              <div className="text-sm font-medium text-white/40">Feature</div>
              {tiers.map(tier => (
                <div key={tier.id} className="text-center text-sm font-medium text-white">
                  {tier.name}
                </div>
              ))}
            </div>

            {[
              { name: 'Slash Commands', starter: '10', pro: '25+', enterprise: '25+' },
              { name: 'MCP Integrations', starter: '3', pro: '19', enterprise: 'Custom' },
              { name: 'Course Modules', starter: '-', pro: '7', enterprise: '7' },
              { name: 'Entity System', starter: '-', pro: '✓', enterprise: '✓' },
              { name: 'Document Generation', starter: '-', pro: '✓', enterprise: '✓' },
              { name: 'Time Tracking', starter: '-', pro: '✓', enterprise: '✓' },
              { name: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
              { name: 'Updates', starter: '-', pro: 'Lifetime', enterprise: 'Lifetime' },
            ].map((row, i) => (
              <div
                key={i}
                className={cn(
                  'grid grid-cols-4 gap-4 p-4',
                  i % 2 === 0 ? 'bg-white/[0.02]' : ''
                )}
              >
                <div className="text-sm text-white/60">{row.name}</div>
                <div className="text-center text-sm text-white/40">{row.starter}</div>
                <div className="text-center text-sm text-white">{row.pro}</div>
                <div className="text-center text-sm text-white">{row.enterprise}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqs} />
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-16 border-t border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to transform your operations?
          </h3>
          <p className="text-white/60 mb-8">
            Join hundreds of professionals already using the Business Brain.
          </p>
          <Link
            href="/course"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
