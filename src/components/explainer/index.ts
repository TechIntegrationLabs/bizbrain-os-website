// Explainer Components Index

// UI Components
export { BusinessBrainIcon, AICoreIcon, BridgeIcon, FlowArrow } from './ui/Icons';
export { NarrationControls, playNarration, stopNarration, useNarrationStore } from './ui/Narration';

// Slide Components
export { IntroSlide } from './slides/IntroSlide';
export { GraphSlide } from './slides/GraphSlide';
export { ProblemSlide } from './slides/ProblemSlide';
export { MissingPieceSlide } from './slides/MissingPieceSlide';
export { HowItWorksSlide } from './slides/HowItWorksSlide';
export { AutomationSlide } from './slides/AutomationSlide';
export { CaseStudySlide } from './slides/CaseStudySlide';
export { StrategicSlide } from './slides/StrategicSlide';
export { GuaranteeSlide } from './slides/GuaranteeSlide';
export { OfferSlide } from './slides/OfferSlide';

// Slide Order for Explainer
export const SLIDE_ORDER = [
  'intro',
  'graph',
  'problem',
  'missingPiece',
  'howItWorks',
  'automation',
  'caseStudy',
  'strategic',
  'guarantee',
  'offer',
] as const;

export type SlideKey = typeof SLIDE_ORDER[number];
