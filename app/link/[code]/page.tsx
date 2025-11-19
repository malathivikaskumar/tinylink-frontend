import { getLinkStats } from "../../../lib/api";
import { LinkItem, ApiError } from "../../../types";

interface Props {
  params: {
    code: string;
  };
}

export default async function Page({ params }: Props) {
  const data = await getLinkStats(params.code);

  if ("error" in data) {
    return <div className="p-8 text-red-600">Link not found</div>;
  }

  const link = data as LinkItem;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stats for {link.code}</h1>

      <p><strong>Target:</strong> {link.target}</p>
      <p><strong>Created:</strong> {new Date(link.created_at).toLocaleString()}</p>
      <p><strong>Total Clicks:</strong> {link.clicks}</p>
      <p>
        <strong>Last Clicked:</strong>{" "}
        {link.last_clicked
          ? new Date(link.last_clicked).toLocaleString()
          : "Never"}
      </p>

      <a
        href="/"
        className="inline-block mt-5 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Back to Dashboard
      </a>
    </div>
  );
}
