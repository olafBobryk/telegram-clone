"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import { FaMicrophone, FaPaperclip } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdOutlineMenu, MdSearch } from "react-icons/md";

const chats = [
  { id: 0, name: "Archived Chats", message: "Pavel Durov, BotFather, FoxNews", avatar: "/assets/avatar/archive.jpeg", unread: 189 },
  { id: 1, name: "Belami", message: "سفارش با موفقیت ثبت شد ✅", avatar: "/assets/avatar/belami.jpg" },
  { id: 2, name: "Hamed Akbari", message: "Salam Pesar", avatar: "/assets/avatar/hamed.jpg", online: true },
  { id: 3, name: "Telegram", message: "Login code: 46619. Do not give this code to anyone.", avatar: "/assets/avatar/telegram.jpg", unread: 2 },
  { id: 4, name: "Amir Rahemi", message: "Not yet, I need two more days", avatar: "/assets/avatar/amir.jpg", unread: 2 },
  { id: 5, name: "Saved Messages", message: "Anbari", avatar: "/assets/avatar/save-message.jpeg" },
  { id: 6, name: "eldràcu", message: "امیدوارم همیشه کامن های گیت هابتون با پول سبز باشه", avatar: "/assets/avatar/eldracu.jpeg" },
] as const;

type Message = { id: number; side: "incoming" | "outgoing"; text: string; time: string };

const initialMessages: Message[] = [
  { id: 1, side: "incoming", text: "Salam Pesar", time: "11:10" },
  { id: 2, side: "outgoing", text: "Salam! Chetori?", time: "11:12" },
  { id: 3, side: "incoming", text: "Khoobam Merci! To chetor?", time: "11:15" },
];

export default function TelegramConversation() {
  const { chatId } = useParams<{ chatId: string }>();
  const selectedChat = chats.find((chat) => chat.id === Number(chatId)) ?? chats[2];
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [menuOpen, setMenuOpen] = useState(false);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { id: current.length + 1, side: "outgoing", text, time: "11:16" },
    ]);
    setInput("");
  }

  return (
    <div className="grid h-screen min-h-[480px] grid-cols-1 overflow-hidden bg-[#0e0e0f] text-white md:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="hidden min-w-0 flex-col border-r border-white/5 bg-[#202020] md:flex">
        <div className="flex h-14 items-center gap-2 px-3">
          <button aria-label="Open menu" className="rounded-full p-2 text-[#a8a8a8] hover:bg-white/5">
            <MdOutlineMenu size={22} />
          </button>
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#2b2b2b] px-3 py-2 text-[#8f8f8f]">
            <MdSearch size={20} />
            <input aria-label="Search chats" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#8f8f8f]" placeholder="Search chats" />
          </label>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
          {chats.map((chat) => (
            <div className={`flex items-center gap-3 rounded-xl px-2 py-2.5 ${chat.id === selectedChat.id ? "bg-[#2b5278]" : "hover:bg-white/5"}`} key={chat.id}>
              <div className="relative shrink-0">
                <img alt="" className="size-11 rounded-full object-cover" src={chat.avatar} />
                {"online" in chat && chat.online ? <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#202020] bg-[#49b96e]" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{chat.name}</p>
                  <span className="text-[11px] text-white/45">{chat.id < 3 ? "11:15" : "Yesterday"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="min-w-0 flex-1 truncate text-xs text-white/45">{chat.message}</p>
                  {"unread" in chat && chat.unread ? <span className="rounded-full bg-[#4d9cf0] px-1.5 py-0.5 text-[10px] font-medium">{chat.unread}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex min-w-0 flex-col bg-[url('/assets/image/chat-bg-pattern-dark.png')] bg-repeat">
        <header className="flex h-14 shrink-0 items-center justify-between bg-[#212121] px-4 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <img alt="" className="size-10 rounded-full object-cover" src={selectedChat.avatar} />
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold">{selectedChat.name}</h1>
              <p className="text-xs text-white/45">online</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-white/55">
            <button aria-label="Search conversation" className="rounded-full p-2 hover:bg-white/5"><MdSearch size={21} /></button>
            <button aria-label="Start call" className="rounded-full p-2 hover:bg-white/5"><IoCall size={19} /></button>
            <div className="relative">
              <button aria-label="Conversation menu" className="rounded-full p-2 hover:bg-white/5" onClick={() => setMenuOpen((open) => !open)}><HiDotsVertical size={19} /></button>
              {menuOpen ? (
                <div className="absolute right-0 top-10 z-10 w-40 rounded-lg bg-[#292929] p-1 text-sm shadow-xl">
                  <button className="w-full rounded px-3 py-2 text-left hover:bg-white/5">View profile</button>
                  <button className="w-full rounded px-3 py-2 text-left hover:bg-white/5">Mute</button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-8">
          <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-end gap-2">
            <div className="mb-4 flex justify-center"><span className="rounded-full bg-[#25303a]/90 px-3 py-1 text-xs text-white/70">Today</span></div>
            {messages.map((message) => (
              <div className={`flex ${message.side === "outgoing" ? "justify-end" : "justify-start"}`} key={message.id}>
                <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-sm ${message.side === "outgoing" ? "rounded-br-md bg-[#6d4bcc]" : "rounded-bl-md bg-[#2b2f3a]"}`}>
                  <p>{message.text}</p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/55">
                    <span>{message.time}</span>
                    {message.side === "outgoing" ? <BsCheckAll className="text-[#78c7ff]" size={14} /> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="shrink-0 bg-[#171717] px-3 py-3 sm:px-5">
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <button aria-label="Attach file" className="rounded-full p-2 text-white/50 hover:bg-white/5"><FaPaperclip size={19} /></button>
            <div className="flex min-w-0 flex-1 items-center rounded-full bg-[#252525] px-4">
              <input aria-label="Message" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} placeholder="Message" value={input} />
            </div>
            <button aria-label="Send voice message" className="rounded-full bg-[#5a8dee] p-3 text-white" onClick={sendMessage}><FaMicrophone size={18} /></button>
          </div>
        </footer>
      </main>
    </div>
  );
}
