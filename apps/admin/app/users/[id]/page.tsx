"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DesignDetailDialog, { type Design } from "../DesignDetail";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { toast } from "sonner";
import api from "@/lib/http";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 80;

export interface UserDetail {
  id: string;
  type: "designer" | "customer";
  email?: string;
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
  gender?: string;
  dateOfBirth?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  status?: string;
  stats?: {
    designsPosted: number;
    totalRevenue: number;
    totalSold: number;
    followers: number;
    rating?: number;
  };
}

export default function AdminDashboard() {
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [designLoading, setDesignLoading] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!userId) {
      toast.error("Invalid user ID.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/admin/users/${userId}`);
        const data = res.data;
        if (!data?.user) {
          toast.error("User information not found");
          setUser(null);
          return;
        }

        const userBase = data.user;
        const profile = data.profile || {};
        const userData: UserDetail = {
          id: userBase._id,
          type: userBase.role?.includes("designer") ? "designer" : "customer",
          email: userBase.email,
          createdAt: userBase.createdAt,
          status: userBase.state,
          name: profile.name || userBase.email,
          avatar: profile.avatarUrl,
          bio: profile.bio,
          stats:
            userBase.role?.includes("designer")
              ? {
                  designsPosted: profile.totalDesigns || 0,
                  totalRevenue: profile.totalRevenue || 0,
                  totalSold: profile.totalSold || 0,
                  followers: profile.followerCount || 0,
                  rating: profile.rating,
                }
              : undefined,
        };
        setUser(userData);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        toast.error(
          `Failed to load user information. ${
            err.response?.status ? "Error code: " + err.response.status : "Network/Server error"
          }`
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (!userId || user?.type !== "designer") return;

    const fetchDesigns = async () => {
      setDesignLoading(true);
      try {
        const res = await api.get(`/api/admin/users/${userId}/designs`);
        const designList: Design[] = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setDesigns(designList);
      } catch (err: any) {
        if (err.response) {
          console.error("Error fetching designs: Response error", err.response.data, err.response.status);
          toast.error(`Failed to load designs. Status: ${err.response.status}`);
        } else if (err.request) {
          console.error("Error fetching designs: No response", err.request);
          toast.error("Failed to load designs. No response from server.");
        } else {
          console.error("Error fetching designs:", err.message);
          toast.error("Failed to load designs. " + err.message);
        }
        setDesigns([]);
      } finally {
        setDesignLoading(false);
      }
    };

    fetchDesigns();
  }, [userId, user?.type]);

  const filteredDesigns = designs.filter(
    (design) =>
      design.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeFilter === "All" || design.status === activeFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      <div
        className="fixed top-0 right-0 z-20 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
      >
        <Header role="admin" name="ABC" />
      </div>

      <div className="flex-1" style={{ marginLeft: SIDEBAR_WIDTH }}>
        <div
          className="fixed top-0 left-0 h-full bg-white shadow-lg"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <Sidebar />
        </div>

        <main
          className="flex-1 bg-white p-6 overflow-y-auto text-lg"
          style={{ marginTop: HEADER_HEIGHT }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64 text-xl">
              Loading user information...
            </div>
          ) : !user ? (
            <div className="flex items-center justify-center h-64 text-xl text-red-500">
              User information not found
            </div>
          ) : (
            <>
              <div className="flex gap-6 items-center mb-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user.avatar || "https://via.placeholder.com/200x200/6B7280/FFFFFF?text=User"}
                    alt="Avatar"
                    className="w-48 h-48 rounded-full border mb-3"
                  />
                  <h2 className="text-2xl font-bold text-black">
                    {user.type === "designer" ? "DESIGNER" : "CUSTOMER"}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  <InfoRow label="Full Name" value={user.name || ""} />
                  <InfoRow label="Email" value={user.email || ""} />
                  <InfoRow label="Status" value={user.status || ""} />
                  <InfoRow label="Account Created At" value={user.createdAt || ""} />
                  <div className="col-span-2">
                    <InfoRow label="Bio" value={user.bio || ""} />
                  </div>
                </div>
              </div>

              {user.type === "designer" && (
                <>
                  <div className="flex gap-2 mb-4">
                    <input
                      placeholder="Search designs by name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#BFE3F3] flex-1 rounded-full px-4 py-2 border text-lg"
                    />
                  </div>

                  <div className="flex gap-7 mb-4">
                    {["All", "On Sale", "Auctioning", "Sold", "Shared"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full text-lg ${
                          activeFilter === filter
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {designLoading ? (
                    <div className="text-center py-8 text-gray-500 text-lg">
                      Loading designs...
                    </div>
                  ) : filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      {filteredDesigns.map((design) => (
                        <DesignCard
                          key={design.id}
                          image={design.image}
                          title={design.name}
                          status={design.status}
                          onClick={() => {
                            setSelectedDesign(design);
                            setShowDialog(true);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-lg">
                      No designs found
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {user?.type === "designer" && (
        <DesignDetailDialog
          design={selectedDesign}
          open={showDialog}
          onOpenChange={setShowDialog}
        />
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="leading-snug">
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
}

function DesignCard({
  image,
  title,
  status,
  onClick,
}: {
  image: string;
  title: string;
  status: string;
  onClick: () => void;
}) {
  return (
    <div
      className="rounded-lg border border-[#6a360e] p-4 shadow-sm hover:shadow-md bg-[#faf0e6] text-black flex flex-col items-center text-center h-72 justify-center cursor-pointer transition-shadow"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-40 h-40 object-cover rounded-md mb-4 border border-white/20"
      />
      <p className="font-semibold text-lg">{title}</p>
      <p className="font-semibold text-lg mt-1">{status}</p>
    </div>
  );
}
