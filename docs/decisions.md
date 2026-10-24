# Registro de decisiones técnicas

## Contexto verificado

Fecha de preparación: 23 de octubre de 2026.

El repositorio ya contenía un proyecto creado con `create-next-app`, con App
Router, TypeScript, ESLint y Tailwind CSS configurados. Se conservó el proyecto
existente y no se recreó ni se sobrescribió la base.

### Entorno detectado

| Herramienta | Versión   |
| ----------- | --------- |
| Node.js     | `22.21.0` |
| pnpm        | `12.6.0`  |
| Next.js     | `16.4.2`  |
| React       | `19.3.0`  |
| TypeScript  | `5.9.3`   |
| Tailwind CSS| `4.3.3`   |
| ESLint      | `9.39.5`  |

Verificaciones iniciales:

- App Router activo en `src/app`.
- `strict: true` en `tsconfig.json`.
- Alias `@/*` apuntando a `src/*`.
- ESLint configurado con `eslint-config-next` (core web vitals y TypeScript).
- Tailwind CSS v4 integrado mediante `@tailwindcss/turbopack` en
  `next.config.ts`.
- Turbopack habilitado por el flujo de build de Next.js 16.

## Decisiones

### ADR-001 · Conservar el proyecto existente

**Decisión:** mantener el scaffold y actualizar solo lo necesario.

**Motivo:** evita recrear configuración válida y perder historial. El proyecto
ya cumplía App Router, TypeScript estricto, ESLint y Tailwind v4.

**Consecuencia:** se conservaron `next.config.ts` con `cacheComponents`,
`partialPrefetching` y la regla de Turbopack para CSS.

### ADR-002 · Arquitectura modular con cuatro capas

**Decisión:** cada módulo de negocio tiene `domain`, `application`,
`infrastructure` y `presentation`.

**Motivo:** separar reglas de negocio de React, proveedores y persistencia;
facilitar pruebas y futuras extensiones.

**Consecuencia:** las carpetas se crean en esta fase con `.gitkeep`. La
implementación concreta se difiere a fases posteriores.

### ADR-003 · Registro tipado de módulos

**Decisión:** `src/modules/registry.ts` describe los nueve módulos, su alcance y
sus capas.

**Motivo:** hacer explícita la arquitectura y permitir pruebas de integridad sin
introducir lógica de negocio.

**Consecuencia:** el registro debe actualizarse cuando se agregue un módulo.

### ADR-004 · Sin rutas administrativas en Fase 00-A

**Decisión:** no crear páginas bajo `/admin`. Las rutas se declaran solo en
`src/config/routes.ts` como reservadas.

**Motivo:** una ruta administrativa sin autenticación real expondría información
o simularía controles de seguridad.

**Consecuencia:** `/admin` no existe y devuelve 404. La protección se
implementará con autenticación, RBAC, proxy de Next.js y pruebas de autorización
negativa antes de habilitarla.

### ADR-005 · Portal público informativo y transparente

**Decisión:** las páginas `/` y `/evaluacion` describen el proceso, pero no
incluyen formularios ni botones que simulen operaciones.

**Motivo:** evitar presentar funcionalidades futuras como operativas.

**Consecuencia:** el botón de inicio de evaluación está deshabilitado y se
identifica el estado de preparación.

### ADR-006 · Tokens de diseño en Tailwind v4

**Decisión:** definir la paleta, tipografía, radios, sombras, espaciados y
tamaños en `src/app/globals.css` mediante `@theme` y variables semánticas.

**Motivo:** una única fuente de verdad visual, compatible con utilidades de
Tailwind y con componentes estilo shadcn/ui.

**Consecuencia:** los componentes usan tokens semánticos; cualquier color nuevo
debe documentarse en `docs/design-system.md`.

### ADR-007 · Componentes base estilo shadcn/ui

**Decisión:** implementar manualmente `Button`, `Card`, `Badge`, `Input`,
`Label` y `Notice` con `class-variance-authority`, `tailwind-merge` y Radix Slot.
Se agrega `components.json` para futuras incorporaciones con la CLI de shadcn.

