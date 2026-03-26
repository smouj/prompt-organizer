/**
 * Default data for Prompt Organizer
 * @module lib/prompt-organizer/data
 */

import type { Template, Task, PromptVariables, CategoryInfo, TemplateCategory } from '@/types/prompt-organizer';
import {
  Bug,
  ClipboardCheck,
  FolderKanban,
  ShieldCheck,
  Sparkles,
  Rocket,
  FileText,
} from 'lucide-react';

/**
 * Template categories with icons and descriptions
 */
export const TEMPLATE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'bugs',
    label: 'Arreglar bugs',
    icon: 'Bug',
    description: 'Plantillas para corregir errores y problemas técnicos',
  },
  {
    id: 'audit',
    label: 'Auditoría',
    icon: 'ClipboardCheck',
    description: 'Plantillas para revisiones completas del proyecto',
  },
  {
    id: 'tasks',
    label: 'Tareas',
    icon: 'FolderKanban',
    description: 'Plantillas para organización y gestión de tareas',
  },
  {
    id: 'safe',
    label: 'Cambios seguros',
    icon: 'ShieldCheck',
    description: 'Plantillas para refactors y cambios controlados',
  },
  {
    id: 'ux',
    label: 'UX/UI',
    icon: 'Sparkles',
    description: 'Plantillas para mejoras visuales y de experiencia',
  },
  {
    id: 'release',
    label: 'Preparar release',
    icon: 'Rocket',
    description: 'Plantillas para preparar lanzamientos',
  },
];

/**
 * Get Lucide icon component by category
 */
export const getCategoryIcon = (categoryId: TemplateCategory) => {
  const iconMap: Record<string, typeof Bug> = {
    bugs: Bug,
    audit: ClipboardCheck,
    tasks: FolderKanban,
    safe: ShieldCheck,
    ux: Sparkles,
    release: Rocket,
    custom: FileText,
  };
  return iconMap[categoryId] || FileText;
};

/**
 * Default prompt templates
 */
