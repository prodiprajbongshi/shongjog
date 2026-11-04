"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Send, User, CheckCheck, Paperclip, Search } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: "me" | "recruiter";
  text: string;
  time: string;
}

interface Chat {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  unread: boolean;
  messages: Message[];
}

const INITIAL_CHATS: Chat[] = [
  {
    id: "chat-1",
    name: "Elena Rostova",
    role: "Director of Technical Recruiting",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    unread: true,
    messages: [
      {
        id: "m-1",
        sender: "recruiter",
        text: "Hi Tanvir! The engineering team was very impressed by your Go distributed systems background. We have scheduled the Technical Round for March 5th.",
        time: "10:30 AM",
      },
      {
        id: "m-2",
        sender: "me",
        text: "Thank you Elena! I'm really looking forward to speaking with the payments infrastructure team.",
        time: "10:45 AM",
      },
      {
        id: "m-3",
        sender: "recruiter",
        text: "Great! Let me know if you need any prep guidelines before the call.",
        time: "11:00 AM",
      },
    ],
  },
  {
    id: "chat-2",
    name: "Sarah Lin",
    role: "Head of Tech Talent",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    unread: false,
    messages: [
      {
        id: "m-1",
        sender: "recruiter",
        text: "Hi Tanvir, loved your open-source component library. Guillermo would like to connect for a quick 30-min architecture chat.",
        time: "Yesterday",
      },
    ],
  },
];

export default function SeekerMessagesPage() {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>("chat-1");
  const [inputText, setInputText] = useState("");

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: inputText.trim(),
      time: "Just now",
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );

    setInputText("");
    toast.success("Message delivered to " + activeChat.name);
  };

  return (
    <DashboardLayout
      role="job_seeker"
      title="Direct Recruiter Messages"
      subtitle="Communicate directly with hiring managers and talent partners."
    >
      <div className="h-[620px] rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 flex overflow-hidden">
        {/* Left pane: Conversations List */}
        <div className="w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs focus:outline-none dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {chats.map((c) => {
              const isActive = c.id === activeChatId;
              const lastMsg = c.messages[c.messages.length - 1];

              return (
                <div
                  key={c.id}
                  onClick={() => setActiveChatId(c.id)}
                  className={`flex items-start gap-3 p-3.5 cursor-pointer transition ${
                    isActive
                      ? "bg-indigo-50/70 dark:bg-indigo-950/40"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-10 w-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {c.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{lastMsg?.time}</span>
                    </div>
                    <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                      {c.company}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {lastMsg?.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right pane: Chat View */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="h-16 border-b border-slate-100 px-6 flex items-center justify-between dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="h-10 w-10 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {activeChat.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeChat.role} • <strong className="text-indigo-600">{activeChat.company}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeChat.messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === "me"
                      ? "bg-indigo-600 text-white rounded-br-xs"
                      : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs"
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`mt-1 block text-[10px] ${
                      m.sender === "me" ? "text-indigo-200 text-right" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs hover:bg-indigo-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

