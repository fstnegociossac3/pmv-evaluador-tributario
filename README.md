# PMV Evaluador Tributario

Plataforma corporativa para la evaluación preliminar de reportes tributarios de
emprendimientos innovadores. El sistema combina extracción asistida por IA con
un motor de reglas independiente y separa estrictamente el portal público del
panel administrativo privado.

## Estado

**Fase 00-B · Base visual corporativa.** El proyecto cuenta con la base
técnica, la arquitectura modular, las rutas públicas, el sistema visual, los
formularios de demostración (`/evaluacion`, `/ingreso`) y un conjunto de
componentes administrativos reutilizables sin rutas. Las integraciones, la
autenticación, la carga real de documentos y el motor de elegibilidad están
previstos, pero no implementados.

Esta versión no procesa documentos, no envía ni almacena datos personales, no
se conecta a Supabase ni a GroqCloud y no expone rutas administrativas
(`/admin` responde 404).

## Stack

- Next.js 16 con App Router y Turbopack.
- React 19 y TypeScript en modo `strict`.
- Tailwind CSS v4 con tokens de diseño en CSS.
- Componentes base estilo shadcn/ui sobre Radix UI.
- Supabase PostgreSQL, Auth y Storage (previstos).
- Drizzle ORM y Drizzle Kit (previstos, sin esquema ni migraciones).
- GroqCloud mediante `groq-sdk` (previsto, sin conexión).
- Zod para validación de entorno y datos.
- Lucide React para iconografía.
- Vitest para pruebas unitarias.
- pnpm como gestor de dependencias.
- Vercel como destino de despliegue futuro.

## Requisitos

- Node.js `>= 22.12.0`.
- pnpm `12.6.0` (definido en `packageManager`).

## Instalación y ejecución

```bash
pnpm install
pnpm dev
```

El portal queda disponible en `http://localhost:3000`.

No se requiere un archivo `.env` para ejecutar la Fase 00-B. `.env.example`
documenta las variables que se utilizarán en fases posteriores; no contiene
secretos reales y no debe completarse con credenciales de producción en esta
etapa.

## Scripts

| Comando            | Descripción                                     |
| ------------------ | ----------------------------------------------- |
| `pnpm dev`         | Inicia el servidor de desarrollo.               |
| `pnpm build`       | Genera la compilación de producción.            |
| `pnpm start`       | Sirve la compilación de producción.             |
| `pnpm lint`        | Ejecuta ESLint.                                 |
| `pnpm typecheck`   | Ejecuta TypeScript sin emitir archivos.         |
| `pnpm test`        | Ejecuta Vitest en modo interactivo.             |
| `pnpm test:run`    | Ejecuta la suite de pruebas una vez.            |

## Rutas disponibles

| Ruta         | Descripción                                                 |
| ------------ | ----------------------------------------------------------- |
| `/`          | Portal público informativo con las 4 etapas del proceso y la sección de resultados preliminares. |
| `/evaluacion`| Alcance, ruta prevista y formulario visual no operativo (validación local, envío deshabilitado). |
| `/ingreso`   | Acceso interno con formulario visual de inicio de sesión (sin autenticación real). |

Las rutas administrativas (`/admin`, `/admin/clientes`, `/admin/reportes`,
`/admin/programas`, etc.) están reservadas y documentadas, pero no existen como
páginas en esta fase.

## Estructura

```text
src/
  app/                  Rutas, layouts y estilos globales
  components/
    ui/                 Primitivos visuales (Button, Input, FormField, Checkbox…)
    layout/             Header, footer y contenedores
    brand/              Logo y marca
    forms/              Formularios visuales no operativos
    admin/              Componentes administrativos sin rutas
  config/               Rutas, navegación y configuración del sitio
  infrastructure/       Adaptadores y configuración de entorno previstos
  lib/                  Utilidades transversales
  modules/              Módulos de negocio con capas domain/application/
                        infrastructure/presentation
docs/                   Arquitectura, diseño y decisiones técnicas
tests/                  Pruebas unitarias (utilidades y render de componentes)
```

## Documentación

- [Arquitectura](docs/architecture.md)
- [Guía de diseño visual](docs/design-system.md)
- [Registro de decisiones técnicas](docs/decisions.md)
- [Informe de Fase 00-A](docs/phase-00a.md)
- [Informe de Fase 00-B](docs/phase-00b.md)

## Seguridad

- El portal público no muestra nombres, identificadores internos ni condiciones
  específicas de programas.
- No se incluyen credenciales en el repositorio.
- `.env.example` solo contiene valores de ejemplo.
- Se aplican cabeceras HTTP básicas de endurecimiento en `next.config.ts`.
- La autenticación y el RBAC se implementarán antes de habilitar cualquier ruta
  administrativa.

## Restricciones de la fase

No se implementaron autenticación, usuarios, roles, envío de formularios,
integraciones reales, tablas, migraciones, datos ficticios ni reglas de
elegibilidad. Los formularios de `/evaluacion` y `/ingreso` son visuales y no
envían ni almacenan información. El trabajo de la Fase 00-B finaliza con este
alcance.
