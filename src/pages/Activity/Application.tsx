import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/lib/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type JobApplication = {
  company: string;
  role: string;
  appliedOn: string;
  rolePostId: string;
  status: "Pending" | "Interviewed" | "Rejected" | "Offered";
};

const statusColors = {
  Pending: "bg-yellow-500",
  Interviewed: "bg-blue-500",
  Rejected: "bg-red-500",
  Offered: "bg-green-500",
};

export default function JobApplicationsTable() {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const userId = useSelector((state: RootState) => state.user.user?._id);
  console.log(jobApplications)

  // Fetch application details based on application IDs
  const fetchApplicationDetails = async (applicationId:any) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/application/${applicationId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch details for application ${applicationId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch user data (including applied IDs)
        const userResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`
        );

        const appliedIds = userResponse.data.applied || [];
        
        // Fetch details for each application ID
        const detailedApplications = await Promise.all(
          appliedIds.map(async (id:any) => {
            const details = await fetchApplicationDetails(id);
            return details || {};  // Handle missing data gracefully
          })
        );

        setJobApplications(detailedApplications);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    if (userId) {
      fetchApplications();
    }
  }, [userId]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">My Job Applications</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of your recent job applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">by</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobApplications.map((app, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{app.rolePostId.slice(24) || "N/A"}</TableCell>
                <TableCell>{app.role || "N/A"}</TableCell>
                <TableCell>{new Date(app.appliedOn).toLocaleDateString() || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${statusColors[app.status] || "bg-gray-500"} text-white`}>
                    {app.status || "Unknown"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
