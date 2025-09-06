"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

const dummyEmployees: Employee[] = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "User" },
];

function SystemSettings() {
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);
  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "list"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Employees List
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "create"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create User
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dummyEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex justify-between p-2 border rounded"
                >
                  <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-gray-500">{emp.email}</div>
                  </div>
                  <div className="text-sm text-gray-700">{emp.role}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Input type="text" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter password" />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select className="w-full border rounded p-2">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button type="submit" className="bg-blue-500 text-white">
                Create User
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SystemSettings;
