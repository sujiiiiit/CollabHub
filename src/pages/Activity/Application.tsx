import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  
  type JobApplication = {
    company: string
    role: string
    date: string
    status: "Pending" | "Interviewed" | "Rejected" | "Offered"
  }
  
  const jobApplications: JobApplication[] = [
    { company: "Tech Corp", role: "Frontend Developer", date: "2023-11-01", status: "Pending" },
    { company: "Innovate Inc", role: "Full Stack Engineer", date: "2023-10-25", status: "Interviewed" },
    { company: "Digital Solutions", role: "React Developer", date: "2023-10-15", status: "Rejected" },
    { company: "Future Systems", role: "Software Engineer", date: "2023-11-05", status: "Offered" },
  ]
  
  const statusColors = {
    Pending: "bg-yellow-500",
    Interviewed: "bg-blue-500",
    Rejected: "bg-red-500",
    Offered: "bg-green-500",
  }
  
  export default function JobApplicationsTable() {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">My Job Applications</h1>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableCaption>A list of your recent job applications</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobApplications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${statusColors[app.status]} text-white`}>
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }