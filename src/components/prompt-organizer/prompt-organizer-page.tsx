/**
 * Main Prompt Organizer Page Component
 * @module components/prompt-organizer/prompt-organizer-page
 */

'use client';

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Copy,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Pencil,
  FileText,
  Download,
  Keyboard,
  X,
  Upload,
  Trash2,
} from 'lucide-react';

import { usePromptOrganizerStore } from '@/store/prompt-organizer-store';
import {
  TEMPLATE_CATEGORIES,
  SORT_OPTIONS,
  substituteVariables,
  getCategoryIcon,
} from '@/lib/prompt-organizer/data';
import type { TemplateCategory, SortOption, PromptVariables } from '@/types/prompt-organizer';

import { BrandMark } from './brand-mark';
import { StatCard } from './stat-card';
import { TemplateCard } from './template-card';
import { TaskItem } from './task-item';
import { cn } from '@/lib/utils';
import { SURFACE, DIVIDER, INPUT_BASE, BUTTON_GHOST, BUTTON_SOLID } from './ui-helpers';

// Panel wrapper component
function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn(SURFACE, className)}>{children}</section>;
}

// Section title component
function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-2 text-[11px] uppercase tracking-[0.26em] text-stone-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-xl font-semibold tracking-tight text-stone-100">
        {title}
      </h2>
    </div>
  );
}

// Action button component
function ActionButton({
  children,
  solid = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  solid?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(solid ? BUTTON_SOLID : BUTTON_GHOST, className)}
      {...props}
    >
      {children}
    </button>
  );
}

// Text input component
function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={INPUT_BASE} {...props} />;
}

// Text area component
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={INPUT_BASE} {...props} />;
}

