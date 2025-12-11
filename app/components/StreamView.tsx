"use client";

import { useState } from "react";
import { Heart, Music, Send, SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

// Types
interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  addedBy: string;
  thumbnail: string;
  likes: number;
  likedByMe: boolean;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

export default function MusicRoomDashboard() {
  const [songQueue, setSongQueue] = useState<Song[]>([
    {
      id: "1",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      duration: "5:55",
      addedBy: "Alex",
      thumbnail: "/placeholder.svg?height=60&width=60",
      likes: 3,
      likedByMe: false,
    },
    {
      id: "2",
      title: "Hotel California",
      artist: "Eagles",
      duration: "6:30",
      addedBy: "Jamie",
      thumbnail: "/placeholder.svg?height=60&width=60",
      likes: 5,
      likedByMe: true,
    },
    {
      id: "3",
      title: "Imagine",
      artist: "John Lennon",
      duration: "3:04",
      addedBy: "Taylor",
      thumbnail: "/placeholder.svg?height=60&width=60",
      likes: 2,
      likedByMe: false,
    },
    {
      id: "4",
      title: "Billie Jean",
      artist: "Michael Jackson",
      duration: "4:54",
      addedBy: "Jordan",
      thumbnail: "/placeholder.svg?height=60&width=60",
      likes: 4,
      likedByMe: true,
    },
  ]);

  const [currentSong, setCurrentSong] = useState<Song>({
    id: "0",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: "8:02",
    addedBy: "Sam",
    thumbnail: "/placeholder.svg?height=200&width=200",
    likes: 7,
    likedByMe: true,
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      user: "Alex",
      message: "Hey everyone! Welcome to the music room.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      user: "Jamie",
      message: "I added Hotel California to the queue!",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "3",
      user: "Taylor",
      message: "Great choice! I love that song.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ]);

  const [songLink, setSongLink] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const handleAddSong = () => {
    if (!songLink.trim()) return;

    const newSong: Song = {
      id: `${songQueue.length + 1}`,
      title: `New Song ${songQueue.length + 1}`,
      artist: "Unknown Artist",
      duration: "3:30",
      addedBy: "You",
      thumbnail: "/placeholder.svg?height=60&width=60",
      likes: 0,
      likedByMe: false,
    };

    setSongQueue([...songQueue, newSong]);
    setSongLink("");
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: `${chatMessages.length + 1}`,
      user: "You",
      message: chatMessage,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
  };

  const handlePlayNext = () => {
    if (songQueue.length === 0) return;
    const sortedQueue = [...songQueue].sort((a, b) => b.likes - a.likes);
    setCurrentSong(sortedQueue[0]);
    setSongQueue(songQueue.filter((song) => song.id !== sortedQueue[0].id));
  };

  const handleLikeSong = (songId: string) => {
    setSongQueue(
      songQueue.map((song) => {
        if (song.id === songId) {
          return {
            ...song,
            likes: song.likedByMe ? song.likes - 1 : song.likes + 1,
            likedByMe: !song.likedByMe,
          };
        }
        return song;
      })
    );
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sortedSongQueue = [...songQueue].sort((a, b) => b.likes - a.likes);

  return (
    <div className="w-full max-w-7xl h-[calc(100vh-2rem)] bg-[#e3e7d7] rounded-xl overflow-hidden border border-[#2E3F3C] shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 h-full">
        {/* Song Queue */}
        <div className="md:col-span-3 border-r border-[#2E3F3C] flex flex-col h-full">
          <div className="p-4 border-b border-[#2E3F3C]">
            <h2 className="text-xl font-bold text-[#2E3F3C]">Song Queue</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {sortedSongQueue.length > 0 ? (
                sortedSongQueue.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-[#2E3F3C]/10"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden">
                      <Image
                        src={song.thumbnail || "/placeholder.svg"}
                        alt={song.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate text-[#2E3F3C]">
                        {song.title}
                      </h4>
                      <p className="text-xs text-[#2E3F3C]/70 truncate">
                        {song.artist}
                      </p>
                      <div className="flex justify-between text-xs text-[#2E3F3C]/60">
                        <span>{song.addedBy}</span>
                        <span>{song.duration}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLikeSong(song.id)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          song.likedByMe
                            ? "fill-[#2E3F3C] text-[#2E3F3C]"
                            : "text-[#2E3F3C]"
                        }`}
                      />
                      <span className="text-[#2E3F3C]">{song.likes}</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-[#2E3F3C]/60">
                  <Music className="h-8 w-8 mb-2" />
                  <p className="text-sm">Queue is empty</p>
                  <p className="text-xs">Add songs to get started</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main - Current Song */}
        <div className="md:col-span-6 flex flex-col h-full justify-between p-4">
          <div className="flex flex-col items-center gap-4">
            <Card className="w-full max-w-md flex flex-col items-center justify-center bg-[#2E3F3C]/10 border-[#2E3F3C] rounded-md p-4">
              <div className="w-36 h-36 mb-3 rounded-md overflow-hidden">
                <Image
                  src={currentSong.thumbnail || "/placeholder.svg"}
                  alt={currentSong.title}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-[#2E3F3C] text-center">
                {currentSong.title}
              </h3>
              <p className="text-sm text-[#2E3F3C]/80">{currentSong.artist}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-[#2E3F3C]/60">
                <p>Added by {currentSong.addedBy}</p>
                <div className="flex items-center gap-1">
                  <Heart
                    className={`h-4 w-4 ${
                      currentSong.likedByMe
                        ? "fill-[#2E3F3C] text-[#2E3F3C]"
                        : "text-[#2E3F3C]"
                    }`}
                  />
                  <span className="text-xs text-[#2E3F3C]">
                    {currentSong.likes}
                  </span>
                </div>
              </div>
            </Card>

            <Button
              onClick={handlePlayNext}
              className="bg-[#2E3F3C] hover:bg-[#2E3F3C]/90 text-[#e3e7d7] px-4 py-2 rounded-md flex items-center"
            >
              <SkipForward className="mr-2 h-4 w-4" />
              PLAY NEXT
            </Button>
          </div>

          <div className="w-full max-w-sm mx-auto mt-4 flex gap-2">
            <Input
              placeholder="Paste the yt link here..."
              value={songLink}
              onChange={(e) => setSongLink(e.target.value)}
              className="bg-white border-[#2E3F3C] focus-visible:ring-[#2E3F3C] focus-visible:ring-1 rounded-md px-3 py-2 w-full"
            />
            <Button
              onClick={handleAddSong}
              className="bg-[#2E3F3C] hover:bg-[#2E3F3C]/90 text-[#e3e7d7] px-4 py-2 rounded-md"
            >
              Add Song
            </Button>
          </div>
        </div>

        {/* Chat */}
        <div className="md:col-span-3 border-l border-[#2E3F3C] flex flex-col h-full">
          <div className="p-4 border-b border-[#2E3F3C]">
            <h2 className="text-xl font-bold text-[#2E3F3C]">Room Chat</h2>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-[#2E3F3C] text-[#e3e7d7] text-xs">
                        {msg.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm text-[#2E3F3C]">
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="ml-8 text-sm mt-1 text-[#2E3F3C]/80">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-[#2E3F3C] flex gap-2">
            <Input
              placeholder="Type message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-white border-[#2E3F3C] focus-visible:ring-[#2E3F3C] focus-visible:ring-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-[#2E3F3C] hover:bg-[#2E3F3C]/90 text-[#e3e7d7] h-10 w-10 rounded-md flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
