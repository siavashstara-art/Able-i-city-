export type BlockType = 'heading' | 'text' | 'image' | 'button';

export interface PageBlock {
  id: string;
  type: BlockType;
  content: string; // text content, heading text, or button text
  extra?: string; // e.g., image alt or button URL/action note
}

export interface SimPage {
  id: string;
  title: string;
  content: string;
  blocks?: PageBlock[];
  status: 'draft' | 'published';
  updatedAt: string;
}

export interface SimFile {
  id: string;
  name: string;
  size: string;
}

export interface SimDatabase {
  name: string;
  status: 'active' | 'empty';
  recordsCount: number;
}

export interface HostingSite {
  id: string;
  name: string;
  domain: string;
  isPublished: boolean;
  files: SimFile[];
  database: SimDatabase;
}

export type StepState =
  | 'WELCOME'
  | 'CHOOSE_MODE'
  | 'PRACTICE'
  | 'BUILD'
  | 'PUBLISH'
  | 'DONE';

export type Language = 'fa' | 'en' | 'ar' | 'es';
export type Direction = 'rtl' | 'ltr';

export interface AppState {
  currentStep: StepState;
  isOnline: boolean;
  isCheckingConnection: boolean;
  largeText: boolean;
  highContrast: boolean;
  focusMode: boolean;
  language: Language;
  liveAnnouncement: string;
}

export type AppAction =
  | { type: 'SET_STEP'; payload: StepState }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_CHECKING_CONNECTION'; payload: boolean }
  | { type: 'TOGGLE_LARGE_TEXT' }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'TOGGLE_FOCUS_MODE' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'ANNOUNCE'; payload: string };