// Keyboard shortcuts modal
function ShortcutsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const shortcuts = [
    { keys: 'Ctrl + C', action: 'Copiar prompt generado' },
    { keys: 'Ctrl + S', action: 'Guardar como nueva plantilla' },
    { keys: 'Ctrl + K', action: 'Enfocar búsqueda' },
    { keys: '?', action: 'Mostrar/ocultar atajos' },
    { keys: 'Esc', action: 'Cerrar modal' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="border border-stone-600 bg-stone-800 p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-100 flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Atajos de teclado
              </h3>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-stone-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.keys}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-stone-400">{shortcut.action}</span>
                  <kbd className="border border-stone-600 bg-stone-900 px-2 py-1 text-xs text-stone-100">
                    {shortcut.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PromptOrganizerPage() {
  const {
    templates,
    selectedId,
    vars,
    tasks,
    activeCategory,
    sortBy,
    searchQuery,
    customPrompt,
    setSelectedId,
    addTemplate,
    deleteTemplate,
    duplicateTemplate,
    toggleFavorite,
    addTask,
    cycleTaskStatus,
    deleteTask,
    updateVar,
    resetVars,
    setActiveCategory,
    setSortBy,
    setSearchQuery,
    setCustomPrompt,
    exportData,
    importData,
    resetToDefaults,
  } = usePromptOrganizerStore();

  const [copied, setCopied] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTemplateTitle, setNewTemplateTitle] = useState('');

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === 'pendiente').length;
    const progress = tasks.filter((task) => task.status === 'progreso').length;
    const done = tasks.filter((task) => task.status === 'hecho').length;
    return { total, pending, progress, done };
  }, [tasks]);

  // Filtered and sorted templates
  const filteredTemplates = useMemo(() => {
    let result = templates.filter((template) => {
      const matchesCategory =
        activeCategory === 'all' || template.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        template.title.toLowerCase().includes(q) ||
        template.body.toLowerCase().includes(q) ||
        template.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    // Apply sorting
    switch (sortBy) {
      case 'alpha':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'favorites':
        result = [...result].sort(
          (a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0)
        );
        break;
      case 'recent':
        result = [...result].sort(
          (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
        );
        break;
    }

    return result;
  }, [templates, activeCategory, searchQuery, sortBy]);

  // Selected template
  const selectedTemplate = useMemo(() => {
    return templates.find((t) => t.id === selectedId) || templates[0];
  }, [templates, selectedId]);

  // Generated prompt
  const generatedPrompt = useMemo(() => {
    const base = substituteVariables(selectedTemplate?.body || '', vars);
    return customPrompt.trim()
      ? `${base}\n\nNotas extra del usuario:\n${customPrompt.trim()}`
      : base;
  }, [selectedTemplate, vars, customPrompt]);

  // Copy prompt
  const copyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      console.error('No se pudo copiar', error);
    }
  }, [generatedPrompt]);

  // Add task handler
  const handleAddTask = useCallback(() => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  }, [newTask, addTask]);

  // Create custom template
  const handleCreateTemplate = useCallback(() => {
    if (newTemplateTitle.trim() && customPrompt.trim()) {
      addTemplate({
        title: newTemplateTitle.trim(),
        body: customPrompt.trim(),
        category: activeCategory === 'all' ? 'tasks' : activeCategory,
        favorite: false,
      });
      setNewTemplateTitle('');
    }
  }, [newTemplateTitle, customPrompt, activeCategory, addTemplate]);

  // Delete template with confirmation
  const handleDeleteTemplate = useCallback(
    (id: string) => {
      if (confirm('¿Eliminar esta plantilla?')) {
        deleteTemplate(id);
      }
    },
    [deleteTemplate]
  );

  // Export/Import handlers
  const handleExport = useCallback(() => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-organizer-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportData]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = importData(event.target?.result as string);
          if (!result) {
            alert('Error al importar. Archivo no válido.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [importData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + C: Copy prompt (when no selection)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.shiftKey) {
        const selection = window.getSelection().toString();
        if (!selection) {
          e.preventDefault();
          copyPrompt();
        }
      }
      // Ctrl/Cmd + S: Save as template
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (newTemplateTitle.trim() && customPrompt.trim()) {
          handleCreateTemplate();
        }
      }
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('template-search')?.focus();
      }
      // ?: Show shortcuts
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setShowShortcuts((prev) => !prev);
      }
      // Escape: Close modals
      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copyPrompt, handleCreateTemplate, newTemplateTitle, customPrompt]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 antialiased selection:bg-stone-200 selection:text-stone-950">
      <div className="mx-auto max-w-[1680px] px-3 py-3 md:px-4 md:py-4">
        {/* Header */}
        <header className="mb-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Panel className="overflow-hidden">
              <div className={cn('grid gap-px', DIVIDER, 'xl:grid-cols-[1.2fr_0.8fr]')}>
                <div className="bg-stone-800 p-4 md:p-6">
                  <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-4 flex items-center gap-4">
                        <img
                          src="/logo.png"
                          alt="Prompt Organizer"
                          className="h-16 w-auto md:h-20"
                        />
                      </div>
                      <p className="max-w-3xl text-sm leading-6 text-stone-300 md:text-base">
                        Herramienta visual para organizar prompts, auditorías, bugs y backlog
                        técnico. Guarda plantillas, gestiona tareas y genera prompts
                        profesionales.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <ActionButton onClick={() => setShowShortcuts(true)}>
                        <Keyboard className="h-4 w-4" />
                        Atajos
                      </ActionButton>

                      <ActionButton onClick={handleExport}>
                        <Download className="h-4 w-4" />
                        Exportar
                      </ActionButton>

                      <ActionButton onClick={handleImport}>
                        <Upload className="h-4 w-4" />
                        Importar
                      </ActionButton>

                      <ActionButton
                        onClick={() => {
                          if (confirm('¿Restablecer todos los datos?')) {
                            resetToDefaults();
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Reset
                      </ActionButton>
                    </div>
                  </div>
                </div>

                <div className={cn('grid gap-px', DIVIDER, 'sm:grid-cols-2 xl:grid-cols-4')}>
                  <StatCard label="Plantillas" value={templates.length} icon={FileText} />
                  <StatCard label="Pendientes" value={stats.pending} icon={AlertTriangle} />
                  <StatCard label="En progreso" value={stats.progress} icon={Pencil} />
                  <StatCard label="Hechas" value={stats.done} icon={CheckCircle2} />
                </div>
              </div>
            </Panel>
          </motion.div>
        </header>

        {/* Main content */}
        <div className="grid gap-3 xl:grid-cols-[320px_minmax(0,1fr)_420px]">
          {/* Left sidebar - Templates */}
          <aside className="space-y-3">
            <Panel>
              {/* Search */}
              <div className="border-b border-stone-600 p-3">
                <label className="flex items-center gap-2 border border-stone-600 bg-stone-900 px-3 py-2">
                  <Search className="h-4 w-4 text-stone-400" />
                  <input
                    id="template-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar plantillas (Ctrl+K)"
                    className="w-full bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-400"
                  />
                </label>
              </div>

              {/* Categories */}
              <div className="border-b border-stone-600 p-3">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <ActionButton
                      onClick={() => setActiveCategory('all')}
                      className={cn(
                        'px-3 py-2 text-[11px] uppercase tracking-[0.18em]',
                        activeCategory === 'all'
                          ? 'bg-stone-200 text-stone-950 border-stone-200'
                          : ''
                      )}
                    >
                      Todas
                    </ActionButton>

                    {TEMPLATE_CATEGORIES.map((category) => {
                      const Icon = getCategoryIcon(category.id);
                      const isActive = activeCategory === category.id;

                      return (
                        <ActionButton
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={cn(
                            'px-3 py-2 text-[11px] uppercase tracking-[0.18em]',
                            isActive
                              ? 'bg-stone-200 text-stone-950 border-stone-200'
                              : ''
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {category.label}
                        </ActionButton>
                      );
                    })}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border border-stone-600 bg-stone-900 px-2 py-1.5 text-xs text-stone-100 outline-none hover:border-stone-400"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Template list */}
              <div className="p-3">
                {filteredTemplates.length === 0 ? (
                  <div className="border border-dashed border-stone-600 bg-stone-900 p-8 text-center">
                    <Search className="h-8 w-8 mx-auto mb-3 text-stone-500" />
                    <p className="text-sm text-stone-400">
                      No se encontraron plantillas
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      Prueba con otros filtros o términos de búsqueda
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={template.id === selectedId}
                        onSelect={setSelectedId}
                        onToggleFavorite={toggleFavorite}
                        onDelete={handleDeleteTemplate}
                        onDuplicate={duplicateTemplate}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Panel>

            {/* Create template panel */}
            <Panel>
              <div className="border-b border-stone-600 px-3 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-100">
                    Crear plantilla
                  </h2>
                  <Plus className="h-4 w-4 text-stone-400" />
                </div>
              </div>

              <div className="p-3">
                <TextInput
                  value={newTemplateTitle}
                  onChange={(e) => setNewTemplateTitle(e.target.value)}
                  placeholder="Título de la plantilla"
                />

                <p className="mb-3 mt-2 text-xs leading-5 text-stone-400">
                  Redacta una plantilla nueva usando las notas extra y guárdala para
                  reutilizarla.
                </p>

                <ActionButton
                  solid
                  onClick={handleCreateTemplate}
                  className="w-full"
                  disabled={!newTemplateTitle.trim() || !customPrompt.trim()}
                >
                  Guardar plantilla
                </ActionButton>
              </div>
            </Panel>
          </aside>

          {/* Main editor */}
          <main className="space-y-3">
            <Panel>
              <div className={cn('grid gap-px', DIVIDER, 'xl:grid-cols-[1fr_auto]')}>
                <div className="bg-stone-800 p-4 md:p-5">
                  <SectionTitle
                    eyebrow="Editor de contexto"
                    title={selectedTemplate?.title || 'Sin plantilla'}
                  />
                </div>

                <div className={cn('flex flex-wrap gap-px', DIVIDER)}>
                  <ActionButton onClick={copyPrompt}>
                    <Copy className="h-4 w-4" />
                    {copied ? 'Copiado' : 'Copiar'}
                  </ActionButton>

                  <ActionButton onClick={resetVars}>
                    <RotateCcw className="h-4 w-4" />
                    Restablecer
                  </ActionButton>
                </div>
              </div>

              {/* Variable inputs */}
              <div className={cn('grid gap-px', DIVIDER, 'md:grid-cols-2')}>
                {[
                  { label: 'Proyecto', key: 'projectName' as const },
                  { label: 'Repositorio', key: 'repo' as const },
                  { label: 'URL / entorno', key: 'url' as const },
                  { label: 'Stack', key: 'stack' as const },
                ].map((field) => (
                  <div key={field.key} className="bg-stone-800 p-3">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-stone-400">
                      {field.label}
                    </label>
                    <TextInput
                      value={vars[field.key]}
                      onChange={(e) => updateVar(field.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Goal and context */}
              <div className={cn('grid gap-px', DIVIDER)}>
                <div className="bg-stone-800 p-3">
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Objetivo
                  </label>
                  <TextArea
                    rows={4}
                    value={vars.goal}
                    onChange={(e) => updateVar('goal', e.target.value)}
                  />
                </div>

                <div className="bg-stone-800 p-3">
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Contexto
                  </label>
                  <TextArea
                    rows={7}
                    value={vars.context}
                    onChange={(e) => updateVar('context', e.target.value)}
                  />
                </div>

                <div className="bg-stone-800 p-3">
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Notas extra del usuario
                  </label>
                  <TextArea
                    rows={5}
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Añade matices, restricciones o instrucciones extra"
                  />
                </div>
              </div>
            </Panel>

            {/* Generated output */}
            <Panel>
              <div className={cn('grid gap-px', DIVIDER, 'xl:grid-cols-[1fr_auto]')}>
                <div className="bg-stone-800 p-4 md:p-5">
                  <SectionTitle
                    eyebrow="Salida generada"
                    title="Prompt final listo para usar"
                  />
                </div>

                <div className="bg-stone-800 p-4 md:p-5">
                  <div className="border border-stone-500 bg-stone-500 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-stone-950">
                    Variables integradas
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-600 bg-stone-800 p-3 md:p-4">
                <div className="border border-stone-600 bg-stone-900 p-4">
                  <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap text-sm leading-6 text-stone-100">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            </Panel>
          </main>

          {/* Right sidebar - Tasks */}
          <aside className="space-y-3">
            <Panel>
              <div className={cn('grid gap-px', DIVIDER)}>
                <div className="bg-stone-800 px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                        Backlog rápido
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-stone-100">
                        Lista de pendientes
                      </h2>
                    </div>
                    <div className="border border-stone-500 bg-stone-900 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-stone-400">
                      {stats.total} tareas
                    </div>
                  </div>
                </div>

                <div className="bg-stone-800 p-3">
                  <div className="flex gap-2">
                    <TextInput
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                      placeholder="Añadir tarea"
                    />
                    <ActionButton solid onClick={handleAddTask}>
                      <Plus className="h-4 w-4" />
                    </ActionButton>
                  </div>
                </div>

                <div className="bg-stone-800 p-3">
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onCycleStatus={cycleTaskStatus}
                        onDelete={deleteTask}
                      />
                    ))}
                    {tasks.length === 0 && (
                      <p className="text-sm text-stone-400 text-center py-4">
                        No hay tareas pendientes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Panel>

            {/* Info panel */}
            <Panel>
              <div className={cn('grid gap-px', DIVIDER)}>
                <div className="bg-stone-800 p-3">
                  <h2 className="text-lg font-semibold text-stone-100">
                    Características
                  </h2>
                </div>

                {[
                  {
                    title: 'Gestión de plantillas',
                    text: 'Crea, edita, duplica y organiza tus plantillas de prompts por categorías.',
                  },
                  {
                    title: 'Sustitución de variables',
                    text: 'Define variables reutilizables que se integran automáticamente en tus prompts.',
                  },
                  {
                    title: 'Backlog integrado',
                    text: 'Mantén un registro de tareas pendientes con estados y prioridades.',
                  },
                  {
                    title: 'Exportar/Importar',
                    text: 'Respalda y restaura tus datos en cualquier momento con archivos JSON.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-stone-800 p-3">
                    <strong className="block text-sm text-stone-100">{item.title}</strong>
                    <p className="mt-1 text-sm leading-6 text-stone-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </aside>
        </div>
      </div>

      {/* Shortcuts modal */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  );
}

export default PromptOrganizerPage;
