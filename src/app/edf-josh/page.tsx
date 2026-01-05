'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Shield,
  Database,
  Zap,
  Users,
  Target,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

import { staggerContainer, staggerItem } from '@/lib/animations';

// Table of Contents sections
const tocSections = [
  { id: 'status', title: '1. Project Status', icon: Target },
  { id: 'research', title: '2. Research Completed', icon: FileText },
  { id: 'planned', title: '3. What\'s Been Planned', icon: CheckCircle },
  { id: 'phases', title: '4. Build Plan & Phases', icon: Calendar },
  { id: 'hipaa', title: '5. HIPAA Compliance', icon: Shield },
  { id: 'opendental', title: '6. Open Dental API', icon: Database },
  { id: 'budget', title: '7. Budget Breakdown', icon: DollarSign },
  { id: 'payment', title: '8. Payment Options', icon: Clock },
  { id: 'contract', title: '9. Contract Terms', icon: FileText },
  { id: 'next', title: '10. Next Steps', icon: ArrowRight },
  { id: 'draft-contract', title: '11. Draft Contract', icon: FileText },
  { id: 'client-email', title: '12. Client Email', icon: MessageSquare },
];

const features = [
  { name: 'Chairside Recording', desc: 'Voice-to-text treatment documentation with AI assistance' },
  { name: 'Insurance Estimation', desc: 'AI-powered accuracy with historical data analysis' },
  { name: 'Treatment Plans', desc: 'Automated plan generation with insurance verification' },
  { name: 'HIPAA Compliance', desc: 'Built-in from day one - audit trails, encryption, access controls' },
  { name: 'Analytics Dashboard', desc: 'Practice performance and claim success metrics' },
];

const phases = [
  { phase: 'Phase 0', name: 'Discovery & Architecture', duration: '2-4 weeks', budget: '$10-15k', status: 'Ready' },
  { phase: 'Phase 1', name: 'Prototype & POC', duration: '4-8 weeks', budget: '$30-40k', status: 'Next' },
  { phase: 'Phase 2', name: 'MVP Development', duration: '3-4 months', budget: '$100-120k', status: 'Planned' },
  { phase: 'Phase 3', name: 'Hardening & Launch', duration: '2-3 months', budget: '$50-60k', status: 'Planned' },
];

const hipaaItems = [
  { item: 'Security Architect', cost: '$10-15k', purpose: 'Infrastructure review, threat modeling' },
  { item: 'HIPAA Consultant', cost: '$10-15k', purpose: 'Compliance audit, documentation, BAA templates' },
  { item: 'Penetration Testing', cost: '$10-15k', purpose: 'Security assessment before launch' },
  { item: 'Legal Review', cost: '$5-10k', purpose: 'BAA templates, privacy policies, terms of service' },
  { item: 'Contingency', cost: '$10-15k', purpose: 'Unexpected compliance requirements' },
];

