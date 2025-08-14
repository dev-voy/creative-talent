"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Video, FileText, Plus, Search, Filter } from "lucide-react"

export default function AuditionsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock audition data
  const auditions = [
    {
      id: 1,
      title: "Lead Vocalist Audition",
      project: "Summer Music Festival",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Studio A, Nashville",
      applicants: 24,
      status: "upcoming",
      type: "in-person",
    },
    {
      id: 2,
      title: "Background Dancer Audition",
      project: "Music Video Production",
      date: "2024-01-18",
      time: "2:00 PM",
      location: "Virtual",
      applicants: 18,
      status: "completed",
      type: "virtual",
    },
    {
      id: 3,
      title: "Voice Actor Audition",
      project: "Animated Series",
      date: "2024-01-25",
      time: "11:00 AM",
      location: "Recording Studio B",
      applicants: 31,
      status: "upcoming",
      type: "in-person",
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
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audition Management</h1>
            <p className="text-gray-600 mt-2">Schedule and manage auditions for your projects</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Audition
          </Button>
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
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create Audition Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Schedule New Audition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Audition Title</label>
                  <Input placeholder="e.g., Lead Vocalist Audition" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project</label>
                  <Input placeholder="e.g., Summer Music Festival" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audition type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="submission">Submission Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input placeholder="Studio address or virtual link" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Requirements</label>
                <Textarea placeholder="Describe what talent should prepare for the audition..." />
              </div>
              <div className="flex gap-2">
                <Button className="bg-purple-600 hover:bg-purple-700">Schedule Audition</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Auditions List */}
        <div className="grid gap-4">
          {filteredAuditions.map((audition) => (
            <Card key={audition.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{audition.title}</h3>
                    <p className="text-gray-600">{audition.project}</p>
                  </div>
                  <Badge className={getStatusColor(audition.status)}>{audition.status}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {audition.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {audition.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Video className="w-4 h-4 mr-2" />
                    {audition.type}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {audition.applicants} applicants
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Applicants
                  </Button>
                  {audition.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Review Submissions
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
