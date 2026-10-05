export type Priority = "Critical" | "High" | "Medium" | "Optional";
export type TopicStatus = "Not Started" | "Learning" | "Practicing" | "Completed";

export interface SubTopic {
  id: string;
  name: string;
  status: TopicStatus;
  notes?: string;
  lastStudied?: string;
}

export interface PracticeTask {
  title: string;
  description: string;
  codeLocation?: string;
  status: "Pending" | "In Progress" | "Completed";
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface DSAProblem {
  id: string;
  title: string;
  pattern: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: TopicStatus;
  notes?: string;
}

export interface RoadmapPhase {
  id: string;
  stepOrder: number;
  title: string;
  priority: Priority;
  description: string;
  whatToLearn: string[];
  prerequisites?: string[];
  checkpoint?: string;
  iconName: string;
  targetCount?: number;
  subtopics: SubTopic[];
  practiceTask: PracticeTask;
  questions: Question[];
  dsaProblems?: DSAProblem[];
}

export const INITIAL_ROADMAP: RoadmapPhase[] = [
  // 1. JAVASCRIPT — CRITICAL
  {
    id: "js",
    stepOrder: 1,
    title: "1. JavaScript Mastery (Core Engine & ES6+)",
    priority: "Critical",
    description: "Deep dive into JS engine execution, scope chain, closures, prototypes, event loop microtasks, async patterns & polyfills.",
    prerequisites: ["HTML5 & Modern CSS3"],
    checkpoint: "You can write custom polyfills for Promise.all, Debounce, Throttle, and explain Event Loop Microtask vs Macrotask execution order without referring to docs.",
    iconName: "Code",
    whatToLearn: [
      "Beginner: Variable declarations (var, let, const), Temporal Dead Zone, Primitive vs Reference types, Type coercion rules.",
      "Intermediate: Execution Context (Creation & Execution phase), Scopes & Scope Chain, Closures, Function currying, call/apply/bind context binding.",
      "Advanced: Prototypal inheritance & Prototype chain, Call stack, Event Loop, Microtask vs Macrotask queue priority, Promise mechanics, Custom polyfills, Memory leaks & V8 Garbage Collection (Mark-and-Sweep)."
    ],
    subtopics: [
      { id: "js-fund-vars", name: "Variables: var vs let vs const & Temporal Dead Zone (TDZ)", status: "Completed", lastStudied: "2026-10-01" },
      { id: "js-fund-types", name: "Data Types, Symbol, BigInt & Implicit Type Coercion", status: "Completed", lastStudied: "2026-10-02" },
      { id: "js-fund-[#08184A]scope", name: "Global, Function, Block Scopes & Lexical Scope Chain", status: "Completed", lastStudied: "2026-10-02" },
      { id: "js-fund-hoist", name: "Creation Phase Hoisting (Function Declarations vs Expressions)", status: "Completed", lastStudied: "2026-10-03" },
      { id: "js-[#08184A]closures", name: "Lexical Environment & Closures (Private State Data Encapsulation)", status: "Practicing", lastStudied: "2026-10-04" },
      { id: "js-func-hof", name: "Higher-Order Functions (map, filter, reduce) & Currying", status: "Learning" },
      { id: "js-func-iife", name: "IIFE & Module Pattern before ES6 Modules", status: "Completed" },
      { id: "js-func-this", name: "The 'this' Keyword Binding Rules (Implicit, Explicit, New, Default)", status: "Learning" },
      { id: "js-func-bind", name: "Explicit Binding Methods: call(), apply(), and bind() Polyfills", status: "Learning" },
      { id: "js-[#08184A]proto", name: "__proto__, prototype Property & Prototypal Chain Inheritance", status: "Not Started" },
      { id: "js-classes", name: "ES6 Classes, Private Fields (#), Static Methods, Getter/Setter", status: "Practicing" },
      { id: "js-async-loop", name: "V8 Engine Architecture: Call Stack, Web APIs, Event Loop", status: "Learning" },
      { id: "js-async-queue", name: "Microtask Queue (Promises, queueMicrotask) vs Macrotask Queue (setTimeout, I/O)", status: "Learning" },
      { id: "js-async-promises", name: "Promise States, Chaining, & Error Catching", status: "Completed" },
      { id: "js-async-await", name: "Async / Await Syntax & Top-level await", status: "Completed" },
      { id: "js-async-combinators", name: "Promise.all, Promise.allSettled, Promise.race, & Promise.any", status: "Learning" },
      { id: "js-es6-destruct", name: "Destructuring, Rest/Spread & Shallow vs Deep Copy", status: "Completed" },
      { id: "js-es6-modules", name: "ES6 Modules (Named/Default import/export, Dynamic import)", status: "Completed" },
      { id: "js-es6-optional", name: "Optional Chaining (?.) & Nullish Coalescing (??)", status: "Completed" },
      { id: "js-adv-debounce", name: "Debouncing & Throttling (Custom Implementations from Scratch)", status: "Practicing" },
      { id: "js-adv-memo", name: "Memoization Caching & LRU Cache polyfill", status: "Not Started" },
      { id: "js-adv-[#08184A]mem", name: "V8 Memory Management, Garbage Collection & WeakMap/WeakSet", status: "Not Started" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Write Custom Debounced Search & Deep Object Clone Utility",
      description: "Implement custom `useDebounce` hook and deep cloning utility without lodash in Ritz admin dashboard to optimize search queries.",
      codeLocation: "src/lib/utils/debounce.ts",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-js-1",
        question: "Predict output: What is the execution order of console logs between Promise.then, setTimeout(0), queueMicrotask, and sync code?",
        answer: "Synchronous code executes first, followed by Microtask queue (Promise.then, queueMicrotask), followed by Macrotask queue (setTimeout, setInterval, I/O).",
        difficulty: "Hard"
      },
      {
        id: "q-js-2",
        question: "How does prototypal inheritance differ from classical inheritance in OOP?",
        answer: "JavaScript objects inherit properties directly from other objects via the prototype chain linkage, whereas classical languages copy methods from class templates during instantiation.",
        difficulty: "Medium"
      }
    ]
  },

  // 2. REACT — CRITICAL
  {
    id: "react",
    stepOrder: 2,
    title: "2. React Engineering & Fiber Architecture",
    priority: "Critical",
    description: "Component lifecycle, Virtual DOM diffing, Fiber reconciliation, state batching, custom hooks, & performance optimization.",
    prerequisites: ["JavaScript ES6+", "Promises & Async Control Flow"],
    checkpoint: "You can build custom hooks for form state and API fetching with auto-retry, and explain React Fiber work units & re-render triggers.",
    iconName: "Atom",
    whatToLearn: [
      "Beginner: JSX syntax, Functional components, Props vs State, Synthetic Event System, Form inputs.",
      "Intermediate: useEffect lifecycle & cleanup, useRef DOM access, useContext context splitting, Controlled vs Uncontrolled inputs, Error Boundaries.",
      "Advanced: React Fiber architecture (Current vs Work-in-Progress tree), Concurrent React (useTransition, useDeferredValue), Custom Hooks design patterns, Memoization (React.memo, useMemo, useCallback), & Profiler profiling."
    ],
    subtopics: [
      { id: "react-components", name: "Functional Components, JSX Transpilation & React Element tree", status: "Completed" },
      { id: "react-props-[#08184A]state", name: "Props, Immutability & Automatic State Batching (React 18/19)", status: "Completed" },
      { id: "react-[#08184A]fiber", name: "Virtual DOM Reconciliation, Diffing Heuristics & React Fiber Architecture", status: "Learning" },
      { id: "react-hooks-usestate", name: "useState Hook, Functional Updates & Lazy Initializers", status: "Completed" },
      { id: "react-hooks-useeffect", name: "useEffect Dependencies, Render Cycles & Unmount Cleanup", status: "Completed" },
      { id: "react-hooks-usememo", name: "useMemo & useCallback Memoization to prevent child re-renders", status: "Practicing" },
      { id: "react-hooks-useref", name: "useRef for Mutable State & Direct DOM Element references", status: "Completed" },
      { id: "react-hooks-usecontext", name: "useContext API, Context Splitting & Re-render Caveats", status: "Completed" },
      { id: "react-[#08184A]custom-hooks", name: "Custom Hooks (useFetch, useLocalStorage, useWindowSize)", status: "Practicing" },
      { id: "react-concurrent", name: "Concurrent React: useTransition & useDeferredValue for non-blocking UI", status: "Learning" },
      { id: "react-forms", name: "Controlled vs Uncontrolled Components & React Hook Form integration", status: "Completed" },
      { id: "react-[#08184A]error-bounds", name: "Error Boundaries (componentDidCatch / react-error-boundary)", status: "Learning" },
      { id: "react-[#08184A]perf", name: "Performance Profiling (React DevTools, Code Splitting, Dynamic Imports)", status: "Practicing" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Build Accessible Modal, Toast System & Custom Form Hook",
      description: "Build a production-grade accessible modal component using React Portal, toast notifications, and `useFormValidation` custom hook for Ritz lead generation.",
      codeLocation: "src/components/common/Modal.tsx",
      status: "Completed"
    },
    questions: [
      {
        id: "q-react-1",
        question: "How does React Fiber enable non-blocking concurrent rendering?",
        answer: "React Fiber splits rendering work into small units (fibers) that can be paused, prioritized, or aborted across browser frame animations to ensure smooth UI interaction.",
        difficulty: "Hard"
      },
      {
        id: "q-react-2",
        question: "Why should you pass functions to setState when new state depends on previous state?",
        answer: "Because state updates are batched asynchronously, referencing state variable directly inside rapid updates might read stale state, whereas functional updater `setState(prev => prev + 1)` receives latest queued state.",
        difficulty: "Medium"
      }
    ]
  },

  // 3. NEXT.JS — CRITICAL
  {
    id: "nextjs",
    stepOrder: 3,
    title: "3. Next.js 16 (App Router & Server Infrastructure)",
    priority: "Critical",
    description: "App Router directory, React Server Components (RSC), SSR/SSG/ISR, Server Actions, 4-tier Caching, & Core Web Vitals.",
    prerequisites: ["React Core & Hooks"],
    checkpoint: "You can build a dynamic production route utilizing RSC, Server Actions with Zod validation, ISR revalidation, and next/image optimization.",
    iconName: "Layers",
    whatToLearn: [
      "Beginner: App Router file conventions (page, layout, template, loading, error, not-found), Dynamic routing.",
      "Intermediate: Server vs Client components boundaries, Route Handlers (GET/POST), Server Actions, Metadata API & OpenGraph tags.",
      "Advanced: Next.js 4-tier Caching Architecture (Request Memoization, Data Cache, Full Route Cache, Router Cache), Incremental Static Regeneration (ISR), Streaming with Suspense, Middleware, & Core Web Vitals (LCP, CLS, INP)."
    ],
    subtopics: [
      { id: "next-app-router", name: "App Router Directory Hierarchy (layout.tsx, page.tsx, loading.tsx, error.tsx)", status: "Completed" },
      { id: "next-rsc", name: "React Server Components (RSC) vs Client Components ('use client' boundaries)", status: "Completed" },
      { id: "next-rendering", name: "Server-Side Rendering (SSR) & Static Site Generation (SSG)", status: "Completed" },
      { id: "next-isr", name: "Incremental Static Regeneration (ISR) & revalidatePath / revalidateTag", status: "Learning" },
      { id: "next-dynamic-routes", name: "Dynamic Routes, Catch-all ([...slug]), & Optional Segments", status: "Completed" },
      { id: "next-seo", name: "Dynamic Metadata API, generateMetadata, Sitemaps & OpenGraph tags", status: "Completed" },
      { id: "next-[#08184A]caching", name: "Next.js 4-Tier Caching (Request Memoization, Data Cache, Full Route & Router Cache)", status: "Practicing" },
      { id: "next-server-actions", name: "Server Actions, Form Mutation, useActionState & Optimistic Updates", status: "Practicing" },
      { id: "next-route-handlers", name: "Route Handlers (api/route.ts), Web API Request/Response parsing", status: "Completed" },
      { id: "next-middleware", name: "Next.js Middleware (Edge Runtime, JWT verification, Redirects)", status: "Learning" },
      { id: "next-optimization", name: "Asset Optimization: next/image, next/font, & Script loading strategies", status: "Completed" },
      { id: "next-vitals", name: "Core Web Vitals Optimization (LCP, CLS, INP) & Streaming Suspense", status: "Practicing" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Build Full Dynamic Product Catalog with Server Actions & ISR",
      description: "Create Next.js Server Components for `/products/[slug]` with dynamic metadata tags, next/image optimization, and Server Actions for processing checkout requests.",
      codeLocation: "src/app/products/page.tsx",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-next-1",
        question: "Explain the difference between Next.js Data Cache and Request Memoization.",
        answer: "Request Memoization deduplicates identical fetch requests within the lifetime of a single render request tree. Data Cache persists fetch results across separate HTTP requests and deployments until explicitly revalidated.",
        difficulty: "Hard"
      }
    ]
  },

  // 4. BACKEND / NODE.JS — CRITICAL
  {
    id: "backend",
    stepOrder: 4,
    title: "4. Backend Architecture & Node.js Runtime",
    priority: "Critical",
    description: "Node.js event-driven architecture, Express server pipeline, JWT auth flow, HttpOnly cookies, RBAC, Rate Limiting & Security.",
    prerequisites: ["JavaScript Async/Await", "HTTP Protocols & Status Codes"],
    checkpoint: "You can implement a secure authentication REST API with JWT access/refresh token rotation, HttpOnly cookies, and RBAC middleware.",
    iconName: "Server",
    whatToLearn: [
      "Beginner: Node.js global modules, CommonJS vs ES Modules, File System (fs), HTTP module, Express setup.",
      "Intermediate: Express Middleware chain, Input validation (Zod), REST API standards, Error handling middleware, File uploads.",
      "Advanced: Node.js Event Loop phases (Timers, Pending I/O, Poll, Check, Close), libuv Thread Pool, Stream processing, JWT Access/Refresh Token rotation in HttpOnly cookies, Role-Based Access Control (RBAC), Rate Limiting (Express-rate-limit/Redis), CORS & Helmet security."
    ],
    subtopics: [
      { id: "node-arch", name: "Node.js Single-Threaded Architecture, V8 Engine & libuv Thread Pool", status: "Learning" },
      { id: "node-event-loop", name: "Event Loop Phases: Timers, Pending Callbacks, Poll, Check (setImmediate), Close", status: "Learning" },
      { id: "express-pipeline", name: "Express Architecture: Request/Response Pipeline & Custom Middleware", status: "Completed" },
      { id: "rest-standards", name: "REST API Architectural Principles, Idempotency & HTTP Response Codes", status: "Completed" },
      { id: "val-zod", name: "Input Request Validation with Zod Schema Sanitization", status: "Practicing" },
      { id: "auth-jwt", name: "JWT Authentication: Short-lived Access Token & Long-lived Refresh Token Flow", status: "Practicing" },
      { id: "auth-cookies", name: "Security Cookies: HttpOnly, SameSite (Strict/Lax), Secure, & CSURF Protection", status: "Learning" },
      { id: "rbac-auth", name: "Role-Based Access Control (RBAC) & Dynamic Permission Evaluation", status: "Practicing" },
      { id: "pagination-[#08184A]filter", name: "Cursor-Based vs Offset Pagination, Sorting & Multi-Field Filtering", status: "Completed" },
      { id: "uploads-streams", name: "File Uploads (Multer), Buffer vs Stream Processing & S3 Piping", status: "Learning" },
      { id: "rate-limit", name: "Rate Limiting Middleware & DDoS Protection", status: "Learning" },
      { id: "security-headers", name: "Security Hardening: Helmet Security Headers, CORS, Rate Limits, & Pino Logging", status: "Practicing" }
    ],
    practiceTask: {
      title: "Practice in Ritz: JWT Authentication & Admin RBAC System",
      description: "Implement secure HTTP-only refresh token rotation and RBAC middleware to protect Ritz client administration endpoints.",
      codeLocation: "src/app/api/admin/auth/route.ts",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-node-1",
        question: "Why store refresh tokens in HttpOnly cookies instead of LocalStorage?",
        answer: "LocalStorage is vulnerable to XSS (Cross-Site Scripting) attacks where malicious scripts can read tokens. HttpOnly cookies cannot be accessed via JavaScript `document.cookie`, mitigating XSS risks.",
        difficulty: "Medium"
      }
    ]
  },

  // 5. POSTGRESQL / SQL — CRITICAL
  {
    id: "postgres",
    stepOrder: 5,
    title: "5. PostgreSQL & Database Engineering",
    priority: "Critical",
    description: "Relational data modeling, Complex Joins, CTEs, Window Functions, B-Tree Indexes, EXPLAIN ANALYZE tuning, & ACID.",
    prerequisites: ["Relational Database Basics"],
    checkpoint: "You can write complex SQL queries using Window Functions and CTEs, analyze execution plans with EXPLAIN ANALYZE, and create composite B-Tree indexes.",
    iconName: "Database",
    whatToLearn: [
      "Beginner: DDL & DML statements, Primary/Foreign keys, Data types, Basic SELECT/INSERT/UPDATE/DELETE.",
      "Intermediate: INNER/LEFT/RIGHT/FULL JOINs, GROUP BY aggregations, Subqueries, Normalization (1NF to 3NF).",
      "Advanced: Common Table Expressions (CTEs) & Recursive CTEs, Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG), Indexing strategies (B-Tree, Hash, Composite Indexes), Leftmost Prefix Rule, Query optimization via EXPLAIN ANALYZE, ACID Transactions & Isolation Levels (Read Committed, Serializable)."
    ],
    subtopics: [
      { id: "sql-ddl-dml", name: "SQL DDL (CREATE, ALTER, DROP) & DML (INSERT, UPDATE, DELETE) Operations", status: "Completed" },
      { id: "sql-joins", name: "Relational Joins: INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER, CROSS JOIN", status: "Completed" },
      { id: "sql-subqueries", name: "Correlated & Non-Correlated Subqueries in SELECT / WHERE clauses", status: "Practicing" },
      { id: "sql-aggregations", name: "Aggregations: GROUP BY, HAVING, COUNT, SUM, AVG, MIN/MAX", status: "Completed" },
      { id: "sql-ctes", name: "Common Table Expressions (WITH clause) & Recursive CTE Hierarchy Tree Queries", status: "Learning" },
      { id: "sql-window", name: "Window Functions: OVER(), ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG()", status: "Learning" },
      { id: "sql-indexes", name: "Indexing: B-Tree Index Mechanics, Composite Indexes, Partial Indexes & Covered Queries", status: "Learning" },
      { id: "sql-acid", name: "ACID Guarantees, Database Transactions (BEGIN, COMMIT, ROLLBACK), Isolation Levels", status: "Learning" },
      { id: "sql-norm", name: "Database Normalization (1NF, 2NF, 3NF, BCNF) & Denormalization tradeoff", status: "Completed" },
      { id: "sql-explain", name: "Query Performance Engineering: EXPLAIN ANALYZE, Sequential Scan vs Index Scan", status: "Not Started" },
      { id: "sql-pagination", name: "Pagination Engineering: Keyset (Seek) Pagination vs OFFSET Limit scaling", status: "Practicing" }
    ],
    practiceTask: {
      title: "Practice in Ritz: PostgreSQL Schema Design & Keyset Lead Pagination",
      description: "Design PostgreSQL schema for Ritz leads & orders with B-Tree indexes on created_at and implement Keyset pagination SQL queries.",
      codeLocation: "src/lib/db/schema.sql",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-sql-1",
        question: "Difference between RANK() and DENSE_RANK() window functions?",
        answer: "RANK() skips rank numbers after ties (e.g., 1, 2, 2, 4), whereas DENSE_RANK() does not skip rank numbers (e.g., 1, 2, 2, 3).",
        difficulty: "Medium"
      }
    ]
  },

