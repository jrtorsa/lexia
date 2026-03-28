// Lightweight event-based toast — works from any client component without context

export type ToastType = "success" | "error" | "info"

export interface ToastEvent {
  message: string
  type: ToastType
  id: number
}

let _id = 0

export function toast(message: string, type: ToastType = "success") {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent<ToastEvent>("lexia:toast", {
      detail: { message, type, id: ++_id },
    })
  )
}
