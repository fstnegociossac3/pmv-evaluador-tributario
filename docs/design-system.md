# Guía de diseño visual

## 1. Personalidad de marca

La interfaz debe transmitir **rigor técnico, cercanía y discreción**. El tono
visual es corporativo y moderno, con un acento editorial en la tipografía
serif y detalles dorados usados con moderación.

Atributos:

- Confiable, no burocrático.
- Claro, no simplista.
- Premium, no ostentoso.
- Humano, no informal.
- Preciso, no rígido.

## 2. Paleta

### Colores de marca

| Token             | Hex       | Uso principal                                      |
| ----------------- | --------- | -------------------------------------------------- |
| `night-950`       | `#0B1726` | Fondos oscuros, footer y bandas de contraste.       |
| `night-900`       | `#14263D` | Color principal de marca y texto.                   |
| `night-800`       | `#1C3550` | Hover de superficies primarias.                     |
| `night-700`       | `#274765` | Detalles y bordes sobre fondos oscuros.             |
| `night-300`       | `#9FB0C3` | Texto secundario sobre fondos oscuros.              |
| `teal-700`        | `#126A6E` | Texto de acento con buen contraste.                 |
| `teal-600`        | `#197D82` | Acento principal, enlaces y focos.                  |
| `teal-500`        | `#2A9297` | Detalles y puntos sobre fondos oscuros.             |
| `teal-100`        | `#D8ECEC` | Fondos suaves de acento.                            |
| `gold-600`        | `#B98532` | Acento dorado profundo para iconos y detalles.      |
| `gold-500`        | `#D6A34D` | Acento dorado decorativo y texto sobre fondo oscuro.|
| `gold-100`        | `#F6EAD3` | Fondos suaves de advertencia o distinción.          |
| `canvas`          | `#F5F7FA` | Fondo general del portal.                           |
| `slate-muted`     | `#5B6B80` | Texto secundario sobre fondo claro.                 |

### Tokens semánticos

| Token                      | Valor actual       | Uso                                  |
| -------------------------- | ------------------ | ------------------------------------ |
| `--color-background`       | `canvas`           | Fondo de la aplicación.              |
| `--color-foreground`       | `night-900`        | Texto principal.                     |
| `--color-card`             | `#FFFFFF`          | Superficies y tarjetas.              |
| `--color-primary`          | `night-900`        | Botones y acciones principales.      |
| `--color-primary-foreground`| `#FFFFFF`         | Texto sobre primario.                |
| `--color-accent`           | `teal-600`         | Acento interactivo.                  |
| `--color-accent-foreground`| `#FFFFFF`          | Texto sobre acento.                  |
| `--color-gold`             | `gold-500`         | Detalle de marca y énfasis.          |
| `--color-muted`            | `#EDF2F7`          | Superficies secundarias.             |
| `--color-muted-foreground` | `slate-muted`      | Texto secundario.                    |
| `--color-border`           | `#D9E2EC`          | Bordes y separadores.                |
| `--color-input`            | `#7C8CA3`          | Borde de controles: inputs, carga de archivo y checkbox. |
| `--color-ring`             | `teal-600`         | Anillo de foco.                      |
| `--color-success`          | `#1D7A57`          | Estados exitosos.                    |
| `--color-warning`          | `#A86B12`          | Estados de atención.                 |
| `--color-destructive`      | `#B42318`          | Errores y acciones destructivas.     |

### Contraste

Ratios calculados con la fórmula WCAG 2.x:

- `night-900` sobre `canvas`: **14.24:1**.
- `slate-muted` sobre `canvas`: **5.07:1**.
- Blanco sobre `teal-600`: **4.89:1**.
- `teal-600` sobre `canvas`: **4.55:1**.
- `gold-500` sobre `night-900`: **6.70:1**.
- `gold-500` sobre `canvas`: **2.13:1** (solo decorativo).
- `gold-600` sobre blanco: **3.25:1** (solo iconos o texto grande).
- `--color-input #7C8CA3` sobre blanco: **3.42:1** y sobre `canvas`: **3.19:1**
  (borde de controles, WCAG 1.4.11 no textual ≥3:1).
- Blanco al 55 % (`white/55`) sobre `night-950`: **6.11:1**.

Reglas de contraste sobre fondos oscuros:

- Texto secundario (eyebrows, notas al pie, avisos pequeños): `white/55`
  como mínimo (**6.11:1**), p. ej. `text-white/55`.
- Cuerpo de texto: `white/60` (**7.01:1**); listas destacadas: `white/70`
  (**9.16:1**). No usar opacidades por debajo de 55 % para texto.

Regla: el dorado no se usa para texto pequeño sobre fondos claros. Para texto
de acento se utiliza `teal-700` o `night-900`. El dorado funciona como línea,
punto, borde o texto sobre fondo oscuro.

**Desviación documentada:** el gris `#65758A` propuesto originalmente marca
**4.38:1** sobre `canvas #F5F7FA` (por debajo de AA para texto normal), por lo
que `muted-foreground` usa `slate-muted #5B6B80` con **5.07:1**. Ver
ADR-019 en `docs/decisions.md`.

