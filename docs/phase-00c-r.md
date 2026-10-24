# Fase 00-C-R · Correcciones de accesibilidad y cierre de observaciones

**Fecha:** 23 de octubre de 2026
**Modalidad:** corrección focalizada sobre la auditoría Fase 00-C
**Alcance:** hallazgos A-01 a A-06 únicamente. Sin base de datos, migraciones,
Supabase, Groq, autenticación, rutas administrativas, módulos de negocio ni
dependencias nuevas.

## 1. Hallazgos corregidos

| ID | Hallazgo | Estado | Corrección aplicada |
| --- | --- | --- | --- |
| A-05 | Texto pequeño sobre fondo oscuro con opacidades de 3.19:1 a 4.47:1 | **CORREGIDO** | `white/35`, `white/40` y `white/45` → `white/55` (6.11:1) en `site-footer.tsx` y `page.tsx` |
| A-01 | Campos obligatorios sin señalización programática | **CORREGIDO** | Atributo `required` nativo en los 5 campos obligatorios públicos y en los 2 del login; `empresa` y consentimiento comercial quedan opcionales (política de la fase) |
| A-02 | Error del campo PDF fuera del `aria-describedby` | **CORREGIDO** | `aria-describedby` = pista + error (solo cuando existe); ambos nodos verificados en runtime |
| A-03 | Error de consentimiento sin asociación ARIA y sin `onBlur` alcanzable | **CORREGIDO** | `onBlur` conectado al checkbox, `aria-invalid` y `aria-describedby` condicional al nodo renderizado; lógica previamente inalcanzable ahora se ejecuta |
| A-04 | Borde de input a 1.47:1 (WCAG 1.4.11) | **CORREGIDO** | `--color-input: #7C8CA3` (3.42:1 sobre blanco, 3.19:1 sobre `canvas`); borde de error añadido con `aria-invalid:border-destructive` |
| A-06 | `aria-describedby` apuntando a IDs inexistentes | **CORREGIDO** | Asociación condicional en los 6 campos de texto de ambos formularios; 0 referencias colgantes en estado inicial |

### Política funcional implementada (según encargo)

- Formulario público: `nombre`, `correo`, `telefono`, `reporte` y
  `consentimiento` → **obligatorios**; `empresa` y `comercial` → **opcionales**.
- Formulario interno: `correo` y `password` → **obligatorios**.
- `empresa` vacío ya no genera error; si se escribe, mantiene la validación de
  longitud mínima. El aviso `onBlur` se conserva en todos los campos.
- El envío sigue deshabilitado y no existe autenticación.

### Cambios visuales puntuales (documentados)

- Token `--color-input`: `#CBD6E2` → `#7C8CA3` (borde más definido, misma
  familia gris-azulada corporativa).
- Hover de la etiqueta de archivo: `accent/50` → `accent/80` (3.25:1 ≥ 3:1).
- Estado de error del `Input`: borde `destructive` (6.57:1) vía
  `aria-invalid`.
- Texto secundario sobre oscuro uniformado a `white/55`; la jerarquía se
  mantiene con tipografía (eyebrow en mayúsculas/tracking) y con los niveles
  `white/60` (cuerpo) y `white/70` (listas).

## 2. Archivos modificados

| Archivo | Cambio |
| --- | --- |
| `src/app/globals.css` | `--color-input: #7C8CA3` |
| `src/components/ui/input.tsx` | `aria-invalid:border-destructive` |
| `src/components/layout/site-footer.tsx` | 2 eyebrows `/40`→`/55`, nota inferior `/45`→`/55` |
| `src/app/(public)/page.tsx` | 2 eyebrows `/35`→`/55`, 2 notas `/45`→`/55` |
| `src/components/forms/intake-form.tsx` | `required` por campo, `empresa` opcional, `aria-describedby` condicional (incluye pista del PDF), consentimiento con `onBlur`/`aria-invalid`/`aria-describedby`, hover `accent/80` |
| `src/components/forms/login-form.tsx` | `required` en ambos campos, `aria-describedby` condicional |
| `docs/design-system.md` | fila `--color-input`, reglas de contraste sobre oscuro, estado de error del input, regla de asociación condicional en §8 |
| `docs/decisions.md` | ADR-020 (nuevo) |
| `docs/phase-00c-r.md` | este informe |

