"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  INITIAL_ROADMAP,
  RoadmapPhase,
  Priority,
  TopicStatus,
  SubTopic,
  DSAProblem
} from "@/lib/data/roadmapData";
import {
  Trophy,
  Target,
  Search,
  CheckCircle2,
  Clock,
  BookOpen,
  Code2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  FileText,
  RotateCcw,
  Plus,
  Layers,
  Zap,
  CheckSquare,
  AlertCircle,
  Calendar,
  Compass,
  ArrowRight,
  ShieldAlert,
  ListOrdered
} from "lucide-react";

const STORAGE_KEY = "ritz_learning_roadmap_v1";

export default function LearningRoadmapDashboard() {
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    js: true,
    react: true,
    nextjs: true
  });
  const [activeTab, setActiveTab] = useState<Record<string, "path" | "subtopics" | "practice" | "questions" | "dsa" | "notes">>({});
  const [phaseNotes, setPhaseNotes] = useState<Record<string, string>>({});
  const [customDSAProblem, setCustomDSAProblem] = useState<{ title: string; pattern: string; difficulty: "Easy" | "Medium" | "Hard" }>({
    title: "",
    pattern: "HashMap",
    difficulty: "Medium"
  });

  // Load saved state on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.roadmap) {
          // Merge initial missing fields (e.g. stepOrder, whatToLearn, prerequisites)
          const merged = INITIAL_ROADMAP.map((initPhase) => {
            const savedPhase = parsed.roadmap.find((p: RoadmapPhase) => p.id === initPhase.id);
            if (!savedPhase) return initPhase;
            return {
              ...initPhase,
              ...savedPhase,
              stepOrder: initPhase.stepOrder,
              whatToLearn: initPhase.whatToLearn,
              prerequisites: initPhase.prerequisites
            };
          });
          setRoadmap(merged);
        }
        if (parsed.notes) setPhaseNotes(parsed.notes);
      }
    } catch (e) {
      console.error("Failed to load saved roadmap progress", e);
    }
  }, []);

  // Save state changes
  const saveState = (updatedRoadmap: RoadmapPhase[], updatedNotes = phaseNotes) => {
    setRoadmap(updatedRoadmap);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ roadmap: updatedRoadmap, notes: updatedNotes })
      );
    } catch (e) {
      console.error("Failed to save roadmap progress", e);
    }
  };

  const handleNotesChange = (phaseId: string, text: string) => {
    const updatedNotes = { ...phaseNotes, [phaseId]: text };
    setPhaseNotes(updatedNotes);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ roadmap, notes: updatedNotes })
      );
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  };

  const handleSubtopicStatusChange = (phaseId: string, subtopicId: string, newStatus: TopicStatus) => {
    const updated = roadmap.map((phase) => {
      if (phase.id !== phaseId) return phase;
      const updatedSubtopics = phase.subtopics.map((st) => {
        if (st.id !== subtopicId) return st;
        return {
          ...st,
          status: newStatus,
          lastStudied: newStatus !== "Not Started" ? new Date().toISOString().split("T")[0] : st.lastStudied
        };
      });
      return { ...phase, subtopics: updatedSubtopics };
    });
    saveState(updated);
  };

  const handleDSAStatusChange = (phaseId: string, problemId: string, newStatus: TopicStatus) => {
    const updated = roadmap.map((phase) => {
      if (phase.id !== phaseId || !phase.dsaProblems) return phase;
      const updatedProblems = phase.dsaProblems.map((p) => {
        if (p.id !== problemId) return p;
        return { ...p, status: newStatus };
      });
      return { ...phase, dsaProblems: updatedProblems };
    });
    saveState(updated);
  };

  const handleAddDSAProblem = (phaseId: string) => {
    if (!customDSAProblem.title.trim()) return;
    const updated = roadmap.map((phase) => {
      if (phase.id !== phaseId) return phase;
      const existing = phase.dsaProblems || [];
      const newProblem: DSAProblem = {
        id: "custom-" + Date.now(),
        title: customDSAProblem.title.trim(),
        pattern: customDSAProblem.pattern,
        difficulty: customDSAProblem.difficulty,
        status: "Learning"
      };
      return { ...phase, dsaProblems: [...existing, newProblem] };
    });
    saveState(updated);
    setCustomDSAProblem({ title: "", pattern: "HashMap", difficulty: "Medium" });
  };

  const resetAllProgress = () => {
    if (confirm("Are you sure you want to reset all roadmap progress to default?")) {
      setRoadmap(INITIAL_ROADMAP);
      setPhaseNotes({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  // Calculations
  let totalSubtopics = 0;
  let completedSubtopics = 0;
  let practicingSubtopics = 0;
  let learningSubtopics = 0;

  roadmap.forEach((phase) => {
    phase.subtopics.forEach((st) => {
      totalSubtopics++;
      if (st.status === "Completed") completedSubtopics++;
      else if (st.status === "Practicing") practicingSubtopics++;
      else if (st.status === "Learning") learningSubtopics++;
    });
  });

  const overallProgressPercentage = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  // DSA calculation
  const dsaPhase = roadmap.find((p) => p.id === "dsa");
  const completedDSA = dsaPhase?.dsaProblems?.filter((p) => p.status === "Completed").length || 0;

  // Last studied topic finding
  let lastStudiedItem: { phaseTitle: string; subtopicName: string; date: string } | null = null;
  roadmap.forEach((phase) => {
    phase.subtopics.forEach((st) => {
      if (st.lastStudied) {
        if (!lastStudiedItem || st.lastStudied > lastStudiedItem.date) {
          lastStudiedItem = {
            phaseTitle: phase.title,
            subtopicName: st.name,
            date: st.lastStudied
          };
        }
      }
    });
  });

  // Next recommended topic based on stepOrder
  const sortedPhases = [...roadmap].sort((a, b) => a.stepOrder - b.stepOrder);
  let recommendedPhase: RoadmapPhase | null = null;
  let recommendedSubtopic: SubTopic | null = null;

  for (const phase of sortedPhases) {
    const incomplete = phase.subtopics.find((st) => st.status !== "Completed");
    if (incomplete) {
      recommendedPhase = phase;
      recommendedSubtopic = incomplete;
      break;
    }
  }

  // Today/This Week Actionable Dynamic Plan
  const planCoreTopic = recommendedSubtopic || sortedPhases[0].subtopics[0];
  const planPhase = recommendedPhase || sortedPhases[0];

  // Next incomplete DSA problem
  const nextDSAProblem: DSAProblem = dsaPhase?.dsaProblems?.find((p) => p.status !== "Completed") || {
    id: "p3",
    title: "Longest Substring Without Repeating Characters",
    pattern: "Sliding Window",
    difficulty: "Medium",
    status: "Practicing"
  };

  // Practice task for current phase
  const planPracticeTask = planPhase.practiceTask;

  // Interview Question for current phase
  const planInterviewQuestion = planPhase.questions[0] || {
    question: "Explain core principles of web application performance.",
    answer: "Optimize critical rendering path, code-splitting, request caching, and bundle size."
  };

  // Filtering
  const filteredPhases = roadmap.filter((phase) => {
    const matchesPriority = selectedPriority === "All" || phase.priority === selectedPriority;
    
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      if (selectedStatus === "All") return matchesPriority;
      const hasSubtopicWithStatus = phase.subtopics.some((st) => st.status === selectedStatus);
      return matchesPriority && hasSubtopicWithStatus;
    }

    const matchesPhaseQuery =
      phase.title.toLowerCase().includes(q) ||
      phase.description.toLowerCase().includes(q) ||
      phase.practiceTask.title.toLowerCase().includes(q);

    const matchesSubtopicQuery = phase.subtopics.some(
      (st) =>
        st.name.toLowerCase().includes(q) &&
        (selectedStatus === "All" || st.status === selectedStatus)
    );

    return matchesPriority && (matchesPhaseQuery || matchesSubtopicQuery);
  });

  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case "Critical":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      case "High":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Medium":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "Optional":
        return "bg-slate-500/15 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusBadgeClass = (status: TopicStatus) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Practicing":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "Learning":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Not Started":
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#060D25] text-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-lg font-medium text-amber-400">
          <Sparkles className="animate-spin" /> Loading Preparation Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050C21] text-slate-100 pb-20">
      {/* Top Header Banner */}
      <header className="border-b border-slate-800 bg-[#081538]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D39B35] to-[#B68A2A] flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/10">
              ₹10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Full-Stack Learning Roadmap
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Ritz Media World Prep
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target: <span className="text-amber-400 font-bold">₹10 LPA Package</span> | Implement every topic inside Ritz project
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/products"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              View Ritz Products
            </Link>
            <button
              onClick={resetAllProgress}
              title="Reset Progress to Default"
              className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Key Metrics / Overview Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Progress */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1A46] to-[#081538] border border-amber-500/20 p-5 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Overall Readiness</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-white">{overallProgressPercentage}%</span>
                  <span className="text-xs text-emerald-400 font-medium">{completedSubtopics} / {totalSubtopics} topics</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Trophy size={24} />
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${overallProgressPercentage}%` }}
              />
            </div>
          </div>

          {/* Card 2: Target & Status */}
          <div className="rounded-2xl bg-[#0B1A46] border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Target Goal</p>
                <h3 className="text-2xl font-bold text-amber-400 mt-1">₹10 LPA Full-Stack</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Target size={24} />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-800 text-slate-400">
              <span>Learning: <strong className="text-amber-300">{learningSubtopics}</strong></span>
              <span>Practicing: <strong className="text-cyan-300">{practicingSubtopics}</strong></span>
              <span>Done: <strong className="text-emerald-300">{completedSubtopics}</strong></span>
            </div>
          </div>

          {/* Card 3: DSA Goal */}
          <div className="rounded-2xl bg-[#0B1A46] border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">DSA Target (100–120)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">{completedDSA}</span>
                  <span className="text-xs text-slate-400">/ 120 Solved</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Code2 size={24} />
              </div>
            </div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (completedDSA / 120) * 100)}%` }}
              />
            </div>
          </div>

          {/* Card 4: Last Studied & Next Target */}
          <div className="rounded-2xl bg-[#0B1A46] border border-slate-800 p-5 shadow-xl flex flex-col justify-between text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <Clock size={14} className="text-amber-400" />
                <span>LAST STUDIED</span>
              </div>
              <p className="text-slate-200 font-medium truncate">
                {lastStudiedItem
                  ? `${(lastStudiedItem as { subtopicName: string; phaseTitle: string }).subtopicName} (${(lastStudiedItem as { subtopicName: string; phaseTitle: string }).phaseTitle})`
                  : "Not recorded yet"}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                <Zap size={14} />
                <span>NEXT RECOMMENDED TOPIC</span>
              </div>
              <p className="text-white font-semibold truncate">
                {recommendedSubtopic ? `${recommendedPhase?.title}: ${recommendedSubtopic.name}` : "All Completed!"}
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 1. TODAY / THIS WEEK ACTIONABLE PLAN */}
        <section className="bg-gradient-to-r from-[#0B1A46] via-[#081538] to-[#0A1840] border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-inner">
                <Calendar size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Today / This Week Action Plan
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/20">
                    Auto-Generated
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Focus on these 5 actionable items today to stay strictly on track for ₹10 LPA.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-5">
            {/* Item 1: Core Topic */}
            <div className="bg-[#050C21] border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    1. Core Topic
                  </span>
                  <BookOpen size={15} className="text-amber-400" />
                </div>
                <h3 className="text-xs font-bold text-white mt-2 line-clamp-2">
                  {planCoreTopic.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">From: {planPhase.title}</p>
              </div>
              <button
                onClick={() =>
                  handleSubtopicStatusChange(
                    planPhase.id,
                    planCoreTopic.id,
                    planCoreTopic.status === "Completed" ? "Learning" : "Completed"
                  )
                }
                className="w-full mt-2 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 size={13} /> {planCoreTopic.status === "Completed" ? "Completed" : "Mark Done"}
              </button>
            </div>

            {/* Item 2: DSA Problem */}
            <div className="bg-[#050C21] border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    2. DSA Problem
                  </span>
                  <Code2 size={15} className="text-cyan-400" />
                </div>
                <h3 className="text-xs font-bold text-white mt-2 line-clamp-2">
                  {nextDSAProblem.title}
                </h3>
                <p className="text-[11px] text-cyan-300/80 font-mono mt-1">Pattern: {nextDSAProblem.pattern}</p>
              </div>
              <button
                onClick={() =>
                  dsaPhase &&
                  handleDSAStatusChange(
                    "dsa",
                    nextDSAProblem.id,
                    nextDSAProblem.status === "Completed" ? "Learning" : "Completed"
                  )
                }
                className="w-full mt-2 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 size={13} /> {nextDSAProblem.status === "Completed" ? "Solved" : "Solve Problem"}
              </button>
            </div>

            {/* Item 3: Ritz Task */}
            <div className="bg-[#050C21] border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    3. Practice in Ritz
                  </span>
                  <Sparkles size={15} className="text-emerald-400" />
                </div>
                <h3 className="text-xs font-bold text-white mt-2 line-clamp-2">
                  {planPracticeTask.title}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 font-mono truncate">
                  {planPracticeTask.codeLocation}
                </p>
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold bg-emerald-500/10 py-1 px-2 rounded text-center border border-emerald-500/20">
                {planPracticeTask.status}
              </div>
            </div>

            {/* Item 4: Interview Question */}
            <div className="bg-[#050C21] border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    4. Interview Q&A
                  </span>
                  <HelpCircle size={15} className="text-purple-400" />
                </div>
                <h3 className="text-xs font-bold text-white mt-2 line-clamp-2">
                  {planInterviewQuestion.question}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{planInterviewQuestion.answer}</p>
              </div>
              <button
                onClick={() => {
                  setExpandedPhases((prev) => ({ ...prev, [planPhase.id]: true }));
                  setActiveTab((prev) => ({ ...prev, [planPhase.id]: "questions" }));
                }}
                className="w-full mt-2 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-purple-300 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                Read Full Answer
              </button>
            </div>

            {/* Item 5: Revision */}
            <div className="bg-[#050C21] border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    5. Revision
                  </span>
                  <FileText size={15} className="text-rose-400" />
                </div>
                <h3 className="text-xs font-bold text-white mt-2">
                  Review {planPhase.title} Notes
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Revisit key formulas, trick cases & code polyfills.</p>
              </div>
              <button
                onClick={() => {
                  setExpandedPhases((prev) => ({ ...prev, [planPhase.id]: true }));
                  setActiveTab((prev) => ({ ...prev, [planPhase.id]: "notes" }));
                }}
                className="w-full mt-2 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                Open Notes
              </button>
            </div>
          </div>
        </section>

        {/* 🌟 2. RECOMMENDED STRUCTURED LEARNING ORDER ROADMAP */}
        <section className="bg-[#081538] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ListOrdered size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Recommended Structured Order</h2>
                <p className="text-xs text-slate-400">
                  Follow this sequence step-by-step from Step 1 to Step 14 to build a solid foundation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-2 scrollbar-thin">
            {sortedPhases.map((phase) => {
              const isCurrentTarget = recommendedPhase?.id === phase.id;
              const isPhaseDone = phase.subtopics.every((st) => st.status === "Completed");

              return (
                <div key={phase.id} className="flex items-center shrink-0">
                  <button
                    onClick={() => {
                      setExpandedPhases((prev) => ({ ...prev, [phase.id]: true }));
                      const element = document.getElementById(`phase-${phase.id}`);
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                      isCurrentTarget
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md ring-2 ring-amber-500/20"
                        : isPhaseDone
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-[#050C21] text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrentTarget
                          ? "bg-amber-500 text-slate-950"
                          : isPhaseDone
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {phase.stepOrder}
                    </span>
                    <span>{phase.title.replace(/^\d+\.\s*/, "")}</span>
                    {isCurrentTarget && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold uppercase">
                        Current
                      </span>
                    )}
                  </button>
                  {phase.stepOrder < sortedPhases.length && (
                    <ArrowRight size={14} className="text-slate-600 mx-1.5 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Search & Filters Bar */}
        <section className="bg-[#081538] border border-slate-800 rounded-2xl p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search topics, questions, or Ritz tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#050C21] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/60 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Priority Filter */}
            <div className="flex items-center gap-1.5 bg-[#050C21] p-1 border border-slate-700/80 rounded-xl text-xs">
              <span className="text-slate-400 px-2 font-medium">Priority:</span>
              {["All", "Critical", "High", "Medium"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPriority(p)}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    selectedPriority === p
                      ? "bg-amber-500 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-[#050C21] p-1 border border-slate-700/80 rounded-xl text-xs">
              <span className="text-slate-400 px-2 font-medium">Status:</span>
              {["All", "Learning", "Practicing", "Completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    selectedStatus === s
                      ? "bg-[#D39B35] text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Syllabus Phases */}
        <section className="space-y-6">
          {filteredPhases.length === 0 ? (
            <div className="text-center py-16 bg-[#081538] border border-slate-800 rounded-2xl">
              <AlertCircle size={40} className="mx-auto text-slate-500 mb-3" />
              <h3 className="text-lg font-semibold text-slate-300">No topics match your filters</h3>
              <p className="text-sm text-slate-500 mt-1">Try resetting the search query or priority filters.</p>
            </div>
          ) : (
            filteredPhases.map((phase) => {
              const isExpanded = expandedPhases[phase.id] ?? true;
              const phaseCompletedCount = phase.subtopics.filter((st) => st.status === "Completed").length;
              const phaseProgressPercent = Math.round((phaseCompletedCount / phase.subtopics.length) * 100);
              const currentTab = activeTab[phase.id] || "path";
              const isRecommended = recommendedPhase?.id === phase.id;

              return (
                <div
                  key={phase.id}
                  id={`phase-${phase.id}`}
                  className={`bg-[#081538] border rounded-2xl overflow-hidden shadow-xl transition ${
                    isRecommended
                      ? "border-amber-500/60 ring-2 ring-amber-500/20"
                      : "border-slate-800/90 hover:border-slate-700/80"
                  }`}
                >
                  {/* Phase Header Accordion Toggle */}
                  <div
                    onClick={() => togglePhaseExpand(phase.id)}
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition select-none"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2.5 rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700 flex items-center justify-center font-black text-sm w-10 h-10">
                        #{phase.stepOrder}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-bold text-white tracking-wide">{phase.title}</h2>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getPriorityBadgeClass(
                              phase.priority
                            )}`}
                          >
                            {phase.priority}
                          </span>
                          {isRecommended && (
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold uppercase animate-pulse">
                              Recommended Next Step
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 max-w-2xl">{phase.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-amber-400">{phaseProgressPercent}%</span>
                          <span className="text-xs text-slate-400">({phaseCompletedCount}/{phase.subtopics.length})</span>
                        </div>
                        <div className="w-28 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${phaseProgressPercent}%` }}
                          />
                        </div>
                      </div>

                      <button className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/50">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-[#050C21]/60">
                      {/* Sub-Navigation Tabs within Phase */}
                      <div className="flex items-center gap-2 border-b border-slate-800 px-6 pt-3 overflow-x-auto text-xs">
                        <button
                          onClick={() => setActiveTab({ ...activeTab, [phase.id]: "path" })}
                          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold transition ${
                            currentTab === "path"
                              ? "border-amber-400 text-amber-400"
                              : "border-transparent text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Compass size={14} /> 1. What to Learn
                        </button>

                        <button
                          onClick={() => setActiveTab({ ...activeTab, [phase.id]: "subtopics" })}
                          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold transition ${
                            currentTab === "subtopics"
                              ? "border-amber-400 text-amber-400"
                              : "border-transparent text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Layers size={14} /> 2. Subtopics ({phase.subtopics.length})
                        </button>

                        <button
                          onClick={() => setActiveTab({ ...activeTab, [phase.id]: "practice" })}
                          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold transition ${
                            currentTab === "practice"
                              ? "border-amber-400 text-amber-400"
                              : "border-transparent text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Code2 size={14} /> 3. Practice in Ritz
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        </button>

                        <button
                          onClick={() => setActiveTab({ ...activeTab, [phase.id]: "questions" })}
                          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold transition ${
                            currentTab === "questions"
                              ? "border-amber-400 text-amber-400"
                              : "border-transparent text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <HelpCircle size={14} /> 4. Interview Q&A ({phase.questions.length})
                        </button>

                        {phase.id === "dsa" && (
                          <button
                            onClick={() => setActiveTab({ ...activeTab, [phase.id]: "dsa" })}
                            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold transition ${
                              currentTab === "dsa"
                                ? "border-amber-400 text-amber-400"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <CheckSquare size={14} /> Problem Set ({phase.dsaProblems?.length || 0})
                          </button>
                        )}

                        <button
                          onClick={() => setActiveTab({ ...activeTab, [phase.id]: "notes" })}
                          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold transition ${
                            currentTab === "notes"
                              ? "border-amber-400 text-amber-400"
                              : "border-transparent text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <FileText size={14} /> Notes & Revision
                        </button>
                      </div>

                      <div className="p-6">
                        {/* TAB 0: WHAT TO LEARN & PREREQUISITES */}
                        {currentTab === "path" && (
                          <div className="space-y-4">
                            {phase.prerequisites && phase.prerequisites.length > 0 && (
                              <div className="flex items-center gap-2 text-xs bg-[#081538] border border-slate-800 p-3 rounded-xl">
                                <ShieldAlert size={16} className="text-amber-400 shrink-0" />
                                <span className="text-slate-400 font-medium">Recommended Prerequisites:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {phase.prerequisites.map((pre) => (
                                    <span key={pre} className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold border border-slate-700">
                                      {pre}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="bg-[#081538] border border-slate-800 p-5 rounded-xl space-y-3">
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <Compass size={16} className="text-amber-400" />
                                Core Learning Objectives for {phase.title}
                              </h4>
                              <ul className="space-y-2 text-xs text-slate-300">
                                {phase.whatToLearn.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {phase.checkpoint && (
                              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-start gap-3 text-xs">
                                <ShieldAlert size={18} className="text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-extrabold text-rose-300 uppercase tracking-wider text-[10px]">
                                    Don&apos;t move ahead until...
                                  </span>
                                  <p className="text-slate-200 mt-0.5 font-medium leading-relaxed">{phase.checkpoint}</p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#081538] to-[#0A1840] border border-slate-800 rounded-xl">
                              <div className="text-xs">
                                <span className="text-slate-400">Next Step in Learning Path:</span>
                                <p className="text-sm font-bold text-white mt-0.5">Explore Subtopics & Practice in Ritz</p>
                              </div>
                              <button
                                onClick={() => setActiveTab({ ...activeTab, [phase.id]: "subtopics" })}
                                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition"
                              >
                                View Subtopics <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* TAB 1: SUBTOPICS */}
                        {currentTab === "subtopics" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {phase.subtopics.map((st) => (
                              <div
                                key={st.id}
                                className="flex items-center justify-between p-3.5 rounded-xl bg-[#081538] border border-slate-800/80 hover:border-slate-700/80 transition"
                              >
                                <div className="flex items-center gap-3 pr-2">
                                  <button
                                    onClick={() =>
                                      handleSubtopicStatusChange(
                                        phase.id,
                                        st.id,
                                        st.status === "Completed" ? "Learning" : "Completed"
                                      )
                                    }
                                    className={`p-1 rounded-md transition ${
                                      st.status === "Completed"
                                        ? "text-emerald-400 hover:text-slate-400"
                                        : "text-slate-600 hover:text-emerald-400"
                                    }`}
                                  >
                                    <CheckCircle2 size={18} />
                                  </button>
                                  <span
                                    className={`text-sm font-medium ${
                                      st.status === "Completed"
                                        ? "line-through text-slate-500"
                                        : "text-slate-200"
                                    }`}
                                  >
                                    {st.name}
                                  </span>
                                </div>

                                <select
                                  value={st.status}
                                  onChange={(e) =>
                                    handleSubtopicStatusChange(
                                      phase.id,
                                      st.id,
                                      e.target.value as TopicStatus
                                    )
                                  }
                                  className={`text-xs px-2.5 py-1.5 rounded-lg border focus:outline-none font-semibold cursor-pointer ${getStatusBadgeClass(
                                    st.status
                                  )}`}
                                >
                                  <option value="Not Started" className="bg-[#081538] text-slate-300">
                                    Not Started
                                  </option>
                                  <option value="Learning" className="bg-[#081538] text-amber-300">
                                    Learning
                                  </option>
                                  <option value="Practicing" className="bg-[#081538] text-cyan-300">
                                    Practicing
                                  </option>
                                  <option value="Completed" className="bg-[#081538] text-emerald-300">
                                    Completed
                                  </option>
                                </select>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* TAB 2: PRACTICE IN RITZ */}
                        {currentTab === "practice" && (
                          <div className="bg-[#081538] border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <Sparkles size={24} />
                              </div>
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                  <h4 className="text-base font-bold text-white">
                                    {phase.practiceTask.title}
                                  </h4>
                                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                                    Status: {phase.practiceTask.status}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {phase.practiceTask.description}
                                </p>

                                {phase.practiceTask.codeLocation && (
                                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 bg-[#050C21] px-3 py-2 rounded-lg border border-slate-800 w-fit">
                                    <Code2 size={14} className="text-amber-400" />
                                    <span>Target Location:</span>
                                    <code className="text-amber-300 font-mono">
                                      {phase.practiceTask.codeLocation}
                                    </code>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: INTERVIEW QUESTIONS */}
                        {currentTab === "questions" && (
                          <div className="space-y-4">
                            {phase.questions.length === 0 ? (
                              <p className="text-xs text-slate-500 italic">No interview questions added yet.</p>
                            ) : (
                              phase.questions.map((q) => (
                                <div
                                  key={q.id}
                                  className="p-4 rounded-xl bg-[#081538] border border-slate-800 space-y-2"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                                      <HelpCircle size={15} /> {q.question}
                                    </h4>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                      {q.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300 bg-[#050C21] p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                                    {q.answer}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {/* TAB 4: DSA PROBLEM SET (Only for DSA phase) */}
                        {currentTab === "dsa" && phase.dsaProblems && (
                          <div className="space-y-4">
                            {/* Add custom DSA Problem */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-[#081538] rounded-xl border border-slate-800">
                              <input
                                type="text"
                                placeholder="Add new problem title (e.g. 3Sum, LRU Cache)..."
                                value={customDSAProblem.title}
                                onChange={(e) => setCustomDSAProblem({ ...customDSAProblem, title: e.target.value })}
                                className="flex-1 px-3 py-1.5 bg-[#050C21] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                              />
                              <select
                                value={customDSAProblem.pattern}
                                onChange={(e) => setCustomDSAProblem({ ...customDSAProblem, pattern: e.target.value })}
                                className="px-3 py-1.5 bg-[#050C21] border border-slate-700 rounded-lg text-xs text-slate-300"
                              >
                                {["Two Pointers", "Sliding Window", "HashMap", "Stack", "BFS / DFS", "Binary Search", "DP"].map(
                                  (pat) => (
                                    <option key={pat} value={pat}>
                                      {pat}
                                    </option>
                                  )
                                )}
                              </select>
                              <select
                                value={customDSAProblem.difficulty}
                                onChange={(e) =>
                                  setCustomDSAProblem({
                                    ...customDSAProblem,
                                    difficulty: e.target.value as "Easy" | "Medium" | "Hard"
                                  })
                                }
                                className="px-3 py-1.5 bg-[#050C21] border border-slate-700 rounded-lg text-xs text-slate-300"
                              >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                              </select>
                              <button
                                onClick={() => handleAddDSAProblem(phase.id)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1"
                              >
                                <Plus size={14} /> Add
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {phase.dsaProblems.map((p) => (
                                <div
                                  key={p.id}
                                  className="flex items-center justify-between p-3 rounded-xl bg-[#081538] border border-slate-800"
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-slate-200">{p.title}</span>
                                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                        {p.difficulty}
                                      </span>
                                    </div>
                                    <span className="text-[11px] text-amber-400/80 font-mono mt-0.5 block">
                                      Pattern: {p.pattern}
                                    </span>
                                  </div>

                                  <select
                                    value={p.status}
                                    onChange={(e) =>
                                      handleDSAStatusChange(phase.id, p.id, e.target.value as TopicStatus)
                                    }
                                    className={`text-xs px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${getStatusBadgeClass(
                                      p.status
                                    )}`}
                                  >
                                    <option value="Not Started" className="bg-[#081538] text-slate-300">
                                      Not Started
                                    </option>
                                    <option value="Learning" className="bg-[#081538] text-amber-300">
                                      Learning
                                    </option>
                                    <option value="Practicing" className="bg-[#081538] text-cyan-300">
                                      Practicing
                                    </option>
                                    <option value="Completed" className="bg-[#081538] text-emerald-300">
                                      Completed
                                    </option>
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* TAB 5: REVISION NOTES */}
                        {currentTab === "notes" && (
                          <div className="space-y-2">
                            <label className="text-xs text-slate-400 font-medium">
                              Personal Key Learnings & Quick Reference Notes for {phase.title}:
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Type key formulas, code snippets, trick edge cases, or Ritz implementation notes..."
                              value={phaseNotes[phase.id] || ""}
                              onChange={(e) => handleNotesChange(phase.id, e.target.value)}
                              className="w-full p-3 bg-[#050C21] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 font-mono"
                            />
                            <p className="text-[10px] text-slate-500 text-right">
                              Automatically saved to your browser localStorage.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
