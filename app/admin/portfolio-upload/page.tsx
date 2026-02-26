"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminSidebar from "components/AdminSidebar";
import AdminTopbar from "components/AdminTopbar";
import PortfolioForm from "../../../components/PortfolioForm";

function PortfolioUploadContent() {

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
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminTopbar />
        <main className="flex-1 px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <h1 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl">
              {id ? "Edit Portfolio Project" : "Upload Portfolio Project"}
            </h1>
            <p className="mb-8 text-sm text-slate-600">
              Fill out the fields below to publish a clean, conversion-focused case study page.
            </p>
            {loading ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                Loading project data...
              </div>
            ) : (
              <PortfolioForm onSave={handleSave} initial={initial} onClose={() => window.history.back()} />
            )}
            {success && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                Portfolio {id ? "updated" : "uploaded"} successfully.
              </div>
            )}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PortfolioUploadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
          Loading portfolio editor...
        </div>
      }
    >
      <PortfolioUploadContent />
    </Suspense>
  );
}
