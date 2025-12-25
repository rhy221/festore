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
          type:
            Array.isArray(userBase.role) &&
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
    const keyword = searchTerm.toLowerCase();

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
    <div className="min-h-screen bg-background text-foreground flex">
      
      <div className="flex-1">

    <main className="flex-1 px-6 md:px-10 lg:px-20 ">

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">
              Loading...
            </div>
          ) : !user ? (
            <div className="text-center py-20 text-destructive">
              User not found
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <img
                  src={
                    user.avatar ||
                    "https://via.placeholder.com/200x200/6B7280/FFFFFF?text=User"
                  }
                  alt="User avatar"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-border object-cover"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                  <InfoRow label="Name" value={user.name ?? "-"} />
                  <InfoRow label="Email" value={user.email ?? "-"} />
                  <InfoRow label="Status" value={user.status ?? "-"} />
                  <InfoRow label="Created At" value={user.createdAt ?? "-"} />
                  <div className="sm:col-span-2">
                    <InfoRow label="Bio" value={user.bio ?? "-"} />
                  </div>
                </div>
              </div>

              {user.type === "designer" && (
                <>
                  <div className="flex gap-3 mb-4">
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search designs"
                      className="flex-1 px-4 py-2 rounded-lg bg-input border border-border focus:outline-none"
                    />
                    <button
                      onClick={() => setSortAsc((v) => !v)}
                      className="w-11 h-11 rounded-lg border border-border flex items-center justify-center bg-secondary hover:bg-accent transition"
                    >
                      <ArrowUpDown
                        className={`transition-transform ${
                          sortAsc ? "" : "rotate-180"
                        }`}
                      />
                    </button>
                  </div>

                  {designLoading ? (
                    <div className="py-10 text-center text-muted-foreground">
                      Loading designs...
                    </div>
                  ) : filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredDesigns.map((design, index) => {
                        const key = design._id ?? `design-${index}`;
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
                    <div className="py-10 text-center text-muted-foreground">
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
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-medium">{value}</span>
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
      className="
        cursor-pointer
        rounded-lg
        border border-border
        bg-card
        p-4
        text-center
        hover:shadow-md
        transition
      "
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-40 h-40 mx-auto object-cover rounded-md mb-3"
        />
      ) : (
        <div className="w-40 h-40 mx-auto flex items-center justify-center bg-muted rounded-md mb-3 text-sm text-muted-foreground">
          No image
        </div>
      )}

      <p className="font-semibold truncate">{title}</p>
      <p className="text-sm text-muted-foreground">
        {design.status ?? "-"}
      </p>
    </div>
  );
}
