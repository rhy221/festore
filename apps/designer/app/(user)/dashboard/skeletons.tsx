export function MonthlyReportSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm space-y-3">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <section>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="w-full h-[260px] bg-gray-100 rounded animate-pulse" />
      </section>
    </>
  );
}

export function CategoryAnalysisSkeleton() {
  return (
    <section>
      <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-3" />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-[250px] space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="flex-1 min-w-[220px]">
          <div className="w-full h-[220px] bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export function SalesHistorySkeleton() {
  return (
    <aside className="border rounded-lg p-4 bg-gray-50 overflow-hidden">
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-3" />
      <div className="overflow-x-auto">
        <div className="w-full space-y-2">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </aside>
  );
}