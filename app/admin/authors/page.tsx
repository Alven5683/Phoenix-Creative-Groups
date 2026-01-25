"use client";

import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { useEffect, useState } from "react";

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newFacebook, setNewFacebook] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
  const [editAuthor, setEditAuthor] = useState<any | null>(null);
  const [editAuthorValue, setEditAuthorValue] = useState("");
  const [editAuthorRole, setEditAuthorRole] = useState("");
  const [editAuthorAvatar, setEditAuthorAvatar] = useState("");
  const [editAuthorFacebook, setEditAuthorFacebook] = useState("");
  const [editAuthorLinkedin, setEditAuthorLinkedin] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    try {
      const res = await fetch("/api/admin/authors");
      const data = await res.json();
      setAuthors(Array.isArray(data) ? data : []);
    } catch {
      setAuthors([]);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Authors</h1>
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-100 mb-8 p-2">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-linear-to-r from-primary to-secondary text-white rounded-xl">
                  <th className="px-6 py-4 text-lg font-bold rounded-l-xl">Profile</th>
                  <th className="px-6 py-4 text-lg font-bold">Name</th>
                  <th className="px-6 py-4 text-lg font-bold">Role</th>
                  <th className="px-6 py-4 text-lg font-bold">Facebook</th>
                  <th className="px-6 py-4 text-lg font-bold">LinkedIn</th>
                  <th className="px-6 py-4 text-lg font-bold rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author._id || author.name} className="bg-white shadow-sm rounded-xl transition-all hover:shadow-lg">
                    <td className="px-6 py-4 align-middle">
                      {author.avatar ? <img src={author.avatar} alt="avatar" className="w-12 h-12 rounded-full border-2 border-primary shadow" /> : <span className="text-gray-400">No Image</span>}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      {editAuthor && editAuthor._id === author._id ? (
                        <input
                          className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={editAuthorValue}
                          onChange={e => setEditAuthorValue(e.target.value)}
                          placeholder="Name"
                        />
                      ) : (
                        <span className="text-gray-900 font-semibold text-base">{author.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      {editAuthor && editAuthor._id === author._id ? (
                        <input
                          className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={editAuthorRole}
                          onChange={e => setEditAuthorRole(e.target.value)}
                          placeholder="Role"
                        />
                      ) : (
                        <span className="text-gray-700 text-base">{author.role || '-'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      {editAuthor && editAuthor._id === author._id ? (
                        <input
                          className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={editAuthorFacebook}
                          onChange={e => setEditAuthorFacebook(e.target.value)}
                          placeholder="Facebook URL"
                        />
                      ) : (
                        author.facebook ? <a href={author.facebook} target="_blank" className="text-primary underline">Facebook</a> : <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      {editAuthor && editAuthor._id === author._id ? (
                        <input
                          className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={editAuthorLinkedin}
                          onChange={e => setEditAuthorLinkedin(e.target.value)}
                          placeholder="LinkedIn URL"
                        />
                      ) : (
                        author.linkedin ? <a href={author.linkedin} target="_blank" className="text-primary underline">LinkedIn</a> : <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-middle flex gap-2">
                      {editAuthor && editAuthor._id === author._id ? (
                        <>
                          <button
                            className="px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={async () => {
                              if (editAuthorValue && editAuthorValue !== author.name) {
                                await fetch("/api/admin/authors/edit", {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    _id: author._id,
                                    name: editAuthorValue,
                                    role: editAuthorRole,
                                    avatar: editAuthorAvatar,
                                    facebook: editAuthorFacebook,
                                    linkedin: editAuthorLinkedin
                                  }),
                                });
                                setEditAuthor(null);
                                setEditAuthorValue("");
                                setEditAuthorRole("");
                                setEditAuthorAvatar("");
                                setEditAuthorFacebook("");
                                setEditAuthorLinkedin("");
                                fetchAuthors();
                              }
                            }}
                          >Save</button>
                          <button
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={() => { setEditAuthor(null); setEditAuthorValue(""); setEditAuthorRole(""); setEditAuthorAvatar(""); setEditAuthorFacebook(""); setEditAuthorLinkedin(""); }}
                          >Cancel</button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={() => {
                              setEditAuthor(author);
                              setEditAuthorValue(author.name || "");
                              setEditAuthorRole(author.role || "");
                              setEditAuthorAvatar(author.avatar || "");
                              setEditAuthorFacebook(author.facebook || "");
                              setEditAuthorLinkedin(author.linkedin || "");
                            }}
                          >Edit</button>
                          <button
                            className="px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={async () => {
                              await fetch("/api/admin/authors/delete", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ _id: author._id }),
                              });
                              fetchAuthors();
                            }}
                          >Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-end">
              <button
                className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setShowForm(true)}
              >Add Author</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Add Author</h2>
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Author Name"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Role"
                    value={newRole}
                    onChange={e => setNewRole(e.target.value)}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">Profile Image</label>
                    {newAvatar && (
                      <img src={newAvatar} alt="avatar" className="w-16 h-16 rounded-full mb-2" />
                    )}
                    <CloudinaryUpload onUpload={url => setNewAvatar(url)} folder="authors">
                      <span className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold cursor-pointer">Upload Image</span>
                    </CloudinaryUpload>
                  </div>
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Facebook URL"
                    value={newFacebook}
                    onChange={e => setNewFacebook(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="LinkedIn URL"
                    value={newLinkedin}
                    onChange={e => setNewLinkedin(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-purple-500 hover:to-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={async () => {
                        if (newAuthor) {
                          await fetch("/api/admin/authors", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: newAuthor,
                              role: newRole,
                              avatar: newAvatar,
                              facebook: newFacebook,
                              linkedin: newLinkedin
                            }),
                          });
                          setNewAuthor("");
                          setNewRole("");
                          setNewAvatar("");
                          setNewFacebook("");
                          setNewLinkedin("");
                          setShowForm(false);
                          fetchAuthors();
                        }
                      }}
                    >Add</button>
                    <button
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300"
                      onClick={() => {
                        setShowForm(false);
                        setNewAuthor("");
                        setNewRole("");
                        setNewAvatar("");
                        setNewFacebook("");
                        setNewLinkedin("");
                      }}
                    >Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
