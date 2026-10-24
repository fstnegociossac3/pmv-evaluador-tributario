# Informe de Fase 00-A

## 1. Estado

**Fase 00-A completada.** Se preparó la arquitectura modular, el sistema de
tokens, las rutas públicas, la configuración del proyecto y la estructura de
pruebas. No se implementaron módulos de negocio ni integraciones reales.

## 2. Verificación inicial

- Se inspeccionó el repositorio existente antes de modificar archivos.
- Se conservó el proyecto creado previamente con `create-next-app`.
- No se recreó ni se sobrescribió la configuración base.
- Se confirmó App Router, TypeScript `strict`, ESLint y Tailwind CSS v4.

### Versiones detectadas

| Herramienta  | Versión   |
| ------------ | --------- |
| Node.js      | `22.21.0` |
| pnpm         | `12.6.0`  |
| Next.js      | `16.4.2`  |
| React        | `19.3.0`  |
| TypeScript   | `5.9.3`   |
| Tailwind CSS | `4.3.3`   |
| ESLint       | `9.39.5`  |

## 3. Estructura creada

```text
src/
  app/
    (public)/
      layout.tsx
      page.tsx
      evaluacion/page.tsx
      ingreso/page.tsx
    layout.tsx
    globals.css
    not-found.tsx
  components/
    brand/logo.tsx
    layout/container.tsx
    layout/mobile-nav.tsx
    layout/site-footer.tsx
    layout/site-header.tsx
    section-heading.tsx
    ui/badge.tsx
    ui/button.tsx
    ui/card.tsx
    ui/input.tsx
    ui/label.tsx
    ui/notice.tsx
  config/
    routes.ts
    site.ts
  infrastructure/
    config/env.ts
  lib/
    utils.ts
  modules/
    identity/{domain,application,infrastructure,presentation}
    clients/{domain,application,infrastructure,presentation}
    reports/{domain,application,infrastructure,presentation}
    extraction/{domain,application,infrastructure,presentation}
    programs/{domain,application,infrastructure,presentation}
    eligibility/{domain,application,infrastructure,presentation}
    evaluations/{domain,application,infrastructure,presentation}
    follow-up/{domain,application,infrastructure,presentation}
    audit/{domain,application,infrastructure,presentation}
    registry.ts
docs/
  architecture.md
  decisions.md
  design-system.md
  phase-00a.md
tests/
  unit/module-registry.test.ts
  unit/routes.test.ts
  unit/utils.test.ts
```

Las carpetas de capa de cada módulo contienen `.gitkeep` para conservar la
estructura sin introducir implementaciones prematuras.

## 4. Archivos principales

### Creados

- `.env.example`, `components.json`, `vitest.config.mts`.
- `src/app/(public)/**`, `src/app/not-found.tsx`, `src/app/icon.svg`.
- `src/components/**`, `src/config/**`, `src/infrastructure/config/env.ts`,
  `src/lib/utils.ts`, `src/modules/registry.ts` y las carpetas de módulos.
- `tests/unit/**`.
- `docs/architecture.md`, `docs/decisions.md`, `docs/design-system.md`,
  `docs/phase-00a.md`.

### Modificados

- `.gitignore`: exclusión de secretos y artefactos de prueba.
- `README.md`: documentación del proyecto y de la fase.
- `next.config.ts`: cabeceras de seguridad y configuración explícita.
- `package.json`: scripts de typecheck y pruebas, engines y dependencias.
- `pnpm-lock.yaml` y `pnpm-workspace.yaml`: dependencias y builds aprobados.
- `src/app/globals.css`: sistema de tokens y estilos base.
- `src/app/layout.tsx`: fuentes, metadatos y estructura raíz.

### Eliminados

- `src/app/page.tsx`: reemplazado por `src/app/(public)/page.tsx` dentro del
  layout público.
