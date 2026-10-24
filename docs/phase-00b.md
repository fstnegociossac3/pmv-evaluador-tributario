# Informe de Fase 00-B

## 1. Estado

**Fase 00-B completada.** Se implementó la base visual corporativa sobre la
arquitectura de Fase 00-A: portada con las cuatro etapas obligatorias y
sección de resultados preliminares, formularios visuales no operativos en
`/evaluacion` y `/ingreso`, y un conjunto de componentes administrativos
reutilizables sin rutas. No se envía ni almacena ningún dato, no hay
autenticación y `/admin` continúa respondiendo 404.

## 2. Alcance ejecutado

### Portada `/`

- Proceso con las cuatro etapas exactas: "Completar datos", "Adjuntar reporte
  tributario", "Analizar información", "Conocer oportunidades potenciales",
  con los íconos `ClipboardList`, `FileUp`, `ScanSearch` y `Lightbulb`.
- Nueva sección "Resultados preliminares" (nivel de compatibilidad, criterios
  observados, siguientes pasos) con aviso de alcance: sin asesoría, sin
  garantía de aceptación y sin formalización con entidades públicas.
- Eliminación de gradientes y blur decorativos (hero, tarjeta lateral y banda
  oscura); las sombras `shadow-lift` se rebajaron a `shadow-card`.
- Referencias de fase actualizadas a 00-B.

### `/evaluacion` · Formulario visual no operativo

- `IntakeForm`: nombre, correo, teléfono, empresa, carga de reporte PDF
  (máx. 10 MB) y dos consentimientos (tratamiento confidencial obligatorio,
  información comercial opcional).
- Validación local solo al salir del campo (`noValidate` + `onBlur`),
  mensajes vinculados con `aria-describedby`, `aria-invalid` y `ErrorSummary`
  con `role="alert"` y enlaces a cada campo.
- Botón de envío siempre `disabled` con `aria-disabled="true"` y leyenda
  explícita ("Esta acción no está habilitada en la Fase 00-B").
- El aside perdió el bloque oscuro "Próximamente" (reemplazado por el
  formulario) y el `sticky` que impedía alcanzar el pie del formulario alto.

### `/ingreso` · Formulario visual no operativo

- `LoginForm`: correo y contraseña con alternar mostrar/ocultar
  (`aria-label` explícito), validación on-blur y envío deshabilitado.
- Se eliminó la tarjeta decorativa con blur/gradiente; el `LoginForm` ocupa la
  columna derecha y el aviso duplicado de la columna izquierda se retiró.

### Componentes base nuevos (`src/components/ui/`)

- `FormField` con helper `fieldIds(id)` (`-hint`, `-error`, `-message`).
- `Checkbox` con clase `.brand-checkbox` (appearance-none, marca SVG en
  data-URI, anillo `:focus-visible`) — sin dependencias nuevas.
- `ErrorSummary` (`role="alert"`, enlaces internos a los campos).

### Componentes administrativos (`src/components/admin/`, sin rutas)

`AdminNav` + `AdminMobileNavButton` + `AdminBrandMark`, `AdminSidebar`
colapsable con `aria-expanded`, `AdminHeader`, `StatCard` con tendencias
`up/down/flat`, `DataTable` con `EmptyState` automático, `EmptyState`,
`StatusIndicator` (tonos neutral/info/success/warning/danger),
`ConfirmDialog` con `<dialog>` nativo (`showModal`, foco atrapado, Escape),
skeletons (`Skeleton`, `StatCardSkeleton`, `TableSkeleton`,
`FormSectionSkeleton`) con `motion-safe:animate-pulse` y `FormSection`.

### Accesibilidad global

- Bloque `@media (prefers-reduced-motion: reduce)` en `globals.css` que anula
  animaciones y transiciones (y desactiva `scroll-behavior: smooth`).
- `.brand-checkbox` con foco visible y estado `disabled`.
- `siteConfig.phase` actualizado a "Fase 00-B".

## 3. Archivos creados

```text
src/components/ui/form-field.tsx
src/components/ui/checkbox.tsx
src/components/ui/error-summary.tsx
src/components/forms/intake-form.tsx
src/components/forms/login-form.tsx
src/components/admin/admin-nav.tsx
src/components/admin/admin-sidebar.tsx
src/components/admin/admin-header.tsx
src/components/admin/stat-card.tsx
src/components/admin/data-table.tsx
src/components/admin/empty-state.tsx
src/components/admin/status-indicator.tsx
src/components/admin/confirm-dialog.tsx
src/components/admin/skeletons.tsx
src/components/admin/form-section.tsx
tests/unit/form-ui.test.tsx
tests/unit/admin-ui.test.tsx
tests/unit/forms.test.tsx
docs/phase-00b.md
```

## 4. Archivos modificados

