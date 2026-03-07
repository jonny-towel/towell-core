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
  /**
   * Valor controlado (opcional).
   * Si se pasa, el componente opera en modo controlado.
   * Usar junto con `onValueChange`.
   */
  value?: string;
  /**
   * Callback cuando el valor cambia (modo controlado).
   * Se dispara en cada keystroke y cuando se selecciona una sugerencia.
   */
  onValueChange?: (value: string) => void;
}
