/** Props del SearchInput reutilizable */
export interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  "aria-label"?: string;
  className?: string;
}
