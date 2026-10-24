# Arquitectura del sistema

## 1. Propósito

PMV Evaluador Tributario gestiona la evaluación preliminar de reportes
tributarios de emprendimientos innovadores. La arquitectura debe permitir que el
portal público, el panel administrativo, la extracción con IA y el motor de
elegibilidad evolucionen sin acoplar la lógica de negocio a React, a la base de
datos o a un proveedor externo.

Esta fase define la organización, las fronteras y los contratos conceptuales.
No implementa los módulos de negocio.

## 2. Principios

1. **Separación de responsabilidades.** Presentación, aplicación, dominio e
   infraestructura tienen responsabilidades distintas.
2. **Dependencias hacia el dominio.** El dominio no importa React, Next.js,
   Supabase, Drizzle ni GroqCloud. La infraestructura implementa contratos del
   dominio o de la aplicación.
3. **Módulos con fronteras explícitas.** Cada módulo expone una API pública y
   mantiene internas sus capas.
4. **Privacidad por diseño.** La proyección pública se construye con datos
   mínimos; nunca reutiliza entidades internas completas.
5. **Reglas deterministas y versionadas.** La IA extrae y estructura datos; no
   decide compatibilidades. El motor de reglas evalúa criterios explícitos.
6. **Trazabilidad.** Las evaluaciones y reevaluaciones conservarán evidencia,
   versión de reglas y registro de auditoría.
7. **Extensibilidad controlada.** Programas y elegibilidad admitirán nuevas
   reglas, operadores y criterios sin reescribir la interfaz ni el motor.

## 3. Capas

Cada módulo de `src/modules/<module>/` contiene cuatro capas:

| Capa             | Responsabilidad                                                        | Puede importar                          |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| `domain`         | Entidades, value objects, políticas, eventos y puertos del módulo.      | Solo dominio y utilidades puras.        |
| `application`    | Casos de uso, orquestación, DTOs y contratos de repositorios/servicios.  | Dominio.                                |
| `infrastructure` | Implementaciones concretas: Drizzle, Supabase, Groq, almacenamiento.    | Dominio, aplicación y SDKs externos.    |
| `presentation`   | Componentes, hooks y adaptadores de UI específicos del módulo.          | Aplicación y componentes compartidos.   |

### Regla de dependencia

```text
app / components
      │
      ▼
presentation ──► application ──► domain
                       ▲
                       │
                infrastructure
```

- `domain` no depende de ninguna otra capa.
- `application` depende de `domain`.
- `infrastructure` implementa puertos definidos por `domain` o `application`.
- `presentation` consume casos de uso o DTOs; no accede directamente a
  Supabase, Drizzle ni GroqCloud.
- `app` compone rutas, layouts y puntos de entrada. No contiene reglas de
  negocio.
- La inyección de dependencias se realizará en un composition root del servidor
  cuando se implementen los módulos.

## 4. Módulos previstos

| ID            | Módulo                     | Alcance                                                              |
| ------------- | -------------------------- | -------------------------------------------------------------------- |
| `identity`    | Identidad y RBAC           | Autenticación interna, roles, permisos y políticas de acceso.        |
| `clients`     | Clientes y empresas        | Clientes, empresas, representantes y vínculos.                       |
| `reports`     | Reportes tributarios       | Documentos, archivos, estados de carga y trazabilidad documental.    |
| `extraction`  | Extracción con IA          | GroqCloud, esquemas de salida y validación de datos extraídos.       |
| `programs`    | Programas y convocatorias  | Programas, criterios configurables y versionado de reglas.           |
| `eligibility` | Motor de elegibilidad      | Operadores, reglas deterministas y evaluación de compatibilidad.     |
| `evaluations` | Evaluaciones               | Resultados, evidencia, versiones y reevaluaciones.                   |
| `follow-up`   | Seguimiento comercial      | Interacciones, tareas, estados y próximos pasos.                     |
| `audit`       | Auditoría y configuración  | Registro de cambios, configuración y trazabilidad transversal.       |

El registro tipado en `src/modules/registry.ts` mantiene los identificadores,
nombres y capas de cada módulo. Las carpetas de capa se crean en esta fase; su
contenido se implementará en fases posteriores.

## 5. Estructura del repositorio

```text
src/
  app/
    (public)/
      layout.tsx          Layout del portal público
      page.tsx            Portal
      evaluacion/         Alcance de la evaluación
      ingreso/            Acceso interno informativo
    layout.tsx            Layout raíz, fuentes y metadatos
    globals.css           Tokens y estilos globales
    icon.svg              Icono de la aplicación
    not-found.tsx         Página 404
  components/
    brand/                Marca
    layout/               Header, footer, contenedor y navegación móvil
    ui/                   Componentes base reutilizables
  config/
    routes.ts             Rutas públicas y rutas administrativas reservadas
    site.ts               Metadatos y configuración del sitio
  infrastructure/
    config/env.ts         Esquemas Zod de variables de entorno
  lib/
    utils.ts              Utilidades transversales
  modules/
    identity/
      domain/
      application/
      infrastructure/
      presentation/
    clients/
    reports/
    extraction/
    programs/
    eligibility/
    evaluations/
    follow-up/
    audit/
    registry.ts
docs/
tests/
  unit/
```

