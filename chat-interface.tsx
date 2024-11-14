import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Send, User } from 'lucide-react'

export default function Component() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'This is a simulated response.' }])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 dark:bg-gray-800 p-4">
        <Button className="w-full mb-4" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2">
            {['Previous Chat 1', 'Previous Chat 2', 'Previous Chat 3'].map((chat, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start">
                {chat}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.role === 'user' ? <User /> : 'AI'}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t dark:border-gray-700">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}