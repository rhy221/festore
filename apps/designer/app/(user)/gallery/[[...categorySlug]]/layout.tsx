// app/gallery/layout.tsx
import { GalleryFilters } from '@/components/gallery/gallery-filters'; // Sửa đường dẫn nếu cần
import { GalleryHeader } from '@/components/gallery/header'; // Nếu bạn có header riêng

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-8 pb-20">
     
      <main className="container mx-auto py-8">

        <div className="flex items-center justify-center gap-8 mb-12">
          <h1 className="text-4xl font-bold text-white tracking-wider">GALLERY</h1>
        </div>

       
        <GalleryFilters />

        {children}
      </main>
    </div>
  );
}