/**
 * Type definitions for Prompt Organizer
 * @module types/prompt-organizer
 */

export type TaskStatus = 'pendiente' | 'progreso' | 'hecho';
export type TaskPriority = 'crítica' | 'alta' | 'media' | 'baja';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt?: number;
  updatedAt?: number;
}

export interface Template {
  id: string;
  category: TemplateCategory;
  title: string;
  body: string;
  favorite: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export type TemplateCategory = 'bugs' | 'audit' | 'tasks' | 'safe' | 'ux' | 'release' | 'custom';

export interface CategoryInfo {
  id: TemplateCategory;
  label: string;
  icon: string;
  description?: string;
}

export interface PromptVariables {
  projectName: string;
  repo: string;
  url: string;
  stack: string;
  goal: string;
  context: string;
}

export type SortOption = 'default' | 'alpha' | 'favorites' | 'recent';

export interface AppState {
  templates: Template[];
  selectedId: string | null;
  vars: PromptVariables;
  tasks: Task[];
  activeCategory: TemplateCategory | 'all';
  sortBy: SortOption;
  searchQuery: string;
  customPrompt: string;
}

export interface StorageData {
  templates: Template[];
  selectedId: string | null;
  vars: PromptVariables;
  tasks: Task[];
  activeCategory: TemplateCategory | 'all';
  sortBy: SortOption;
}

// Palette colors for the app theme
export const PALETTE = {
  carbon: '#0d0d0b',
  carbonSoft: '#171612',
  carbonDeep: '#11100d',
  stone: '#857d70',
  stoneSoft: '#6c665c',
  bone: '#f2ede3',
  boneSoft: '#d9d1c4',
} as const;

export type PaletteColor = typeof PALETTE[keyof typeof PALETTE];
