"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Clock, CheckCircle, CreditCard, Download, Search, Filter } from "lucide-react"

export default function TalentEarningsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock earnings data
  const earnings = [
    {
      id: 1,
      project: "Summer Music Festival",
      producer: "Nashville Records",
      amount: 5000,
      status: "completed",
      paidAt: "2024-01-20",
      milestones: [
        { name: "Initial Recording", amount: 2000, status: "paid", paidAt: "2024-01-20" },
        { name: "Final Performance", amount: 3000, status: "paid", paidAt: "2024-01-20" },
      ],
    },
    {
      id: 2,
      project: "Music Video Production",
      producer: "Creative Vision Studios",
      amount: 3500,
      status: "in-escrow",
      createdAt: "2024-01-15",
      milestones: [
        { name: "Choreography", amount: 1500, status: "paid", paidAt: "2024-01-15" },
        { name: "Video Shoot", amount: 2000, status: "escrowed", dueDate: "2024-02-01" },
      ],
    },
    {
      id: 3,
      project: "Animated Series",
      producer: "Animation Studios Inc",
      amount: 4200,
      status: "pending",
      createdAt: "2024-01-18",
      milestones: [
        { name: "Voice Recording Session 1", amount: 2100, status: "pending", dueDate: "2024-02-01" },
        { name: "Voice Recording Session 2", amount: 2100, status: "pending", dueDate: "2024-02-20" },
      ],
    },
  ]

  const filteredEarnings = earnings.filter((earning) => {
    const matchesSearch =
      earning.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.producer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || earning.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-escrow":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0)
  const completedEarnings = earnings
    .filter((e) => e.status === "completed")
    .reduce((sum, earning) => sum + earning.amount, 0)
  const pendingEarnings = earnings
    .filter((e) => e.status === "pending" || e.status === "in-escrow")
    .reduce((sum, earning) => sum + earning.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Earnings</h1>
            <p className="text-gray-600 mt-2">Track your payments and contract earnings</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Paid Out</p>
                  <p className="text-2xl font-bold text-gray-900">${completedEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">${pendingEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">$8,500</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search earnings..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-escrow">In Escrow</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Earnings List */}
        <div className="grid gap-4">
          {filteredEarnings.map((earning) => (
            <Card key={earning.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{earning.project}</h3>
                    <p className="text-gray-600">{earning.producer}</p>
                    <p className="text-sm text-gray-500">
                      {earning.status === "completed" ? `Paid ${earning.paidAt}` : `Created ${earning.createdAt}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${earning.amount.toLocaleString()}</p>
                    <Badge className={getStatusColor(earning.status)}>{earning.status}</Badge>
                  </div>
                </div>

                {/* Payment Milestones */}
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-gray-900">Payment Breakdown</h4>
                  {earning.milestones.map((milestone, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{milestone.name}</p>
                        <p className="text-sm text-gray-500">
                          {milestone.status === "paid"
                            ? `Paid on ${milestone.paidAt}`
                            : milestone.status === "escrowed"
                              ? "In escrow"
                              : `Due ${milestone.dueDate}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${milestone.amount.toLocaleString()}</p>
                        <Badge
                          className={
                            milestone.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : milestone.status === "escrowed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    View Contract
                  </Button>
                  {earning.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Invoice
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
