"use client";
import React, { useState, useEffect } from "react";

// Category management component for CMS
export default function CategoryManager() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data.map((c: any) => c.name));
    setLoading(false);
  }

  async function addCategory() {
    if (!newCategory.trim()) return;
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    setNewCategory("");
    fetchCategories();
  }

  async function deleteCategory(name: string) {
    await fetch(`/api/admin/categories/${encodeURIComponent(name)}`, { method: "DELETE" });
    fetchCategories();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button onClick={addCategory} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat} className="flex items-center justify-between border-b py-2">
              <span>{cat}</span>
              <button onClick={() => deleteCategory(cat)} className="text-red-600 hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
