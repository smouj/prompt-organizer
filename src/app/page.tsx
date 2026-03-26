import { PromptOrganizerPage } from '@/components/prompt-organizer/prompt-organizer-page';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Organizer - Organiza tus prompts, auditorías y backlog técnico',
  description:
    'Herramienta visual para organizar prompts, auditorías, bugs y backlog técnico. Gestiona plantillas, tareas y genera prompts profesionales.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Prompt Organizer',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0b',
  width: 'device-width',
  initialScale: 1,
};

export default function Home() {
  return <PromptOrganizerPage />;
}