**No se modificaron** (y por qué): `form-field.tsx` y `checkbox.tsx` ya
renderizaban el asterisco `aria-hidden` y propagan `required`, `onBlur`,
`aria-invalid` y `aria-describedby` del padre; la señalización programática
corresponde al control, no a la etiqueta. Ningún otro archivo fue alterado.

## 3. Evidencia de los cambios

### 3.1 Contraste (ratios WCAG calculados y verificados en navegador)

| Combinación | Antes | Después | Requisito |
| --- | --- | --- | --- |
| Eyebrows y notas `white/55` sobre `night-950` | 3.19–4.47 | **6.11** | ≥ 4.5 (AA texto) |
| Eyebrows/notas sobre tarjeta `white/4` + `night-950` | < 4.5 | **5.86** | ≥ 4.5 |
| Cuerpo `white/60` (sin cambio) | — | 7.01 | ≥ 4.5 |
| Listas `white/70` (sin cambio) | — | 9.16 | ≥ 4.5 |
| Borde input reposo vs blanco | 1.47 | **3.42** | ≥ 3 (1.4.11) |
| Borde input reposo vs `canvas` | 1.37 | **3.19** | ≥ 3 |
| Borde checkbox vs `canvas` | 1.37 | **3.19** | ≥ 3 |
| Borde input foco (`accent`) vs blanco | — | **4.89** | ≥ 3 |
| Borde etiqueta archivo hover (`accent/80`) | 2.05 (`accent/50`) | **3.25** | ≥ 3 |
| Borde input estado error vs blanco | — | **6.57** | ≥ 3 |
| Estado deshabilitado | n/a (sin controles deshabilitados salvo el submit, que está excluido de 1.4.11) | medido solo el botón de envío | — |

Barrido automático en `/`: **22 elementos de texto sobre fondo oscuro,
0 con ratio < 4.5:1**.

### 3.2 Asociaciones ARIA (runtime, Chrome headless)

- Estado inicial: **1** referencia `aria-describedby` en `/evaluacion`
  (`reporte-hint`, existe) y **0** en `/ingreso`; **0 IDs colgantes**.
- `reporte` tras blur: `aria-invalid=true`,
  `aria-describedby="reporte-hint reporte-error"` (ambos nodos existen).
- `nombre`/`correo`/`telefono` tras blur vacío: `aria-invalid=true`,
  `aria-describedby=<campo>-error` (nodo existe), mensaje visible.
- `empresa` tras blur vacío: `required=false`, `aria-invalid=false`,
  `describedby=null`, sin error y sin asterisco en el label.
- `consentimiento` focus+blur sin marcar: error renderizado,
  `aria-invalid=true`, `aria-describedby="consentimiento-error"` (existe);
  al marcar el error desaparece; al desmarcar reaparece asociado.
  `comercial`: `required=false`, sin error, opcional e independiente.
- `required` en runtime: público → `nombre/correo/telefono/reporte/
  consentimiento = true`, `empresa/comercial = false`; login →
  `ingreso-correo/ingreso-password = true`. Se usó `required` nativo (equivale
  a `aria-required="true"` para lectores de pantalla).

### 3.3 Sin envíos reales ni autenticación

- `/evaluacion` y `/ingreso`: `action=null`, `method=null`, `noValidate=true`,
  botón `disabled` + `aria-disabled="true"`.
- Enter con texto en un campo: la URL **no cambia** (sin sumisión implícita).
- `/admin` y `/admin/clientes`: **404**. `/`, `/evaluacion`, `/ingreso`: **200**.

## 4. Pruebas ejecutadas

| # | Prueba | Resultado |
| --- | --- | --- |
| 1 | `pnpm exec tsc --noEmit` | **PASS** (`EXIT=0`) |
| 2 | `pnpm lint` | **PASS** (`EXIT=0`, sin errores) |
| 3 | `pnpm test:run` | **PASS** (6 archivos / **21 pruebas**) |
| 4 | `pnpm build` | **PASS** (rutas `/`, `/evaluacion`, `/ingreso`, `/icon.svg`, `/_not-found`; sin `/admin`) |
| 5 | HTTP: `/`, `/evaluacion`, `/ingreso` | **PASS** (200) |
| 6 | HTTP: `/admin`, `/admin/clientes` | **PASS** (404) |
| 7 | Verificación A-01…A-06 por CDP | **PASS** (evidencia §3) |
| 8 | Responsive 360×800, 390×844, 768×1024, 1440×900 × 3 rutas | **PASS** (12/12 sin overflow, sin elementos anchos, **0 errores JS**) |
| 9 | Revisión visual con capturas | **PASS** (ver §5) |
| 10 | Suite E2E automatizada | **NO EJECUTADA** (no existe; fuera de alcance) |

