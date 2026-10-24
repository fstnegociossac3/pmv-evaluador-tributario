export const MODULE_LAYERS = [
  "domain",
  "application",
  "infrastructure",
  "presentation",
] as const;

export type ModuleLayer = (typeof MODULE_LAYERS)[number];

export const MODULE_IDS = [
  "identity",
  "clients",
  "reports",
  "extraction",
  "programs",
  "eligibility",
  "evaluations",
  "follow-up",
  "audit",
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export type ModuleStatus = "scaffolded";

export interface ModuleDefinition {
  readonly id: ModuleId;
  readonly name: string;
  readonly summary: string;
  readonly status: ModuleStatus;
  readonly layers: readonly ModuleLayer[];
}

export const MODULES: readonly ModuleDefinition[] = [
  {
    id: "identity",
    name: "Identidad y RBAC",
    summary:
      "Autenticación del personal interno, roles, permisos y políticas de acceso.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "clients",
    name: "Clientes y empresas",
    summary:
      "Clientes, empresas, representantes y vínculos entre partes interesadas.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "reports",
    name: "Reportes tributarios",
    summary:
      "Documentos tributarios, archivos, estados de carga y trazabilidad documental.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "extraction",
    name: "Extracción con IA",
    summary:
      "Extracción asistida por GroqCloud, esquemas de salida y validación de datos.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "programs",
    name: "Programas y convocatorias",
    summary:
      "Programas, convocatorias, criterios configurables y versionado de reglas.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "eligibility",
    name: "Motor de elegibilidad",
    summary:
      "Operadores, reglas deterministas y evaluación de compatibilidad extensible.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "evaluations",
    name: "Evaluaciones y reevaluaciones",
    summary:
      "Resultados preliminares, evidencia aplicada, versiones y reevaluaciones.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "follow-up",
    name: "Seguimiento comercial",
    summary:
      "Interacciones, tareas, estados del caso y próximos pasos del equipo interno.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
  {
    id: "audit",
    name: "Auditoría y configuración",
    summary:
      "Registro de cambios, configuración del sistema y trazabilidad transversal.",
    status: "scaffolded",
    layers: MODULE_LAYERS,
  },
];

export function getModule(id: ModuleId): ModuleDefinition | undefined {
  return MODULES.find((definition) => definition.id === id);
}
