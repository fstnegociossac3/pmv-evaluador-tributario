import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Checkbox } from "@/components/ui/checkbox";
import { ErrorSummary } from "@/components/ui/error-summary";
import { FormField, fieldIds } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

describe("FormField", () => {
  it("renderiza label, pista y error con ids consistentes", () => {
    const markup = renderToStaticMarkup(
      <FormField
        id="demo"
        label="Campo de prueba"
        hint="Texto de ayuda"
        error="Mensaje de error"
        required
      >
        {(ids) => <Input id="demo" aria-describedby={ids.hintId} />}
      </FormField>,
    );

    expect(markup).toContain('for="demo"');
    expect(markup).toContain('id="demo-hint"');
    expect(markup).toContain('id="demo-error"');
    expect(markup).toContain("Texto de ayuda");
    expect(markup).toContain("Mensaje de error");
  });

  it("fieldIds genera sufijos estables", () => {
    expect(fieldIds("correo")).toEqual({
      hintId: "correo-hint",
      errorId: "correo-error",
      messageId: "correo-message",
    });
  });
});

describe("Checkbox", () => {
  it("renderiza input tipo checkbox con la clase de marca", () => {
    const markup = renderToStaticMarkup(
      <Checkbox id="consent" label="Acepto los términos" />,
    );

    expect(markup).toContain('id="consent"');
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain("brand-checkbox");
    expect(markup).toContain("Acepto los términos");
  });
});

describe("ErrorSummary", () => {
  it("no renderiza nada sin errores", () => {
    expect(renderToStaticMarkup(<ErrorSummary errors={[]} />)).toBe("");
  });

  it("renderiza role alert y enlaces a los campos", () => {
    const markup = renderToStaticMarkup(
      <ErrorSummary
        errors={[
          { fieldId: "nombre", message: "Ingresa el nombre" },
          { fieldId: "correo", message: "Correo inválido" },
        ]}
      />,
    );

    expect(markup).toContain('role="alert"');
    expect(markup).toContain('href="#nombre"');
    expect(markup).toContain('href="#correo"');
    expect(markup).toContain("Ingresa el nombre");
    expect(markup).toContain("Correo inválido");
  });
});
