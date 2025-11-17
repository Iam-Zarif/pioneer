"use client";

type Props = {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
};

export default function FilterItems({ selectedFilters, setSelectedFilters }: Props) {
  const filters = [
    "Deadline today",
    "Expires in 5 days",
    "Expires in 10 days",
    "Expires in 15 days",
  ];

  const handleChange = (label: string) => {
    if (selectedFilters.includes(label)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== label));
    } else {
      setSelectedFilters([...selectedFilters, label]);
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-1">
      {filters.map((label) => (
        <label
          key={label}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded-lg cursor-pointer"
            checked={selectedFilters.includes(label)}
            onChange={() => handleChange(label)}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
