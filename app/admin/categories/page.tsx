"use client";

import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      const names = data
        .map((c: any) => c.name?.trim())
        .filter((name: string | undefined) => name && name.length > 0);
      setCategories(Array.from(new Set(names)));
    } catch {
      setCategories([]);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex flex-col h-full">
          <AdminTopbar />
          <div className="flex-1 overflow-y-auto p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Categories</h1>
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-100 mb-8 p-2">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-linear-to-r from-primary to-secondary text-white rounded-xl">
                    <th className="px-6 py-4 text-lg font-bold rounded-l-xl">Category Name</th>
                    <th className="px-6 py-4 text-lg font-bold rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.filter(cat => typeof cat === 'string').map((cat) => (
                    cat && cat.trim() ? (
                      <tr key={cat} className="bg-white shadow-sm rounded-xl transition-all hover:shadow-lg">
                        <td className="px-6 py-4 align-middle">
                          {editCategory === cat ? (
                            <input
                              className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                              value={editCategoryValue}
                              onChange={e => setEditCategoryValue(e.target.value)}
                            />
                          ) : (
                            <span className="text-gray-900 font-semibold text-base">{cat}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <div className="flex gap-2">
                            {editCategory === cat ? (
                              <>
                                <button
                                  className="px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                  onClick={async () => {
                                    if (editCategoryValue && editCategoryValue !== cat) {
                                      await fetch("/api/admin/categories/edit", {
                                        method: "PUT",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ oldName: cat, newName: editCategoryValue }),
                                      });
                                      setEditCategory(null);
                                      setEditCategoryValue("");
                                      fetchCategories();
                                    }
                                  }}
                                >Save</button>
                                <button
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                                  onClick={() => { setEditCategory(null); setEditCategoryValue(""); }}
                                >Cancel</button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                  onClick={() => { setEditCategory(cat); setEditCategoryValue(cat); }}
                                >Edit</button>
                                <button
                                  className="px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                                  onClick={async () => {
                                    await fetch(`/api/admin/categories/${encodeURIComponent(cat)}` , {
                                      method: "DELETE",
                                    });
                                    fetchCategories();
                                  }}
                                >Delete</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={cat || 'empty-category'} className="bg-white shadow-sm rounded-xl transition-all hover:shadow-lg">
                        <td className="px-6 py-4 align-middle">
                          <span className="text-red-500 italic">(No Name)</span>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow" disabled>Edit</button>
                            <button className="px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold shadow" disabled>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2 mt-6">
                <input
                  type="text"
                  className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Category Name"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
                <button
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={async () => {
                    setMessage(null);
                    const trimmed = newCategory.trim();
                    if (!trimmed) {
                      setMessage({ type: 'error', text: 'Category name is required.' });
                      return;
                    }
                    if (categories.map(c => c.toLowerCase()).includes(trimmed.toLowerCase())) {
                      setMessage({ type: 'error', text: 'Category already exists.' });
                      return;
                    }
                    const res = await fetch("/api/admin/categories", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name: trimmed }),
                    });
                    if (!res.ok) {
                      const data = await res.json();
                      setMessage({ type: 'error', text: data.error || 'Failed to add category.' });
                      return;
                    }
                    setNewCategory("");
                    setMessage({ type: 'success', text: 'Category added successfully!' });
                    fetchCategories();
                  }}
                >Add</button>
              </div>
            </div>
            {message && (
              <div className={`mt-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-600'} font-semibold`}>{message.text}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
