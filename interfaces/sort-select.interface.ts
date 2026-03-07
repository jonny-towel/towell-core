export interface SortOption {
  value: string;
  label: string;
}

export interface SortSelectProps {
  value: string;
  options: readonly SortOption[];
  onValueChange: (value: string) => void;
}
