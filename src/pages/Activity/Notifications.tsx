"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle, XCircle } from "lucide-react"

type Application = {
  id: string
  username: string
  message: string
  resumeLink: string
  status: "pending" | "accepted" | "rejected"
}

export default function CollaborationRequests() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      username: "johndoe",
      message: "I'm excited to collaborate on this project!",
      resumeLink: "https://example.com/johndoe-resume.pdf",
      status: "pending",
    },
    {
      id: "2",
      username: "janedoe",
      message: "I have experience in similar projects and would love to contribute.",
      resumeLink: "https://example.com/janedoe-resume.pdf",
      status: "pending",
    },
    {
      id: "3",
      username: "bobsmith",
      message: "Looking forward to bringing my skills to the team.",
      resumeLink: "https://example.com/bobsmith-resume.pdf",
      status: "pending",
    },
  ])

  const handleAccept = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: "accepted" } : app
    ))
  }

  const handleReject = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: "rejected" } : app
    ))
  }

  return (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.username}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {application.message}
                  </TableCell>
                  <TableCell>
                    <a
                      href={application.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.status === "accepted"
                          ? "success"
                          : application.status === "rejected"
                          ? "destructive"
                         : application.status === "pending"?"outline":"default"

                      }
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-24"
                        onClick={() => handleAccept(application.id)}
                        disabled={application.status !== "pending"}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-24"
                        onClick={() => handleReject(application.id)}
                        disabled={application.status !== "pending"}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

  )
}