  // 6. PYTHON + FASTAPI — HIGH
  {
    id: "python-fastapi",
    stepOrder: 6,
    title: "6. Python 3.12 & FastAPI Microservices",
    priority: "High",
    description: "Async Python, Pydantic V2 validation, Dependency Injection (`Depends`), Async SQLAlchemy ORM & Microservice API design.",
    prerequisites: ["REST API Concepts", "Basic Python Syntax"],
    checkpoint: "You can write a FastAPI microservice with Pydantic schema validation, async database access via SQLAlchemy, and dependency injection auth.",
    iconName: "Terminal",
    whatToLearn: [
      "Beginner: Python 3.12 syntax, Lists, Dicts, Tuples, Sets, Functions, Type Hints.",
      "Intermediate: OOP (Classes, Inheritance), Decorators, Generators, Exceptions, Virtual environments.",
      "Advanced: Asyncio event loop, coroutines (`async/await`), FastAPI APIRouter, Pydantic V2 data validation, FastAPI Dependency Injection system (`Depends`), Async SQLAlchemy 2.0 ORM, Alembic migrations, & OpenAPI Swagger auto-docs."
    ],
    subtopics: [
      { id: "py-fund", name: "Python 3.12 Fundamentals, Data Structures & Strict Type Hints", status: "Completed" },
      { id: "py-oop", name: "OOP Principles, Custom Decorators, Iterators & Generator Expressions", status: "Completed" },
      { id: "py-asyncio", name: "Async Python: Asyncio Event Loop, Coroutines & Tasks (async/await)", status: "Learning" },
      { id: "fastapi-router", name: "FastAPI APIRouter, Path/Query Parameters & Automatic OpenAPI Docs", status: "Completed" },
      { id: "fastapi-pydantic", name: "Pydantic V2 Data Models, Field Validation & Serialization", status: "Completed" },
      { id: "fastapi-deps", name: "FastAPI Dependency Injection System (`Depends`)", status: "Practicing" },
      { id: "fastapi-sqlalchemy", name: "Async SQLAlchemy 2.0 ORM Engine, AsyncSession & Alembic Migrations", status: "Learning" },
      { id: "fastapi-auth", name: "OAuth2 Password Bearer Hashing (Passlib / bcrypt) & JWT token validation", status: "Practicing" }
    ],
    practiceTask: {
      title: "Practice in Ritz: FastAPI Microservice for AI Recommendation & Lead Scoring",
      description: "Build a standalone Python FastAPI microservice interfacing with Google Gemini API for leads analysis and product recommendation scoring.",
      codeLocation: "services/analytics-api/main.py",
      status: "Pending"
    },
    questions: [
      {
        id: "q-py-1",
        question: "How does FastAPI Dependency Injection (`Depends`) benefit clean architecture?",
        answer: "It handles request-scoped instances (like database sessions or auth checks), decouples route logic from dependencies, and simplifies unit testing via dependency overrides.",
        difficulty: "Medium"
      }
    ]
  },

