"use client";

import { useEffect, useState } from "react";
import { getLinks, createLink, deleteLink } from "../lib/api";
import { LinkItem, ApiError } from "../types";

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function loadLinks() {
    const data = await getLinks();
    setLinks(data);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await createLink({ target, code });

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setTarget("");
    setCode("");
    loadLinks();
  }

  async function handleDelete(c: string) {
    await deleteLink(c);
    loadLinks();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">TinyLink Dashboard</h1>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="border p-4 rounded mb-6">
        <div className="mb-3">
          <input
            className="border p-2 w-full"
            placeholder="https://example.com"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="border p-2 w-full"
            placeholder="Custom code (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* List All Links */}
      <h2 className="text-xl font-semibold mb-3">All Links</h2>

      <table className="w-full border">
        <thead>
          <tr className="border bg-gray-100">
            <th className="p-2">Code</th>
            <th className="p-2">Target</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code} className="border">
              <td className="p-2">
                <a
                  className="text-blue-600"
                  href={`${process.env.NEXT_PUBLIC_API_URL}/${l.code}`}
                  target="_blank"
                >
                  {l.code}
                </a>
              </td>

              <td className="p-2 truncate max-w-xs">{l.target}</td>

              <td className="p-2 text-center">{l.clicks}</td>

              <td className="p-2">
                <a
                  className="text-sm text-purple-600 mr-3"
                  href={`/link/${l.code}`}
                >
                  Stats
                </a>

                <button
                  className="text-red-600"
                  onClick={() => handleDelete(l.code)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
