'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Zap,
  Sparkles,
  Crown,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring, scaleIn } from '@/lib/animations';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface PricingFeature {
  name: string;
  description?: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number | 'Custom';
  priceNote?: string;
  icon: React.ReactNode;
  cta: string;
  ctaVariant?: 'primary' | 'secondary' | 'outline';
  popular?: boolean;
  features: string[];
}

const pricingFeatures: PricingFeature[] = [
  { name: 'Core Business Brain structure', free: true, pro: true, enterprise: true },
  { name: 'Built-in slash commands', free: '10', pro: '25+', enterprise: 'Unlimited' },
  { name: 'Intake processing', free: '50/mo', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Context file generation', free: true, pro: true, enterprise: true },
  { name: 'Entity management', free: '5 entities', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'MCP integrations', free: '2', pro: '10', enterprise: 'Unlimited' },
  { name: 'Custom subagents', free: false, pro: '5', enterprise: 'Unlimited' },
  { name: 'Course access', description: 'Full 7-module course with labs', free: false, pro: true, enterprise: true },
  { name: 'Video tutorials', free: 'Basic', pro: 'All', enterprise: 'All + Private' },
  { name: 'Code playgrounds', free: false, pro: true, enterprise: true },
  { name: 'Community access', free: true, pro: true, enterprise: 'Priority' },
  { name: 'Discord support', free: false, pro: true, enterprise: 'Dedicated' },
  { name: 'Custom templates', free: false, pro: '10', enterprise: 'Unlimited' },
  { name: 'Team collaboration', free: false, pro: false, enterprise: true },
  { name: 'White-label option', free: false, pro: false, enterprise: true },
  { name: 'Priority feature requests', free: false, pro: false, enterprise: true },
  { name: '1-on-1 setup call', free: false, pro: false, enterprise: true },
];

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out the Business Brain concept',
    price: 0,
    priceNote: 'Forever free',
    icon: <Zap className="w-6 h-6" />,
    cta: 'Get Started Free',
    ctaVariant: 'outline',
    features: [
      'Core folder structure',
      '10 built-in commands',
      '50 intake files/month',
      '5 entity limit',
      '2 MCP integrations',
      'Community access',
      'Basic video tutorials',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For freelancers and small teams ready to scale',
    price: 197,
    priceNote: 'One-time payment',
    icon: <Sparkles className="w-6 h-6" />,
    cta: 'Start Learning',
    ctaVariant: 'primary',
    popular: true,
    features: [
      'Everything in Free, plus:',
      'Full 7-module course',
      'All 25+ slash commands',
      'Unlimited intake processing',
      'Unlimited entities',
      '10 MCP integrations',
      '5 custom subagents',
      'All video tutorials',
      'Code playgrounds',
      'Discord support',
      '10 custom templates',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For agencies and teams needing full customization',
    price: 'Custom',
    priceNote: 'Contact for pricing',
    icon: <Crown className="w-6 h-6" />,
    cta: 'Contact Sales',
    ctaVariant: 'secondary',
    features: [
      'Everything in Pro, plus:',
      'Unlimited subagents',
      'Unlimited MCP integrations',
      'Team collaboration',
      'White-label option',
      'Priority feature requests',
      '1-on-1 setup call',
      'Dedicated support',
      'Custom training session',
    ],
  },
];

// Pricing Card Component
interface PricingCardProps {
  tier: PricingTier;
  isAnnual?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, isAnnual }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'relative rounded-2xl border transition-all duration-300',
        tier.popular
          ? 'bg-gradient-to-b from-cyan-950/50 to-surface border-cyan-500/30 ring-2 ring-cyan-500/20'
          : 'bg-surface/50 border-white/10 hover:border-white/20'
      )}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              tier.popular
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60'
            )}
          >
            {tier.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
            <p className="text-sm text-white/40">{tier.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            {typeof tier.price === 'number' ? (
              <>
                <span className="text-4xl md:text-5xl font-bold text-white">
                  ${tier.price}
                </span>
                {tier.price > 0 && (
                  <span className="text-white/40 text-sm">USD</span>
                )}
              </>
            ) : (
              <span className="text-4xl md:text-5xl font-bold text-white">
                {tier.price}
              </span>
            )}
          </div>
          <p className="text-white/40 text-sm mt-1">{tier.priceNote}</p>
        </div>

        {/* CTA Button */}
        <MagneticButton
          className={cn(
            'w-full py-3 rounded-xl font-medium transition-all duration-300 mb-6',
            tier.ctaVariant === 'primary'
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:opacity-90'
              : tier.ctaVariant === 'secondary'
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'border border-white/20 text-white hover:bg-white/5'
          )}
        >
          {tier.cta}
        </MagneticButton>

        {/* Features List */}
        <div className="space-y-3">
          {tier.features.slice(0, isExpanded ? undefined : 5).map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                  feature.startsWith('Everything')
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                )}
              >
                <Check className="w-3 h-3" />
              </div>
              <span
                className={cn(
                  'text-sm',
                  feature.startsWith('Everything')
                    ? 'text-emerald-400 font-medium'
                    : 'text-white/70'
                )}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Expand Button */}
        {tier.features.length > 5 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-cyan-400 text-sm mt-4 hover:text-cyan-300 transition-colors"
          >
            {isExpanded ? 'Show less' : `Show ${tier.features.length - 5} more`}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={spring.default}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Feature Comparison Table
const FeatureComparisonTable: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-white/60 font-medium">
              Feature
            </th>
            <th className="text-center py-4 px-4 text-white/60 font-medium w-28">
              Free
            </th>
            <th className="text-center py-4 px-4 text-cyan-400 font-medium w-28">
              Pro
            </th>
            <th className="text-center py-4 px-4 text-white/60 font-medium w-28">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {pricingFeatures.map((feature, index) => (
            <tr
              key={index}
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">{feature.name}</span>
                  {feature.description && (
                    <button
                      onClick={() =>
                        setExpandedFeature(
                          expandedFeature === feature.name ? null : feature.name
                        )
                      }
                      className="text-white/30 hover:text-white/60"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {expandedFeature === feature.name && feature.description && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-white/40 text-xs mt-1"
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </td>
              <td className="text-center py-3 px-4">
                {renderFeatureValue(feature.free)}
              </td>
              <td className="text-center py-3 px-4 bg-cyan-500/5">
                {renderFeatureValue(feature.pro, true)}
              </td>
              <td className="text-center py-3 px-4">
                {renderFeatureValue(feature.enterprise)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderFeatureValue = (value: boolean | string, highlight = false) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
        <Check className={cn('w-4 h-4', highlight ? 'text-cyan-400' : 'text-emerald-400')} />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
        <X className="w-4 h-4 text-white/20" />
      </div>
    );
  }
  return (
    <span className={cn('text-sm', highlight ? 'text-cyan-400 font-medium' : 'text-white/60')}>
      {value}
    </span>
  );
};

// Main Pricing Table Component
interface PricingTableProps {
  showComparison?: boolean;
  className?: string;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  showComparison = true,
  className,
}) => {
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  return (
    <div className={cn('space-y-12', className)}>
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {tiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>

      {/* Toggle Comparison */}
      {showComparison && (
        <div className="text-center">
          <button
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>{showComparisonTable ? 'Hide' : 'Show'} full feature comparison</span>
            <motion.div
              animate={{ rotate: showComparisonTable ? 180 : 0 }}
              transition={spring.default}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </div>
      )}

      {/* Feature Comparison Table */}
      <AnimatePresence>
        {showComparisonTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden">
              <FeatureComparisonTable />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Money Back Guarantee */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-emerald-400 font-medium">
            30-Day Money Back Guarantee
          </span>
        </div>
        <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
          Not satisfied? Get a full refund within 30 days, no questions asked.
          We&apos;re confident you&apos;ll love it.
        </p>
      </div>
    </div>
  );
};

export default PricingTable;