## 6. Flujo funcional previsto

1. **Registro público.** El emprendedor registra datos de contacto y de la
   empresa. Zod valida la entrada.
2. **Carga del reporte.** El archivo se almacena en Supabase Storage. Se crea un
   registro en `reports` con estado y metadatos.
3. **Extracción.** Un caso de uso de `extraction` invoca GroqCloud con un
   contrato explícito. La respuesta se valida con Zod y se conserva como
   evidencia estructurada.
4. **Evaluación.** `eligibility` recibe datos normalizados y una versión de
   reglas de `programs`. El motor aplica operadores deterministas y produce un
   resultado explicable.
5. **Persistencia.** `evaluations` guarda el resultado, la versión de reglas y
   la evidencia aplicada. Una reevaluación crea una nueva versión; no sobrescribe
   la anterior.
6. **Proyección pública.** Un DTO sanitizado expone únicamente el estado general
   y el resumen permitido. Nunca incluye nombres, identificadores internos ni
   condiciones específicas de programas.
7. **Gestión interna.** `follow-up` registra interacciones y tareas. `audit`
   conserva el rastro de cambios.

## 7. Frontera público / privado

El portal público y el panel administrativo son superficies distintas:

- **Público:** `/`, `/evaluacion` y `/ingreso` en esta fase. No existen rutas
  administrativas accesibles.
- **Privado (previsto):** `/admin`, `/admin/clientes`, `/admin/empresas`,
  `/admin/reportes`, `/admin/programas`, `/admin/evaluaciones`,
  `/admin/seguimiento`, `/admin/auditoria` y `/admin/configuracion`.

Antes de habilitar `/admin` se requerirá:

1. Autenticación con Supabase y sesión validada en el servidor.
2. RBAC con permisos por módulo y por acción.
3. Protección de rutas en el servidor (proxy de Next.js) y validación en cada
   operación.
4. Auditoría de accesos y cambios.
5. Pruebas de autorización negativa.

Las rutas administrativas están declaradas solo en `src/config/routes.ts` como
planificación. No se crearon páginas ni layouts administrativos.

## 8. Diseño extensible de programas y elegibilidad

`programs` será la fuente de verdad de programas, convocatorias y criterios. Los
criterios se modelarán como datos versionados, no como condicionales en el
código de presentación.

`eligibility` se diseñará alrededor de:

- Un catálogo de operadores (`equals`, `in_range`, `contains`, `gte`, `lte`,
  etc.) registrable.
- Un contrato de criterio con campo, operador, valor esperado y mensaje de
  evidencia.
- Un evaluador que recibe un contexto normalizado y una versión de reglas.
- Un resultado con estado, criterios aplicados y explicación.

Agregar un operador o criterio nuevo no deberá modificar componentes React ni
requerir migraciones destructivas. Las evaluaciones guardarán la versión exacta
de reglas utilizada para poder reproducirlas.

## 9. Persistencia e integraciones previstas

- **Base de datos:** Supabase PostgreSQL mediante Drizzle ORM.
- **Auth:** Supabase Auth con RBAC en tablas de negocio.
- **Storage:** Supabase Storage para reportes y evidencia.
- **IA:** GroqCloud mediante `groq-sdk`, encapsulado en `extraction`.
- **Validación:** Zod en bordes de entrada, respuestas de IA y configuración.

En Fase 00-A no se crean tablas, migraciones, usuarios ni roles. Tampoco se
realizan conexiones reales. Las dependencias y las variables de entorno están
previstas en `.env.example` y `src/infrastructure/config/env.ts`.

## 10. Pruebas

La base usa Vitest en entorno Node para pruebas puras de arquitectura,
utilidades y contratos. En fases posteriores se agregarán:

- Pruebas de casos de uso con repositorios en memoria.
- Pruebas del motor de reglas por operador y por versión.
- Pruebas de autorización negativa para rutas y acciones.
- Pruebas de proyección pública para verificar que no se filtren datos internos.
- Pruebas de integración de infraestructura con Supabase local o entorno de
  prueba.

Las pruebas no deben requerir credenciales reales en Fase 00-A.

## 11. Fuera de alcance en esta fase

- Autenticación funcional y sesiones.
- Usuarios, roles o permisos en base de datos.
- Formulario real de carga.
- Integración con GroqCloud.
- Tablas, migraciones y datos de programas.
- Motor de elegibilidad.
- Panel administrativo.
- CSP estricta con nonces.
- Despliegue en Vercel.
