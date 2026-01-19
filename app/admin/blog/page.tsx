"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import GlassCard from "@/components/GlassCard";
import BlogPostForm from "@/components/BlogPostForm";

type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: { name?: string; role?: string; avatar?: string };
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  // Category/Author management
  const [categories, setCategories] = useState<string[]>(["Tech", "Design", "Business", "Marketing"]);
  const [authors, setAuthors] = useState<string[]>(["John Doe", "Jane Smith", "Akshay Patel"]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  // Edit/delete state
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [editAuthor, setEditAuthor] = useState<string | null>(null);
  const [editAuthorValue, setEditAuthorValue] = useState("");
  const [editAuthorRole, setEditAuthorRole] = useState("");
  const [editAuthorAvatar, setEditAuthorAvatar] = useState("");
  const [editAuthorSocial, setEditAuthorSocial] = useState({ twitter: "", linkedin: "", facebook: "", instagram: "", website: "" });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchAuthors();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      // Remove empty and duplicate names
      const names = data
        .map((c: any) => c.name?.trim())
        .filter((name: string | undefined) => name && name.length > 0);
      setCategories(Array.from(new Set(names)));
    } catch {
      setCategories([]);
    }
  }

  async function fetchAuthors() {
    try {
      const res = await fetch("/api/admin/authors");
      const data = await res.json();
      // Remove empty and duplicate names
      const names = data
        .map((a: any) => a.name?.trim())
        .filter((name: string | undefined) => name && name.length > 0);
      setAuthors(Array.from(new Set(names)));
    } catch {
      setAuthors([]);
    }
  }

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(data: BlogPost) {
    if (editPost) {
      await fetch(`/api/admin/blog/${editPost._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setShowForm(false);
    setEditPost(null);
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen relative">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Blog Posts</h1>
            <div className="flex gap-4">
              <button
                className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setShowCategoryForm(true)}
              >
                Add Category
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setShowAuthorForm(true)}
              >
                Add Author
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => { setShowForm(true); setEditPost(null); }}
              >
                Add Post
              </button>
            </div>
          </div>
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-500 text-lg mt-12">No blog posts found. Click <span className="font-semibold text-primary">Add Post</span> to create your first blog post.</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO Image</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {post.image ? (
                          <img src={post.image} alt="post" className="w-14 h-14 object-cover rounded border border-gray-200" />
                        ) : (
                          <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 max-w-xs truncate">{post.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{post.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{post.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{post.readTime}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {post.author?.name}
                        {post.author?.role && (
                          <span className="ml-1 text-xs text-gray-400">({post.author.role})</span>
                        )}
                        {post.author?.avatar && (
                          <img src={post.author.avatar} alt="avatar" className="inline-block ml-2 w-6 h-6 rounded-full object-cover border border-gray-200 align-middle" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {post.seoImage && (
                          <img src={post.seoImage} alt="seo" className="w-10 h-10 object-cover rounded border border-gray-200" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-1 justify-center items-center">
                          <button
                            className="px-3 py-1 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                            onClick={() => { setEditPost(post); setShowForm(true); }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => post._id && handleDelete(post._id)}
                            className="px-3 py-1 rounded-lg bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Add/Edit/Delete Category Modal */}
          {showCategoryForm && (
            <div className="absolute left-0 top-0 w-full h-full z-50 flex items-start justify-center bg-black/30">
              <div className="bg-dark rounded-2xl p-6 w-full max-w-md mt-16 shadow-xl border border-glassBorder flex flex-col gap-4">
                <h2 className="text-lg font-bold text-white mb-2">Manage Categories</h2>
                {/* List categories with edit/delete */}
                <ul className="mb-2">
                  {categories.filter(c => c && c.length > 0).map((cat) => (
                    <li key={cat} className="flex items-center gap-2 mb-1">
                      {editCategory === cat ? (
                        <>
                          <input
                            className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white"
                            value={editCategoryValue}
                            onChange={e => setEditCategoryValue(e.target.value)}
                          />
                          <button
                            className="px-2 py-1 bg-pink-500 text-white rounded"
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
                            className="px-2 py-1 bg-gray-400 text-black rounded"
                            onClick={() => { setEditCategory(null); setEditCategoryValue(""); }}
                          >Cancel</button>
                        </>
                      ) : (
                        <>
                          <span className="text-white">{cat}</span>
                          <button
                            className="px-2 py-1 bg-indigo-500 text-white rounded"
                            onClick={() => { setEditCategory(cat); setEditCategoryValue(cat); }}
                          >Edit</button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded"
                            onClick={async () => {
                              await fetch(`/api/admin/categories/${encodeURIComponent(cat)}`, {
                                method: "DELETE",
                              });
                              fetchCategories();
                            }}
                          >Delete</button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  className="px-4 py-2 rounded-lg bg-dark/80 border border-glassBorder text-white"
                  placeholder="Category Name"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 rounded-xl bg-pink-500 text-white font-semibold shadow"
                    onClick={async () => {
                      if (newCategory && !categories.includes(newCategory)) {
                        await fetch("/api/admin/categories", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ name: newCategory }),
                        });
                        setNewCategory("");
                        fetchCategories();
                      }
                    }}
                  >Add</button>
                  <button
                    className="px-4 py-2 rounded-xl bg-gray-200 text-black font-semibold shadow"
                    onClick={() => { setShowCategoryForm(false); setNewCategory(""); setEditCategory(null); setEditCategoryValue(""); }}
                  >Close</button>
                </div>
              </div>
            </div>
          )}
          {/* Add/Edit/Delete Author Modal */}
          {showAuthorForm && (
            <div className="absolute left-0 top-0 w-full h-full z-50 flex items-start justify-center bg-black/30">
              <div className="bg-dark rounded-2xl p-6 w-full max-w-md mt-16 shadow-xl border border-glassBorder flex flex-col gap-4">
                <h2 className="text-lg font-bold text-white mb-2">Manage Authors</h2>
                {/* List authors with edit/delete */}
                <ul className="mb-2">
                  {authors.filter(a => a && a.length > 0).map((author) => (
                    <li key={author} className="flex flex-col gap-1 mb-2">
                      {editAuthor === author ? (
                        <div className="flex flex-col gap-1 bg-dark/70 p-2 rounded">
                          <input
                            className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1"
                            value={editAuthorValue}
                            onChange={e => setEditAuthorValue(e.target.value)}
                            placeholder="Name"
                          />
                          <input
                            className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1"
                            value={editAuthorRole}
                            onChange={e => setEditAuthorRole(e.target.value)}
                            placeholder="Role"
                          />
                          <input
                            className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1"
                            value={editAuthorAvatar}
                            onChange={e => setEditAuthorAvatar(e.target.value)}
                            placeholder="Avatar URL"
                          />
                          {/* Social links */}
                          <input className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1" value={editAuthorSocial.twitter} onChange={e => setEditAuthorSocial(s => ({ ...s, twitter: e.target.value }))} placeholder="Twitter URL" />
                          <input className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1" value={editAuthorSocial.linkedin} onChange={e => setEditAuthorSocial(s => ({ ...s, linkedin: e.target.value }))} placeholder="LinkedIn URL" />
                          <input className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1" value={editAuthorSocial.facebook} onChange={e => setEditAuthorSocial(s => ({ ...s, facebook: e.target.value }))} placeholder="Facebook URL" />
                          <input className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1" value={editAuthorSocial.instagram} onChange={e => setEditAuthorSocial(s => ({ ...s, instagram: e.target.value }))} placeholder="Instagram URL" />
                          <input className="px-2 py-1 rounded bg-dark/80 border border-glassBorder text-white mb-1" value={editAuthorSocial.website} onChange={e => setEditAuthorSocial(s => ({ ...s, website: e.target.value }))} placeholder="Website URL" />
                          <div className="flex gap-2 mt-1">
                            <button
                              className="px-2 py-1 bg-indigo-500 text-white rounded"
                              onClick={async () => {
                                if (editAuthorValue && editAuthorValue !== author) {
                                  await fetch("/api/admin/authors/edit", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ oldName: author, newName: editAuthorValue, role: editAuthorRole, avatar: editAuthorAvatar, social: editAuthorSocial }),
                                  });
                                  setEditAuthor(null);
                                  setEditAuthorValue("");
                                  setEditAuthorRole("");
                                  setEditAuthorAvatar("");
                                  setEditAuthorSocial({ twitter: "", linkedin: "", facebook: "", instagram: "", website: "" });
                                  fetchAuthors();
                                }
                              }}
                            >Save</button>
                            <button
                              className="px-2 py-1 bg-gray-400 text-black rounded"
                              onClick={() => { setEditAuthor(null); setEditAuthorValue(""); setEditAuthorRole(""); setEditAuthorAvatar(""); setEditAuthorSocial({ twitter: "", linkedin: "", facebook: "", instagram: "", website: "" }); }}
                            >Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-white">{author}</span>
                          <button
                            className="px-2 py-1 bg-indigo-500 text-white rounded"
                            onClick={() => { setEditAuthor(author); setEditAuthorValue(author); setEditAuthorRole(""); setEditAuthorAvatar(""); setEditAuthorSocial({ twitter: "", linkedin: "", facebook: "", instagram: "", website: "" }); }}
                          >Edit</button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded"
                            onClick={async () => {
                              await fetch("/api/admin/authors/delete", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ name: author }),
                              });
                              fetchAuthors();
                            }}
                          >Delete</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  className="px-4 py-2 rounded-lg bg-dark/80 border border-glassBorder text-white"
                  placeholder="Author Name"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-semibold shadow"
                    onClick={async () => {
                      if (newAuthor && !authors.includes(newAuthor)) {
                        await fetch("/api/admin/authors", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ name: newAuthor }),
                        });
                        setNewAuthor("");
                        fetchAuthors();
                      }
                    }}
                  >Add</button>
                  <button
                    className="px-4 py-2 rounded-xl bg-gray-200 text-black font-semibold shadow"
                    onClick={() => { setShowAuthorForm(false); setNewAuthor(""); setEditAuthor(null); setEditAuthorValue(""); setEditAuthorRole(""); setEditAuthorAvatar(""); setEditAuthorSocial({ twitter: "", linkedin: "", facebook: "", instagram: "", website: "" }); }}
                  >Close</button>
                </div>
              </div>
            </div>
          )}
          {/* Add/Edit Blog Post Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-dark rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto shadow-xl border border-glassBorder">
                <BlogPostForm
                  initial={editPost ?? undefined}
                  onSave={handleSave}
                  onClose={() => { setShowForm(false); setEditPost(null); }}
                  autoSlug
                  categories={categories}
                  authors={authors}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
