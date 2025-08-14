"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TalentProfileViewPage({ params }: { params: { id: string } }) {
  const { user, logout } = useAuth()

  // Mock data for viewing another talent's profile
  const talentProfile = {
    id: params.id,
    displayName: "Michael Chen",
    tagline: "Award-Winning Voice Actor & Musician",
    bio: "Professional voice actor with over 10 years of experience in animation, video games, and commercial work. Also an accomplished musician specializing in film scoring.",
    location: "New York, NY",
    experience: "10+ years",
    category: "Voice Actor",
    skills: ["Voice Acting", "Music Composition", "Audio Production", "Character Development", "Singing"],
    languages: ["English (Native)", "Mandarin (Native)", "Japanese (Conversational)"],
    hourlyRate: "$200",
    availability: "Available",
    rating: 4.9,
    completedProjects: 47,
    responseTime: "2 hours",
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
            <Button variant="outline" onClick={() => window.history.back()}>
              Back
            </Button>
            {user?.userType === "producer" && (
              <Button className="bg-purple-600 hover:bg-purple-700">Contact Talent</Button>
            )}
            <Button variant="outline" onClick={logout} className="text-gray-700 bg-transparent">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">MC</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{talentProfile.displayName}</h2>
                    <p className="text-lg text-purple-600 mb-2">{talentProfile.tagline}</p>
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
                        {talentProfile.location}
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
                        {talentProfile.experience} experience
                      </span>
                      <Badge
                        variant="secondary"
                        className={
                          talentProfile.availability === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {talentProfile.availability}
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{talentProfile.rating}</span>
                        <span className="text-gray-600 ml-1">rating</span>
                      </div>
                      <div>
                        <span className="font-medium">{talentProfile.completedProjects}</span>
                        <span className="text-gray-600 ml-1">projects completed</span>
                      </div>
                      <div>
                        <span className="font-medium">{talentProfile.responseTime}</span>
                        <span className="text-gray-600 ml-1">avg response time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{talentProfile.bio}</p>
              </CardContent>
            </Card>

            {/* Skills & Languages */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {talentProfile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {talentProfile.languages.map((language) => (
                      <div key={language} className="text-gray-700">
                        {language}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rate & Contact */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">{talentProfile.hourlyRate}/hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ready to Work Together?</CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.userType === "producer" ? (
                    <div className="space-y-2">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Invite to Project
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-600">Sign in as a producer to contact this talent.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio & Media</CardTitle>
                <CardDescription>Professional work samples and demonstrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Character Voice Reel</h4>
                    <p className="text-sm text-gray-600">Animation & Gaming</p>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Commercial Samples</h4>
                    <p className="text-sm text-gray-600">Brand voice work</p>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Original Music</h4>
                    <p className="text-sm text-gray-600">Film scoring samples</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
                <CardDescription>Career highlights and notable projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-blue-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Lead Voice Actor</h4>
                    <p className="text-blue-600 font-medium">AAA Video Game "Mystic Realms"</p>
                    <p className="text-sm text-gray-600 mb-2">2023 - Present</p>
                    <p className="text-gray-700">
                      Voicing the main protagonist in this fantasy RPG, working with motion capture technology and
                      collaborating with international development teams.
                    </p>
                  </div>

                  <div className="border-l-2 border-blue-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Music Composer</h4>
                    <p className="text-blue-600 font-medium">Independent Film "Echoes of Tomorrow"</p>
                    <p className="text-sm text-gray-600 mb-2">2022 - 2023</p>
                    <p className="text-gray-700">
                      Composed and produced the complete musical score for this sci-fi drama, including orchestral
                      arrangements and electronic elements.
                    </p>
                  </div>

                  <div className="border-l-2 border-blue-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Voice Actor</h4>
                    <p className="text-blue-600 font-medium">Animated Series "Space Adventures"</p>
                    <p className="text-sm text-gray-600 mb-2">2020 - 2022</p>
                    <p className="text-gray-700">
                      Voiced multiple characters across 3 seasons, including the main villain and several supporting
                      characters, totaling over 60 episodes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
