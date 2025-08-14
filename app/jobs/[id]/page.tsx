"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { user, logout } = useAuth()
  const [isApplying, setIsApplying] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")

  // Mock job data
  const job = {
    id: params.id,
    title: "Lead Actor - Indie Film",
    company: "Moonlight Productions",
    category: "Actor",
    budget: "$5,000 - $8,000",
    budgetType: "fixed",
    location: "Los Angeles, CA",
    locationType: "on-site",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    startDate: "2024-03-01",
    duration: "3 months",
    experienceLevel: "Intermediate",
    description: `We are seeking a talented lead actor for our independent psychological thriller "Midnight Dreams". This is a character-driven story that requires strong dramatic range and the ability to convey complex emotions.

The role involves portraying a protagonist who experiences a psychological journey through dreams and reality. The actor must be comfortable with intense dramatic scenes and have experience with method acting techniques.

This is a fantastic opportunity to work with an award-winning director and be part of a film that will be submitted to major film festivals.`,
    requirements: `• 3+ years of professional acting experience
• Strong dramatic range and emotional depth
• Experience with method acting techniques
• Comfortable with psychological thriller genre
• Available for 3-month filming period
• Must be based in or willing to relocate to Los Angeles
• Previous film experience preferred`,
    skills: ["Acting", "Method Acting", "Stage Combat", "Improvisation"],
    benefits: [
      "Professional film credit",
      "Festival submission opportunity",
      "Work with award-winning director",
      "Potential for future collaborations",
      "Full catering during filming",
    ],
    applicationCount: 15,
    companyInfo: {
      name: "Moonlight Productions",
      founded: "2018",
      location: "Los Angeles, CA",
      description:
        "Independent film production company specializing in character-driven narratives and psychological thrillers.",
      previousWorks: ["Shadow's Edge (2022)", "The Last Dream (2021)", "Whispers in the Dark (2020)"],
    },
  }

  const handleApply = async () => {
    setIsApplying(true)
    // Simulate application submission
    setTimeout(() => {
      setApplicationSubmitted(true)
      setIsApplying(false)
    }, 2000)
  }

  const matchScore = 85 // Mock AI matching score

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
            <Link href="/jobs">
              <Button variant="outline" className="text-gray-700 bg-transparent">
                Back to Jobs
              </Button>
            </Link>
            {user && (
              <Button variant="outline" onClick={logout} className="text-gray-700 bg-transparent">
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-xl text-purple-600 font-medium mb-3">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
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
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
                      </Badge>
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
                    </div>
                  </div>
                  {user?.userType === "talent" && (
                    <div className="ml-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-800">{matchScore}% Match</span>
                        </div>
                        <p className="text-xs text-green-700 mt-1">Great fit based on your profile</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{job.applicationCount} applications</span>
                  <span>•</span>
                  <span>Deadline {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {job.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements & Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {job.requirements.split("\n").map((requirement, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-2">
                      {requirement}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>What We Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.companyInfo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{job.companyInfo.description}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Founded:</span>
                    <span className="text-gray-600 ml-2">{job.companyInfo.founded}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Location:</span>
                    <span className="text-gray-600 ml-2">{job.companyInfo.location}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-medium text-gray-900 block mb-2">Previous Works:</span>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {job.companyInfo.previousWorks.map((work, index) => (
                      <li key={index}>• {work}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Card */}
            {user?.userType === "talent" && (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Apply for this Role</CardTitle>
                  <CardDescription>
                    {applicationSubmitted
                      ? "Your application has been submitted successfully!"
                      : "Submit your application with a personalized cover letter"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {applicationSubmitted ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        The producer will review your application and get back to you soon.
                      </p>
                      <Link href="/talent/dashboard">
                        <Button variant="outline" className="w-full bg-transparent">
                          View My Applications
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Tell the producer why you're perfect for this role..."
                          rows={6}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleApply}
                        disabled={isApplying || !coverLetter.trim()}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {isApplying ? "Submitting..." : "Submit Application"}
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Your profile and portfolio will be included automatically
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!user && (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Interested in this role?</CardTitle>
                  <CardDescription>Sign up to apply and get matched with similar opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/signup?type=talent">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign Up as Talent</Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" className="w-full bg-transparent">
                        Already have an account?
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{job.category}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience Level</span>
                  <span className="font-medium text-gray-900">{job.experienceLevel}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">{job.duration}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium text-gray-900">{new Date(job.startDate).toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget Type</span>
                  <span className="font-medium text-gray-900 capitalize">{job.budgetType}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Opportunities</CardTitle>
                <CardDescription>Other jobs you might be interested in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Supporting Actor - TV Series</h4>
                  <p className="text-sm text-gray-600 mb-2">Netflix Productions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">$3,000 - $5,000</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      92% Match
                    </Badge>
                  </div>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Theater Actor - Broadway</h4>
                  <p className="text-sm text-gray-600 mb-2">Broadway Productions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">$4,000/month</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      88% Match
                    </Badge>
                  </div>
                </div>
                <Link href="/jobs">
                  <Button variant="outline" className="w-full bg-transparent">
                    View More Jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