export default function EDFJoshPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">EDF Pro Update</h1>
                <p className="text-xs text-white/40">January 5, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>For:</span>
              <span className="text-cyan-400 font-medium">Josh Dennis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-surface p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Hey Josh,</h2>
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              Wanted to bring you up to speed on where we&apos;re at with EDF Pro and get your input
              on a few key decisions before we move forward.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-surface/50 border border-white/10 p-4">
                <div className="text-sm text-white/40 mb-1">Budget</div>
                <div className="text-2xl font-bold text-cyan-400">$250,000</div>
              </div>
              <div className="rounded-xl bg-surface/50 border border-white/10 p-4">
                <div className="text-sm text-white/40 mb-1">Timeline</div>
                <div className="text-2xl font-bold text-emerald-400">9-12 months</div>
              </div>
              <div className="rounded-xl bg-surface/50 border border-white/10 p-4">
                <div className="text-sm text-white/40 mb-1">Status</div>
                <div className="text-2xl font-bold text-amber-400">Discovery</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">What I&apos;m Proposing:</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">Reserve <span className="text-white font-medium">$60,000</span> for HIPAA compliance (security consultant, HIPAA consultant, pen testing, legal)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">Split remaining <span className="text-white font-medium">$190,000</span> between us (50/50 = $95,000 each)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">Agree on payment milestone structure (<button onClick={() => scrollToSection('payment')} className="text-cyan-400 hover:underline">3 options below</button>)</span>
              </li>
            </ul>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                I Need Your Thoughts On:
              </h4>
              <ul className="text-white/70 space-y-1 text-sm">
                <li>• <button onClick={() => scrollToSection('payment')} className="text-cyan-400 hover:underline">Payment schedule preference</button></li>
                <li>• <button onClick={() => scrollToSection('hipaa')} className="text-cyan-400 hover:underline">HIPAA compliance approach</button></li>
                <li>• Any concerns about the phased approach</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-center">Table of Contents</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {tocSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-surface/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                >
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xs text-white/60 group-hover:text-white transition-colors text-center">{section.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* 1. Project Status */}
          <section id="status" className="scroll-mt-24">
            <SectionHeader number="1" title="Project Status Summary" />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <InfoCard label="Project" value="Elite Dental Force (EDF) Estimator Pro" />
              <InfoCard label="Client" value="Elite Dental Force" />
              <InfoCard label="Partners" value="Tech Integration Labs + Emerald Beacon" />
              <InfoCard label="Status" value="Discovery/Planning Phase" highlight />
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">What We&apos;ve Accomplished</h4>
            <ul className="space-y-2 mb-8">
              {[
                'Complete Product Requirements Document (PRD) - 7 comprehensive sections',
                'Technical architecture design with HIPAA-compliant infrastructure',
                'Open Dental PMS integration research and API documentation',
                'AI/LLM integration architecture for insurance estimation',
                'Risk assessment and mitigation strategies',
                'POC development plan ready to execute',
                'Design system sourced from Elite Dental Force Platform',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-white mb-4">Core Platform Features</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-surface/50 p-4">
                  <div className="font-medium text-white mb-1">{feature.name}</div>
                  <div className="text-sm text-white/50">{feature.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Research Completed */}
          <section id="research" className="scroll-mt-24">
            <SectionHeader number="2" title="Research Completed" />

            <h4 className="text-lg font-semibold text-white mb-4">Key Market Problems</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Manual insurance verification taking 15-30 minutes per patient',
                '20-30% claim denial rates due to coding errors',
                'Fragmented systems requiring multiple logins',
                'No AI-assisted estimation in current solutions',
              ].map((problem, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{problem}</span>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">Our Differentiation</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Real-time insurance verification',
                'AI-powered estimation with 90%+ target accuracy',
                'Single unified platform',
                'Voice-enabled chairside documentation',
              ].map((diff, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <Zap className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{diff}</span>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">Competitive Landscape</h4>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-surface/80">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-white/60">Competitor</th>
                    <th className="text-left p-4 text-sm font-medium text-white/60">Weakness</th>
                    <th className="text-left p-4 text-sm font-medium text-white/60">Our Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Open Dental', 'No AI, complex interface', 'AI-first, modern UX'],
                    ['Dentrix', 'Expensive, legacy tech', 'Cloud-native, affordable'],
                    ['Eaglesoft', 'Limited integrations', 'API-first architecture'],
                    ['Tab32', 'Basic estimation', 'Advanced AI estimation'],
                  ].map(([comp, weakness, adv], i) => (
                    <tr key={i} className="bg-surface/30">
                      <td className="p-4 text-white font-medium">{comp}</td>
                      <td className="p-4 text-red-400/80 text-sm">{weakness}</td>
                      <td className="p-4 text-emerald-400/80 text-sm">{adv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. What's Been Planned */}
          <section id="planned" className="scroll-mt-24">
            <SectionHeader number="3" title="What's Been Planned" />

            <h4 className="text-lg font-semibold text-white mb-4">Complete PRD Documentation</h4>
            <p className="text-white/60 mb-4">We have 7 comprehensive PRD documents totaling 4,000+ lines of specifications:</p>

            <div className="space-y-2 mb-8">
              {[
                ['01 - Executive Summary & Vision', 'Market analysis, user personas, success metrics'],
                ['02 - Technical Architecture', 'System design, security, infrastructure'],
                ['03 - Feature Specifications', 'Detailed feature requirements'],
                ['04 - Implementation Roadmap', 'Phases, timelines, budgets'],
                ['05 - Supplemental Details', 'Edge cases, integrations'],
                ['06 - Claude Code Dev Guide', 'Development workflows'],
                ['07 - Reference Implementations', 'Code patterns, examples'],
              ].map(([doc, content], i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-surface/30">
                  <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-white font-medium flex-1">{doc}</span>
                  <span className="text-white/40 text-sm">{content}</span>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">Technical Architecture Decisions</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-surface/50 p-4">
                <h5 className="text-cyan-400 font-medium mb-3">Stack</h5>
                <ul className="space-y-1 text-sm text-white/60">
                  <li><span className="text-white">Frontend:</span> React 18 + TypeScript + TailwindCSS</li>
                  <li><span className="text-white">Backend:</span> NestJS (Node.js)</li>
                  <li><span className="text-white">Database:</span> PostgreSQL with encryption</li>
                  <li><span className="text-white">AI/LLM:</span> Azure OpenAI (GPT-4)</li>
                  <li><span className="text-white">Speech:</span> Deepgram Nova-3</li>
                  <li><span className="text-white">Cloud:</span> AWS primary, Azure for AI</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-surface/50 p-4">
                <h5 className="text-cyan-400 font-medium mb-3">Security Architecture</h5>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>Zero-trust network model</li>
                  <li>End-to-end encryption</li>
                  <li>PHI sanitization pipeline for AI calls</li>
                  <li>Comprehensive audit logging</li>
                  <li>Role-based access control</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Build Plan & Phases */}
          <section id="phases" className="scroll-mt-24">
            <SectionHeader number="4" title="Build Plan & Phases" />

            <div className="space-y-4 mb-8">
              {phases.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-xl border p-6 ${
                    p.status === 'Ready'
                      ? 'border-cyan-500/50 bg-cyan-500/5'
                      : p.status === 'Next'
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-white/10 bg-surface/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded-md bg-white/10 text-xs font-mono text-white/60">{p.phase}</span>
                      <h4 className="text-lg font-semibold text-white">{p.name}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === 'Ready' ? 'bg-cyan-500/20 text-cyan-400' :
                      p.status === 'Next' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-white/50">
                      <Clock className="w-4 h-4" />
                      {p.duration}
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <DollarSign className="w-4 h-4" />
                      {p.budget}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Phase 1 Success Criteria</h4>
              <ul className="space-y-2">
                {[
                  'Connect to Open Dental test instance',
                  'Estimate simple procedures with 70%+ accuracy',
                  'Demonstrate HIPAA-compliant data handling',
                ].map((criteria, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                      <span className="text-xs text-white/40">{i + 1}</span>
                    </div>
                    <span className="text-white/70">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 5. HIPAA Compliance */}
          <section id="hipaa" className="scroll-mt-24">
            <SectionHeader number="5" title="HIPAA Compliance Strategy" />

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 mb-8">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Why $60,000 Reserved
              </h4>
              <p className="text-white/70">
                HIPAA compliance is non-negotiable for healthcare software. This reserve covers all compliance-related expenses:
              </p>
            </div>

            <div className="rounded-xl border border-white/10 overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-surface/80">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-white/60">Item</th>
                    <th className="text-left p-4 text-sm font-medium text-white/60">Est. Cost</th>
                    <th className="text-left p-4 text-sm font-medium text-white/60">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {hipaaItems.map((item, i) => (
                    <tr key={i} className="bg-surface/30">
                      <td className="p-4 text-white font-medium">{item.item}</td>
                      <td className="p-4 text-cyan-400">{item.cost}</td>
                      <td className="p-4 text-white/60 text-sm">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
              <h4 className="text-cyan-400 font-semibold mb-4">AI and PHI - Critical Architecture</h4>
              <p className="text-white/70 mb-4">
                We cannot send raw PHI to AI models. Our architecture includes a sanitization pipeline:
              </p>
              <div className="flex items-center justify-center gap-2 py-4 font-mono text-sm">
                <span className="px-3 py-2 rounded-lg bg-surface border border-white/10 text-white">Patient Data</span>
                <ArrowRight className="w-4 h-4 text-white/40" />
                <span className="px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400">PHI Sanitizer</span>
                <ArrowRight className="w-4 h-4 text-white/40" />
                <span className="px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">AI Processing</span>
                <ArrowRight className="w-4 h-4 text-white/40" />
                <span className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">Results</span>
              </div>
              <p className="text-center text-white/50 text-sm mt-2">
                Patient identifiers never reach external AI services
              </p>
            </div>
          </section>

          {/* 6. Open Dental API */}
          <section id="opendental" className="scroll-mt-24">
            <SectionHeader number="6" title="Open Dental API Integration" />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Why Open Dental First</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Open source with well-documented API
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Large market share in target practices
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Active developer community
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    No per-seat licensing costs for integration
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Key Endpoints</h4>
                <ul className="space-y-2 font-mono text-sm">
                  {[
                    ['/patients', 'Patient demographics'],
                    ['/appointments', 'Scheduling data'],
                    ['/procedures', 'Treatment codes and fees'],
                    ['/claims', 'Insurance claim data'],
                    ['/insuranceplans', 'Plan details and coverage'],
                    ['/benefits', 'Specific benefit breakdowns'],
                  ].map(([endpoint, desc], i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-cyan-400">{endpoint}</span>
                      <span className="text-white/40 text-xs">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">EDI/Clearinghouse Integration</h4>
              <p className="text-white/60 mb-4">For real-time insurance verification via DentalXChange:</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ['270/271', 'Eligibility inquiry/response'],
                  ['837D', 'Dental claim submission'],
                  ['835', 'Payment/remittance'],
                ].map(([code, desc], i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-surface border border-white/5">
                    <div className="text-xl font-mono text-cyan-400 mb-1">{code}</div>
                    <div className="text-xs text-white/40">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Budget Breakdown */}
          <section id="budget" className="scroll-mt-24">
            <SectionHeader number="7" title="Budget Breakdown" />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-surface p-6">
                <div className="text-sm text-white/40 mb-2">HIPAA Compliance Reserve</div>
                <div className="text-4xl font-bold text-amber-400 mb-2">$60,000</div>
                <div className="text-sm text-white/50">Security, legal, audits, pen testing</div>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-surface p-6">
                <div className="text-sm text-white/40 mb-2">Development Budget</div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">$190,000</div>
                <div className="text-sm text-white/50">TIL + Emerald Beacon split</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/50 p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Development Split</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 rounded-xl border border-white/10 bg-surface/50">
                  <div className="text-sm text-white/40 mb-1">Tech Integration Labs</div>
                  <div className="text-3xl font-bold text-white mb-1">$95,000</div>
                  <div className="text-sm text-cyan-400">50%</div>
                </div>
                <div className="text-center p-6 rounded-xl border border-white/10 bg-surface/50">
                  <div className="text-sm text-white/40 mb-1">Emerald Beacon</div>
                  <div className="text-3xl font-bold text-white mb-1">$95,000</div>
                  <div className="text-sm text-emerald-400">50%</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="bg-surface/80 p-4 border-b border-white/10">
                <h4 className="font-semibold text-white">Phase-Based Budget Allocation</h4>
              </div>
              <div className="p-4 space-y-3">
                {[
                  ['Phase 0: Discovery', '$10-15k', '5-8%', 8],
                  ['Phase 1: Prototype', '$30-40k', '16-21%', 21],
                  ['Phase 2: MVP', '$100-120k', '53-63%', 63],
                  ['Phase 3: Hardening', '$50-60k', '26-32%', 32],
                ].map(([phase, budget, pct, width], i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{phase}</span>
                      <span className="text-white font-medium">{budget}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Payment Options */}
          <section id="payment" className="scroll-mt-24">
            <SectionHeader number="8" title="Payment Options" />

            <div className="space-y-6 mb-8">
              {/* Option A */}
              <div className="rounded-xl border border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-surface p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">A</span>
                    <h4 className="text-lg font-semibold text-white">Phase-Based Milestones</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">Recommended</span>
                </div>
                <p className="text-white/60 mb-4">Payments tied to phase completion with defined deliverables.</p>
                <div className="space-y-2 mb-4">
                  {[
                    ['Project Kickoff', '$50,000 (20%)', 'Contract signed, Phase 0 start'],
                    ['POC Complete', '$50,000 (20%)', 'Phase 1 deliverables accepted'],
                    ['MVP Alpha', '$75,000 (30%)', 'Core features functional'],
                    ['MVP Beta', '$50,000 (20%)', 'User testing complete'],
                    ['Launch', '$25,000 (10%)', 'Production deployment'],
                  ].map(([milestone, amount, trigger], i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-white/5">
                      <span className="text-white font-medium">{milestone}</span>
                      <span className="text-cyan-400 font-mono">{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-emerald-400">+ Clear deliverable gates</span>
                  <span className="text-emerald-400">+ Predictable cash flow</span>
                </div>
              </div>

              {/* Option B */}
              <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 font-bold">B</span>
                  <h4 className="text-lg font-semibold text-white">Monthly Retainer + Milestones</h4>
                </div>
                <p className="text-white/60 mb-4">Steady monthly payments with milestone bonuses.</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-lg bg-surface border border-white/5">
                    <div className="text-sm text-white/40 mb-1">Monthly Retainer</div>
                    <div className="text-2xl font-bold text-white">$15,000/mo</div>
                    <div className="text-sm text-white/40">10 months = $150,000</div>
                  </div>
                  <div className="p-4 rounded-lg bg-surface border border-white/5">
                    <div className="text-sm text-white/40 mb-1">Milestone Bonuses</div>
                    <div className="text-2xl font-bold text-white">$100,000</div>
                    <div className="text-sm text-white/40">4 milestones @ $25k each</div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-emerald-400">+ Predictable monthly income</span>
                  <span className="text-amber-400">- Longer payment timeline</span>
                </div>
              </div>

              {/* Option C */}
              <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 font-bold">C</span>
                  <h4 className="text-lg font-semibold text-white">Quarterly with Deliverables</h4>
                </div>
                <p className="text-white/60 mb-4">Larger quarterly payments tied to major milestones.</p>
                <div className="space-y-2 mb-4">
                  {[
                    ['Q1', '$75,000 (30%)', 'Discovery + POC complete'],
                    ['Q2', '$75,000 (30%)', 'MVP core features'],
                    ['Q3', '$62,500 (25%)', 'MVP complete + testing'],
                    ['Q4', '$37,500 (15%)', 'Launch + handoff'],
                  ].map(([quarter, amount, deliverables], i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-white/5">
                      <span className="text-white font-medium">{quarter}</span>
                      <span className="text-white/60 text-sm flex-1 text-center">{deliverables}</span>
                      <span className="text-white/60 font-mono">{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-emerald-400">+ Fewer payment events</span>
                  <span className="text-amber-400">- Large payments require client cash flow</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <h4 className="text-emerald-400 font-semibold mb-2">My Recommendation</h4>
              <p className="text-white/70">
                <strong className="text-white">Option A (Phase-Based)</strong> provides the clearest alignment between payment and deliverables.
                Each payment has specific acceptance criteria. However, if Elite Dental Force prefers smaller regular payments,
                <strong className="text-white"> Option B</strong> works well for them while still protecting us with milestone gates.
              </p>
            </div>
          </section>

          {/* 9. Contract Terms */}
          <section id="contract" className="scroll-mt-24">
            <SectionHeader number="9" title="Contract Terms" />

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                ['MSA', 'Master Service Agreement', 'Overall relationship terms'],
                ['SOW', 'Statement of Work', 'EDF Pro specific scope, timeline, budget'],
                ['BAA', 'Business Associate Agreement', 'HIPAA compliance (required)'],
              ].map(([abbr, title, desc], i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-surface/50 p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{abbr}</div>
                  <div className="text-white font-medium text-sm mb-1">{title}</div>
                  <div className="text-white/40 text-xs">{desc}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Key Terms to Include</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-cyan-400 font-medium mb-2">Intellectual Property</h5>
                    <ul className="text-sm text-white/60 space-y-1">
                      <li>• Client owns the final product</li>
                      <li>• We retain rights to reusable components</li>
                      <li>• AI models remain with respective providers</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-cyan-400 font-medium mb-2">Warranties</h5>
                    <ul className="text-sm text-white/60 space-y-1">
                      <li>• 90-day bug fix warranty post-launch</li>
                      <li>• Security vulnerability response SLA</li>
                      <li>• Performance guarantees (uptime, response)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-surface/50 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">BAA Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    Signed BAA before accessing any patient data
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    Incident response procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    Breach notification (60 days HIPAA requirement)
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    Audit rights for covered entity
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 10. Next Steps */}
          <section id="next" className="scroll-mt-24">
            <SectionHeader number="10" title="Next Steps" />

            <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-surface p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Immediate Actions Needed</h4>
              <ul className="space-y-3">
                {[
                  ['Your Feedback', 'on this document - any concerns or questions?'],
                  ['Payment Schedule', 'which option works best for you and the client?'],
                  ['Contract Review', 'should we draft the MSA/SOW next?'],
                  ['Client Meeting', 'when should we present this to Elite Dental Force?'],
                ].map(([action, desc], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-medium flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/70">
                      <strong className="text-white">{action}</strong> {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/50 p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Proposed Timeline</h4>
              <div className="space-y-3">
                {[
                  ['This Week', 'Finalize partnership terms (you + me)'],
                  ['Next Week', 'Draft contracts for client review'],
                  ['Week 3', 'Client presentation and negotiation'],
                  ['Week 4', 'Contract signing, Phase 0 kickoff'],
                ].map(([week, action], i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-cyan-400 font-medium">{week}</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/70">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
              <h4 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Questions for You
              </h4>
              <ol className="space-y-2 text-white/70 list-decimal list-inside">
                <li>Are you comfortable with the 50/50 split on the $190k dev budget?</li>
                <li>Any concerns about the $60k HIPAA reserve being sufficient?</li>
                <li>Who handles client communication primarily - you or me or both?</li>
                <li>Do you have preferred legal counsel for contract review?</li>
              </ol>
            </div>
          </section>

          {/* 11. Draft Contract */}
          <section id="draft-contract" className="scroll-mt-24">
            <SectionHeader number="11" title="Draft Contract Preview" />

            <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden mb-8">
              {/* Contract Header */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border-b border-white/10 p-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2">STATEMENT OF WORK</h4>
                  <p className="text-white/60">EDF Estimator Pro Development</p>
                  <p className="text-sm text-white/40 mt-2">SOW-2026-EDF-001 | Draft v1.0</p>
                </div>
              </div>

              {/* Contract Body */}
              <div className="p-6 space-y-6">
                {/* Parties */}
                <div>
                  <h5 className="text-cyan-400 font-semibold mb-3 uppercase text-sm tracking-wider">Parties</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-surface border border-white/5">
                      <div className="text-xs text-white/40 mb-1">SERVICE PROVIDER</div>
                      <div className="text-white font-medium">Tech Integration Labs LLC & Emerald Beacon</div>
                      <div className="text-white/50 text-sm">Joint Venture Partners</div>
                    </div>
                    <div className="p-4 rounded-lg bg-surface border border-white/5">
                      <div className="text-xs text-white/40 mb-1">CLIENT</div>
                      <div className="text-white font-medium">Elite Dental Force</div>
                      <div className="text-white/50 text-sm">[Client Address]</div>
                    </div>
                  </div>
                </div>

                {/* Scope */}
                <div>
                  <h5 className="text-cyan-400 font-semibold mb-3 uppercase text-sm tracking-wider">Scope of Work</h5>
                  <div className="p-4 rounded-lg bg-surface border border-white/5 space-y-3">
                    <p className="text-white/70">
                      Development of a HIPAA-compliant dental practice management platform (&quot;EDF Estimator Pro&quot;) including:
                    </p>
                    <ul className="space-y-2 text-white/60 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">1.</span>
                        AI-powered insurance estimation engine with 90%+ accuracy target
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">2.</span>
                        Voice-to-text chairside recording with treatment documentation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">3.</span>
                        Open Dental PMS integration (read/write synchronization)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">4.</span>
                        EDI/Clearinghouse integration for real-time eligibility verification
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">5.</span>
                        Full HIPAA compliance including security audit and penetration testing
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h5 className="text-cyan-400 font-semibold mb-3 uppercase text-sm tracking-wider">Timeline & Milestones</h5>
                  <div className="space-y-2">
                    {[
                      ['Phase 0', 'Discovery & Architecture', '2-4 weeks', 'Kickoff + 1 month'],
                      ['Phase 1', 'Prototype & POC', '4-8 weeks', 'Kickoff + 3 months'],
                      ['Phase 2', 'MVP Development', '3-4 months', 'Kickoff + 7 months'],
                      ['Phase 3', 'Hardening & Launch', '2-3 months', 'Kickoff + 10 months'],
                    ].map(([phase, name, duration, target], i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-cyan-400 w-16">{phase}</span>
                          <span className="text-white">{name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-white/40">{duration}</span>
                          <span className="text-white/60">{target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compensation */}
                <div>
                  <h5 className="text-cyan-400 font-semibold mb-3 uppercase text-sm tracking-wider">Compensation</h5>
                  <div className="p-4 rounded-lg bg-surface border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60">Total Project Investment</span>
                      <span className="text-2xl font-bold text-white">$250,000 USD</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Project Kickoff (20%)</span>
                        <span className="text-white">$50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">POC Complete (20%)</span>
                        <span className="text-white">$50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">MVP Alpha (30%)</span>
                        <span className="text-white">$75,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">MVP Beta (20%)</span>
                        <span className="text-white">$50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Launch (10%)</span>
                        <span className="text-white">$25,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warranties */}
                <div>
                  <h5 className="text-cyan-400 font-semibold mb-3 uppercase text-sm tracking-wider">Warranties & Support</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-surface border border-white/5 text-center">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">90</div>
                      <div className="text-xs text-white/40">Day Bug Fix Warranty</div>
                    </div>
                    <div className="p-4 rounded-lg bg-surface border border-white/5 text-center">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">99.9%</div>
                      <div className="text-xs text-white/40">Uptime SLA Target</div>
                    </div>
                    <div className="p-4 rounded-lg bg-surface border border-white/5 text-center">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">24hr</div>
                      <div className="text-xs text-white/40">Critical Issue Response</div>
                    </div>
                  </div>
                </div>

                {/* Signatures Placeholder */}
                <div className="border-t border-white/10 pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-xs text-white/40 mb-4">SERVICE PROVIDER</div>
                      <div className="border-b border-white/20 pb-2 mb-2 h-12"></div>
                      <div className="text-white text-sm">Tech Integration Labs LLC</div>
                      <div className="text-white/50 text-xs">Date: _____________</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 mb-4">CLIENT</div>
                      <div className="border-b border-white/20 pb-2 mb-2 h-12"></div>
                      <div className="text-white text-sm">Elite Dental Force</div>
                      <div className="text-white/50 text-xs">Date: _____________</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-amber-400 text-sm">
                <strong>Note:</strong> This is a draft preview. The final contract will include full legal terms,
                HIPAA-specific clauses, IP assignment details, and the required Business Associate Agreement (BAA).
              </p>
            </div>
          </section>

          {/* 12. Sample Client Email */}
          <section id="client-email" className="scroll-mt-24">
            <SectionHeader number="12" title="Sample Client Email" />

            <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-surface p-4 mb-6">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Purpose</span>
              </div>
              <p className="text-white/70 text-sm">
                This email addresses the client&apos;s concerns about our backend development capabilities and
                ability to integrate with their existing systems. Feel free to customize as needed.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
              {/* Email Header */}
              <div className="bg-surface/80 border-b border-white/10 p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="text-white/40 w-16">To:</span>
                    <span className="text-white">[Elite Dental Force Contact]</span>
                  </div>
                  <div className="flex">
                    <span className="text-white/40 w-16">From:</span>
                    <span className="text-white">Josh Dennis, Emerald Beacon</span>
                  </div>
                  <div className="flex">
                    <span className="text-white/40 w-16">Subject:</span>
                    <span className="text-white font-medium">EDF Pro Development - Addressing Your Technical Questions</span>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-6 space-y-4 text-white/80 leading-relaxed">
                <p>Hi [Name],</p>

                <p>
                  Thank you for sharing your concerns about the technical requirements for EDF Estimator Pro.
                  I wanted to take a moment to address these directly, because I understand how critical it is
                  that you have complete confidence in our team&apos;s capabilities before moving forward.
                </p>

                <div className="rounded-lg bg-surface border border-white/10 p-4 my-6">
                  <h5 className="text-cyan-400 font-semibold mb-3">Regarding Backend Development</h5>
                  <p className="text-white/70 text-sm mb-3">
                    I want to be absolutely clear: <strong className="text-white">backend development is our core competency</strong>.
                    Tech Integration Labs has delivered production systems handling:
                  </p>
                  <ul className="space-y-1 text-sm text-white/60">
                    <li>• <strong className="text-white">Healthcare integrations</strong> with HIPAA-compliant data handling</li>
                    <li>• <strong className="text-white">Real-time API integrations</strong> with third-party platforms</li>
                    <li>• <strong className="text-white">Database architectures</strong> processing millions of records</li>
                    <li>• <strong className="text-white">AI/ML pipelines</strong> with Azure OpenAI and similar enterprise services</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-surface border border-white/10 p-4 my-6">
                  <h5 className="text-cyan-400 font-semibold mb-3">Regarding Open Dental Integration</h5>
                  <p className="text-white/70 text-sm mb-3">
                    We&apos;ve already completed extensive research on the Open Dental API:
                  </p>
                  <ul className="space-y-1 text-sm text-white/60">
                    <li>• Documented all required endpoints (patients, appointments, procedures, claims, benefits)</li>
                    <li>• Understood the authentication model (Developer Key + Customer Key)</li>
                    <li>• Planned the EDI/Clearinghouse integration via DentalXChange for real-time eligibility</li>
                    <li>• Designed a bidirectional sync architecture for production use</li>
                  </ul>
                  <p className="text-white/70 text-sm mt-3">
                    Our POC phase specifically includes a <strong className="text-white">working connection to an Open Dental test instance</strong>
                    as a success criterion before we proceed to MVP development.
                  </p>
                </div>

                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 my-6">
                  <h5 className="text-emerald-400 font-semibold mb-3">Our Technical Approach</h5>
                  <p className="text-white/70 text-sm">
                    The system architecture includes:
                  </p>
                  <ul className="space-y-1 text-sm text-white/60 mt-2">
                    <li>• <strong className="text-white">NestJS backend</strong> (Node.js) with TypeScript</li>
                    <li>• <strong className="text-white">PostgreSQL database</strong> with encryption at rest</li>
                    <li>• <strong className="text-white">Azure OpenAI integration</strong> for HIPAA-compliant AI processing</li>
                    <li>• <strong className="text-white">PHI sanitization pipeline</strong> ensuring patient data never reaches external AI</li>
                    <li>• <strong className="text-white">AWS infrastructure</strong> with enterprise-grade security</li>
                  </ul>
                </div>

                <p>
                  I understand that you may have received feedback suggesting otherwise, but I can confidently say
                  that this project is well within our wheelhouse. We&apos;ve invested significant time in planning
                  specifically because we take HIPAA compliance and system integration seriously.
                </p>

                <p>
                  <strong className="text-white">Here&apos;s what I propose:</strong> Let&apos;s schedule a technical deep-dive call
                  where William (our technical lead) can walk through the architecture, answer any specific questions,
                  and demonstrate our understanding of the Open Dental integration requirements. We can also discuss
                  the POC success criteria so you have clear checkpoints before committing to the full MVP budget.
                </p>

                <p>
                  The milestone-based payment structure means you only pay as we deliver. If the POC doesn&apos;t meet
                  the agreed criteria (including Open Dental connectivity), we don&apos;t move forward. This protects
                  your investment while giving us the opportunity to prove our capabilities.
                </p>

                <p>
                  Would you be available for a call this week or early next week? I&apos;m confident that once we
                  walk through the technical details together, any concerns will be addressed.
                </p>

                <p className="mt-6">
                  Best regards,<br />
                  <strong className="text-white">Josh Dennis</strong><br />
                  <span className="text-cyan-400">Emerald Beacon</span>
                </p>

                <div className="border-t border-white/10 pt-4 mt-6">
                  <p className="text-white/40 text-xs">
                    P.S. - I&apos;ve attached a summary document with our complete project plan, budget breakdown,
                    and technical architecture overview. Happy to discuss any section in detail.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <h5 className="text-emerald-400 font-semibold mb-2">Key Points This Email Addresses:</h5>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• <strong className="text-white">Backend capability misconception</strong> - Directly states it&apos;s our core competency</li>
                <li>• <strong className="text-white">Integration concerns</strong> - Shows we&apos;ve already done the research</li>
                <li>• <strong className="text-white">Risk mitigation</strong> - Highlights milestone-based payment protection</li>
                <li>• <strong className="text-white">Proof opportunity</strong> - Offers technical deep-dive and POC validation</li>
                <li>• <strong className="text-white">Professional confidence</strong> - Assertive without being defensive</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-12 border-t border-white/10">
            <p className="text-white/40 text-sm mb-2">
              Looking forward to your thoughts, Josh. Let&apos;s get this locked in and moving.
            </p>
            <p className="text-white font-medium">
              William Welsh
            </p>
            <p className="text-cyan-400 text-sm">
              Tech Integration Labs LLC
            </p>
            <p className="text-white/30 text-xs mt-4">
              Document Generated: January 5, 2026 | EDF-Pro v1.0
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Components
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
        <span className="text-white font-bold">{number}</span>
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
  );
}

function InfoCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 bg-surface/50'}`}>
      <div className="text-sm text-white/40 mb-1">{label}</div>
      <div className={`font-medium ${highlight ? 'text-cyan-400' : 'text-white'}`}>{value}</div>
    </div>
  );
}