```text
src/app/globals.css                 reduced motion + .brand-checkbox
src/app/(public)/page.tsx           portada rediseñada (4 pasos, preliminares)
src/app/(public)/evaluacion/page.tsx IntakeForm integrado, avisos sin duplicar
src/app/(public)/ingreso/page.tsx    LoginForm integrado, sin blur decorativo
src/config/site.ts                  phase → "Fase 00-B"
vitest.config.mts                   include → tests/**/*.test.{ts,tsx}
.env.example                        comentarios de fase actualizados
README.md                           estado, rutas, estructura, restricciones
docs/design-system.md               componentes nuevos + desviación de contraste
docs/decisions.md                   ADR-016 a ADR-019 + advertencias
```

## 5. Decisiones registradas

- **ADR-016** — Validación visual local sin envío de datos (on-blur, botón
  siempre deshabilitado).
- **ADR-017** — `Checkbox` nativo con CSS `.brand-checkbox` en lugar de Radix
  (sin dependencias nuevas).
- **ADR-018** — `ConfirmDialog` con `<dialog>` nativo (`showModal`) en lugar
  de Radix Dialog.
- **ADR-019** — Desviación documentada: `muted-foreground` mantiene
  `slate-muted #5B6B80` (5.07:1 AA) porque `#65758A` marca 4.38:1.

## 6. Validaciones obligatorias

| Validación                 | Resultado                                                    |
| -------------------------- | ------------------------------------------------------------ |
| `pnpm exec tsc --noEmit`   | Sin errores.                                                  |
| `pnpm lint`                | Sin errores.                                                  |
| `pnpm test:run`            | 6 archivos, 21 pruebas, todas pasan.                          |
| `pnpm build`               | OK; rutas `/`, `/evaluacion`, `/ingreso`, `/icon.svg`, `/_not-found`. |
| Smoke HTTP                 | `/` 200, `/evaluacion` 200, `/ingreso` 200, `/admin` **404**. |

## 7. Verificación visual (CDP headless)

Capturas en `360×800`, `390×844`, `768×1024` y `1440×900` para las tres rutas
públicas (12 combinaciones):

- **Overflow horizontal:** `false` en las 12 combinaciones.
- **Errores JS / consola:** 0 en las 12 combinaciones.
- **Teclado (`/evaluacion`):** orden lógico — enlace "Saltar al contenido",
  navegación, campos del formulario (`nombre` → `comercial`), y tras validar
  los enlaces del `ErrorSummary` quedan enfocables.
- **Validación on-blur:** al tabular fuera de "nombre" vacío aparece el error
  "Ingresa el nombre de la persona responsable." con `aria-invalid="true"`.
- **Contraseña (`/ingreso`):** el clic en "Mostrar contraseña" cambia el tipo
  de `password` a `text`.
- **`/admin`:** responde 404 con la página `not-found` del portal.

Las capturas quedaron en el directorio temporal de trabajo
(`shots-00b/`) como evidencia de la ronda; no se versionan imágenes en el
repositorio.

## 8. Restricciones cumplidas

- No se envía, procesa ni almacena datos personales (los formularios son
  clientes y el envío está deshabilitado).
- No hay autenticación, cuentas ni credenciales; `/admin` sigue en 404.
- Sin tablas, migraciones, Drizzle, Supabase ni Groq reales.
- Sin motor de elegibilidad ni dashboard de demo público.
- Sin convenios SUNAT ni financiamientos inventados; sin testimonios, cifras
  ni certificaciones.
- Sin dependencias nuevas (Radix Checkbox/Dialog resueltos con CSS y
  `<dialog>` nativo).
- Sin modificar lógica de negocio: los cambios son de presentación.

## 9. Problemas y advertencias pendientes

- Las pruebas de componentes son de render estático (`react-dom/server`); no
  cubren interacción de usuario (requeriría Testing Library, que se pospuso
  para no agregar dependencias).
- La verificación visual se hace por CDP headless; no hay suite E2E.
- El toggle "Secciones" del `AdminHeader` móvil no abre un panel real (los
  componentes admin no tienen rutas ni layout propio en esta fase).

## 10. Veredicto

**Fase 00-B completada con todas sus validaciones en verde.** El portal
muestra la identidad corporativa completa, los formularios demuestran los
estados de error por teclado sin enviar nada y los componentes
administrativos quedan listos para la fase que habilite rutas.

## 11. Recomendaciones para Fase 00-C

- Definir el alcance de Fase 00-C antes de escribir código (módulos
  administrativos enrutados, o integraciones de datos).
- Si se implementan rutas `/admin`, reutilizar `src/components/admin/` y
  agregar un layout con `AdminSidebar` + `AdminHeader`.
- Incorporar Testing Library para probar interacción de `IntakeForm` y
  `LoginForm` (on-blur, consentimientos, toggle de contraseña).
- Considerar una suite E2E (Playwright) que automatice la verificación de
  viewports y teclado hoy realizada manualmente por CDP.
