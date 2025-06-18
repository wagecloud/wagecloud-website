'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  HelpCircle,
  MessageSquare,
  Book,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  ExternalLink,
  FileText,
  Video,
  Users,
  Zap,
} from 'lucide-react'

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
  })

  const faqs = [
    {
      question: 'How do I create a new virtual machine?',
      answer:
        'To create a new virtual machine, navigate to the \'Create Instance\' section from the sidebar. Choose your desired configuration including CPU, RAM, storage, and operating system. Click \'Create\' to deploy your virtual machine.',
    },
    {
      question: 'What are the different Instance states and what do they mean?',
      answer:
        'VMs can be in several states: Running (actively consuming resources), Stopped (powered off, not consuming compute resources), Starting (booting up), Stopping (shutting down), and Error (requires attention).',
    },
    {
      question: 'How is billing calculated for virtual machines?',
      answer:
        'Billing is calculated based on the resources allocated to your VMs (CPU, RAM, storage) and the time they are running. Stopped VMs only incur storage costs. You can view detailed usage in the Billing section.',
    },
    {
      question: 'Can I resize my virtual machine after creation?',
      answer:
        'Yes, you can resize your Instance by stopping it first, then selecting the new configuration from the Instance management panel. The Instance will restart with the new specifications.',
    },
    {
      question: 'How do I connect to my virtual machine?',
      answer:
        'You can connect via SSH for Linux VMs or RDP for Windows VMs. Connection details including IP address and credentials are available in the Instance details panel.',
    },
    {
      question: 'What backup options are available?',
      answer:
        'We offer automated daily backups and manual snapshot creation. Backups are retained for 30 days by default. You can restore from any backup point through the Instance management interface.',
    },
    {
      question: 'How do I monitor Instance performance?',
      answer:
        'The monitoring section provides real-time metrics for CPU usage, memory consumption, disk I/O, and network traffic. You can set up alerts for specific thresholds.',
    },
    {
      question: 'What security measures are in place?',
      answer:
        'All VMs are protected by firewalls, encrypted storage, and secure network isolation. We recommend enabling two-factor authentication and using strong passwords for additional security.',
    },
  ]

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Complete guide to setting up your first virtual machine',
      type: 'guide',
      icon: Book,
      link: '#',
    },
    {
      title: 'API Documentation',
      description: 'Comprehensive API reference for developers',
      type: 'docs',
      icon: FileText,
      link: '#',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      type: 'video',
      icon: Video,
      link: '#',
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users and share knowledge',
      type: 'community',
      icon: Users,
      link: '#',
    },
  ]

  const tickets = [
    {
      id: 'WC-001',
      subject: 'Instance not starting after reboot',
      status: 'open',
      priority: 'high',
      created: '2024-01-15',
      updated: '2024-01-16',
    },
    {
      id: 'WC-002',
      subject: 'Billing question about storage costs',
      status: 'resolved',
      priority: 'low',
      created: '2024-01-10',
      updated: '2024-01-12',
    },
    {
      id: 'WC-003',
      subject: 'Request for additional IP addresses',
      status: 'in-progress',
      priority: 'medium',
      created: '2024-01-08',
      updated: '2024-01-14',
    },
  ]

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'destructive'
      case 'in-progress':
        return 'default'
      case 'resolved':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <div className="container mx-auto ">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Get help with Wagecloud and manage your support tickets</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions about Wagecloud</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No FAQs found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Get instant help from our support team</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Available now</span>
                </div>
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us an email and we&apos;ll respond within 24 hours
                </p>
                <p className="text-sm font-medium mb-4">support@wagecloud.com</p>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Call us for urgent issues</p>
                <p className="text-sm font-medium mb-2">+1 (555) 123-WAGE</p>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Mon-Fri 9AM-6PM PST</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we&apos;ll help you resolve it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={e => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded-md"
                    value={ticketForm.category}
                    onChange={e => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="account">Account Management</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="w-full p-2 border rounded-md"
                  value={ticketForm.priority}
                  onChange={e => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  value={ticketForm.description}
                  onChange={e => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Support Tickets</CardTitle>
              <CardDescription>View and manage your support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{ticket.id}</span>
                        <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    <h4 className="font-medium mb-2">{ticket.subject}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        Created:
                        {ticket.created}
                      </span>
                      <span>
                        Updated:
                        {ticket.updated}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <resource.icon className="h-5 w-5" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                    {' '}
                    {resource.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <span>System Status</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <AlertCircle className="h-6 w-6 mb-2" />
                  <span>Report Issue</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col">
                  <Book className="h-6 w-6 mb-2" />
                  <span>Documentation</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