export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'bug-safe-fix',
    category: 'bugs',
    title: 'Corregir bug de forma segura e incremental',
    favorite: true,
    body: `Quiero que actúes como ingeniero senior del proyecto.

Proyecto: {{projectName}}
Repositorio: {{repo}}
URL/entorno: {{url}}
Stack: {{stack}}

Objetivo:
Resolver este problema sin romper funcionalidades existentes:
{{goal}}

Contexto adicional:
{{context}}

Instrucciones obligatorias:
1. Analiza primero la causa raíz real del problema.
2. No hagas refactors grandes salvo que sean imprescindible.
3. Mantén compatibilidad con la arquitectura actual.
4. Aplica cambios pequeños, seguros e incrementales.
5. Si detectas otros riesgos relacionados, repórtalos aparte.
6. Añade validaciones y manejo de estados límite.
7. Conserva el estilo visual y la UX existente salvo donde el bug lo requiera.
8. Explica exactamente qué archivos tocarías y por qué.
9. Devuélveme también una checklist de pruebas manuales.
10. Si haces código, deja comentarios útiles y claros en las zonas sensibles.

Formato de salida:
- Diagnóstico
- Causa raíz
- Plan seguro de corrección
- Archivos afectados
- Cambios concretos
- Riesgos
- Checklist de pruebas
- Prompt final listo para agente si aplica`,
    createdAt: Date.now(),
  },
  {
    id: 'audit-full',
    category: 'audit',
    title: 'Auditoría completa del proyecto',
    favorite: true,
    body: `Haz una auditoría completa, profesional y muy minuciosa del proyecto.

Proyecto: {{projectName}}
Repositorio: {{repo}}
URL/entorno: {{url}}
Stack: {{stack}}

Enfoque principal:
{{goal}}

Contexto relevante:
{{context}}

Quiero que revises como mínimo:
1. Errores funcionales.
2. Inconsistencias visuales y de diseño.
3. Problemas de UX/UI.
4. Falta de coherencia entre páginas.
5. Posibles bugs silenciosos.
6. Estados vacíos, errores y cargas.
7. Rendimiento percibido.
8. Accesibilidad básica.
9. Organización general del frontend.
10. Prioridades reales de mejora.

Formato de salida:
- Resumen ejecutivo
- Problemas críticos
- Problemas medios
- Problemas menores
- Lista de incoherencias visuales
- Lista de cosas faltantes
- Riesgos técnicos
- Quick wins
- Roadmap recomendado por prioridad`,
    createdAt: Date.now(),
  },
  {
    id: 'task-backlog',
    category: 'tasks',
    title: 'Convertir hallazgos en backlog accionable',
    favorite: false,
    body: `Convierte todo este contexto en una lista de tareas profesional, clara y accionable.

Proyecto: {{projectName}}
Repositorio: {{repo}}
URL/entorno: {{url}}
Stack: {{stack}}

Objetivo:
{{goal}}

Contexto / notas:
{{context}}

Necesito que organices las tareas en formato backlog con:
1. Título corto.
2. Descripción.
3. Prioridad (crítica, alta, media, baja).
4. Impacto.
5. Complejidad estimada.
6. Dependencias.
7. Riesgo.
8. Criterio de aceptación.
9. Orden recomendado de ejecución.

Formato de salida:
- Tabla resumen
- Lista priorizada
- Qué haría primero
- Qué puede esperar
- Qué no tocar todavía`,
    createdAt: Date.now(),
  },
  {
    id: 'ux-polish',
    category: 'ux',
    title: 'Pulido visual sin romper la estética',
    favorite: true,
    body: `Quiero mejorar la interfaz visual del proyecto sin romper la identidad actual.

Proyecto: {{projectName}}
Repositorio: {{repo}}
URL/entorno: {{url}}
Stack: {{stack}}

Objetivo visual:
{{goal}}

Contexto visual / referencias:
{{context}}

Restricciones:
1. Mantener la estética base del proyecto.
2. No rediseñar por completo.
3. Mejorar espaciado, jerarquía, contraste y consistencia.
4. Revisar tarjetas, botones, tipografías, estados hover/focus/disabled, loaders y vacíos.
5. Mejorar claridad y legibilidad.
6. Priorizar cambios con alto impacto visual y bajo riesgo.

Formato de salida:
- Diagnóstico visual
- Problemas de consistencia
- Mejoras concretas por sección
- Quick wins
- Cambios seguros por prioridad
- Prompt final para agente`,
    createdAt: Date.now(),
  },
  {
    id: 'safe-refactor',
    category: 'safe',
    title: 'Refactor controlado y estable',
    favorite: false,
    body: `Necesito una reorganización/refactor controlado del proyecto.

Proyecto: {{projectName}}
Repositorio: {{repo}}
URL/entorno: {{url}}
Stack: {{stack}}

Objetivo del refactor:
{{goal}}

Contexto actual:
{{context}}

Normas obligatorias:
1. No romper compatibilidad.
2. No mezclar refactor con cambios funcionales innecesarios.
3. Mantener nombres claros y consistentes.
4. Mejorar estructura, comentarios y legibilidad.
5. Identificar deuda técnica real y priorizar.
6. Proponer migración incremental, no destructiva.

Formato de salida:
- Estado actual
- Problemas estructurales
- Propuesta de organización
- Pasos incrementales
- Riesgos
- Checklist antes y después`,
    createdAt: Date.now(),
  },
  {
    id: 'release-ready',
    category: 'release',
    title: 'Dejar el proyecto listo para seguir trabajando',
    favorite: false,
    body: `Quiero dejar el proyecto preparado, estable y bien documentado para seguir trabajando.

Proyecto: {{projectName}}
Repositorio: {{repo}}
URL/entorno: {{url}}
Stack: {{stack}}

Meta:
{{goal}}

Contexto adicional:
{{context}}

Quiero que revises:
1. Estado real actual del proyecto.
2. Qué falta para estar sólido.
3. Qué documentación está desfasada.
4. Qué carpetas o archivos conviene reorganizar.
5. Qué tareas deben quedar anotadas para la siguiente sesión.
6. Qué riesgos técnicos deben quedar documentados.

Formato de salida:
- Estado actual
- Qué está bien
- Qué falta
- Documentación a actualizar
- Próximos pasos
- Lista de tareas recomendada`,
    createdAt: Date.now(),
  },
];

/**
 * Default prompt variables
 */
export const DEFAULT_VARS: PromptVariables = {
  projectName: 'Mi Proyecto',
  repo: 'usuario/mi-proyecto',
  url: 'https://mi-proyecto.com/',
  stack: 'Next.js, React, Tailwind CSS, TypeScript',
  goal: 'Describe aquí el objetivo exacto del prompt.',
  context: 'Añade aquí contexto técnico, visual, capturas, problemas detectados o restricciones.',
};

/**
 * Default tasks for demo
 */
export const DEFAULT_TASKS: Task[] = [
  {
    id: generateUID(),
    title: 'Revisar errores visuales del landing',
    status: 'pendiente',
    priority: 'alta',
    createdAt: Date.now(),
  },
  {
    id: generateUID(),
    title: 'Preparar prompt para auditoría completa',
    status: 'progreso',
    priority: 'crítica',
    createdAt: Date.now(),
  },
  {
    id: generateUID(),
    title: 'Crear checklist de pruebas manuales',
    status: 'hecho',
    priority: 'media',
    createdAt: Date.now(),
  },
];

/**
 * Sort options for templates
 */
export const SORT_OPTIONS = [
  { id: 'default', label: 'Por defecto' },
  { id: 'alpha', label: 'Alfabético' },
  { id: 'favorites', label: 'Favoritos primero' },
  { id: 'recent', label: 'Más recientes' },
] as const;

/**
 * Generate a unique ID
 */
export function generateUID(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/**
 * Substitute variables in template body
 */
export function substituteVariables(template: string, vars: PromptVariables): string {
  return template
    .replaceAll('{{projectName}}', vars.projectName || '')
    .replaceAll('{{repo}}', vars.repo || '')
    .replaceAll('{{url}}', vars.url || '')
    .replaceAll('{{stack}}', vars.stack || '')
    .replaceAll('{{goal}}', vars.goal || '')
    .replaceAll('{{context}}', vars.context || '');
}
