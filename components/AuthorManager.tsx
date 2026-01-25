"use client";
import React, { useState, useEffect } from "react";

// Author management component for CMS
export default function AuthorManager() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    setLoading(true);
    const res = await fetch("/api/admin/authors");
    const data = await res.json();
    setAuthors(data);
    setLoading(false);
  }

  async function addAuthor() {
    if (!newAuthor.trim()) return;
    await fetch("/api/admin/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newAuthor }),
    });
    setNewAuthor("");
    fetchAuthors();
  }

  async function deleteAuthor(name: string) {
    await fetch("/api/admin/authors/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetchAuthors();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Authors</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New author"
          value={newAuthor}
          onChange={e => setNewAuthor(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button onClick={addAuthor} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {authors.map(author => (
            <li key={author.name} className="flex items-center justify-between border-b py-2">
              <span>{author.name}</span>
              <button onClick={() => deleteAuthor(author.name)} className="text-red-600 hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
