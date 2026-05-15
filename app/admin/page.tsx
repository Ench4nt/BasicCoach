import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, isAdminConfigured } from "@/lib/firebase-admin";
import { getCourses, getAllPurchases, Course } from "@/lib/courses";
import GrantRevokeButton from "./GrantRevokeButton";

export const metadata = { title: "Admin — BoxIQ" };

interface UserRow {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  purchasedCourseIds: string[];
}

export default async function AdminPage() {
  // ── Auth guard ──────────────────────────────────────────────────────────────
  if (!isAdminConfigured) redirect("/login");

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) redirect("/login");

  let email = "";
  try {
    const decoded = await adminAuth.verifyIdToken(session);
    email = decoded.email ?? "";
  } catch {
    redirect("/login");
  }

  if (!process.env.ADMIN_EMAIL || email !== process.env.ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-500">403 — Not authorized.</p>
      </main>
    );
  }

  // ── Data ─────────────────────────────────────────────────────────────────────
  const courses = await getCourses();

  // Fetch all Firebase users
  const listResult = await adminAuth.listUsers(1000);
  const firebaseUsers = listResult.users.map((u) => ({
    uid: u.uid,
    email: u.email ?? "",
    displayName: u.displayName || u.email?.split("@")[0] || "Unknown",
    createdAt: new Date(u.metadata.creationTime).toLocaleDateString(),
  }));

  const purchases = await getAllPurchases();

  // Merge: attach purchased course IDs to each user
  const rows: UserRow[] = firebaseUsers.map((u) => ({
    ...u,
    purchasedCourseIds: purchases
      .filter((p) => p.uid === u.uid)
      .map((p) => p.course_id),
  }));

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-1">Admin Panel</p>
            <h1 className="text-3xl font-black text-white">User Management</h1>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-sm">{rows.length} users</p>
            <p className="text-zinc-600 text-xs mt-0.5">{courses.length} courses</p>
          </div>
        </div>


        {/* Table */}
        <div className="rounded-2xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">User</th>
                <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Joined</th>
                <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Courses Owned</th>
                <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {rows.map((user) => (
                <tr key={user.uid} className="hover:bg-zinc-900/40 transition-colors">
                  {/* User */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{user.displayName}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{user.email}</p>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4 text-zinc-400">{user.createdAt}</td>

                  {/* Courses owned */}
                  <td className="px-5 py-4">
                    {courses.length === 0 ? (
                      <span className="text-zinc-600 text-xs">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {courses.map((course) => {
                          const owned = user.purchasedCourseIds.includes(course.id);
                          return (
                            <span
                              key={course.id}
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                owned
                                  ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                  : "bg-zinc-800 text-zinc-600 border border-zinc-700"
                              }`}
                            >
                              {course.title.split(":")[0]}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <GrantRevokeButton
                      uid={user.uid}
                      courses={courses}
                      purchasedCourseIds={user.purchasedCourseIds}
                    />
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-zinc-600">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
