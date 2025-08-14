"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, DollarSign, Clock, CheckCircle, AlertCircle, Plus, Search, Filter } from "lucide-react"

export default function ProducerPaymentsPage() {
  const [showCreateContract, setShowCreateContract] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock payment data
  const payments = [
    {
      id: 1,
      talent: "Sarah Johnson",
      project: "Summer Music Festival",
      amount: 5000,
      status: "escrowed",
      createdAt: "2024-01-15",
      dueDate: "2024-02-15",
      milestones: [
        { name: "Initial Recording", amount: 2000, status: "completed", paidAt: "2024-01-20" },
        { name: "Final Performance", amount: 3000, status: "pending", dueDate: "2024-02-15" },
      ],
    },
    {
      id: 2,
      talent: "Mike Chen",
      project: "Music Video Production",
      amount: 3500,
      status: "completed",
      createdAt: "2024-01-10",
      dueDate: "2024-01-25",
      milestones: [
        { name: "Choreography", amount: 1500, status: "completed", paidAt: "2024-01-15" },
        { name: "Video Shoot", amount: 2000, status: "completed", paidAt: "2024-01-25" },
      ],
    },
    {
      id: 3,
      talent: "Emma Davis",
      project: "Animated Series",
      amount: 4200,
      status: "pending",
      createdAt: "2024-01-18",
      dueDate: "2024-02-20",
      milestones: [
        { name: "Voice Recording Session 1", amount: 2100, status: "pending", dueDate: "2024-02-01" },
        { name: "Voice Recording Session 2", amount: 2100, status: "pending", dueDate: "2024-02-20" },
      ],
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.talent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "escrowed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "escrowed":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <DollarSign className="w-4 h-4" />
      case "disputed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-2">Manage contracts and payments with talent</p>
          </div>
          <Button onClick={() => setShowCreateContract(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Contract
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-gray-900">$24,500</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Escrow</p>
                  <p className="text-2xl font-bold text-gray-900">$8,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">$4,200</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
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
              placeholder="Search payments..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="escrowed">In Escrow</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create Contract Form */}
        {showCreateContract && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Contract</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Talent</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select talent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="emma">Emma Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project</label>
                  <Input placeholder="Project name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Total Amount ($)</label>
                  <Input type="number" placeholder="5000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contract Terms</label>
                <Textarea placeholder="Describe the work to be completed, milestones, and payment terms..." />
              </div>
              <div className="flex gap-2">
                <Button className="bg-purple-600 hover:bg-purple-700">Create Contract</Button>
                <Button variant="outline" onClick={() => setShowCreateContract(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payments List */}
        <div className="grid gap-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{payment.project}</h3>
                    <p className="text-gray-600">{payment.talent}</p>
                    <p className="text-sm text-gray-500">Created {payment.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${payment.amount.toLocaleString()}</p>
                    <Badge className={getStatusColor(payment.status)}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{payment.status}</span>
                    </Badge>
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-gray-900">Payment Milestones</h4>
                  {payment.milestones.map((milestone, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{milestone.name}</p>
                        <p className="text-sm text-gray-500">
                          {milestone.status === "completed"
                            ? `Paid on ${milestone.paidAt}`
                            : `Due ${milestone.dueDate}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${milestone.amount.toLocaleString()}</p>
                        <Badge
                          className={
                            milestone.status === "completed"
                              ? "bg-green-100 text-green-800"
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
                  {payment.status === "pending" && (
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Fund Escrow
                    </Button>
                  )}
                  {payment.status === "escrowed" && (
                    <Button size="sm" variant="outline">
                      Release Payment
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
