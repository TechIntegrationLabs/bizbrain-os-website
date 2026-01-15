// Homepage Components Index

// Interactive Demos (extracted from Explainer)
export { EffectivenessGraph } from './EffectivenessGraph';
export { ContextFlowDemo } from './ContextFlowDemo';
export { AutomationDemo } from './AutomationDemo';

/**
 * Homepage-Ready Components
 *
 * These components are standalone, self-contained versions of the
 * key interactive elements from the full Explainer presentation.
 *
 * They can be dropped into any section of the homepage and will:
 * - Animate when scrolled into view
 * - Work without external dependencies (no narration, no slide system)
 * - Match the website's dark theme design system
 *
 * Usage Example:
 * ```tsx
 * import { EffectivenessGraph, ContextFlowDemo, AutomationDemo } from '@/components/homepage';
 *
 * export default function HomePage() {
 *   return (
 *     <>
 *       <section className="py-24 px-6">
 *         <EffectivenessGraph />
 *       </section>
 *
 *       <section className="py-24 px-6 bg-surface">
 *         <ContextFlowDemo />
 *       </section>
 *
 *       <section className="py-24 px-6">
 *         <AutomationDemo />
 *       </section>
 *     </>
 *   );
 * }
 * ```
 */
