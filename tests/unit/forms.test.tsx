import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { IntakeForm } from "@/components/forms/intake-form";
import { LoginForm } from "@/components/forms/login-form";

describe("IntakeForm", () => {
  it("renderiza campos, consentimientos y botón deshabilitado", () => {
    const markup = renderToStaticMarkup(<IntakeForm />);

    expect(markup).toContain('id="nombre"');
    expect(markup).toContain('id="correo"');
    expect(markup).toContain('id="telefono"');
    expect(markup).toContain('id="empresa"');
    expect(markup).toContain('id="reporte"');
    expect(markup).toContain('id="consentimiento"');
    expect(markup).toContain('id="comercial"');
    expect(markup).toContain("disabled");
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain("Solicitar evaluación preliminar");
    expect(markup).toContain("noValidate");
    expect(markup).toContain('type="file"');
  });
});

describe("LoginForm", () => {
  it("renderiza campos y botón deshabilitado sin exponer contraseñas", () => {
    const markup = renderToStaticMarkup(<LoginForm />);

    expect(markup).toContain('id="ingreso-correo"');
    expect(markup).toContain('id="ingreso-password"');
    expect(markup).toContain('type="password"');
    expect(markup).toContain("disabled");
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain("Iniciar sesión");
    expect(markup).toContain('aria-label="Mostrar contraseña"');
    expect(markup).toContain("noValidate");
  });
});
