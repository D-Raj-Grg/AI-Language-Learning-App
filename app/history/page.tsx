"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Clock, MessageSquare, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import type { ConversationHistory } from "@/lib/store";

export default function HistoryPage() {
  const router = useRouter();
  const { conversationHistory, deleteConversation, clearHistory } = useStore();
  const [selectedConversation, setSelectedConversation] = useState<ConversationHistory | null>(null);

  const totalConversations = conversationHistory.length;
  const totalMessages = conversationHistory.reduce((acc, conv) => acc + conv.messageCount, 0);
  const totalDuration = conversationHistory.reduce((acc, conv) => acc + conv.duration, 0);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes === 0) return `${remainingSeconds}s`;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Conversation History
              </h1>
              <p className="text-muted-foreground mt-1">
                Review your past language learning sessions
              </p>
            </div>
          </div>

          {conversationHistory.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all history?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {conversationHistory.length} conversations.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearHistory}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Stats */}
        {conversationHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalConversations}</p>
                  <p className="text-sm text-muted-foreground">Conversations</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalMessages}</p>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/20">
                  <Clock className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatDuration(totalDuration)}</p>
                  <p className="text-sm text-muted-foreground">Practice Time</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Conversation List */}
        {conversationHistory.length === 0 ? (
          <Card className="p-12 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
              <p className="text-muted-foreground mb-6">
                Start a conversation to see your learning history here
              </p>
              <Button onClick={() => router.push("/")}>
                Start Learning
              </Button>
            </div>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {conversationHistory.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {conversation.scenario.title}
                          </h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                            {conversation.language}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 capitalize">
                            {conversation.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {conversation.scenario.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {formatDate(conversation.startedAt)}
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            {conversation.messageCount} messages
                          </div>
                          <div>
                            Duration: {formatDuration(conversation.duration)}
                          </div>
                          {conversation.corrections.length > 0 && (
                            <div className="text-rose-600 dark:text-rose-400">
                              {conversation.corrections.length} corrections
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this conversation. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteConversation(conversation.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Conversation Detail Modal */}
        {selectedConversation && (
          <AlertDialog open={!!selectedConversation} onOpenChange={(open) => !open && setSelectedConversation(null)}>
            <AlertDialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {selectedConversation.scenario.title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {formatDate(selectedConversation.startedAt)} • {selectedConversation.messageCount} messages • {formatDuration(selectedConversation.duration)}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.role === "user"
                            ? "bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100"
                            : "bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.corrections && message.corrections.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-current/20">
                            <p className="text-xs font-semibold mb-1">Corrections:</p>
                            {message.corrections.map((correction) => (
                              <p key={correction.id} className="text-xs opacity-80">
                                &quot;{correction.original}&quot; → &quot;{correction.corrected}&quot;
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
