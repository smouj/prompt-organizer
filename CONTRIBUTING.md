# Guía de Contribución

¡Gracias por tu interés en contribuir a Prompt Organizer! Este documento proporciona las directrices para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de desarrollo](#proceso-de-desarrollo)
- [Estándares de código](#estándares-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

---

## Código de Conducta

Este proyecto y todos los participantes están gobernados por nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que mantengas este código.

---

## ¿Cómo puedo contribuir?

### Reportar Bugs

Los bugs se reportan a través de [GitHub Issues](https://github.com/smouj/prompt-organizer/issues). Antes de crear uno:

1. **Verifica que no exista** un issue similar
2. Usa la plantilla de bug report
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Capturas de pantalla si aplica
   - Información del entorno (navegador, SO, versión)

### Sugerir Mejoras

Las sugerencias son bienvenidas a través de [GitHub Issues](https://github.com/smouj/prompt-organizer/issues):

1. Usa la plantilla de feature request
2. Describe la funcionalidad propuesta
3. Explica por qué sería útil
4. Proporciona ejemplos de uso

### Contribuir con Código

1. Busca issues con la etiqueta `good first issue` o `help wanted`
2. Comenta en el issue que quieres trabajar en él
3. Espera a que se te asigne
4. Sigue el [proceso de desarrollo](#proceso-de-desarrollo)

---

## Proceso de desarrollo

### 1. Fork y Clone

```bash
# Fork desde GitHub, luego:
git clone https://github.com/TU_USUARIO/prompt-organizer.git
cd prompt-organizer
```

### 2. Configurar el entorno

```bash
# Instalar dependencias
npm install

# Crear rama para tu feature
git checkout -b feature/mi-nueva-caracteristica
```

### 3. Desarrollo

```bash
# Ejecutar en desarrollo
npm run dev

# Ejecutar linter
npm run lint
```

### 4. Tests

Asegúrate de que todo funciona correctamente antes de hacer commit.

---

## Estándares de código

### TypeScript

- Usa TypeScript estricto
- Define tipos para todas las funciones y componentes
- Evita `any` cuando sea posible

### React

- Usa componentes funcionales con hooks
- Preferencia por composición sobre herencia
- Documenta props con TypeScript

### Estilos

- Usa Tailwind CSS para estilos
- Sigue la paleta de colores definida
- Asegura responsividad (mobile-first)

### Estructura de archivos

```
componente/
├── Componente.tsx      # Componente principal
├── Componente.test.tsx # Tests (si aplica)
└── index.ts           # Export
```

---

## Commits

### Formato

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(ámbito): descripción

[cuerpo opcional]

[footer opcional]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva característica |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `style` | Formato, punto y coma, etc. |
| `refactor` | Refactorización de código |
| `test` | Añadir o modificar tests |
| `chore` | Tareas de mantenimiento |

### Ejemplos

```
feat(editor): añadir soporte para markdown
fix(tasks): corregir ciclo de estados
docs(readme): actualizar instrucciones de instalación
style(ui): mejorar espaciado en tarjetas
```

---

## Pull Requests

### Antes de crear un PR

- [ ] El código compila sin errores
- [ ] El linter no reporta problemas
- [ ] Los tests pasan (si existen)
- [ ] La documentación está actualizada

### Crear el PR

1. Push a tu fork
2. Abre un Pull Request contra `main`
3. Rellena la plantilla
4. Espera revisión

### Proceso de revisión

1. Al menos un approval requerido
2. Todos los checks deben pasar
3. Resuelve todos los comentarios
4. Squash y merge cuando sea aprobado

---

## ¿Preguntas?

Si tienes dudas, puedes:

- Abrir una [discusión](https://github.com/smouj/prompt-organizer/discussions)
- Mencionar a @smouj en tu issue/PR

---

¡Gracias por contribuir! 🎉
