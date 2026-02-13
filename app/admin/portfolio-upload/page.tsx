"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdminSidebar from "components/AdminSidebar";
import AdminTopbar from "components/AdminTopbar";
import PortfolioForm from "../../../components/PortfolioForm";

export default function PortfolioUploadPage() {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [initial, setInitial] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/admin/portfolio/${id}`)
        .then(res => res.json())
        .then(data => setInitial(data))
        .catch(() => setError("Failed to load project data"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function handleSave(data: any) {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(id ? `/api/admin/portfolio/${id}` : "/api/admin/portfolio", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save portfolio");
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminTopbar />
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-xl mx-auto glass-card p-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
              {id ? "Edit Portfolio Project" : "Upload Portfolio Project"}
            </h1>
            {loading ? (
              <div className="text-center text-gray-400 text-lg font-medium">Loading...</div>
            ) : (
              <PortfolioForm onSave={handleSave} initial={initial} />
            )}
            {success && <div className="mt-6 text-green-600 text-center font-semibold text-lg rounded-xl bg-green-50/80 px-4 py-2 shadow">Portfolio {id ? "updated" : "uploaded"} successfully!</div>}
            {error && <div className="mt-6 text-red-600 text-center font-semibold text-lg rounded-xl bg-red-50/80 px-4 py-2 shadow">{error}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
