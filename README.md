# React MultiSelect Dropdown

A customizable React MultiSelect Dropdown component with search functionality and TypeScript support.

## Preview

![search](https://i.ibb.co.com/VMM6y2L/search.png)
![with select](https://i.ibb.co.com/3MTshqt/with-select.png)

## Installation

```bash
npm install react-multiselect-search
```

```jsx
import { MultiSelectDropdown } from "@alaminrifat/react-multiselect-dropdown";

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" }
  { id: 4, label: "Option 4" }
  { id: 5, label: "Option 5" }
  { id: 6, label: "Option 6" }
];

function App() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <MultiSelectDropdown
      options={options}
      selected={selected}
      search={search}
      onSearchChange={setSearch}
      onSelectedChange={setSelected}
    />
  );
}
```

## Props:

| Prop               | Type                           | Description                 |
| ------------------ | ------------------------------ | --------------------------- |
| `options`          | `Option[]`                     | Array of options to display |
| `selected`         | `Option[]`                     | Array of selected options   |
| `search`           | `string`                       | Search input value          |
| `onSearchChange`   | `(search: string) => void`     | Search change handler       |
| `onSelectedChange` | `(selected: Option[]) => void` | Selection change handler    |
