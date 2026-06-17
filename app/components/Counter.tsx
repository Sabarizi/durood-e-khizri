"use client";

import { useEffect, useState } from "react";
import { listenCampaign, addDurood, deleteUser } from "@/lib/campaign";

export default function Counter() {
  const [total, setTotal] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<any>({});

  const target = 125000;

  useEffect(() => {
    const unsub = listenCampaign((data: any) => {
      setTotal(Number(data?.total) || 0);
      setUsers(data?.users || {});
    });

    return () => unsub();
  }, []);

  const handleAdd = async () => {
    const value = Number(input);

    if (!name.trim() || !value || value <= 0) return;

    await addDurood(name.trim(), value);

    setInput("");
    setName("");
  };

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">

      {/* COUNTER BOX */}
      <div className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-[1.01]">

        <h2 className="text-center text-gray-300 text-lg animate-pulse">
          🌙 Durood Counter
        </h2>

        <h1 className="text-center text-5xl font-bold text-green-400 mt-2 transition-all duration-300">
          {Number(total) || 0}
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Target:{" "}
          <span className="text-white font-semibold">{target}</span>
          {" | "}
          Remaining:{" "}
          <span className="text-yellow-400 font-semibold">
            {Math.max(0, target - (Number(total) || 0))}
          </span>
        </p>

        {/* INPUTS */}
        <div className="mt-5 space-y-3">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 text-white outline-none focus:border-green-400 transition"
          />

          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Durood Count"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 text-white outline-none focus:border-green-400 transition"
          />

          <button
            onClick={handleAdd}
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30"
          >
            ➕ Add Durood
          </button>

        </div>
      </div>

      {/* PARTICIPANTS GRID (6 columns desktop) */}
      <div className="w-full max-w-6xl mt-6 bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-lg">

        <h3 className="text-center text-gray-300 mb-4 text-lg animate-pulse">
          🏆 Participants
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">

          {Object.keys(users || {}).length > 0 ? (
            Object.entries(users || {}).map(([user, count]: any, index) => (
              <div
                key={String(user)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:bg-gray-700"
              >

                <p className="text-white font-semibold text-sm truncate">
                  {index + 1}. {String(user)}
                </p>

                <p className="text-green-400 font-bold mt-1">
                  {Number(count) || 0} MasaAllah
                </p>

                <button
                  onClick={() => {
                    const confirmDelete = confirm(
                      `Delete ${String(user)}?`
                    );

                    if (confirmDelete) {
                      deleteUser(String(user));
                    }
                  }}
                  className="text-red-400 hover:text-red-300 text-xs mt-2"
                >
                  🗑️ delete
                </button>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-6">
              No participants yet
            </p>
          )}

        </div>

      </div>

    </section>
  );
}