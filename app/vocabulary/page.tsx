"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Calendar,
  Globe,
  Search,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { VocabularyCard } from "@/components/vocabulary/VocabularyCard";
import { StatsCard } from "@/components/vocabulary/StatsCard";
import { useStore } from "@/lib/store";

export default function VocabularyPage() {
  const router = useRouter();
  const { vocabulary, resetAll } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "alphabetical">("date");

  // Remove vocabulary item
  const removeVocabularyItem = (id: string) => {
    const item = vocabulary.find((v) => v.id === id);
    useStore.setState((state) => ({
      vocabulary: state.vocabulary.filter((item) => item.id !== id),
    }));
    if (item) {
      toast.success("Word removed", {
        description: `"${item.word}" removed from your vocabulary`,
      });
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const wordsThisWeek = vocabulary.filter(
      (item) => new Date(item.learnedAt) >= weekAgo
    ).length;

    const wordsThisMonth = vocabulary.filter(
      (item) => new Date(item.learnedAt) >= monthAgo
    ).length;

    // Count by language
    const languageCounts = vocabulary.reduce(
      (acc, item) => {
        acc[item.language] = (acc[item.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const mostPracticedLanguage =
      Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "None";

    return {
      total: vocabulary.length,
      thisWeek: wordsThisWeek,
      thisMonth: wordsThisMonth,
      mostPracticedLanguage,
    };
  }, [vocabulary]);

  // Get unique languages
  const languages = useMemo(() => {
    const uniqueLangs = [...new Set(vocabulary.map((item) => item.language))];
    return uniqueLangs;
  }, [vocabulary]);

  // Filter and sort vocabulary
  const filteredAndSortedVocabulary = useMemo(() => {
    let filtered = vocabulary;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.translation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply language filter
    if (languageFilter !== "all") {
      filtered = filtered.filter((item) => item.language === languageFilter);
    }

    // Apply sorting
    if (sortBy === "alphabetical") {
      filtered = [...filtered].sort((a, b) => a.word.localeCompare(b.word));
    } else {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.learnedAt).getTime() - new Date(a.learnedAt).getTime()
      );
    }

    return filtered;
  }, [vocabulary, searchQuery, languageFilter, sortBy]);

  const languageNames: Record<string, string> = {
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-md">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    My Vocabulary
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Words you&apos;ve learned during conversations
                  </p>
                </div>
              </div>
              {vocabulary.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear all vocabulary?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete all {vocabulary.length} words
                        from your vocabulary list. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const count = vocabulary.length;
                          resetAll();
                          toast.success("All vocabulary cleared", {
                            description: `Removed ${count} word${count > 1 ? "s" : ""} from your list`,
                          });
                        }}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Words"
              value={stats.total}
              icon={BookOpen}
              iconColor="text-purple-600"
            />
            <StatsCard
              title="This Week"
              value={stats.thisWeek}
              icon={TrendingUp}
              iconColor="text-blue-600"
              description={`${stats.total > 0 ? Math.round((stats.thisWeek / stats.total) * 100) : 0}% of total`}
            />
            <StatsCard
              title="This Month"
              value={stats.thisMonth}
              icon={Calendar}
              iconColor="text-emerald-600"
              description={`${stats.total > 0 ? Math.round((stats.thisMonth / stats.total) * 100) : 0}% of total`}
            />
            <StatsCard
              title="Most Practiced"
              value={languageNames[stats.mostPracticedLanguage] || stats.mostPracticedLanguage}
              icon={Globe}
              iconColor="text-rose-600"
            />
          </div>

          {/* Search and Filters */}
          {vocabulary.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search words or translations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {languageNames[lang] || lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "date" | "alphabetical")}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Newest First</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Vocabulary Grid */}
          {filteredAndSortedVocabulary.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredAndSortedVocabulary.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <VocabularyCard item={item} onRemove={removeVocabularyItem} />
                </motion.div>
              ))}
            </motion.div>
          ) : vocabulary.length > 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">
                No vocabulary yet
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Start practicing conversations! New words you learn will appear
                here automatically.
              </p>
              <Button onClick={() => router.push("/")} size="lg">
                Start Learning
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
