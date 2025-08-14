"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Video, Upload, Search, Filter, Play } from "lucide-react"

export default function TalentAuditionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showSubmissionForm, setShowSubmissionForm] = useState<number | null>(null)

  // Mock audition data
  const auditions = [
    {
      id: 1,
      title: "Lead Vocalist Audition",
      project: "Summer Music Festival",
      producer: "Nashville Records",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Studio A, Nashville",
      type: "in-person",
      status: "applied",
      deadline: "2024-01-18",
      requirements: "Prepare 2 songs of your choice, vocal range test",
    },
    {
      id: 2,
      title: "Background Dancer Audition",
      project: "Music Video Production",
      producer: "Creative Vision Studios",
      date: "2024-01-18",
      time: "2:00 PM",
      location: "Virtual",
      type: "virtual",
      status: "available",
      deadline: "2024-01-16",
      requirements: "Submit 2-minute dance video, contemporary style preferred",
    },
    {
      id: 3,
      title: "Voice Actor Audition",
      project: "Animated Series",
      producer: "Animation Studios Inc",
      date: "2024-01-25",
      time: "11:00 AM",
      location: "Recording Studio B",
      type: "submission",
      status: "submitted",
      deadline: "2024-01-22",
      requirements: "Record provided script, character voice samples",
    },
  ]

  const filteredAuditions = auditions.filter((audition) => {
    const matchesSearch =
      audition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audition.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || audition.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "applied":
        return "bg-blue-100 text-blue-800"
      case "submitted":
        return "bg-purple-100 text-purple-800"
      case "selected":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Auditions</h1>
          <p className="text-gray-600 mt-2">Track your audition applications and submissions</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search auditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Auditions List */}
        <div className="grid gap-4">
          {filteredAuditions.map((audition) => (
            <Card key={audition.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{audition.title}</h3>
                    <p className="text-gray-600">{audition.project}</p>
                    <p className="text-sm text-gray-500">{audition.producer}</p>
                  </div>
                  <Badge className={getStatusColor(audition.status)}>{audition.status}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {audition.date} at {audition.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {audition.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Video className="w-4 h-4 mr-2" />
                    {audition.type}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Requirements:</strong> {audition.requirements}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Deadline:</strong> {audition.deadline}
                  </p>
                </div>

                <div className="flex gap-2">
                  {audition.status === "available" && (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowSubmissionForm(audition.id)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  )}
                  {audition.status === "submitted" && (
                    <Button variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      View Submission
                    </Button>
                  )}
                  <Button variant="outline">View Details</Button>
                </div>

                {/* Submission Form */}
                {showSubmissionForm === audition.id && (
                  <div className="mt-4 p-4 border rounded-lg bg-white">
                    <h4 className="font-semibold mb-3">Submit Your Audition</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Cover Message</label>
                        <Textarea placeholder="Tell the producer why you're perfect for this role..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload Materials</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-600">Drop files here or click to upload</p>
                          <p className="text-sm text-gray-500">Video, audio, or document files</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-purple-600 hover:bg-purple-700">Submit Application</Button>
                        <Button variant="outline" onClick={() => setShowSubmissionForm(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
