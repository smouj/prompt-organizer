# Prompt Organizer

<div align="center">

![Prompt Organizer](public/icons/icon-1024.png)

**Herramienta visual para organizar prompts, auditorías, bugs y backlog técnico**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Demo](#demo) • [Características](#características) • [Instalación](#instalación) • [Uso](#uso) • [Contribuir](#contribuir)

</div>

---

## 📋 Descripción

**Prompt Organizer** es una aplicación web profesional diseñada para desarrolladores y equipos técnicos que necesitan gestionar prompts de IA, auditorías de código, reportes de bugs y backlogs técnicos de manera eficiente y organizada.

### ¿Por qué Prompt Organizer?

- 🎯 **Productividad**: Genera prompts profesionales en segundos con plantillas predefinidas
- 📦 **Organización**: Categoriza tus prompts por tipo: bugs, auditorías, UX/UI, refactors y más
- 🔄 **Reutilización**: Guarda y reutiliza tus mejores prompts con sistema de favoritos
- 📊 **Backlog integrado**: Gestiona tareas pendientes sin salir de la aplicación
- 💾 **Persistencia local**: Tus datos se guardan automáticamente en el navegador
- 📱 **PWA**: Instalable como aplicación nativa en cualquier dispositivo

---

## ✨ Características

### 📝 Gestión de Plantillas

- **6 plantillas predefinidas** para casos de uso comunes
- **Categorías organizadas**: Bugs, Auditoría, Tareas, Cambios seguros, UX/UI, Release
- **Sistema de favoritos** para acceso rápido
- **Duplicación y edición** de plantillas existentes
- **Búsqueda y filtrado** avanzado

### 🔧 Editor de Contexto

- **Variables sustituibles**: Proyecto, repositorio, URL, stack
- **Campos de objetivo y contexto** para prompts específicos
- **Notas extra** para instrucciones adicionales
- **Generación en tiempo real** del prompt final

### ✅ Backlog Integrado

- **Estados de tarea**: Pendiente, En progreso, Hecho
- **Sistema de prioridades**: Crítica, Alta, Media, Baja
- **Ciclo de estados** con un solo clic
- **Estadísticas en tiempo real**

### 💾 Exportar/Importar

- **Exportación JSON** completa de todos los datos
- **Importación** para restaurar backups
- **Reset** a valores por defecto

### ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + C` | Copiar prompt generado |
| `Ctrl + S` | Guardar como plantilla |
| `Ctrl + K` | Enfocar búsqueda |
| `?` | Mostrar atajos |
| `Esc` | Cerrar modales |

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### Clonar e instalar

```bash
# Clonar el repositorio
git clone https://github.com/smouj/prompt-organizer.git

# Entrar al directorio
cd prompt-organizer

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

### Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Build para producción

```bash
npm run build
npm run start
```

---

## 🎨 Paleta de Colores

El diseño utiliza una paleta minimalista y profesional:

| Nombre | Código | Uso |
|--------|--------|-----|
| Negro carbón | `#0d0d0b` | Fondo principal |
| Gris piedra | `#857d70` | Acentos y bordes |
| Blanco hueso | `#f2ede3` | Texto principal |

---

## 🏗️ Arquitectura

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raíz
│   └── globals.css        # Estilos globales
├── components/
│   ├── prompt-organizer/  # Componentes de la aplicación
│   │   ├── prompt-organizer-page.tsx
│   │   ├── template-card.tsx
│   │   ├── task-item.tsx
│   │   ├── brand-mark.tsx
│   │   ├── stat-card.tsx
│   │   ├── status-badge.tsx
│   │   └── ui-helpers.ts
│   └── ui/                # Componentes shadcn/ui
├── hooks/                  # Custom hooks
├── lib/
│   ├── prompt-organizer/  # Lógica de negocio
│   │   └── data.ts        # Datos y utilidades
│   └── utils.ts           # Utilidades generales
├── store/
│   └── prompt-organizer-store.ts  # Estado global (Zustand)
└── types/
    └── prompt-organizer.ts # Definiciones TypeScript
```

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) |
| Lenguaje | [TypeScript 5](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com/) |
| Componentes UI | [shadcn/ui](https://ui.shadcn.com/) |
| Estado | [Zustand](https://zustand-demo.pmnd.rs/) |
| Animaciones | [Framer Motion](https://www.framer.com/motion/) |
| Iconos | [Lucide React](https://lucide.dev/) |

---

## 📱 PWA

La aplicación es instalable como Progressive Web App:

1. Abre la aplicación en Chrome/Edge/Safari
2. Haz clic en el botón de instalación en la barra de direcciones
3. O usa el botón "Instalar" en el menú de la aplicación

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee las [guías de contribución](CONTRIBUTING.md).

### Pasos para contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Código de conducta

Por favor, lee y sigue nuestro [Código de Conducta](CODE_OF_CONDUCT.md).

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) por los componentes de UI
- [Lucide](https://lucide.dev/) por los iconos
- [Framer](https://www.framer.com/) por la librería de animaciones

---

## 📞 Contacto

- **Autor**: [@smouj](https://github.com/smouj)
- **Issues**: [GitHub Issues](https://github.com/smouj/prompt-organizer/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/smouj/prompt-organizer/discussions)

---

<div align="center">

**[⬆ Volver arriba](#prompt-organizer)**

Hecho con ❤️ por [smouj](https://github.com/smouj)

</div>