## 3. Tipografía

- **Display:** Newsreader (serif variable). Títulos y acentos editoriales.
- **Texto:** Manrope (sans variable). Interfaz, párrafos y controles.
- **Mono:** pila monoespaciada del sistema. Numeración, códigos y metadatos.

Ambas fuentes se cargan con `next/font/google` y se autoalojan en el build.

| Utility        | Tamaño / comportamiento                              |
| -------------- | ---------------------------------------------------- |
| `text-display` | `clamp(2.75rem, 6vw, 4.5rem)`, line-height 1.02.     |
| `text-heading-1`| `clamp(2.25rem, 4.2vw, 3.25rem)`, line-height 1.08. |
| `text-heading-2`| `clamp(1.875rem, 3vw, 2.5rem)`, line-height 1.12.   |
| `text-heading-3`| `1.375rem`, line-height 1.3.                         |
| `text-eyebrow` | `0.6875rem`, mayúsculas, tracking 0.2em.             |

Los títulos usan `font-display` y peso 500. El texto de interfaz usa
`font-sans` con pesos 400, 600 y 700.

## 4. Espaciado y layout

- Escala base de Tailwind: múltiplos de `0.25rem`.
- `--spacing-section`: `7rem` para secciones amplias.
- `--spacing-section-sm`: `4.5rem` para secciones compactas.
- `--spacing-gutter`: `1.5rem` para separación entre bloques.
- `--container-page`: `80rem` (contenedor principal).
- `--container-prose`: `44rem` (texto largo).

Contenedor estándar: `Container` con padding `1.25rem` en móvil, `1.5rem` en
tablet y `2rem` en escritorio.

### Breakpoints

Se utilizan los breakpoints de Tailwind:

- `sm`: 40rem.
- `md`: 48rem.
- `lg`: 64rem.
- `xl`: 80rem.

El header cambia a navegación de escritorio en `lg`. Las grillas de contenido
pasan de una a dos columnas en `md`/`lg` y a cuatro en `xl` cuando corresponde.

## 5. Bordes, radios y sombras

| Token        | Valor       | Uso                                  |
| ------------ | ----------- | ------------------------------------ |
| `radius-sm`  | `0.375rem`  | Elementos pequeños.                  |
| `radius-md`  | `0.625rem`  | Controles.                           |
| `radius-lg`  | `0.75rem`   | Botones e inputs.                    |
| `radius-xl`  | `1rem`      | Bloques internos.                    |
| `radius-2xl` | `1.5rem`    | Tarjetas.                            |
| `radius-3xl` | `2rem`      | Paneles destacados.                  |
| `shadow-soft`| Sutil       | Tarjetas y controles en reposo.      |
| `shadow-card`| Media       | Tarjetas elevadas.                   |
| `shadow-lift`| Alta        | Hero y paneles principales.          |

Los bordes usan `--color-border`. Sobre fondos oscuros se utilizan bordes
blancos con opacidad entre 10 % y 15 %.

## 6. Componentes base

| Componente       | Archivo                                  | Notas                                              |
| ---------------- | ---------------------------------------- | -------------------------------------------------- |
| `Button`         | `src/components/ui/button.tsx`           | Variantes `primary`, `accent`, `gold`, `outline`, `ghost`, `link`. |
| `Card`           | `src/components/ui/card.tsx`             | Composición con header, título, descripción, contenido y footer. |
| `Badge`          | `src/components/ui/badge.tsx`            | Estados y etiquetas.                               |
| `Input`          | `src/components/ui/input.tsx`            | Campo base para formularios visuales.              |
| `Label`          | `src/components/ui/label.tsx`            | Etiqueta accesible.                                |
| `Notice`         | `src/components/ui/notice.tsx`           | Avisos informativos, de advertencia y confidenciales. |
| `FormField`      | `src/components/ui/form-field.tsx`       | Etiqueta + pista + error con `fieldIds(id)` para `aria-describedby`. |
| `Checkbox`       | `src/components/ui/checkbox.tsx`         | Nativo con clase `.brand-checkbox` (marca en data-URI, foco visible). |
| `ErrorSummary`   | `src/components/ui/error-summary.tsx`    | `role="alert"` con enlaces a cada campo inválido.  |
| `Container`      | `src/components/layout/container.tsx`    | Ancho máximo y padding responsivo.                 |
| `Logo`           | `src/components/brand/logo.tsx`          | Marca con versión clara y oscura.                  |
| `SiteHeader`     | `src/components/layout/site-header.tsx`  | Navegación principal y CTA.                        |
| `MobileNav`      | `src/components/layout/mobile-nav.tsx`   | Menú móvil accesible.                              |
| `SiteFooter`     | `src/components/layout/site-footer.tsx`  | Navegación secundaria y estado de la fase.         |
| `SectionHeading` | `src/components/section-heading.tsx`     | Encabezado de sección con eyebrow y descripción.   |

