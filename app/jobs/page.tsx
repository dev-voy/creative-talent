"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobsPage() {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Mock job data
  const jobs = [
    {
      id: "1",
      title: "Lead Actor - Indie Film",
      company: "Moonlight Productions",
      category: "Actor",
      budget: "$5,000 - $8,000",
      location: "Los Angeles, CA",
      locationType: "on-site",
      postedDate: "2024-01-15",
      deadline: "2024-02-15",
      description:
        "Seeking a talented lead actor for an independent psychological thriller. Must have strong dramatic range and experience with method acting techniques.",
      skills: ["Acting", "Method Acting", "Stage Combat"],
      experienceLevel: "Intermediate",
    },
    {
      id: "2",
      title: "Voice Actor - Animation Series",
      company: "Creative Studios",
      category: "Voice Actor",
      budget: "$200/hour",
      location: "Remote",
      locationType: "remote",
      postedDate: "2024-01-10",
      deadline: "2024-02-10",
      description:
        "Looking for versatile voice actors for our upcoming animated series. Multiple character voices needed with ability to work remotely.",
      skills: ["Voice Acting", "Character Development", "Audio Production"],
      experienceLevel: "Experienced",
    },
    {
      id: "3",
      title: "Musician - Live Performance",
      company: "Blue Note Venue",
      category: "Musician",
      budget: "$300/night",
      location: "Chicago, IL",
      locationType: "on-site",
      postedDate: "2024-01-20",
      deadline: "2024-03-01",
      description:
        "Seeking talented musicians for regular live performances at our jazz venue. Must be comfortable with improvisation and audience interaction.",
      skills: ["Jazz", "Improvisation", "Live Performance"],
      experienceLevel: "Experienced",
    },
    {
      id: "4",
      title: "Dancer - Music Video",
      company: "Rhythm Records",
      category: "Dancer",
      budget: "$500/day",
      location: "New York, NY",
      locationType: "on-site",
      postedDate: "2024-01-18",
      deadline: "2024-02-20",
      description:
        "Professional dancers needed for high-energy music video production. Contemporary and hip-hop styles preferred.",
      skills: ["Contemporary Dance", "Hip-Hop", "Choreography"],
      experienceLevel: "Intermediate",
    },
    {
      id: "5",
      title: "Writer - Short Film Script",
      company: "Indie Film Collective",
      category: "Writer",
      budget: "$2,000",
      location: "Remote",
      locationType: "remote",
      postedDate: "2024-01-12",
      deadline: "2024-02-28",
      description:
        "Looking for a creative writer to develop a short film script based on our concept. Experience with screenwriting format required.",
      skills: ["Screenwriting", "Creative Writing", "Story Development"],
      experienceLevel: "Intermediate",
    },
  ]

  const categories = ["Actor", "Voice Actor", "Musician", "Dancer", "Writer", "Director", "Producer"]
  const locations = ["Los Angeles, CA", "New York, NY", "Chicago, IL", "Remote"]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter
    const matchesLocation = locationFilter === "all" || job.location === locationFilter
    return matchesSearch && matchesCategory && matchesLocation
  })

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case "remote":
        return "bg-green-100 text-green-800"
      case "on-site":
        return "bg-blue-100 text-blue-800"
      case "hybrid":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            {user ? (
              <>
                <Link href={user.userType === "talent" ? "/talent/dashboard" : "/producer/dashboard"}>
                  <Button variant="outline" className="text-gray-700 bg-transparent">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={logout} className="text-gray-700 bg-transparent">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Creative Opportunities</h1>
          <p className="text-gray-600">Discover jobs that match your talents and skills</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <Input
              placeholder="Search jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <Badge variant="secondary" className={getLocationTypeColor(job.locationType)}>
                        {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-purple-600 font-medium mb-3">{job.company}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {job.category}
                      </span>
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
                        {job.location}
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
                        {job.budget}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {job.experienceLevel}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex items-center space-x-2 mb-4">
                      {job.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                          +{job.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>Deadline {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    {user?.userType === "talent" ? (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-full">
                        Apply Now
                      </Button>
                    ) : (
                      <Link href="/signup?type=talent">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-full">
                          Sign Up to Apply
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new opportunities
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setLocationFilter("all")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
