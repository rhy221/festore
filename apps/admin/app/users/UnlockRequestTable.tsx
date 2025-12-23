import React from "react";
import type { UnlockRequest } from "./UnlockRequest";
import { displayUnlockStatus } from "./types";
import { EyeIcon } from "lucide-react";

type UnlockRequestTableProps = {
  requests: UnlockRequest[];
  onViewRequest: (request: UnlockRequest) => void;
};

export default function UnlockRequestTable({
  requests,
  onViewRequest,
}: UnlockRequestTableProps) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-white rounded-xl border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold text-gray-700">No.</th>
            <th className="p-3 font-semibold text-gray-700">Email</th>
            <th className="p-3 font-semibold text-gray-700">Appeal Content</th>
            <th className="p-3 font-semibold text-gray-700">Submitted Date</th>
            <th className="p-3 font-semibold text-gray-700">Status</th>
            <th className="p-3 font-semibold text-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r, i) => (
            <tr
              key={r._id}
              className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <td className="p-3">{i + 1}</td>

              <td className="p-3 text-gray-600">
                {r.userId?.email ?? "—"}
              </td>

              <td className="p-3">{r.reason}</td>

              <td className="p-3">
                {r.createdAt
                  ? new Date(r.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    r.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : r.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {displayUnlockStatus(r.status)}
                </span>
              </td>

              <td className="p-3 flex justify-center">
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => onViewRequest(r)}
                  title="View request details"
                >
                  <EyeIcon size={22} className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-12 text-center text-gray-400 text-lg font-medium"
              >
                No unlock requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
