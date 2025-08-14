"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Calendar,
  Activity,
} from "lucide-react"

export default function AdminDashboard() {
  // Mock admin data
  const stats = {
    totalUsers: 1247,
    activeJobs: 89,
    totalRevenue: 245000,
    monthlyGrowth: 12.5,
    pendingDisputes: 3,
    completedProjects: 156,
  }

  const recentActivity = [
    { type: "user_signup", user: "Sarah Johnson", role: "talent", time: "2 hours ago" },
    { type: "job_posted", user: "Nashville Records", project: "Summer Festival", time: "4 hours ago" },
    { type: "payment_completed", amount: 5000, project: "Music Video", time: "6 hours ago" },
    { type: "dispute_resolved", project: "Voice Acting", time: "1 day ago" },
    { type: "audition_scheduled", project: "Broadway Show", time: "1 day ago" },
  ]

  const topPerformers = [
    { name: "Sarah Johnson", type: "talent", rating: 4.9, projects: 23, earnings: 45000 },
    { name: "Nashville Records", type: "producer", rating: 4.8, projects: 18, spent: 78000 },
    { name: "Mike Chen", type: "talent", rating: 4.7, projects: 19, earnings: 38000 },
    { name: "Creative Vision", type: "producer", rating: 4.6, projects: 15, spent: 62000 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform overview and management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Briefcase className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Disputes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingDisputes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {activity.type === "user_signup" && <Users className="w-4 h-4 text-blue-600 mr-3" />}
                      {activity.type === "job_posted" && <Briefcase className="w-4 h-4 text-green-600 mr-3" />}
                      {activity.type === "payment_completed" && <DollarSign className="w-4 h-4 text-purple-600 mr-3" />}
                      {activity.type === "dispute_resolved" && <CheckCircle className="w-4 h-4 text-green-600 mr-3" />}
                      {activity.type === "audition_scheduled" && <Calendar className="w-4 h-4 text-blue-600 mr-3" />}
                      <div>
                        <p className="font-medium text-sm">
                          {activity.type === "user_signup" && `${activity.user} joined as ${activity.role}`}
                          {activity.type === "job_posted" && `${activity.user} posted ${activity.project}`}
                          {activity.type === "payment_completed" &&
                            `$${activity.amount?.toLocaleString()} paid for ${activity.project}`}
                          {activity.type === "dispute_resolved" && `Dispute resolved for ${activity.project}`}
                          {activity.type === "audition_scheduled" && `Audition scheduled for ${activity.project}`}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 font-semibold text-sm">
                          {performer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{performer.name}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {performer.type}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            <span className="text-xs">{performer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(performer.earnings || performer.spent)?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{performer.projects} projects</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Talent</span>
                    <span>847 users</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Producers</span>
                    <span>400 users</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Music</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Acting</span>
                    <span>30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dance</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed</span>
                    <span>$156k</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>In Escrow</span>
                    <span>$67k</span>
                  </div>
                  <Progress value={27} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pending</span>
                    <span>$22k</span>
                  </div>
                  <Progress value={9} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="w-6 h-6 mb-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Briefcase className="w-6 h-6 mb-2" />
                Review Jobs
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <AlertTriangle className="w-6 h-6 mb-2" />
                Handle Disputes
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <DollarSign className="w-6 h-6 mb-2" />
                Payment Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
