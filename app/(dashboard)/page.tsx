import DronesTable from "@/components/drone-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import supabase from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const drones = await supabase.from("drones").select("*");
  return (
    <Card className="p-6 shadow-xl rounded-2xl">
      <CardHeader className="flex gap-1" dir="rtl">
        <h2 className="text-3xl font-bold">قائمة الطائرات بدون طيار</h2>
        <Button asChild className="w-28">
          <Link href={"/new"}>اضافة درون</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <DroneInfo data={drones.data} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

const DroneInfo = ({ data }: { data: any }) => {
  return <DronesTable drones={data} />;
};
