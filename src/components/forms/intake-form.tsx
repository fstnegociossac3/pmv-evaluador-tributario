"use client";

import * as React from "react";
import { LockKeyhole, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorSummary } from "@/components/ui/error-summary";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";

type FieldErrors = Partial<
  Record<
    | "nombre"
    | "correo"
    | "telefono"
    | "empresa"
    | "reporte"
    | "consentimiento",
    string
  >
>;

const fieldOrder = [
  "nombre",
  "correo",
  "telefono",
  "empresa",
  "reporte",
  "consentimiento",
] as const;

function validateField(name: (typeof fieldOrder)[number], value: string, file: File | null): string | null {
  switch (name) {
    case "nombre": {
      if (!value.trim()) return "Ingresa el nombre de la persona responsable.";
      if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
      return null;
    }
    case "correo": {
      if (!value.trim()) return "Ingresa el correo electrónico de contacto.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Ingresa un correo electrónico válido.";
      }
      return null;
    }
    case "telefono": {
      if (!value.trim()) return "Ingresa un teléfono de contacto.";
      if (!/^[+0-9\s()-]{7,20}$/.test(value.trim())) {
        return "Ingresa un teléfono válido (solo números, espacios, +, -, paréntesis).";
      }
      return null;
    }
    case "empresa": {
      if (!value.trim()) return null;
      if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
      return null;
    }
    case "reporte": {
      if (!file) return "Adjunta el reporte tributario en PDF.";
      if (file.size > 10 * 1024 * 1024) return "El archivo no puede superar los 10 MB.";
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        return "El reporte debe estar en formato PDF.";
      }
      return null;
    }
    case "consentimiento": {
      if (!value.trim()) return "Debes autorizar el tratamiento confidencial de la información.";
      return null;
    }
    default:
      return null;
  }
}

