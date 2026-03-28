"use client"

import { useState, useRef, useTransition } from "react"
import { Camera, Loader2, X, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { actualizarFoto } from "@/app/actions/actualizarFoto"

const BUCKET = "avatars"
const MAX_MB  = 3
const ALLOWED = ["image/jpeg", "image/png", "image/webp"]

interface Props {
  nombre:       string
  photoUrl:     string | null
}

export default function FotoPerfilUpload({ nombre, photoUrl: initialUrl }: Props) {
  const [preview, setPreview]       = useState<string | null>(initialUrl)
  const [status, setStatus]         = useState<"idle" | "uploading" | "ok" | "error">("idle")
  const [message, setMessage]       = useState("")
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  const initials = nombre
    .replace(/^Lic\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  async function handleFile(file: File) {
    // Validate
    if (!ALLOWED.includes(file.type)) {
      setStatus("error")
      setMessage("Solo se permiten imágenes JPG, PNG o WebP.")
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setStatus("error")
      setMessage(`La imagen no puede pesar más de ${MAX_MB} MB.`)
      return
    }

    // Local preview immediately
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    setStatus("uploading")
    setMessage("")

    // Upload to Supabase Storage
    const ext  = file.name.split(".").pop() ?? "jpg"
    const path = `${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setStatus("error")
      setMessage("Error al subir la imagen. Verifica que el bucket 'avatars' exista en Supabase.")
      setPreview(initialUrl)
      return
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    const publicUrl = data.publicUrl

    startTransition(async () => {
      const result = await actualizarFoto(publicUrl)
      if (result.error) {
        setStatus("error")
        setMessage(result.error)
        setPreview(initialUrl)
      } else {
        setStatus("ok")
        setMessage("Foto actualizada correctamente.")
        setPreview(publicUrl)
      }
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const isLoading = status === "uploading" || isPending

  return (
    <div className="bg-white border border-[#EAE4D9] rounded-xl p-6">
      <h3 className="font-semibold text-[#0C0D10] text-sm mb-4">Foto de perfil</h3>

      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div
          className="relative w-20 h-20 rounded-full flex-shrink-0 overflow-hidden border-2 border-[#EAE4D9] cursor-pointer group"
          onClick={() => !isLoading && inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-2xl font-semibold text-[#C49A3C]"
              style={{ background: "rgba(196,154,60,0.10)", fontFamily: "var(--font-cormorant)" }}
            >
              {initials}
            </div>
          )}

          {/* Hover overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
            isLoading ? "opacity-100 bg-black/40" : "opacity-0 group-hover:opacity-100 bg-black/40"
          }`}>
            {isLoading
              ? <Loader2 className="w-5 h-5 text-white animate-spin" />
              : <Camera className="w-5 h-5 text-white" />
            }
          </div>
        </div>

        {/* Info + actions */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#0C0D10] font-medium mb-1">
            {preview ? "Cambiar foto" : "Subir foto de perfil"}
          </p>
          <p className="text-xs text-slate-400 mb-3">
            JPG, PNG o WebP · máximo {MAX_MB} MB
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#F5F0E8] hover:bg-[#EAE4D9] disabled:opacity-40 text-[#0C0D10] px-3.5 py-2 rounded-lg transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              {preview ? "Cambiar" : "Elegir foto"}
            </button>

            {preview && preview !== "null" && (
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  startTransition(async () => {
                    await actualizarFoto("")
                    setPreview(null)
                    setStatus("idle")
                    setMessage("")
                  })
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 disabled:opacity-40 px-2 py-2 rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Quitar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status message */}
      {message && (
        <div className={`flex items-start gap-2 mt-4 text-xs rounded-lg px-3 py-2.5 ${
          status === "ok"
            ? "bg-green-50 border border-green-200 text-green-700"
            : "bg-red-50 border border-red-200 text-red-600"
        }`}>
          {status === "ok"
            ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            : <AlertCircle  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          }
          {message}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(",")}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
