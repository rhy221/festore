// app/store/layout.tsx
import { StoreHeader } from '@/components/store/store-header';
import { StoreFilters } from '@/components/store/store-filters';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-8 pb-20">
      <StoreHeader />
      
      <StoreFilters />

      <main className="container mx-auto py-12">
        {children}
      </main>
    </div>
  );
}