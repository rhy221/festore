"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useState, useRef, useEffect } from "react";
import userAction from "@/api/user.api";
import {
  Car,
  Pencil,
  PersonStanding,
  Search,
  Star,
  ThumbsUp,
  UserPlus,
  UserRoundPlus,
} from "lucide-react";
import Image from "next/image";

function ProfileSkeleton() {
  return (
    <Card className="p-6 animate-pulse flex gap-6">
      <div className="w-32 h-32 bg-gray-300 rounded-full" />
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-5 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-56 bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>
    </Card>
  );
}
export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState<string>("chillguy");
  const [draft, setDraft] = useState<string>(description);
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "https://picsum.photos/seed/picsum/200/300"
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onEdit = () => {
    setDraft(description);
    setIsEditing(true);
  };

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        const data = await userAction.getMe();
        if (!mounted) return;
        setUser(data);
        setDescription(data.description || "");
        setDraft(data.description || "");
        setAvatarSrc(
          data.avatar || "https://picsum.photos/seed/picsum/200/300"
        );
      } catch (err) {
        console.error("Fetch profile failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAvatarClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    // revoke previous preview URL when replaced
    if (avatarPreview) {
      try {
        URL.revokeObjectURL(avatarPreview);
      } catch {}
    }
    setAvatarFile(file);
    setAvatarPreview(url);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // attempt to update backend (userAction will fallback to mock if needed)
      const updated = await userAction.updateMe({ description: draft });
      setDescription(updated.description ?? draft);
      // commit avatar preview (if any) to the displayed avatar
      if (avatarPreview) {
        // if backend returned an avatar URL use it; otherwise commit local preview
        if ((updated as any)?.avatar) {
          setAvatarSrc((updated as any).avatar);
        } else {
          try {
            if (avatarSrc?.startsWith("blob:")) URL.revokeObjectURL(avatarSrc);
          } catch {}
          setAvatarSrc(avatarPreview);
        }
        setAvatarPreview(null);
        setAvatarFile(null);
      }
      setIsEditing(false);
    } catch (err: any) {
      // http interceptor already returns response.data on error in many cases
      setError(
        err?.message ||
          (typeof err === "string" ? err : "Failed to save profile")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const onCancel = () => {
    setDraft(description);
    setIsEditing(false);
    setAvatarPreview(null);
  };
  // Hiển thị Skeleton khi đang tải lần đầu hoặc đang lưu (Save)
  if (loading || isSaving) return <ProfileSkeleton />;
  return (
    <>
      <Card>
        <div className="flex justify-between w-full py-2 px-6">
          {/* Avatar */}
          <div className="flex-1 flex items-start relative">
            <Avatar className="w-full h-auto border-4 border-b-blue-700">
              <AvatarImage
                src={isEditing && avatarPreview ? avatarPreview : avatarSrc}
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>

            {/* hidden file input for avatar upload/preview */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* show small edit avatar button when editing */}
            {isEditing && (
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute top-25 right-1 bg-white/90 border rounded-full p-1 shadow hover:bg-white"
                aria-label="Edit avatar"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex-5 flex flex-col items-start gap-4 px-10 w-2/4">
            <div className="flex flex-col gap-1">
              <span className="font-bold">John</span>
              <span className="text-xs">Johnht@gmail.com</span>
            </div>
            <span>Join in 2/2/2020</span>

            {/* Description: show textarea when editing */}
            {isEditing ? (
              <div className="w-full">
                <label className="text-sm text-gray-600 block mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border rounded p-2 resize-y"
                  rows={4}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
            ) : (
              <span>{`Description: ${description}`}</span>
            )}

            <span>{`Status: ${"active"}`}</span>
          </div>

          {/* Edit */}
          <div className="flex-1 flex items-start gap-2">
            {!isEditing ? (
              <Button onClick={onEdit}>
                <Pencil />
                Edit profile
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button onClick={onSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button onClick={onCancel} variant="ghost">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
