"use client";

import * as React from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ErrorSummary } from "@/components/ui/error-summary";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";

type LoginFieldErrors = Partial<Record<"correo" | "password", string>>;

function LoginForm() {
  const [correo, setCorreo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<LoginFieldErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateCorreo = (value: string): string | null => {
    if (!value.trim()) return "Ingresa el correo electrónico.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return "Ingresa un correo electrónico válido.";
    }
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value) return "Ingresa la contraseña.";
    return null;
  };

  const handleBlur = (field: "correo" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const message =
      field === "correo" ? validateCorreo(correo) : validatePassword(password);
    setErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  const errorList = [
    { fieldId: "ingreso-correo", message: errors.correo },
    { fieldId: "ingreso-password", message: errors.password },
  ].flatMap((entry) =>
    entry.message ? [{ fieldId: entry.fieldId, message: entry.message }] : [],
  );

  return (
    <form
      noValidate
      aria-label="Formulario de acceso del personal interno"
      className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <LockKeyhole aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-medium">Iniciar sesión</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Acceso visual de demostración. No existe autenticación real.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <FormField
          id="ingreso-correo"
          label="Correo electrónico"
          required
          error={touched.correo ? errors.correo : null}
        >
          {(ids) => (
            <Input
              id="ingreso-correo"
              name="correo"
              type="email"
              autoComplete="username"
              placeholder="nombre@empresa.com"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              onBlur={() => handleBlur("correo")}
              aria-invalid={Boolean(touched.correo && errors.correo)}
              aria-describedby={touched.correo && errors.correo ? ids.errorId : undefined}
            />
          )}
        </FormField>

        <FormField
          id="ingreso-password"
          label="Contraseña"
          required
          error={touched.password ? errors.password : null}
        >
          {(ids) => (
            <div className="relative">
              <Input
                id="ingreso-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="pr-12"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                aria-invalid={Boolean(touched.password && errors.password)}
                aria-describedby={touched.password && errors.password ? ids.errorId : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          )}
        </FormField>

        {errorList.length > 0 ? <ErrorSummary errors={errorList} /> : null}

        <Notice tone="warning" title="Autenticación no habilitada">
          Esta versión no incluye inicio de sesión real ni rutas
          administrativas accesibles. El acceso se habilitará cuando Supabase
          Auth y el modelo RBAC estén implementados y auditados.
        </Notice>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled aria-disabled="true">
            Iniciar sesión
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No existen credenciales activas en esta versión (Fase 00-B).
          </p>
        </div>
      </div>
    </form>
  );
}

export { LoginForm };
