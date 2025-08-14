"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Filter, MoreHorizontal, Star, Calendar, DollarSign } from "lucide-react"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "talent",
      status: "active",
      joinedAt: "2024-01-15",
      rating: 4.9,
      projects: 23,
      earnings: 45000,
      location: "Nashville, TN",
      skills: ["Vocals", "Songwriting"],
    },
    {
      id: 2,
      name: "Nashville Records",
      email: "contact@nashvillerecords.com",
      type: "producer",
      status: "active",
      joinedAt: "2024-01-10",
      rating: 4.8,
      projects: 18,
      spent: 78000,
      location: "Nashville, TN",
      industry: "Music Production",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      type: "talent",
      status: "active",
      joinedAt: "2024-01-12",
      rating: 4.7,
      projects: 19,
      earnings: 38000,
      location: "Los Angeles, CA",
      skills: ["Dance", "Choreography"],
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      type: "talent",
      status: "suspended",
      joinedAt: "2024-01-08",
      rating: 4.2,
      projects: 8,
      earnings: 12000,
      location: "New York, NY",
      skills: ["Voice Acting", "Theater"],
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userTypeFilter === "all" || user.type === userTypeFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage talent and producer accounts</p>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{filteredUsers.length} users</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="User type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="talent">Talent</SelectItem>
              <SelectItem value="producer">Producer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{user.type}</Badge>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Joined</p>
                      <p className="text-sm">{user.joinedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Rating</p>
                      <p className="text-sm">{user.rating}/5.0</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <div>
                      <p className="text-sm font-medium">{user.type === "talent" ? "Earnings" : "Spent"}</p>
                      <p className="text-sm">${(user.earnings || user.spent)?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div>
                      <p className="text-sm font-medium">Projects</p>
                      <p className="text-sm">{user.projects}</p>
                    </div>
                  </div>
                </div>

                {user.skills && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                    <div className="flex gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.industry && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Industry: {user.industry}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    View Projects
                  </Button>
                  {user.status === "active" ? (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      Suspend
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700 bg-transparent">
                      Activate
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
