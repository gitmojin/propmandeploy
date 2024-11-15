import { Suspense } from "react";
import PropertyList from "@/components/property/PropertyList";
import { PropertyListSkeleton } from "@/components/property/PropertyListSkeleton";

export default function HomePage() {
  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList />
      </Suspense>
    </div>
  );
}
