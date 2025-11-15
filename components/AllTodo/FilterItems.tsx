export default function FilterItems() {
  const filters = [
    "Deadline today",
    "Expires in 5 days",
    "Expires in 10 days",
    "Expires in 15 days",
  ];

  return (
    <div className="mt-2 flex flex-col gap-1">
      {filters?.map((label) => (
        <div key={label} className="flex items-center gap-2">
          <input type="checkbox" className="w-3.5 h-3.5 rounded-lg" />
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}
