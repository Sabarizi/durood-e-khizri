import { db } from "@/firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const campaignRef = doc(db, "campaign", "durood");

/* ---------------- LISTENER ---------------- */
export const listenCampaign = (callback: any) => {
  return onSnapshot(campaignRef, (snap) => {
    const data = snap.data();

    console.log("🔥 FIREBASE DATA:", data);

    callback(data || { total: 0, users: {} });
  });
};

/* ---------------- ADD DUROOD ---------------- */
export const addDurood = async (name: string, count: number) => {
  try {
    const snap = await getDoc(campaignRef);

    let currentTotal = 0;
    let users: any = {};

    if (snap.exists()) {
      const data = snap.data();
      currentTotal = data?.total || 0;
      users = data?.users || {};
    }

    const cleanName = name.trim();

    if (!cleanName) return;

    const previous = users[cleanName] || 0;
    const updatedUser = previous + count;

    users[cleanName] = updatedUser;

    const newTotal = currentTotal + count;

    await setDoc(campaignRef, {
      total: newTotal,
      users,
    });

    console.log("✅ UPDATED:", newTotal, users);
  } catch (err) {
    console.error("❌ ADD ERROR:", err);
  }
};

/* ---------------- DELETE USER ---------------- */
export const deleteUser = async (name: string) => {
  try {
    const snap = await getDoc(campaignRef);

    if (!snap.exists()) return;

    const data = snap.data();

    const users = data?.users || {};

    const cleanName = name?.trim();

if (!cleanName || !users[cleanName]) return;

    const removedCount = Number(users[cleanName]) || 0;

    delete users[cleanName];

    const newTotal = Math.max(0, (Number(data?.total) || 0) - removedCount);

    await setDoc(campaignRef, {
      total: newTotal,
      users,
    });

    console.log("🗑️ Deleted:", cleanName);
  } catch (err) {
    console.error("DELETE ERROR:", err);
  }
};