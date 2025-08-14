"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Upload,
  Users,
  Star,
  Play,
  Download,
} from "lucide-react";

export default function AuditionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Mock audition data
  const audition = {
    id: id,
    title: "Lead Vocalist Audition",
    project: "Summer Music Festival",
    producer: "Nashville Records",
    date: "2024-01-20",
    time: "10:00 AM - 4:00 PM",
    location: "Studio A, Nashville, TN",
    type: "in-person",
    status: "open",
    deadline: "2024-01-18",
    applicants: 24,
    description:
      "We are seeking a dynamic lead vocalist for our upcoming Summer Music Festival tour. The selected artist will perform across 15 cities and work with our established band.",
    requirements: [
      "Vocal range: Alto to Soprano",
      "Experience with live performances",
      "Ability to travel for tour dates",
      "Prepare 2 songs of your choice",
      "Vocal range demonstration required",
    ],
    compensation: "$5,000 - $8,000 per show",
    submissions: [
      {
        id: 1,
        talent: "Sarah Johnson",
        submittedAt: "2024-01-15",
        materials: ["vocal-demo.mp3", "performance-video.mp4"],
        rating: 4.5,
        status: "reviewed",
      },
      {
        id: 2,
        talent: "Mike Chen",
        submittedAt: "2024-01-14",
        materials: ["audition-tape.mp4"],
        rating: 4.2,
        status: "pending",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {audition.title}
              </h1>
              <p className="text-xl text-gray-600">{audition.project}</p>
              <p className="text-gray-500">{audition.producer}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {audition.status}
            </Badge>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm">{audition.date}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-sm">{audition.time}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm">{audition.location}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Applicants</p>
                <p className="text-sm">{audition.applicants} applied</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Audition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {audition.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {audition.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Submissions (for producers) */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Submissions ({audition.submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audition.submissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{submission.talent}</h4>
                          <p className="text-sm text-gray-500">
                            Submitted {submission.submittedAt}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">
                            {submission.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {submission.materials.map((material, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            {material}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Badge
                          className={
                            submission.status === "reviewed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {submission.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle>Apply for This Audition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {audition.compensation}
                  </p>
                  <p className="text-sm text-gray-500">Compensation</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">Application Deadline</p>
                  <p className="text-sm text-gray-600">{audition.deadline}</p>
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowSubmissionForm(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </CardContent>
            </Card>

            {/* Producer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Producer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-lg">
                      NR
                    </span>
                  </div>
                  <h3 className="font-semibold">{audition.producer}</h3>
                  <p className="text-sm text-gray-500">
                    Music Production Company
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm">4.8 (127 reviews)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submission Form Modal */}
        {showSubmissionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Submit Your Audition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Message
                  </label>
                  <Textarea placeholder="Tell the producer why you're perfect for this role..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Materials
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Drop files here or click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      Video, audio, or document files (Max 100MB each)
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Submit Application
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmissionForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
