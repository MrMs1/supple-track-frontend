import { Skeleton } from "@nextui-org/skeleton";
import { Pill } from "lucide-react";

export function SupplementListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">サプリメント一覧</h2>
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-grow">
                <Skeleton className="rounded-lg">
                  <div className="h-7 w-32 rounded-lg bg-default-200" />
                </Skeleton>
                <div className="mt-2 grid grid-cols-2 gap-4 w-[400px]">
                  <Skeleton className="rounded-lg">
                    <div className="h-5 w-full rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="rounded-lg">
                    <div className="h-5 w-full rounded-lg bg-default-200" />
                  </Skeleton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
