"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AIGuidePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/guide");
  }, [router]);

  return (
    <div className="min-h-full flex items-center justify-center p-8 text-center" style={{ background: "#FAF7F2", color: "#8B6914" }}>
      <p className="text-sm font-bold">AI Guide бөліміне өтуде...</p>
    </div>
  );
}