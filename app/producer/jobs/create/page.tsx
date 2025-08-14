"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CreateJobPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    location: "",
    locationType: "remote",
    budget: "",
    budgetType: "fixed",
    duration: "",
    experienceLevel: "",
    skills: [] as string[],
    applicationDeadline: "",
    startDate: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const categories = [
    "Actor",
    "Voice Actor",
    "Musician",
    "Dancer",
    "Writer",
    "Director",
    "Producer",
    "Cinematographer",
    "Editor",
    "Sound Engineer",
    "Makeup Artist",
    "Costume Designer",
  ];

  const experienceLevels = [
    "Entry Level",
    "Intermediate",
    "Experienced",
    "Expert",
  ];

  const addSkill = () => {
    if (newSkill.trim() && !jobData.skills.includes(newSkill.trim())) {
      setJobData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate job creation
    setTimeout(() => {
      router.push("/producer/jobs");
      setIsSubmitting(false);
    }, 1000);
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
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600">
            Create a detailed job posting to attract the right talent
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about the role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lead Actor for Indie Film"
                    value={jobData.title}
                    onChange={(e) =>
                      setJobData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={jobData.category}
                    onValueChange={(value) =>
                      setJobData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, project, and what you're looking for..."
                  rows={6}
                  value={jobData.description}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">
                  Requirements & Qualifications
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="List specific requirements, qualifications, or experience needed..."
                  rows={4}
                  value={jobData.requirements}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requirements: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Work Type */}
          <Card>
            <CardHeader>
              <CardTitle>Location & Work Details</CardTitle>
              <CardDescription>
                Where and how the work will be performed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Los Angeles, CA or Remote"
                    value={jobData.location}
                    onChange={(e) =>
                      setJobData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationType">Work Type</Label>
                  <Select
                    value={jobData.locationType}
                    onValueChange={(value) =>
                      setJobData((prev) => ({ ...prev, locationType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Project Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 months, 2 weeks, Ongoing"
                    value={jobData.duration}
                    onChange={(e) =>
                      setJobData((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={jobData.experienceLevel}
                    onValueChange={(value) =>
                      setJobData((prev) => ({
                        ...prev,
                        experienceLevel: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Compensation */}
          <Card>
            <CardHeader>
              <CardTitle>Budget & Compensation</CardTitle>
              <CardDescription>Payment details for this role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budgetType">Budget Type</Label>
                  <Select
                    value={jobData.budgetType}
                    onValueChange={(value) =>
                      setJobData((prev) => ({ ...prev, budgetType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                      <SelectItem value="daily">Daily Rate</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">
                    Budget{" "}
                    {jobData.budgetType !== "negotiable" &&
                      `(${jobData.budgetType})`}
                  </Label>
                  <Input
                    id="budget"
                    placeholder={
                      jobData.budgetType === "negotiable"
                        ? "To be discussed"
                        : jobData.budgetType === "fixed"
                        ? "$5,000"
                        : "$150/hour"
                    }
                    value={jobData.budget}
                    onChange={(e) =>
                      setJobData((prev) => ({
                        ...prev,
                        budget: e.target.value,
                      }))
                    }
                    disabled={jobData.budgetType === "negotiable"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>
                Specific skills or specialties needed for this role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {jobData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a required skill"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSkill())
                  }
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  Add Skill
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>
                Important dates for this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">
                    Application Deadline
                  </Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={jobData.applicationDeadline}
                    onChange={(e) =>
                      setJobData((prev) => ({
                        ...prev,
                        applicationDeadline: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Expected Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={jobData.startDate}
                    onChange={(e) =>
                      setJobData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 px-8"
            >
              {isSubmitting ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
