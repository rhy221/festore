'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { UserMinus, UserPlus } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface DesignerProfile {
    userId: string; // ID của user (từ field designerId của Following)
    name: string;
    avatarUrl: string;
    bio?: string;
    profession?: string;
}

interface DesignerCardProps {
    data: DesignerProfile;
    isOwner: boolean; // Có phải là user đang đăng nhập xem list của chính mình ko?
    onToggleFollow?: (id: string) => void;
}

export function DesignerCard({ data, isOwner, onToggleFollow }: DesignerCardProps) {
    const { userId, name, avatarUrl, bio, profession } = data;

    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group">
            <Link href={`/portfolio/${userId}`} className="flex items-center gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-700 shrink-0">
                    <Image 
                        src={avatarUrl || '/default-avatar.png'} 
                        alt={name} 
                        fill 
                        className="object-cover" 
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                    <h3 className="text-white font-semibold truncate group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    {profession && (
                        <p className="text-zinc-500 text-xs truncate mb-0.5">{profession}</p>
                    )}
                    {bio && (
                        <p className="text-zinc-400 text-xs truncate max-w-[200px]">
                            {bio}
                        </p>
                    )}
                </div>
            </Link>

            {/* Action Button */}
            {isOwner && (
                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleFollow?.(userId);
                    }}
                    className="ml-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-full"
                    title="Unfollow"
                >
                    <UserMinus size={18} />
                </Button>
            )}
        </div>
    );
}