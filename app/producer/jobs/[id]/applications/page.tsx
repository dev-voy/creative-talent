"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobApplicationsPage({ params }: { params: { id: string } }) {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Mock applications data
  const applications = [
    {
      id: "1",
      talentId: "t1",
      talentName: "Sarah Johnson",
      talentTitle: "Versatile Actor & Voice Artist",
      profileImage: "SJ",
      appliedDate: "2024-01-20",
      status: "pending",
      matchScore: 92,
      experience: "8+ years",
      location: "Los Angeles, CA",
      hourlyRate: "$150",
      coverLetter:
        "I am extremely excited about the opportunity to play the lead role in 'Midnight Dreams'. Having worked extensively in psychological thrillers, I understand the nuanced performance required for this type of character-driven narrative...",
      skills: ["Acting", "Method Acting", "Stage Combat", "Improvisation"],
      previousWork: ["Shadow's Edge (2022)", "The Last Dream (2021)"],
      rating: 4.9,
      completedProjects: 23,
    },
    {
      id: "2",
      talentId: "t2",
      talentName: "Michael Chen",
      talentTitle: "Award-Winning Voice Actor & Musician",
      profileImage: "MC",
      appliedDate: "2024-01-19",
      status: "shortlisted",
      matchScore: 88,
      experience: "10+ years",
      location: "New York, NY",
      hourlyRate: "$200",
      coverLetter:
        "While my primary expertise is in voice acting, I have significant on-camera experience and would love to bring my unique perspective to this psychological thriller...",
      skills: ["Acting", "Voice Acting", "Music Composition", "Character Development"],
      previousWork: ["Mystic Realms (2023)", "Space Adventures (2020-2022)"],
      rating: 4.8,
      completedProjects: 47,
    },
    {
      id: "3",
      talentId: "t3",
      talentName: "Emma Rodriguez",
      talentTitle: "Method Actor & Theater Performer",
      profileImage: "ER",
      appliedDate: "2024-01-18",
      status: "rejected",
      matchScore: 76,
      experience: "5+ years",
      location: "Chicago, IL",
      hourlyRate: "$120",
      coverLetter:
        "I have been following Moonlight Productions' work for years and would be honored to contribute to your next project...",
      skills: ["Method Acting", "Theater Performance", "Character Development"],
      previousWork: ["Romeo & Juliet (2023)", "Hamlet (2022)"],
      rating: 4.7,
      completedProjects: 15,
    },
    {
      id: "4",
      talentId: "t4",
      talentName: "David Kim",
      talentTitle: "Film Actor & Stunt Performer",
      profileImage: "DK",
      appliedDate: "2024-01-17",
      status: "pending",
      matchScore: 84,
      experience: "6+ years",
      location: "Los Angeles, CA",
      hourlyRate: "$180",
      coverLetter:
        "My background in both dramatic acting and stunt work makes me uniquely qualified for this challenging role...",
      skills: ["Acting", "Stage Combat", "Stunt Work", "Physical Theater"],
      previousWork: ["Action Hero (2023)", "Midnight Runner (2022)"],
      rating: 4.6,
      completedProjects: 31,
    },
  ]

  const jobTitle = "Lead Actor - Indie Film"

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.talentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.talentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      case "oldest":
        return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
      case "match":
        return b.matchScore - a.matchScore
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shortlisted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "hired":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-gray-600"
  }

  const statusCounts = {
    all: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    shortlisted: applications.filter((app) => app.status === "shortlisted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    hired: applications.filter((app) => app.status === "hired").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <span className="font-bold text-xl text-gray-900">CreativeTalent</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href={`/producer/jobs/${params.id}`}>
              <Button variant="outline" className="text-gray-700 bg-transparent">
                View Job
              </Button>
            </Link>
            <Link href="/producer/jobs">
              <Button variant="outline" className="text-gray-700 bg-transparent">
                All Jobs
              </Button>
            </Link>
            <Button variant="outline" onClick={logout} className="text-gray-700 bg-transparent">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications for {jobTitle}</h1>
          <p className="text-gray-600">Review and manage talent applications for this position</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                <SelectItem value="shortlisted">Shortlisted ({statusCounts.shortlisted})</SelectItem>
                <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
                <SelectItem value="hired">Hired ({statusCounts.hired})</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Applications */}
        <div className="space-y-6">
          {sortedApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  {/* Profile Image */}
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-purple-600">{application.profileImage}</span>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{application.talentName}</h3>
                        <p className="text-purple-600 font-medium mb-2">{application.talentTitle}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {application.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {application.experience} experience
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                            </svg>
                            {application.hourlyRate}/hour
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getMatchScoreColor(application.matchScore)}`}>
                            {application.matchScore}% Match
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {application.rating} ({application.completedProjects} projects)
                          </div>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(application.status)}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {application.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Cover Letter Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Cover Letter</h4>
                      <p className="text-gray-700 text-sm line-clamp-3">{application.coverLetter}</p>
                    </div>

                    {/* Previous Work */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Recent Work</h4>
                      <div className="flex flex-wrap gap-2">
                        {application.previousWork.map((work, index) => (
                          <span key={index} className="text-sm text-gray-600 bg-white px-2 py-1 rounded border">
                            {work}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/talent/profile/${application.talentId}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Profile
                          </Button>
                        </Link>
                        {application.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Shortlist
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {application.status === "shortlisted" && (
                          <>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Hire
                            </Button>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              Message
                            </Button>
                          </>
                        )}
                        {application.status === "rejected" && (
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Reconsider
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedApplications.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No one has applied to this job yet"}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
