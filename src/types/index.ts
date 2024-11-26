export interface Option {
  id: number;
  label: string;
}

export interface MultiSelectDropdownProps {
  options: Option[];
  selected: Option[];
  search: string;
  onSearchChange: (search: string) => void;
  onSelectedChange: (selected: Option[]) => void;
}
