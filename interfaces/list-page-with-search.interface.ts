import type { ReactNode } from "react";

/** Props del layout ListPageWithSearch (Proyectos, Chats) */
export interface ListPageWithSearchProps {
  title: string;
  titleClassName?: string;
  action: ReactNode;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchAriaLabel?: string;
  toolbar?: ReactNode;
  children: ReactNode;
}