**Motivo:** controlar el diseño y mantener el conjunto mínimo de dependencias.
No se necesita el dashboard ni componentes complejos en esta fase.

**Consecuencia:** futuros componentes de shadcn/ui deben respetar los tokens y
las convenciones existentes.

### ADR-008 · Dependencias de integración instaladas, sin conexión

**Decisión:** instalar los SDK de Supabase, Drizzle y Groq, pero no crear
clientes, tablas ni llamadas.

**Motivo:** fijar versiones compatibles y dejar preparada la infraestructura sin
violar las restricciones de la fase.

**Consecuencia:** el bundle actual no importa estos SDK en las páginas públicas.
Las conexiones se habilitarán en fases posteriores.

### ADR-009 · Validación de entorno diferida

**Decisión:** `src/infrastructure/config/env.ts` expone funciones de lectura y
esquemas Zod, pero no se invocan durante el build.

**Motivo:** el build de Fase 00-A no debe requerir credenciales reales.

**Consecuencia:** la aplicación fallará de forma explícita cuando una fase
posterior invoque la configuración sin variables válidas.

### ADR-010 · Sin esquema ni migraciones

**Decisión:** instalar Drizzle y Drizzle Kit sin crear `schema.ts`, migraciones
ni conexiones.

**Motivo:** la persistencia no forma parte del alcance aprobado.

**Consecuencia:** la estructura de datos se diseñará en la fase de datos, con
revisión de seguridad y políticas de acceso.

### ADR-011 · Fuentes autoalojadas con `next/font`

**Decisión:** usar Manrope para interfaz y Newsreader para títulos.

**Motivo:** identidad visual corporativa y editorial, con carga optimizada y sin
solicitudes del navegador a Google.

**Consecuencia:** el build descarga las fuentes y las incluye como assets.

### ADR-012 · Vitest para pruebas unitarias

**Decisión:** usar Vitest en entorno Node con alias `@/*` y pruebas en
`tests/unit`.

**Motivo:** inicio rápido, compatible con TypeScript y suficiente para probar
utilidades, rutas y registro de módulos.

**Consecuencia:** las pruebas de componentes e integración se agregarán cuando
exista lógica que lo justifique.

### ADR-013 · Cabeceras de seguridad básicas

**Decisión:** agregar `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` y `Permissions-Policy` en `next.config.ts`.

**Motivo:** endurecimiento básico sin afectar el desarrollo local.

**Consecuencia:** la CSP estricta con nonces se difiere hasta definir orígenes de
Supabase, Groq y Vercel.

### ADR-014 · Política de variables de entorno

**Decisión:** `.env.example` contiene solo marcadores de posición y `.gitignore`
excluye todos los `.env*` excepto `.env.example`.

**Motivo:** evitar filtraciones de credenciales.

**Consecuencia:** las claves reales se configurarán en el entorno local y en
Vercel; `SUPABASE_SERVICE_ROLE_KEY` y `GROQ_API_KEY` son exclusivamente de
servidor.

### ADR-015 · Builds de dependencias aprobados explícitamente

**Decisión:** `pnpm-workspace.yaml` permite el script de `esbuild` y mantiene
bloqueados `sharp` y `unrs-resolver`.

**Motivo:** pnpm 12 exige aprobación explícita de scripts. `esbuild` es necesario
para Vitest y Drizzle Kit.

**Consecuencia:** cualquier nueva dependencia con scripts deberá evaluarse y
aprobarse de forma consciente.

### ADR-016 · Validación visual local sin envío de datos

**Decisión:** los formularios de Fase 00-B (`IntakeForm`, `LoginForm`) validan
solo en el cliente con `noValidate`, se ejecutan al salir del campo
(`onBlur`) y los botones de envío permanecen `disabled` con
`aria-disabled="true"` y una leyenda explícita. No se invoca ningún endpoint
ni se almacena información.

**Motivo:** la fase requiere formularios meramente visuales sin procesar ni
almacenar datos personales. La validación on-blur permite demostrar los
estados de error sin enviar nada.

