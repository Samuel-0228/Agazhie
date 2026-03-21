'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Search, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const sampleConversations = [
  {
    id: '1',
    name: 'Abebe Kebede',
    role: 'tutor',
    lastMessage: 'I can start sessions as early as Saturday.',
    lastMessageTime: '10:30 AM',
    unread: 2,
    avatar: 'AK',
    subject: 'Mathematics',
  },
  {
    id: '2',
    name: 'Sara Tesfaye',
    role: 'tutor',
    lastMessage: 'Thank you for considering me. I have 3 years of experience.',
    lastMessageTime: 'Yesterday',
    unread: 0,
    avatar: 'ST',
    subject: 'English',
  },
  {
    id: '3',
    name: 'Parent (Tigist Haile)',
    role: 'parent',
    lastMessage: 'When are you available for a trial session?',
    lastMessageTime: '2 days ago',
    unread: 1,
    avatar: 'TH',
    subject: 'Physics',
  },
]

const sampleMessages: Record<string, { id: string; sender: 'me' | 'other'; text: string; time: string }[]> = {
  '1': [
    { id: '1', sender: 'other', text: 'Hello! I saw your job posting for a Math tutor for Grade 10.', time: '10:00 AM' },
    { id: '2', sender: 'me', text: 'Hi Abebe! Yes, I need help for my daughter. She is struggling with algebra.', time: '10:05 AM' },
    { id: '3', sender: 'other', text: 'I specialize in high school mathematics. I can help her with algebra, geometry, and exam prep.', time: '10:15 AM' },
    { id: '4', sender: 'me', text: 'Great! What is your availability?', time: '10:20 AM' },
    { id: '5', sender: 'other', text: 'I can start sessions as early as Saturday.', time: '10:30 AM' },
  ],
  '2': [
    { id: '1', sender: 'other', text: 'Thank you for considering me. I have 3 years of experience teaching English.', time: 'Yesterday' },
    { id: '2', sender: 'me', text: 'That sounds good. Can you share your qualifications?', time: 'Yesterday' },
  ],
  '3': [
    { id: '1', sender: 'me', text: 'Hello, I saw you need a Physics tutor.', time: '2 days ago' },
    { id: '2', sender: 'other', text: 'When are you available for a trial session?', time: '2 days ago' },
  ],
}

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState<string | null>('1')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(sampleMessages)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConvs = sampleConversations.filter(c =>
    !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentConv = sampleConversations.find(c => c.id === selectedConv)
  const currentMessages = selectedConv ? (messages[selectedConv] || []) : []

  const handleSend = () => {
    if (!message.trim() || !selectedConv) return
    const newMsg = {
      id: String(Date.now()),
      sender: 'me' as const,
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMsg],
    }))
    setMessage('')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="mt-1 text-muted-foreground">
              Chat with tutors and parents before and after booking.
            </p>
          </div>

          <div className="flex h-[600px] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Sidebar */}
            <div className="w-full max-w-xs border-r border-border flex flex-col">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                {filteredConvs.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No conversations yet.</div>
                ) : (
                  filteredConvs.map((conv) => (
                    <button
                      key={conv.id}
                      className={cn(
                        'w-full flex items-start gap-3 p-3 text-left hover:bg-muted/50 transition-colors border-b border-border',
                        selectedConv === conv.id && 'bg-muted'
                      )}
                      onClick={() => setSelectedConv(conv.id)}
                    >
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="text-xs">{conv.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-medium text-sm truncate">{conv.name}</p>
                          <span className="text-xs text-muted-foreground shrink-0">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs py-0">{conv.subject}</Badge>
                          {conv.unread > 0 && (
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </ScrollArea>
            </div>

            {/* Chat area */}
            {selectedConv && currentConv ? (
              <div className="flex flex-1 flex-col">
                {/* Chat header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">{currentConv.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{currentConv.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{currentConv.role} • {currentConv.subject}</p>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {currentMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex',
                          msg.sender === 'me' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[75%] rounded-2xl px-3 py-2 text-sm',
                            msg.sender === 'me'
                              ? 'bg-primary text-primary-foreground rounded-br-sm'
                              : 'bg-muted rounded-bl-sm'
                          )}
                        >
                          <p>{msg.text}</p>
                          <p className={cn(
                            'mt-1 text-xs',
                            msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          )}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
