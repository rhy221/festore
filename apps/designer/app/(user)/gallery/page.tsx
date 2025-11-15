'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GalleryPage } from '@/components/gallery/gallery-page';


export default function Gallery() {
  return (
      <div className="min-h-screen bg-black">
        <GalleryPage />
      </div>
  );
}