**Consecuencia:** la lógica de envío real se reemplazará por completo en la
fase que implemente API route, persistencia y autenticación.

### ADR-017 · Checkbox de marca con CSS propio en lugar de Radix

**Decisión:** el componente `Checkbox` usa un `input[type=checkbox]` nativo
con la clase `.brand-checkbox` definida en `globals.css` (appearance-none +
marca SVG en data-URI + anillo `:focus-visible`). No se agregó
`@radix-ui/react-checkbox`.

**Motivo:** Radix ya está presente como dependencia para `Slot`, pero para un
control visual sin estado controlado por servidor el nativo resuelve con menos
superficie y sin dependencia nueva, cumpliendo foco visible y contraste.

**Consecuencia:** si se necesita `indeterminate` controlado o integración con
formularios complejos, se evaluará Radix Checkbox en una fase posterior.

### ADR-018 · Diálogo de confirmación con `<dialog>` nativo

**Decisión:** `ConfirmDialog` usa el elemento nativo `dialog` con
`showModal()`, cerrado mediante `cancel`/`close` hacia un estado `open`
controlado. No se agregó Radix Dialog ni similar.

**Motivo:** el navegador entrega foco atrapado, backdrop y cierre con Escape de
forma nativa, evitando dependencias adicionales para componentes
administrativos aún no enrutados.

**Consecuencia:** si se requieren portales, animaciones o triggers avanzados,
se migrará al primitivo Radix correspondiente manteniendo la misma API.

### ADR-019 · Documentación visual de desviación de contraste

**Decisión:** se mantiene `slate-muted #5B6B80` como `muted-foreground` en
lugar de `#65758A` (4.38:1 sobre `canvas`, inferior a AA). La desviación queda
documentada en `docs/design-system.md`.

**Motivo:** cumplir contraste mínimo WCAG AA para texto pequeño.

**Consecuencia:** cualquier cambio futuro de `muted-foreground` debe medirse
antes de sustituir el token.

### ADR-020 · Corrección de contraste en bordes de control y textos sobre oscuro

**Decisión:** (1) `--color-input` pasa de `#CBD6E2` (1.47:1 sobre blanco) a
`#7C8CA3` (3.42:1 sobre blanco y 3.19:1 sobre `canvas`), usándose en inputs,
etiqueta de carga de archivo y checkbox; (2) el texto secundario sobre fondos
oscuros usa `white/55` como mínimo (**6.11:1** sobre `night-950`), sustituyendo
las opacidades `white/35`, `white/40` y `white/45` (3.19:1 a 4.47:1). Ambos
cambios quedan registrados en `docs/design-system.md`.

**Motivo:** cumplir WCAG 1.4.11 (contraste no textual ≥3:1) y 1.4.3 (texto
normal ≥4.5:1), correspondientes a los hallazgos A-04 y A-05 de la auditoría
de la Fase 00-C.

**Consecuencia:** los bordes de los controles se distinguen con más definición
y el hover de la etiqueta de archivo se ajustó a `accent/80` (3.25:1). Queda
prohibido usar opacidades de texto por debajo de 55 % sobre fondos oscuros sin
volver a medir el ratio.

## Advertencias conocidas

- pnpm reporta que `eslint@9.39.5` figura como deprecado en el registro y que la
  versión fuera de rango es 10.13.0. Se mantiene ESLint 9 porque
  `eslint-config-next@16.4.2` y sus plugins están validados con esa línea y el
  lint actual pasa sin errores. La actualización a ESLint 10 se evaluará en una
  fase de mantenimiento.
- El proyecto no define modo oscuro. Los tokens actuales son de tema claro.
- No se ha definido una CSP. Se implementará al habilitar autenticación e
  integraciones.
- Las pruebas de componentes son de render estático (`react-dom/server`); no
  cubren interacción con eventos del usuario (se cubrirá con Testing Library o
  Playwright cuando haya lógica que lo justifique).
- La verificación visual se realiza por CDP headless (capturas en los cuatro
  viewports obligatorios); no existe suite E2E automatizada todavía.
