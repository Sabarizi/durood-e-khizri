"use client";

import { useEffect, useState } from "react";
import { listenCampaign } from "@/lib/campaign";

export default function Progress() {
  const [total, setTotal] = useState(0);
  const target = 125000;

  useEffect(() => {
    const unsub = listenCampaign((data: any) => {
      if (data?.total !== undefined) setTotal(data.total);
    });

    return () => unsub();
  }, []);

  const percent = Math.min((total / target) * 100, 100);

  return (
    <section className="px-6 py-10 text-white">
      
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-700">
        
        <h3 className="text-center text-gray-300 mb-4">
          Progress
        </h3>

        <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">
          <div
            className="h-5 bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-center mt-3 text-gray-400">
          {percent.toFixed(2)}% Complete
        </p>

      </div>
    </section>
  );
}