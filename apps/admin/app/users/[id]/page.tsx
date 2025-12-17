"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import DesignDetailDialog from "../DesignDetail";
import { UsersAPI, type Design } from "@/api/users.api";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";


const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 80;

interface UserDetail {
  id: string;
  type: "designer" | "customer";
  email?: string;
  createdAt?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  status?: string;
}

const resolveDesignTitle = (design?: Design) => {
  if (!design) return "Untitled";
  if (typeof design.title === "string" && design.title.trim()) {
    return design.title;
  }
  return "Untitled";
};

const resolveDesignImage = (design?: Design) => {
  if (!design) return "";

  const raw = design.imageUrls?.[0];
  if (!raw || typeof raw !== "string") return "";

  if (raw.startsWith("http")) return raw;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return "";

  return `${baseUrl}/${raw.replace(/^\/+/, "")}`;
};


export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params?.id as string | undefined;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [designs, setDesigns] = useState<Design[]>([]);
  const [designLoading, setDesignLoading] = useState(false);

  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await UsersAPI.getUserDetail(userId);
        const userBase = res?.user;
        const profile = res?.profile;

        if (!userBase) {
          setUser(null);
          return;
        }

        setUser({
          id: userBase._id,
          type: Array.isArray(userBase.role) &&
            userBase.role.includes("designer")
            ? "designer"
            : "customer",
          email: userBase.email,
          createdAt: userBase.createdAt,
          status: userBase.state,
          name: profile?.name ?? userBase.email ?? "Unknown",
          avatar: profile?.avatarUrl,
          bio: profile?.bio,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user information");
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
        const data = await UsersAPI.getUserDesigns(userId);
        setDesigns(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load designs");
        setDesigns([]);
      } finally {
        setDesignLoading(false);
      }
    };

    fetchDesigns();
  }, [userId, user?.type]);

  const filteredDesigns = useMemo(() => {
    const keyword = (searchTerm ?? "").toLowerCase();

    return designs
      .filter((d) =>
        resolveDesignTitle(d).toLowerCase().includes(keyword)
      )
      .sort((a, b) =>
        sortAsc
          ? resolveDesignTitle(a).localeCompare(resolveDesignTitle(b))
          : resolveDesignTitle(b).localeCompare(resolveDesignTitle(a))
      );
  }, [designs, searchTerm, sortAsc]);

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      {/* HEADER */}
      <div
        className="fixed top-0 right-0 z-20 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
      >
        <Header role="admin" name="Admin" />
      </div>

      <div className="flex-1" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {/* SIDEBAR */}
        <div
          className="fixed top-0 left-0 h-full bg-white shadow-lg"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <Sidebar />
        </div>

        {/* CONTENT */}
        <main
          className="p-6 bg-white overflow-y-auto"
          style={{ marginTop: HEADER_HEIGHT }}
        >
          {loading ? (
            <div className="text-center text-xl py-20">Loading...</div>
          ) : !user ? (
            <div className="text-center text-xl text-red-500 py-20">
              User not found
            </div>
          ) : (
            <>
              {/* USER INFO */}
              <div className="flex gap-6 mb-8">
                <img
                  src={
                    user.avatar ||
                    "https://via.placeholder.com/200x200/6B7280/FFFFFF?text=User"
                  }
                  alt="User avatar"
                  className="w-48 h-48 rounded-full border object-cover"
                />

                <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                  <InfoRow label="Name" value={user.name ?? "-"} />
                  <InfoRow label="Email" value={user.email ?? "-"} />
                  <InfoRow label="Status" value={user.status ?? "-"} />
                  <InfoRow label="Created At" value={user.createdAt ?? "-"} />
                  <div className="col-span-2">
                    <InfoRow label="Bio" value={user.bio ?? "-"} />
                  </div>
                </div>
              </div>

              {/* DESIGNS */}
              {user.type === "designer" && (
                <>
                  <div className="flex gap-4 mb-4">
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value ?? "")}
                      placeholder="Search designs"
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      onClick={() => setSortAsc((v) => !v)}
                      className="w-11 h-11 border rounded-lg flex items-center justify-center"
                    >
                      <ArrowUpDown
                        className={`transition-transform ${
                          sortAsc ? "" : "rotate-180"
                        }`}
                      />
                    </button>
                  </div>

                  {designLoading ? (
                    <div className="py-10 text-center text-gray-500">
                      Loading designs...
                    </div>
                  ) : filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      {filteredDesigns.map((design, index) => {
                        const key = design._id ? design._id : `design-${index}`;
                        return (
                          <DesignCard
                            key={key}
                            design={design}
                            onClick={() => {
                              setSelectedDesign(design);
                              setOpenDialog(true);
                            }}
                          />
                        );
                      })}
                    </div>

                  ) : (
                    <div className="py-10 text-center text-gray-500">
                      No designs found
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {/* DIALOG */}
      {user?.type === "designer" && (
        <DesignDetailDialog
          design={selectedDesign}
          open={openDialog}
          onOpenChange={setOpenDialog}
        />
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
}

function DesignCard({
  design,
  onClick,
}: {
  design: Design;
  onClick: () => void;
}) {
  const image = resolveDesignImage(design);
  const title = resolveDesignTitle(design);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 text-center bg-[#faf0e6] hover:shadow-md"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-40 h-40 mx-auto object-cover rounded mb-3"
        />
      ) : (
        <div className="w-40 h-40 mx-auto flex items-center justify-center bg-gray-200 rounded mb-3 text-sm text-gray-500">
          No image
        </div>
      )}

      <p className="font-semibold truncate">{title}</p>
      <p className="text-sm">{design.status ?? "-"}</p>
    </div>
  );
}
