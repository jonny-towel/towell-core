"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { supabase } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const schema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().optional(),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmar_password: z.string().min(1, "Confirma la contraseña"),
    area_id: z.string().min(1, "Selecciona un área"),
    departamento_id: z.string().optional(),
    rol_id: z.string().min(1, "Selecciona un rol"),
  })
  .refine((d) => d.password === d.confirmar_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirmar_password"],
  })

type FormValues = z.infer<typeof schema>

type Area = { id: string; nombre: string }
type Departamento = { id: string; nombre: string; area_id: string }
type Rol = { id: string; nombre: string }

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [areas, setAreas] = useState<Area[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [roles, setRoles] = useState<Rol[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const areaSeleccionada = watch("area_id")
  const departamentosFiltrados = departamentos.filter(
    (d) => d.area_id === areaSeleccionada
  )

  useEffect(() => {
    async function fetchCatalogos() {
      const [
        { data: areasData, error: areasError },
        { data: deptoData, error: deptoError },
        { data: rolesData, error: rolesError },
      ] = await Promise.all([
        supabase.from("areas").select("id, nombre").eq("activa", true).order("nombre"),
        supabase.from("departamentos").select("id, nombre, area_id").eq("activo", true).order("nombre"),
        supabase.from("roles").select("id, nombre").order("nombre"),
      ])

      if (areasError) console.error("Error al cargar áreas:", areasError)
      if (deptoError) console.error("Error al cargar departamentos:", deptoError)
      if (rolesError) console.error("Error al cargar roles:", rolesError)

      if (areasData) setAreas(areasData)
      if (deptoData) setDepartamentos(deptoData)
      if (rolesData) setRoles(rolesData)
    }
    fetchCatalogos()
  }, [])

  useEffect(() => {
    setValue("departamento_id", undefined)
  }, [areaSeleccionada, setValue])

  async function onSubmit(data: FormValues) {
    setLoading(true)
    setServerError(null)

    const { error } = await supabase.from("usuarios").insert({
      nombre: data.nombre,
      apellido: data.apellido ?? null,
      email: data.email,
      password_hash: data.password,
      departamento_id: data.departamento_id ?? null,
      rol_id: data.rol_id,
    })

    setLoading(false)

    if (error) {
      setServerError(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
        <p className="text-lg font-semibold">¡Usuario creado correctamente!</p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          Registrar otro usuario
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Completa el formulario para registrarte en el sistema
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <Field data-invalid={!!errors.nombre}>
              <FieldLabel htmlFor="nombre">Nombre *</FieldLabel>
              <Input id="nombre" placeholder="Juan" {...register("nombre")} />
              <FieldError errors={[errors.nombre]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="apellido">Apellido</FieldLabel>
              <Input id="apellido" placeholder="García" {...register("apellido")} />
            </Field>
          </div>

          {/* Email */}
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Correo electrónico *</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="juan@empresa.com"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-3">
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Contraseña *</FieldLabel>
              <Input id="password" type="password" {...register("password")} />
              <FieldError errors={[errors.password]} />
            </Field>

            <Field data-invalid={!!errors.confirmar_password}>
              <FieldLabel htmlFor="confirmar_password">Confirmar *</FieldLabel>
              <Input
                id="confirmar_password"
                type="password"
                {...register("confirmar_password")}
              />
              <FieldError errors={[errors.confirmar_password]} />
            </Field>
          </div>

          {/* Área */}
          <Field data-invalid={!!errors.area_id}>
            <FieldLabel>Área *</FieldLabel>
            <Select
              onValueChange={(val) =>
                setValue("area_id", val, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un área" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.area_id]} />
          </Field>

          {/* Departamento */}
          <Field>
            <FieldLabel>Departamento</FieldLabel>
            <Select
              disabled={!areaSeleccionada || departamentosFiltrados.length === 0}
              onValueChange={(val) => setValue("departamento_id", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !areaSeleccionada
                      ? "Primero selecciona un área"
                      : "Selecciona un departamento"
                  }
                />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {departamentosFiltrados.map((depto) => (
                    <SelectItem key={depto.id} value={depto.id}>
                      {depto.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          {/* Rol */}
          <Field data-invalid={!!errors.rol_id}>
            <FieldLabel>Rol *</FieldLabel>
            <Select
              onValueChange={(val) =>
                setValue("rol_id", val, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {roles.map((rol) => (
                    <SelectItem key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.rol_id]} />
          </Field>

          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