function IntakeForm() {
  const [values, setValues] = React.useState({
    nombre: "",
    correo: "",
    telefono: "",
    empresa: "",
  });
  const [consentimiento, setConsentimiento] = React.useState(false);
  const [comercial, setComercial] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const errorList = fieldOrder.flatMap((field) => {
    const message = errors[field];
    return message ? [{ fieldId: field as string, message }] : [];
  });

  const handleBlur = (name: (typeof fieldOrder)[number]) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const value = name === "consentimiento" ? (consentimiento ? "ok" : "") : values[name as keyof typeof values];
    const message = validateField(name, name === "reporte" ? "" : value, file);
    setErrors((prev) => ({ ...prev, [name]: message ?? undefined }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    setFile(next);
    setFileName(next?.name ?? null);
    setTouched((prev) => ({ ...prev, reporte: true }));
    const message = validateField("reporte", "", next);
    setErrors((prev) => ({ ...prev, reporte: message ?? undefined }));
  };

  const handleConsentChange = (checked: boolean) => {
    setConsentimiento(checked);
    setTouched((prev) => ({ ...prev, consentimiento: true }));
    const message = validateField("consentimiento", checked ? "ok" : "", null);
    setErrors((prev) => ({ ...prev, consentimiento: message ?? undefined }));
  };

  return (
    <form
      noValidate
      aria-label="Formulario de evaluación preliminar"
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <LockKeyhole aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-medium">
            Datos para la evaluación
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Formulario visual de demostración. No se envía ni almacena información.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <FormField id="nombre" label="Nombre de la persona responsable" required error={touched.nombre ? errors.nombre : null}>
          {(ids) => (
            <Input
              id="nombre"
              name="nombre"
              autoComplete="name"
              placeholder="Ej. Ana Torres"
              required
              value={values.nombre}
              onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
              onBlur={() => handleBlur("nombre")}
              aria-invalid={Boolean(touched.nombre && errors.nombre)}
              aria-describedby={touched.nombre && errors.nombre ? ids.errorId : undefined}
            />
          )}
        </FormField>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField id="correo" label="Correo electrónico" required error={touched.correo ? errors.correo : null}>
            {(ids) => (
              <Input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                placeholder="nombre@empresa.com"
                required
                value={values.correo}
                onChange={(e) => setValues((v) => ({ ...v, correo: e.target.value }))}
                onBlur={() => handleBlur("correo")}
                aria-invalid={Boolean(touched.correo && errors.correo)}
                aria-describedby={touched.correo && errors.correo ? ids.errorId : undefined}
              />
            )}
          </FormField>

          <FormField id="telefono" label="Teléfono" required error={touched.telefono ? errors.telefono : null}>
            {(ids) => (
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                autoComplete="tel"
                placeholder="+51 999 999 999"
                required
                value={values.telefono}
                onChange={(e) => setValues((v) => ({ ...v, telefono: e.target.value }))}
                onBlur={() => handleBlur("telefono")}
                aria-invalid={Boolean(touched.telefono && errors.telefono)}
                aria-describedby={touched.telefono && errors.telefono ? ids.errorId : undefined}
              />
            )}
          </FormField>
        </div>

        <FormField id="empresa" label="Empresa o emprendimiento" error={touched.empresa ? errors.empresa : null}>
          {(ids) => (
            <Input
              id="empresa"
              name="empresa"
              autoComplete="organization"
              placeholder="Nombre del negocio"
              value={values.empresa}
              onChange={(e) => setValues((v) => ({ ...v, empresa: e.target.value }))}
              onBlur={() => handleBlur("empresa")}
              aria-invalid={Boolean(touched.empresa && errors.empresa)}
              aria-describedby={touched.empresa && errors.empresa ? ids.errorId : undefined}
            />
          )}
        </FormField>

        <FormField
          id="reporte"
          label="Reporte tributario"
          required
          error={touched.reporte ? errors.reporte : null}
          hint="Formato PDF, máximo 10 MB. La carga real se habilitará en una fase posterior."
        >
          {(ids) => (
            <>
              <input
                id="reporte"
                name="reporte"
                type="file"
                accept="application/pdf,.pdf"
                className="peer sr-only"
                required
                onChange={handleFileChange}
                onBlur={() => handleBlur("reporte")}
                aria-invalid={Boolean(touched.reporte && errors.reporte)}
                aria-describedby={
                  [ids.hintId, touched.reporte && errors.reporte ? ids.errorId : null]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
              />
              <label
                htmlFor="reporte"
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-accent/80 hover:bg-accent/5 peer-focus-visible:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring/30"
              >
                <span className="flex items-center gap-2 truncate">
                  <Upload aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  <span className="truncate">
                    {fileName ?? "Seleccionar archivo PDF"}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-semibold text-accent">
                  Examinar
                </span>
              </label>
            </>
          )}
        </FormField>

        <div className="grid gap-4">
          <Checkbox
            id="consentimiento"
            checked={consentimiento}
            required
            onChange={(e) => handleConsentChange(e.target.checked)}
            onBlur={() => handleBlur("consentimiento")}
            aria-invalid={Boolean(touched.consentimiento && errors.consentimiento)}
            aria-describedby={
              touched.consentimiento && errors.consentimiento
                ? "consentimiento-error"
                : undefined
            }
            label="Autorizo el tratamiento confidencial de la información para la evaluación preliminar."
            description="Los resultados públicos nunca incluirán datos identificables."
          />
          {touched.consentimiento && errors.consentimiento ? (
            <p id="consentimiento-error" className="text-xs font-medium text-destructive">
              {errors.consentimiento}
            </p>
          ) : null}

          <Checkbox
            id="comercial"
            checked={comercial}
            onChange={(e) => setComercial(e.target.checked)}
            label="Acepto recibir información comercial sobre programas de apoyo (opcional)."
          />
        </div>

        {errorList.length > 0 ? (
          <ErrorSummary errors={errorList} />
        ) : null}

        <Notice tone="warning" title="Envío no disponible">
          El botón se encuentra deshabilitado porque esta versión es únicamente
          visual. El envío real se habilitará con autenticación, almacenamiento
          seguro y controles de privacidad.
        </Notice>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled aria-disabled="true">
            Solicitar evaluación preliminar
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Esta acción no está habilitada en la Fase 00-B.
          </p>
        </div>
      </div>
    </form>
  );
}

export { IntakeForm };
