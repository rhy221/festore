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
import dayjs from "dayjs";
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
import { useUserProfile, useUserProfileEditing } from "@/queries/useUser";
import { Controller, useForm } from "react-hook-form";
import { UserProfileEditingType, UserProfileResType } from "@/schema/user.schema";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

function ProfileSkeleton() {
  return (
    <>
    <Card>
        <div className="flex justify-between w-full py-2 px-6">
          <div className="flex-1 flex items-start relative max-w-[150px]">
            <Skeleton className="w-full aspect-square rounded-full" />
      </div>

          {/* Info */}
      <div className="flex-5 flex flex-col items-start gap-4 px-10 w-2/4">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-8 w-[60vw]" />
              <Skeleton className="h-4 w-[40vw]" />
            </div>
            <Skeleton className="h-8 w-[60vw]" />
            <Skeleton className="h-8 w-[60vw]" />
      </div>

        </div>
    </Card>
      
    </>
  );
}


export default function Profile() {

  const query = useUserProfile();
  const form = useForm<UserProfileEditingType>({
    
  })
  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  // const [description, setDescription] = useState<string>("chillguy");
  const [draft, setDraft] = useState<string>("");
  // const [avatarSrc, setAvatarSrc] = useState<string>(
  //   "https://picsum.photos/seed/picsum/200/300"
  // );
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onEdit = () => {
    // setDraft(description);
    setIsEditing(true);
  };

  // useEffect(() => {
  //   let mounted = true;
  //   const fetchProfile = async () => {
  //     try {
  //       const data = await userAction.getMe();
  //       if (!mounted) return;
  //       setUser(data);
  //       setDescription(data.description || "");
  //       setDraft(data.description || "");
  //       setAvatarSrc(
  //         data.avatar || "https://picsum.photos/seed/picsum/200/300"
  //       );
  //     } catch (err) {
  //       console.error("Fetch profile failed:", err);
  //     } finally {
  //       if (mounted) setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  const handleAvatarClick = () => {
    // if (!fileInputRef.current) return;
    // fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    // if (!file) return;
    // const url = URL.createObjectURL(file);
    // // revoke previous preview URL when replaced
    // if (avatarPreview) {
    //   try {
    //     URL.revokeObjectURL(avatarPreview);
    //   } catch {}
    // }
    // setAvatarFile(file);
    // setAvatarPreview(url);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // // attempt to update backend (userAction will fallback to mock if needed)
      // const updated = await userAction.updateMe({ description: draft });
      // setDescription(updated.description ?? draft);
      // // commit avatar preview (if any) to the displayed avatar
      // if (avatarPreview) {
      //   // if backend returned an avatar URL use it; otherwise commit local preview
      //   if ((updated as any)?.avatar) {
      //     setAvatarSrc((updated as any).avatar);
      //   } else {
      //     try {
      //       if (avatarSrc?.startsWith("blob:")) URL.revokeObjectURL(avatarSrc);
      //     } catch {}
      //     setAvatarSrc(avatarPreview);
      //   }
      //   setAvatarPreview(null);
      //   setAvatarFile(null);
      // }
      // setIsEditing(false);
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
    // setDraft(description);
    setIsEditing(false);
    // setAvatarPreview(null);
  };
  // Hiển thị Skeleton khi đang tải lần đầu hoặc đang lưu (Save)
  if (query.isLoading) return <ProfileSkeleton />;
  return (
    <form>
      <Card>
        <div className="flex justify-between w-full py-2 px-6">
          {/* Avatar */}
          <div className="flex-1 flex items-start relative">
            <Avatar className="w-48 aspect-square h-auto border-4 border-b-blue-700">
              <AvatarImage
                src={query.data?.avatarUrl}
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
              <span className="font-bold">{query.data?.name}</span>
              <span className="text-xs">{query.data?.email}</span>
            </div>
            <span>Join in {dayjs(query.data?.createdAt).format("DD/MM/YYYY")}</span>

            {/* Description: show textarea when editing */}
            {isEditing ? (
              <div className="w-full">
                <label htmlFor="desEdit" className="text-sm text-gray-600 block mb-1">
                  Description
                </label>
                <textarea
                  id="desEdit"
                  name="desEdit"
                  className="w-full border rounded p-2 resize-y"
                  rows={4}
                  value={query.data?.bio}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
            ) : ( 
              <span>{`Description: ${query.data?.bio}`}</span>
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
    </form>
  );
}
