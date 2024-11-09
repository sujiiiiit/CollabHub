"use client";

import { useState } from "react";
import MultiAvatar from "@/components/ui/multiAvatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MoreHorizontal, Plus } from "lucide-react";

// Mock data for job roles
const initialJobRoles = [
  {
    id: 1,
    role: "Web Developer",
    datePosted: "2023-11-01",
    deadline: "2023-12-01",
    applicants: 5,
  },
  {
    id: 2,
    role: "Mobile Developer",
    datePosted: "2023-11-05",
    deadline: "2023-12-15",
    applicants: 3,
  },
  {
    id: 3,
    role: "UI/UX Designer",
    datePosted: "2023-11-10",
    deadline: "2023-12-10",
    applicants: 7,
  },
];

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export default function Component() {
  const [jobRoles, setJobRoles] = useState(initialJobRoles);

  const deleteRole = (id: number) => {
    setJobRoles(jobRoles.filter((role) => role.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Roles Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Role
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Posted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobRoles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.datePosted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{role.deadline}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <MultiAvatar
                    size={"sm"}
                    numPeople={role.applicants}
                    avatarUrls={avatarUrls}
                    className="my-2"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteRole(role.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
