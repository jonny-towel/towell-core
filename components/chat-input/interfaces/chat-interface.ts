/**
 * Tipos e interfaces para el módulo ChatInput.
 */

/** Props del componente ChatInput. */
export interface ChatInputProps {
  /** Callback que se ejecuta al enviar el mensaje. Recibe el texto limpio. */
  onSend?: (message: string) => void;
  /** Deshabilita el input y el botón (útil mientras se espera respuesta). */
  disabled?: boolean;
  /** Placeholder del textarea. */
  placeholder?: string;
  /** Clase CSS adicional para el contenedor raíz. */
  className?: string;
}