  // 7. DSA — HIGH
  {
    id: "dsa",
    stepOrder: 7,
    title: "7. Data Structures & Algorithms (100–120 Problem Roadmap)",
    priority: "High",
    description: "Pattern-based DSA problem solving: Two Pointers, Sliding Window, Monotonic Stack, BFS/DFS, Binary Search & Dynamic Programming.",
    prerequisites: ["Programming Language Core (JS or Python)"],
    targetCount: 120,
    checkpoint: "You have solved 100+ problems across 10 major patterns and can explain Time/Space complexity using Big-O notation.",
    iconName: "Binary",
    whatToLearn: [
      "Beginner: Time & Space Complexity (Big-O), Arrays, Strings, HashMap lookup patterns.",
      "Intermediate: Two Pointers, Sliding Window, Linked List, Stack, Queue, Binary Search space reduction.",
      "Advanced: Binary Tree DFS/BFS traversal, Graph algorithms (DFS, BFS, Dijkstra, Topological Sort), Dynamic Programming (Memoization & Tabulation)."
    ],
    subtopics: [
      { id: "dsa-bigo", name: "Big-O Notation: Time Complexity & Space Complexity Analysis", status: "Completed" },
      { id: "dsa-arrays-ptrs", name: "Array & String Patterns: Two Pointers (Inward / Same Direction)", status: "Practicing" },
      { id: "dsa-sliding-window", name: "Sliding Window Pattern (Fixed & Dynamic Window Sizes)", status: "Practicing" },
      { id: "dsa-hashmap", name: "HashMap & HashSet Lookup Patterns for O(1) Frequency Counting", status: "Completed" },
      { id: "dsa-stack", name: "Stack Data Structure & Monotonic Stack Pattern", status: "Practicing" },
      { id: "dsa-linkedlist", name: "Linked List Manipulation (Fast & Slow Pointers, Reversal)", status: "Completed" },
      { id: "dsa-binarysearch", name: "Binary Search & Search Space Reduction Algorithm", status: "Practicing" },
      { id: "dsa-trees", name: "Binary Trees & BST: DFS (Inorder, Preorder, Postorder) & BFS Level Order", status: "Learning" },
      { id: "dsa-graphs", name: "Graph Algorithms: Matrix/Adjacency List DFS, BFS, Dijkstra & Topological Sort", status: "Learning" },
      { id: "dsa-sorting", name: "Sorting Algorithms: Merge Sort, Quick Sort & Counting Sort", status: "Completed" }
    ],
    dsaProblems: [
      // Arrays & Two Pointers
      { id: "p1", title: "Two Sum", pattern: "HashMap", difficulty: "Easy", status: "Completed", notes: "Use HashMap for O(n) time." },
      { id: "p2", title: "Best Time to Buy and Sell Stock", pattern: "Two Pointers", difficulty: "Easy", status: "Completed" },
      { id: "p3", title: "Contains Duplicate", pattern: "HashMap", difficulty: "Easy", status: "Completed" },
      { id: "p4", title: "Valid Anagram", pattern: "HashMap", difficulty: "Easy", status: "Completed" },
      { id: "p5", title: "Group Anagrams", pattern: "HashMap", difficulty: "Medium", status: "Completed" },
      { id: "p6", title: "Product of Array Except Self", pattern: "Arrays", difficulty: "Medium", status: "Completed" },
      { id: "p7", title: "Maximum Subarray (Kadane's Algorithm)", pattern: "Arrays", difficulty: "Medium", status: "Completed" },
      { id: "p8", title: "3Sum", pattern: "Two Pointers", difficulty: "Medium", status: "Practicing" },
      { id: "p9", title: "Container With Most Water", pattern: "Two Pointers", difficulty: "Medium", status: "Practicing" },
      { id: "p10", title: "Trapping Rain Water", pattern: "Two Pointers / Stack", difficulty: "Hard", status: "Learning" },

      // Sliding Window
      { id: "p11", title: "Longest Substring Without Repeating Characters", pattern: "Sliding Window", difficulty: "Medium", status: "Practicing" },
      { id: "p12", title: "Longest Repeating Character Replacement", pattern: "Sliding Window", difficulty: "Medium", status: "Learning" },
      { id: "p13", title: "Minimum Window Substring", pattern: "Sliding Window", difficulty: "Hard", status: "Not Started" },

      // Stack & Queue
      { id: "p14", title: "Valid Parentheses", pattern: "Stack", difficulty: "Easy", status: "Completed" },
      { id: "p15", title: "Min Stack", pattern: "Stack", difficulty: "Medium", status: "Completed" },
      { id: "p16", title: "Daily Temperatures", pattern: "Monotonic Stack", difficulty: "Medium", status: "Learning" },

      // Binary Search
      { id: "p17", title: "Binary Search", pattern: "Binary Search", difficulty: "Easy", status: "Completed" },
      { id: "p18", title: "Search in Rotated Sorted Array", pattern: "Binary Search", difficulty: "Medium", status: "Practicing" },
      { id: "p19", title: "Find Minimum in Rotated Sorted Array", pattern: "Binary Search", difficulty: "Medium", status: "Learning" },

      // Linked List
      { id: "p20", title: "Reverse Linked List", pattern: "Linked List", difficulty: "Easy", status: "Completed" },
      { id: "p21", title: "Merge Two Sorted Lists", pattern: "Linked List", difficulty: "Easy", status: "Completed" },
      { id: "p22", title: "Linked List Cycle (Floyd's Tortoise & Hare)", pattern: "Fast & Slow Pointers", difficulty: "Easy", status: "Completed" },

      // Trees & Graphs
      { id: "p23", title: "Invert Binary Tree", pattern: "Trees DFS", difficulty: "Easy", status: "Completed" },
      { id: "p24", title: "Maximum Depth of Binary Tree", pattern: "Trees DFS", difficulty: "Easy", status: "Completed" },
      { id: "p25", title: "Binary Tree Level Order Traversal", pattern: "BFS Queue", difficulty: "Medium", status: "Learning" },
      { id: "p26", title: "Number of Islands", pattern: "Graphs DFS/BFS", difficulty: "Medium", status: "Learning" },
      { id: "p27", title: "Clone Graph", pattern: "Graphs BFS", difficulty: "Medium", status: "Not Started" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Implement Custom LRU Cache & Trie Autocomplete Engine",
      description: "Implement a custom Trie data structure for instant client-side product search and an LRU cache for lead API responses.",
      codeLocation: "src/lib/algorithms/trie.ts",
      status: "Pending"
    },
    questions: [
      {
        id: "q-dsa-1",
        question: "How do you detect a cycle in a Linked List using O(1) memory?",
        answer: "Use Floyd's Cycle-Finding algorithm (Fast & Slow Pointers). Move slow pointer 1 step and fast pointer 2 steps. If they meet, a cycle exists.",
        difficulty: "Easy"
      }
    ]
  },

  // 8. SYSTEM DESIGN — HIGH
  {
    id: "system-design",
    stepOrder: 8,
    title: "8. System Design & Distributed Architecture",
    priority: "High",
    description: "High-level architecture, scalability, load balancing, caching strategies, replication, queues, CDN & storage.",
    prerequisites: ["Backend Engineering", "Database Concepts"],
    checkpoint: "You can design and sketch high-level architecture diagrams for URL Shorteners, Notification Systems, and E-commerce platforms.",
    iconName: "Network",
    whatToLearn: [
      "Beginner: Monolith vs Microservices, Horizontal vs Vertical scaling, Stateless web tier.",
      "Intermediate: Load Balancers (Round Robin, Least Connections, Consistent Hashing), Caching patterns (Cache-Aside, Write-Through), Database Read Replicas & Sharding.",
      "Advanced: Message Queues (RabbitMQ, Apache Kafka), Event-Driven Architecture, Rate Limiting algorithms (Token Bucket, Sliding Window Log), Content Delivery Networks (CDN), Object Storage (AWS S3), & CAP Theorem."
    ],
    subtopics: [
      { id: "sys-scale", name: "Scaling Concepts: Vertical vs Horizontal Scaling & Stateless App Architecture", status: "Completed" },
      { id: "sys-lb", name: "Load Balancers: Layer 4 vs Layer 7, Round Robin, Least Connections & Consistent Hashing", status: "Completed" },
      { id: "sys-caching", name: "Caching Patterns: Cache-Aside, Write-Through, Write-Back & Cache Eviction (LRU/LFU)", status: "Practicing" },
      { id: "sys-db-sharding", name: "Database Scaling: Read Replicas, Horizontal Partitioning (Sharding) & CAP Theorem", status: "Learning" },
      { id: "sys-queues", name: "Message Queues: Asynchronous Task Processing with RabbitMQ & Apache Kafka", status: "Learning" },
      { id: "sys-ratelimit", name: "Rate Limiting Algorithms: Token Bucket, Leaky Bucket, Sliding Window Counter", status: "Learning" },
      { id: "sys-cdn-s3", name: "Content Delivery: CDN Edge Caching & AWS S3 Object Storage Architecture", status: "Completed" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Architect Ritz Media World High-Availability System Design Document",
      description: "Draft comprehensive architecture diagram for Ritz Media World handling 100K daily active leads with CDN, Next.js, Redis, and Postgres Replicas.",
      codeLocation: "docs/architecture/system-design.md",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-sys-1",
        question: "Explain the CAP Theorem and why no distributed database can offer all three simultaneously.",
        answer: "CAP states a distributed system can only provide 2 of 3 guarantees: Consistency, Availability, and Partition Tolerance. Under network partitions (P), a system must trade off between Consistency (C) or Availability (A).",
        difficulty: "Hard"
      }
    ]
  },

  // 9. REDIS — MEDIUM
  {
    id: "redis",
    stepOrder: 9,
    title: "9. Redis In-Memory Data Store",
    priority: "Medium",
    description: "In-memory data structures, caching layers, TTL invalidation, session storage & pub/sub messaging.",
    prerequisites: ["Backend Fundamentals"],
    checkpoint: "You can implement Upstash/Redis caching for Next.js API route responses with TTL and keyspace invalidation.",
    iconName: "Zap",
    whatToLearn: [
      "Beginner: Redis CLI, Key-Value data types (Strings, Hashes, Lists, Sets, Sorted Sets).",
      "Intermediate: TTL expiration, Caching API responses, Session store management.",
      "Advanced: Cache invalidation strategies, Distributed locks (Redlock), Redis Sliding Window Rate Limiting, Pub/Sub messaging & Redis Streams."
    ],
    subtopics: [
      { id: "redis-kv", name: "Redis Core Data Types: Strings, Hashes, Lists, Sets, Sorted Sets", status: "Completed" },
      { id: "redis-caching", name: "API Response Caching & TTL Expiration Policies (maxmemory-policy)", status: "Practicing" },
      { id: "redis-invalidation", name: "Cache Invalidation Strategies & Keyspace Notifications", status: "Learning" },
      { id: "redis-sessions", name: "Session Storage & Sliding Window Counter Rate Limiting", status: "Learning" },
      { id: "redis-pubsub", name: "Pub/Sub Messaging & Redis Streams for real-time notifications", status: "Not Started" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Cache Product Catalog & Gemini API Rate Limits",
      description: "Implement Upstash/Redis caching layer for `/api/products` and rate-limit user requests to the Ritz AI assistant.",
      codeLocation: "src/lib/redis.ts",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-redis-1",
        question: "What is the difference between volatile-lru and allkeys-lru eviction policies in Redis?",
        answer: "volatile-lru evicts the least recently used keys among those with an explicit TTL expiration set, whereas allkeys-lru evicts LRU keys across the entire dataset regardless of TTL.",
        difficulty: "Medium"
      }
    ]
  },

  // 10. AWS — MEDIUM
  {
    id: "aws",
    stepOrder: 10,
    title: "10. AWS Cloud Infrastructure",
    priority: "Medium",
    description: "Cloud deployment fundamentals: EC2 instance setup, S3 presigned URLs, RDS PostgreSQL, CloudFront CDN, & IAM security policies.",
    prerequisites: ["Linux CLI Basics", "Networking Principles"],
    checkpoint: "You can configure an S3 bucket with CORS policies and issue presigned URLs for media upload.",
    iconName: "Cloud",
    whatToLearn: [
      "Beginner: AWS Management Console, EC2 instance setup, SSH keys, Security Groups.",
      "Intermediate: S3 Buckets, CORS configuration, Presigned URLs, CloudFront CDN Edge locations.",
      "Advanced: RDS PostgreSQL instances, IAM Roles & Policies (Least Privilege), VPC Subnets, Internet Gateways & Route 53 DNS."
    ],
    subtopics: [
      { id: "aws-ec2", name: "Amazon EC2 Instance Provisioning, SSH Key Pair & Security Group Ingress/Egress Rules", status: "Completed" },
      { id: "aws-s3", name: "Amazon S3 Buckets, Presigned Upload URLs & CORS Policy Configuration", status: "Practicing" },
      { id: "aws-rds", name: "Amazon RDS PostgreSQL Setup, Connection Pooling & Automated Backups", status: "Learning" },
      { id: "aws-cloudfront", name: "CloudFront CDN Distributions & Custom SSL Edge Certificates", status: "Learning" },
      { id: "aws-iam", name: "IAM Security: Roles, Policies & Least Privilege User Management", status: "Practicing" },
      { id: "aws-vpc", name: "Basic VPC Subnets, Route Tables, Internet Gateways & Route 53 DNS Routing", status: "Not Started" }
    ],
    practiceTask: {
      title: "Practice in Ritz: S3 Presigned URL Media Upload Service",
      description: "Configure AWS S3 bucket integration to generate secure presigned upload URLs for client media collateral.",
      codeLocation: "src/lib/aws/s3.ts",
      status: "Pending"
    },
    questions: [
      {
        id: "q-aws-1",
        question: "Why should web servers generate S3 Presigned URLs instead of proxying file uploads through backend routes?",
        answer: "Presigned URLs allow clients to upload directly to S3, saving server bandwidth, CPU, and avoiding server timeout issues for large files.",
        difficulty: "Medium"
      }
    ]
  },

  // 11. DOCKER + CI/CD — MEDIUM
  {
    id: "docker-cicd",
    stepOrder: 11,
    title: "11. Docker & GitHub Actions CI/CD",
    priority: "Medium",
    description: "Containerization, Multi-stage Dockerfiles, Docker Compose orchestration, & GitHub Actions automated build pipelines.",
    prerequisites: ["Linux Terminal CLI"],
    checkpoint: "You can containerize a Next.js application using a multi-stage Dockerfile and write a GitHub Actions workflow for automated testing.",
    iconName: "Container",
    whatToLearn: [
      "Beginner: Docker CLI, Containers vs VMs, Images, Dockerfile basic instructions.",
      "Intermediate: Multi-stage Docker builds, Layer caching, Docker Compose for local multi-container development.",
      "Advanced: GitHub Actions workflows, YAML syntax, CI test & lint pipelines, Docker Registry publishing & automated deployments."
    ],
    subtopics: [
      { id: "doc-images", name: "Docker Architecture, Images, Layer Caching & Container Lifecycle", status: "Completed" },
      { id: "doc-file", name: "Multi-Stage Dockerfile for Next.js Production Size Optimization", status: "Practicing" },
      { id: "doc-compose", name: "Docker Compose Orchestration for Next.js + PostgreSQL + Redis", status: "Practicing" },
      { id: "cicd-actions", name: "GitHub Actions CI Workflows: Linting, Typecheck & Jest Unit Tests", status: "Learning" },
      { id: "cicd-deploy", name: "Automated Deployment Pipeline to Vercel / AWS EC2 Container Registry", status: "Learning" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Dockerize Ritz Next.js App & Setup GitHub Actions",
      description: "Create standalone Dockerfile and `.github/workflows/deploy.yml` pipeline that validates TypeScript and runs ESLint on pull requests.",
      codeLocation: "Dockerfile",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-docker-1",
        question: "How do multi-stage Docker builds reduce production image size?",
        answer: "By creating build stages, dev dependencies and intermediate build artifacts are discarded, leaving only the compiled production output in the final runner image.",
        difficulty: "Medium"
      }
    ]
  },

  // 12. TESTING — MEDIUM
  {
    id: "testing",
    stepOrder: 12,
    title: "12. Testing (Jest & React Testing Library)",
    priority: "Medium",
    description: "Unit testing, Integration testing, React component testing with user-event, & API mock handlers.",
    prerequisites: ["React Core"],
    checkpoint: "You can write unit tests for React components and integration tests for API route handlers using Jest.",
    iconName: "CheckSquare",
    whatToLearn: [
      "Beginner: Testing concepts, Assertion libraries, Jest configuration.",
      "Intermediate: React Testing Library queries, User Events, Async UI testing.",
      "Advanced: API mocking using MSW (Mock Service Worker), Spies, Mocks, & Test Coverage reporting."
    ],
    subtopics: [
      { id: "test-unit", name: "Unit Testing Fundamentals: Test Suites, Expectations & Assertions", status: "Completed" },
      { id: "test-jest", name: "Jest Configuration, Mock Functions (fn/spyOn) & Snapshot Testing", status: "Learning" },
      { id: "test-rtl", name: "React Testing Library: Queries (getBy, findBy), User Events & Async UI assertions", status: "Learning" },
      { id: "test-msw", name: "API Integration Testing with MSW (Mock Service Worker)", status: "Not Started" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Write Unit & Integration Tests for Lead Submission",
      description: "Write Jest tests verifying lead form input validations and API route responses.",
      codeLocation: "__tests__/lead-form.test.tsx",
      status: "Pending"
    },
    questions: [
      {
        id: "q-test-1",
        question: "Why does React Testing Library discourage testing implementation details like component state directly?",
        answer: "Testing user-visible behavior (DOM output and interactions) makes tests resilient to code refactoring, ensuring components work as users experience them.",
        difficulty: "Easy"
      }
    ]
  },

  // 13. GIT — MEDIUM
  {
    id: "git",
    stepOrder: 13,
    title: "13. Git & Professional Code Collaboration",
    priority: "Medium",
    description: "Advanced Git workflows, Interactive Rebase, Stashing, 3-Way Conflict Resolution, & Conventional Commits.",
    prerequisites: ["Terminal CLI"],
    checkpoint: "You can perform an interactive git rebase to squash commits and resolve 3-way merge conflicts.",
    iconName: "GitBranch",
    whatToLearn: [
      "Beginner: Git commit, branch, merge, status, diff.",
      "Intermediate: Interactive rebase (`git rebase -i`), Stashing, Cherry-picking.",
      "Advanced: 3-Way Merge Conflict resolution, Git Reflog recovery, & Conventional Commit standards."
    ],
    subtopics: [
      { id: "git-branching", name: "Git Feature Branching Strategy & Gitflow Principles", status: "Completed" },
      { id: "git-rebase", name: "Git Merge vs Git Interactive Rebase (`git rebase -i`) to Squash Commits", status: "Completed" },
      { id: "git-stash-cherry", name: "Stashing (`git stash`) & Cherry-Picking Commits across branches", status: "Completed" },
      { id: "git-reset", name: "Git Reset (Hard, Soft, Mixed) vs Git Revert", status: "Completed" },
      { id: "git-conflicts", name: "3-Way Conflict Resolution in VS Code / IDEs", status: "Completed" },
      { id: "git-[#08184A]commits", name: "Conventional Commit Specifications & Pull Request Review Standards", status: "Completed" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Clean Commit History & Feature Branch PR",
      description: "Use interactive git rebase to squash feature commits into clean logical units before merging into main branch.",
      codeLocation: ".git",
      status: "Completed"
    },
    questions: [
      {
        id: "q-git-1",
        question: "What is the difference between git reset --hard and git revert?",
        answer: "git reset --hard alters commit history by rewinding branch pointers and discarding local changes, whereas git revert creates a brand new commit that undoes specified changes safely.",
        difficulty: "Medium"
      }
    ]
  },

  // 14. INTERVIEW PREP — CRITICAL
  {
    id: "interview-prep",
    stepOrder: 14,
    title: "14. ₹10 LPA Interview Mastery & Portfolio Presentation",
    priority: "Critical",
    description: "Architectural elevator pitches, STAR method behavioral prep, System Design mock interviews, & Resume optimization.",
    prerequisites: ["Completion of Full-Stack Syllabus"],
    checkpoint: "You can deliver a 3-minute architectural pitch for Ritz Media World and pass live technical mock interviews.",
    iconName: "Briefcase",
    whatToLearn: [
      "Technical Q&A: Drilling JavaScript, React, Next.js, Node.js, and SQL core interview questions.",
      "Architectural Narrative: Crafting concise explanations of tech stack choices (RSC, Tailwind, Postgres, Redis).",
      "Behavioral Interviews: Answering HR scenarios using STAR methodology.",
      "Portfolio & Resume: Optimizing resume bullet points with quantifiable impact for ₹10 LPA roles."
    ],
    subtopics: [
      { id: "prep-js-qa", name: "JavaScript Core Engine & ES6 Polyfill Interview Q&A Drills", status: "Practicing" },
      { id: "prep-react-qa", name: "React Internals, Hooks & Fiber Reconciliation Interview Drills", status: "Practicing" },
      { id: "prep-next-qa", name: "Next.js App Router, Caching & RSC Architectural Interview Q&A", status: "Practicing" },
      { id: "prep-backend-qa", name: "Backend Security, Authentication & System Design Q&A", status: "Learning" },
      { id: "prep-sql-qa", name: "SQL Query Writing & Performance Optimization Drills", status: "Learning" },
      { id: "prep-project-pitch", name: "Ritz Media World 3-Minute Architectural Elevator Pitch", status: "Practicing" },
      { id: "prep-hr-star", name: "Behavioral HR Scenarios using STAR Method (Situation, Task, Action, Result)", status: "Completed" },
      { id: "prep-[#08184A]mocks", name: "Live Technical Mock Interviews (3 Solved)", status: "Practicing" },
      { id: "prep-[#08184A]resume", name: "₹10 LPA Resume Optimization & Portfolio Presentation", status: "Completed" }
    ],
    practiceTask: {
      title: "Practice in Ritz: Craft 3-Minute Architectural Elevator Pitch for Ritz Media World",
      description: "Prepare an articulate narrative explaining Ritz tech stack choices (Next.js 16 RSC, Tailwind, Gemini AI, Postgres, Redis) for ₹10 LPA interviews.",
      codeLocation: "docs/interview-pitch.md",
      status: "In Progress"
    },
    questions: [
      {
        id: "q-prep-1",
        question: "How do you explain your architecture choices for Ritz Media World in an interview?",
        answer: "Explain that Next.js 16 RSC was chosen for fast initial page load & dynamic SEO, Tailwind for rapid responsive styling, PostgreSQL with B-Tree indexes for structured relational data, and Redis for response caching & API rate limiting.",
        difficulty: "Medium"
      }
    ]
  }
];