Los componentes de `ui` son presentacionales. No contienen reglas de negocio ni
acceden a datos.

### Formularios visuales

| Componente   | Archivo                                    | Notas                                                          |
| ------------ | ------------------------------------------ | -------------------------------------------------------------- |
| `IntakeForm` | `src/components/forms/intake-form.tsx`     | Campos de contacto/empresa, carga PDF, consentimientos; on-blur, envío deshabilitado. |
| `LoginForm`  | `src/components/forms/login-form.tsx`      | Correo y contraseña con mostrar/ocultar; envío deshabilitado.   |

Ambos son componentes cliente de demostración: `noValidate`, validación local
al salir del campo, `aria-invalid` + mensajes asociados y botón `disabled` con
leyenda explícita. No realizan peticiones ni almacenan datos.

### Componentes administrativos (sin rutas)

Bajo `src/components/admin/`, listos para usar cuando exista el panel
(`/admin` sigue respondiendo 404 en esta fase):

| Componente          | Archivo                                    | Notas                                                     |
| ------------------- | ------------------------------------------ | --------------------------------------------------------- |
| `AdminNav`          | `admin-nav.tsx`                            | Navegación horizontal con marca activa y `AdminMobileNavButton`. |
| `AdminSidebar`      | `admin-sidebar.tsx`                        | Colapsable (200 px ↔ 76 px), `aria-expanded`, tooltips al colapsar. |
| `AdminHeader`       | `admin-header.tsx`                         | Título, descripción, acciones y navegación.               |
| `StatCard`          | `stat-card.tsx`                            | KPI con icono y tendencia `up`/`down`/`flat`.             |
| `DataTable`         | `data-table.tsx`                           | Tabla genérica con `EmptyState` automático y scroll horizontal. |
| `EmptyState`        | `empty-state.tsx`                          | Estado vacío con icono, texto y acción opcional.          |
| `StatusIndicator`   | `status-indicator.tsx`                     | Punto + texto con tonos neutral/info/success/warning/danger. |
| `ConfirmDialog`     | `confirm-dialog.tsx`                       | `<dialog>` nativo con `showModal()`, foco atrapado y Escape. |
| Skeletons           | `skeletons.tsx`                            | `Skeleton`, `StatCardSkeleton`, `TableSkeleton`, `FormSectionSkeleton` con `motion-safe:animate-pulse`. |
| `FormSection`       | `form-section.tsx`                         | Sección de formulario administrativo con acciones.        |

## 7. Estados interactivos

- **Reposo:** superficie clara, borde definido, sombra suave.
- **Hover:** cambio de superficie o de borde; nunca solo color.
- **Foco:** anillo de 2 px con `--color-ring`, offset de 2 px sobre el fondo.
- **Activo:** tono más profundo (`night-950` o `teal-700`).
- **Deshabilitado:** opacidad 50 %, cursor no permitido, sin interacción.
- **Error:** `destructive` con texto e icono, no solo color. Los `Input`
  además aplican `aria-invalid:border-destructive` al borde del campo.
- **Éxito:** `success` con texto explícito.

Todos los controles interactivos tienen estados de foco visibles y un área
mínima de 40 × 40 px cuando son iconos.

## 8. Accesibilidad

- Contraste mínimo AA para texto normal.
- HTML semántico: `header`, `nav`, `main`, `section`, `footer`, listas y
  encabezados jerárquicos.
- Enlace "Saltar al contenido" en el layout público.
- `aria-label` en navegaciones y botones de icono.
- `aria-expanded` y `aria-controls` en el menú móvil.
- Iconos decorativos con `aria-hidden="true"`; el texto comunica la acción.
- Sin dependencia exclusiva del color para transmitir estado.
- `prefers-reduced-motion`: regla global en `globals.css` que anula
  animaciones y transiciones; los skeleton usan `motion-safe:animate-pulse`.
- Formularios: labels asociados por `htmlFor`, pistas y errores vinculados con
  `aria-describedby` **solo cuando el nodo existe** (asociación condicional),
  `aria-invalid` en error, `required`/`aria-required` en campos obligatorios,
  resumen con `role="alert"` y foco visible en todos los controles (incluido el
  checkbox de marca).

## 9. Tono de contenido

- Claro, directo y sin promesas exageradas.
- No presentar funcionalidades futuras como operativas.
- Usar "evaluación preliminar", "referencia" y "no vinculante" con precisión.
- Evitar lenguaje que sugiera aprobación automática o garantizada.
- Explicar siempre qué datos se usan y quién puede verlos.

## 10. Reglas de uso

1. Usar el azul noche como base de autoridad; el turquesa para interacción.
2. Reservar el dorado para detalles de marca, no para grandes superficies.
3. Mantener una sola idea principal por sección.
4. Preferir tarjetas con borde y sombra suave antes que sombras profundas.
5. No usar gradientes como fondo de texto pequeño.
6. No introducir colores fuera de los tokens sin documentarlos.
7. Mantener el portal público visualmente distinto del panel administrativo
   futuro, pero con la misma identidad.
