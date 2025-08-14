import { useState, useEffect } from "react";

export default function SearchBar({ onFilterChange }) {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  useEffect(() => {
    onFilterChange({ q, sortBy });
  }, [q, sortBy, onFilterChange]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold">ค้นหาหนัง</h2>
      <input
        className="border rounded-xl px-3 py-2 outline-none focus:ring w-full"
        placeholder="พิมพ์ชื่อหนังหรือชื่อผู้กำกับ..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <select
        className="border rounded-xl px-3 py-2"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="title-asc">ชื่อ (A→Z)</option>
        <option value="title-desc">ชื่อ (Z→A)</option>
        <option value="year-asc">ปี (น้อย→มาก)</option>
        <option value="year-desc">ปี (มาก→น้อย)</option>
      </select>
    </div>
  );
}
