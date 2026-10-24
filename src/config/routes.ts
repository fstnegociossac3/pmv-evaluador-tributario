export const routes = {
  home: "/",
  evaluation: "/evaluacion",
  staffAccess: "/ingreso",
} as const;

export type PublicRoute = (typeof routes)[keyof typeof routes];

export const reservedAdminRoutes = {
  dashboard: "/admin",
  clients: "/admin/clientes",
  companies: "/admin/empresas",
  reports: "/admin/reportes",
  programs: "/admin/programas",
  evaluations: "/admin/evaluaciones",
  followUp: "/admin/seguimiento",
  audit: "/admin/auditoria",
  settings: "/admin/configuracion",
} as const;
