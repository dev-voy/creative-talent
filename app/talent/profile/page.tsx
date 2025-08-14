"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TalentProfilePage() {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "Sarah Johnson",
    tagline: "Versatile Actor & Voice Artist",
    bio: "Passionate performer with 8+ years of experience in theater, film, and voice acting. Specializing in character development and emotional storytelling.",
    location: "Los Angeles, CA",
    experience: "8+ years",
    category: "Actor",
    skills: [
      "Acting",
      "Voice Acting",
      "Improvisation",
      "Stage Combat",
      "Singing",
    ],
    languages: [
      "English (Native)",
      "Spanish (Fluent)",
      "French (Conversational)",
    ],
    hourlyRate: "$150",
    availability: "Available",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a database
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              CreativeTalent
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="text-gray-700 bg-transparent"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your professional profile and showcase your talents
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">
                      SJ
                    </span>
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input
                            id="displayName"
                            value={profileData.displayName}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                displayName: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="tagline">Professional Tagline</Label>
                          <Input
                            id="tagline"
                            value={profileData.tagline}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                tagline: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {profileData.displayName}
                        </h2>
                        <p className="text-lg text-purple-600 mb-2">
                          {profileData.tagline}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
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
                            {profileData.location}
                          </span>
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {profileData.experience} experience
                          </span>
                          <Badge
                            variant="secondary"
                            className={
                              profileData.availability === "Available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {profileData.availability}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Tell us about yourself, your experience, and what makes you unique..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {profileData.bio}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Skills & Languages */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {profileData.languages.map((language) => (
                      <div
                        key={language}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{language}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeLanguage(language)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="e.g., Spanish (Fluent)"
                        onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                      />
                      <Button onClick={addLanguage} size="sm">
                        Add
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Rate & Availability */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Input
                      value={profileData.hourlyRate}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          hourlyRate: e.target.value,
                        }))
                      }
                      placeholder="$150"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-green-600">
                      {profileData.hourlyRate}/hour
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Select
                      value={profileData.availability}
                      onValueChange={(value) =>
                        setProfileData((prev) => ({
                          ...prev,
                          availability: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                        <SelectItem value="Not Available">
                          Not Available
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant="secondary"
                      className={
                        profileData.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {profileData.availability}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio & Media</CardTitle>
                <CardDescription>
                  Showcase your best work with photos, videos, and audio samples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample portfolio items */}
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">
                      Demo Reel 2024
                    </h4>
                    <p className="text-sm text-gray-600">Acting showcase</p>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Voice Samples</h4>
                    <p className="text-sm text-gray-600">Character voices</p>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900">Headshots</h4>
                    <p className="text-sm text-gray-600">Professional photos</p>
                  </div>

                  {/* Upload new media button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 cursor-pointer">
                    <div className="w-full h-32 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-8 h-8 text-gray-400 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <p className="text-sm text-gray-600">Upload Media</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your professional experience and notable projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-purple-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Lead Actor</h4>
                    <p className="text-purple-600 font-medium">
                      Independent Film &#34;Midnight Dreams&#34;
                    </p>
                    <p className="text-sm text-gray-600 mb-2">2023 - 2024</p>
                    <p className="text-gray-700">
                      Portrayed the main character in this psychological
                      thriller, working closely with the director to develop a
                      complex character arc spanning the entire film.
                    </p>
                  </div>

                  <div className="border-l-2 border-purple-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Voice Actor</h4>
                    <p className="text-purple-600 font-medium">
                      Animated Series &#34;Adventure Kids&#34;
                    </p>
                    <p className="text-sm text-gray-600 mb-2">2022 - 2023</p>
                    <p className="text-gray-700">
                      Voiced multiple characters in this children&#39;s animated
                      series, including the main protagonist and several
                      supporting characters across 24 episodes.
                    </p>
                  </div>

                  <div className="border-l-2 border-purple-200 pl-4">
                    <h4 className="font-semibold text-gray-900">
                      Theater Performer
                    </h4>
                    <p className="text-purple-600 font-medium">
                      Shakespeare in the Park
                    </p>
                    <p className="text-sm text-gray-600 mb-2">2021 - 2022</p>
                    <p className="text-gray-700">
                      Performed in multiple productions including Hamlet and
                      Romeo & Juliet, developing strong stage presence and
                      classical acting techniques.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Add Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your profile visibility and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Profile Visibility
                    </h4>
                    <p className="text-sm text-gray-600">
                      Make your profile visible to producers
                    </p>
                  </div>
                  <Button variant="outline">Public</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive notifications about new opportunities
                    </p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Profile URL</h4>
                    <p className="text-sm text-gray-600">
                      Your custom profile link
                    </p>
                  </div>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    creativetalent.com/talent/sarah-johnson
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