- `src/app/favicon.ico`: reemplazado por el icono de marca `src/app/icon.svg`.
- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`
  y `public/window.svg`: assets de ejemplo sin uso, retirados.

## 5. Dependencias instaladas

### Producción

| Dependencia                  | Versión   |
| ---------------------------- | --------- |
| `next`                       | `16.4.2`  |
| `react`                      | `19.3.0`  |
| `react-dom`                  | `19.3.0`  |
| `@radix-ui/react-slot`       | `1.5.0`   |
| `@supabase/supabase-js`      | `2.118.0` |
| `@supabase/ssr`              | `0.12.7`  |
| `drizzle-orm`                | `0.45.4`  |
| `groq-sdk`                   | `1.6.0`   |
| `zod`                        | `4.6.7`   |
| `lucide-react`               | `1.61.0`  |
| `class-variance-authority`   | `0.7.1`   |
| `clsx`                       | `2.1.1`   |
| `tailwind-merge`             | `3.7.0`   |

### Desarrollo

| Dependencia                   | Versión   |
| ----------------------------- | --------- |
| `typescript`                  | `5.9.3`   |
| `tailwindcss`                 | `4.3.3`   |
| `@tailwindcss/turbopack`      | `4.3.3`   |
| `eslint`                      | `9.39.5`  |
| `eslint-config-next`          | `16.4.2`  |
| `drizzle-kit`                 | `0.31.11` |
| `vitest`                      | `5.0.5`   |
| `@types/node`                 | `22.20.5` |
| `@types/react`                | `19.3.0`  |
| `@types/react-dom`            | `19.3.0`  |

## 6. Decisiones de arquitectura

1. Se conservó el scaffold y se evitó recrear el proyecto.
2. Cada módulo de negocio tiene capas `domain`, `application`,
   `infrastructure` y `presentation`.
3. La regla de dependencia apunta hacia el dominio; la infraestructura
   implementa contratos.
4. Se creó un registro tipado de nueve módulos.
5. No se creó ninguna ruta administrativa. `/admin` devuelve 404 y las rutas
   futuras están reservadas en `src/config/routes.ts`.
6. El portal público es informativo y transparente: no hay formularios ni
   botones que simulen operaciones.
7. Los tokens visuales se definieron en Tailwind v4 con variables semánticas.
8. Los componentes base siguen el enfoque shadcn/ui con Radix Slot y CVA.
9. Los SDK de Supabase, Drizzle y Groq están instalados, pero no se importan en
   las páginas ni realizan conexiones.
10. La validación de entorno con Zod es diferida para no exigir credenciales en
    el build.
11. No se crearon tablas, migraciones, usuarios ni datos de programas.
12. Se agregaron cabeceras HTTP básicas de seguridad.
13. Las pruebas usan Vitest en entorno Node y no requieren servicios externos.

## 7. Validaciones

| Comando             | Resultado | Detalle                                                        |
| ------------------- | --------- | -------------------------------------------------------------- |
| `pnpm exec tsc --noEmit` | ✅ OK | Sin errores de TypeScript.                                    |
| `pnpm lint`         | ✅ OK     | ESLint sin errores ni advertencias.                            |
| `pnpm build`        | ✅ OK     | Build de producción con Turbopack. 4 páginas y el icono, estáticos. |
| `pnpm test:run`     | ✅ OK     | 3 archivos, 8 pruebas aprobadas.                               |

Rutas generadas por el build:

```text
○ /
○ /_not-found
○ /evaluacion
○ /icon.svg
○ /ingreso
```

### Verificación manual de rutas

Servidor de producción en un puerto local:

| Ruta                  | Estado |
| --------------------- | ------ |
| `/`                   | 200    |
| `/evaluacion`         | 200    |
| `/ingreso`            | 200    |
| `/admin`              | 404    |
| `/ruta-inexistente`   | 404    |

Comprobaciones adicionales:

- Ninguna página pública contiene enlaces a `/admin`.
- `/evaluacion` no contiene formularios.
- `/ingreso` no contiene campos de contraseña ni formularios.
- El menú móvil abre, actualiza `aria-expanded` y enlaza a las tres rutas
  públicas.
- Las páginas se revisaron en Chrome headless con emulación móvil (390 × 844) y
  escritorio. No se detectó desbordamiento horizontal (`scrollWidth = 390`).

## 8. Problemas y advertencias pendientes

1. **ESLint 9 marcado como deprecado.** pnpm informa que `10.13.0` está fuera del
   rango declarado. Se mantiene ESLint 9 por compatibilidad con
   `eslint-config-next@16.4.2`. No bloquea el lint actual.
2. **Integraciones instaladas pero inactivas.** Los SDK de Supabase, Drizzle y
   Groq no se importan todavía. La conexión se realizará en fases posteriores.
3. **Sin CSP.** Se agregaron cabeceras básicas, pero la política de seguridad de
   contenido requiere definir los orígenes de Supabase, Groq y Vercel.
4. **Sin pruebas E2E automatizadas.** La verificación responsive se realizó con
   Chrome headless, pero no existe una suite E2E versionada.
5. **Sin modo oscuro.** La paleta actual es de tema claro.
6. **Sin autenticación ni RBAC.** Es una restricción de la fase, no un defecto.
7. **Sin datos ni migraciones.** La persistencia se definirá en una fase
   posterior.
8. **Aprobación de builds de pnpm.** `esbuild` está aprobado explícitamente en
   `pnpm-workspace.yaml`; nuevas dependencias con scripts requerirán revisión.

## 9. Veredicto

**APROBADO CON OBSERVACIONES.**

El alcance de Fase 00-A se cumplió y las tres validaciones obligatorias pasan.
Las observaciones son no bloqueantes y corresponden a decisiones deliberadas de
alcance o a tareas de mantenimiento futuro.

## 10. Recomendaciones para Fase 00-B

1. Definir el modelo de datos y la estrategia de migraciones antes de escribir
   repositorios.
2. Diseñar autenticación con Supabase Auth y un RBAC con permisos por módulo y
   acción.
3. Proteger `/admin` con deny-by-default en el servidor (proxy de Next.js) desde
   el primer commit de la fase.
4. Definir contratos de entrada y salida con Zod, incluida la proyección pública
   sanitizada.
5. Modelar programas, criterios y versiones de reglas antes de implementar el
   motor de elegibilidad.
6. Crear un registro de operadores y pruebas unitarias por operador.
7. Incorporar pruebas de autorización negativa y de filtración de datos.
8. Evaluar la actualización a ESLint 10 en una tarea de mantenimiento separada.
9. Definir una CSP estricta y una política de retención de archivos.
10. Agregar pruebas E2E responsive con Playwright o una herramienta equivalente
    cuando existan formularios y rutas protegidas.

No se inició la Fase 00-B ni la Fase 01.
