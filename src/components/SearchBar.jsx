export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
