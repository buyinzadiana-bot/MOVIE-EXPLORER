export default function CategoryFilter({ category, setCategory, categories }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}