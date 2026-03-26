/**
 * Zustand store for Prompt Organizer
 * @module store/prompt-organizer-store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Template,
  Task,
  PromptVariables,
  TemplateCategory,
  SortOption,
  TaskStatus,
} from '@/types/prompt-organizer';
import {
  DEFAULT_TEMPLATES,
  DEFAULT_VARS,
  DEFAULT_TASKS,
  generateUID,
} from '@/lib/prompt-organizer/data';

const STORAGE_KEY = 'prompt-organizer-v2';

interface PromptOrganizerStore {
  // State
  templates: Template[];
  selectedId: string | null;
  vars: PromptVariables;
  tasks: Task[];
  activeCategory: TemplateCategory | 'all';
  sortBy: SortOption;
  searchQuery: string;
  customPrompt: string;
  isLoaded: boolean;

  // Template actions
  setSelectedId: (id: string | null) => void;
  addTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => string;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => string | null;
  toggleFavorite: (id: string) => void;

  // Task actions
  addTask: (title: string, priority?: Task['priority']) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  cycleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompletedTasks: () => void;

  // Variable actions
  updateVar: (key: keyof PromptVariables, value: string) => void;
  setVars: (vars: PromptVariables) => void;
  resetVars: () => void;

  // Filter/Search actions
  setActiveCategory: (category: TemplateCategory | 'all') => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setCustomPrompt: (prompt: string) => void;

  // Data actions
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const usePromptOrganizerStore = create<PromptOrganizerStore>()(
  persist(
    (set, get) => ({
      // Initial state
      templates: DEFAULT_TEMPLATES,
      selectedId: DEFAULT_TEMPLATES[0]?.id || null,
      vars: DEFAULT_VARS,
      tasks: DEFAULT_TASKS,
      activeCategory: 'all',
      sortBy: 'default',
      searchQuery: '',
      customPrompt: '',
      isLoaded: false,

      // Template actions
      setSelectedId: (id) => set({ selectedId: id }),

      addTemplate: (template) => {
        const id = generateUID();
        set((state) => ({
          templates: [
            {
              ...template,
              id,
              createdAt: Date.now(),
            },
            ...state.templates,
          ],
          selectedId: id,
        }));
        return id;
      },

      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t
          ),
        })),

      deleteTemplate: (id) =>
        set((state) => {
          const newTemplates = state.templates.filter((t) => t.id !== id);
          const newSelectedId =
            state.selectedId === id
              ? newTemplates[0]?.id || null
              : state.selectedId;
          return { templates: newTemplates, selectedId: newSelectedId };
        }),

      duplicateTemplate: (id) => {
        const state = get();
        const original = state.templates.find((t) => t.id === id);
        if (!original) return null;

        const newId = generateUID();
        set((state) => ({
          templates: [
            {
              ...original,
              id: newId,
              title: `${original.title} (copia)`,
              favorite: false,
              createdAt: Date.now(),
            },
            ...state.templates,
          ],
          selectedId: newId,
        }));
        return newId;
      },

      toggleFavorite: (id) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, favorite: !t.favorite } : t
          ),
        })),

      // Task actions
      addTask: (title, priority = 'media') =>
        set((state) => ({
          tasks: [
            {
              id: generateUID(),
              title,
              status: 'pendiente',
              priority,
              createdAt: Date.now(),
            },
            ...state.tasks,
          ],
        })),

      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status, updatedAt: Date.now() } : t
          ),
        })),

      cycleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id !== id) return t;
            const nextStatus: TaskStatus =
              t.status === 'pendiente'
                ? 'progreso'
                : t.status === 'progreso'
                ? 'hecho'
                : 'pendiente';
            return { ...t, status: nextStatus, updatedAt: Date.now() };
          }),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      clearCompletedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.status !== 'hecho'),
        })),

      // Variable actions
      updateVar: (key, value) =>
        set((state) => ({
          vars: { ...state.vars, [key]: value },
        })),

      setVars: (vars) => set({ vars }),

      resetVars: () => set({ vars: DEFAULT_VARS, customPrompt: '' }),

      // Filter/Search actions
      setActiveCategory: (category) => set({ activeCategory: category }),

      setSortBy: (sort) => set({ sortBy: sort }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setCustomPrompt: (prompt) => set({ customPrompt: prompt }),

      // Data actions
      resetToDefaults: () =>
        set({
          templates: DEFAULT_TEMPLATES,
          selectedId: DEFAULT_TEMPLATES[0]?.id || null,
          vars: DEFAULT_VARS,
          tasks: DEFAULT_TASKS,
          activeCategory: 'all',
          sortBy: 'default',
          searchQuery: '',
          customPrompt: '',
        }),

      exportData: () => {
        const state = get();
        return JSON.stringify({
          templates: state.templates,
          vars: state.vars,
          tasks: state.tasks,
          exportedAt: new Date().toISOString(),
          version: '2.0',
        });
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          if (data.templates && Array.isArray(data.templates)) {
            set({
              templates: data.templates,
              vars: data.vars || DEFAULT_VARS,
              tasks: data.tasks || DEFAULT_TASKS,
              selectedId: data.templates[0]?.id || null,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        templates: state.templates,
        selectedId: state.selectedId,
        vars: state.vars,
        tasks: state.tasks,
        activeCategory: state.activeCategory,
        sortBy: state.sortBy,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoaded = true;
        }
      },
    }
  )
);