Servidor verificado: build de producción (`next start`) en `localhost:3000`.

## 5. Revisión visual

Capturas en `shots-00c-r/` (temporal, fuera del repositorio):
`home-full-1440.png`, `evaluacion-reposo-1440.png`,
`evaluacion-errores-full-1440.png`, `ingreso-full-1440.png`,
`home-full-390.png`, `evaluacion-768x1024.png`, `home-390x844.png`.

- Los textos secundarios del footer y de la banda oscura son legibles y
  conservan jerarquía respecto al cuerpo (nivel `55` con tipografía distintiva).
- Los bordes de los campos se distinguen con claridad sin perder el aspecto
  corporativo; el estado de error (borde rojo + mensaje + resumen) es evidente
  y no depende solo del color.
- `empresa` se muestra sin asterisco; los campos obligatorios lo conservan.
- Sin desbordamientos ni cambios de composición.

## 6. Hallazgos pendientes (registrados para fases posteriores)

- **Bajos:** A-07 (tono `warning` de `StatusIndicator` 3.69:1), A-08 (menú
  móvil sin cierre con Escape), A-09 (`AdminMobileNavButton` sin handler y
  navegación admin oculta bajo `lg`), A-10 (`ConfirmDialog` con id estático),
  A-11 (`DataTable` reutiliza `className` en `EmptyState`), A-12 (icono del
  `Notice` warning a 2.92:1), A-20 (desbalance de columnas en `/evaluacion`
  escritorio), A-21 (tarjetas de resultados ajustadas a 768 px).
- **Informativos:** A-13 (drift en `architecture.md §5` y ADR-005 superado),
  A-14 (sin CSP/HSTS), A-15 (sin middleware/deny-by-default, pendiente hasta
  existir rutas privadas), A-17 (validación solo cliente hasta la fase server),
  A-18 (sin pruebas de interacción/E2E), A-19 (repositorio sin commits de
  00-A/00-B/00-C), A-22 (`ui/card.tsx` sin uso; componentes admin sin rutas).
- **Resueltos en esta fase:** A-16 (decisión `empresa` opcional / `teléfono`
  obligatorio, aplicada según encargo) y A-01…A-06.
- El marcador de fase en `src/config/site.ts` sigue en "Fase 00-B" (cambio
  deliberadamente no incluido: afecta texto/identidad visual fuera de alcance).

## 7. Riesgos residuales

1. Las validaciones siguen siendo **solo cliente**: no son control de
   seguridad. Se reimplementarán con Zod en servidor en la fase 01.
2. Sin CSP, HSTS ni middleware: aceptable en páginas estáticas sin sesión;
   obligatorio antes de crear `/admin`.
3. `required` nativo no aplica verificación real porque el formulario usa
   `noValidate` (correcto en esta fase): el envío permanece deshabilitado.
4. La verificación de navegador fue CDP headless; el estado de foco de
   Chrome headless requiere entrada previa de teclado/ratón (artefacto del
   entorno, no del código) — los resultados se obtuvieron con interacciones
   reales de teclado/ratón.
5. Los componentes administrativos siguen sin ejecutarse en navegador (no hay
   rutas); sus hallazgos A-07 a A-12 permanecen pendientes de validación
   funcional.
6. No se realizó `pnpm audit` (fuera del alcance solicitado).

## 8. Conclusión

Los seis hallazgos prioritarios de la auditoría 00-C quedan **corregidos y
verificados** con pruebas automatizadas, medición de contraste en navegador,
inspección ARIA en runtime y revisión visual. No se inició ninguna fase
adicional ni se alteró funcionalidad de negocio, diseño corporativo aprobado
ni superficie de seguridad.
