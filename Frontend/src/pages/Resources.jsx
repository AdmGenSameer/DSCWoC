import { useState } from "react";
import {
  FileText,
  ExternalLink,
  BookOpen,
  Code,
  GitBranch,
  Terminal,
  Rocket,
  Star,
  Search,
  PlayCircle
} from "lucide-react";
import { Input } from "../components/Resources/Input.jsx";
import Starfield from "../components/Starfield.jsx";
import Navbar from "../components/Navbar.jsx";

const resources = [
  // Git & GitHub
  {
    id: "1",
    title: "Git and GitHub for Beginners - Crash Course",
    description: "Learn the basics of Git and GitHub in this comprehensive crash course. Perfect for beginners starting their open-source journey.",
    type: "video",
    category: "git",
    url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    thumbnail: "https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg",
    duration: "1:08:29",
    author: "freeCodeCamp"
  },
  {
    id: "2",
    title: "How to Create a Pull Request",
    description: "Step-by-step guide on creating your first pull request on GitHub. Essential for contributing to open-source projects.",
    type: "video",
    category: "git",
    url: "https://www.youtube.com/watch?v=8lGpZkjnkt4",
    thumbnail: "https://img.youtube.com/vi/8lGpZkjnkt4/maxresdefault.jpg",
    duration: "10:32",
    author: "GitHub"
  },
  {
    id: "3",
    title: "GitHub Official Documentation",
    description: "Complete documentation for GitHub features, workflows, and best practices.",
    type: "document",
    category: "git",
    url: "https://docs.github.com/en",
    author: "GitHub"
  },
  {
    id: "4",
    title: "Pro Git Book",
    description: "The entire Pro Git book, written by Scott Chacon and Ben Straub. Available for free online.",
    type: "document",
    category: "git",
    url: "https://git-scm.com/book/en/v2",
    author: "Scott Chacon"
  },
  // Added new document resources
  {
    id: "15",
    title: "GitHub Training Manual",
    description: "Official GitHub training kit with guides and resources for mastering GitHub workflows.",
    type: "document",
    category: "git",
    url: "https://github.github.com/training-kit/",
    author: "GitHub"
  },
  {
    id: "16",
    title: "Understanding the GitHub Flow",
    description: "A simple guide to understanding the GitHub Flow for collaborative development.",
    type: "document",
    category: "git",
    url: "https://guides.github.com/introduction/flow/",
    author: "GitHub"
  },
  {
    id: "17",
    title: "How to write the perfect pull request",
    description: "Best practices and tips for writing effective pull requests on GitHub.",
    type: "document",
    category: "git",
    url: "https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/",
    author: "GitHub"
  },
  {
    id: "18",
    title: "Learn GitLab with tutorials",
    description: "Official GitLab tutorials to help you get started with GitLab and its features.",
    type: "document",
    category: "git",
    url: "https://about.gitlab.com/get-started/",
    author: "GitLab"
  },
  {
    id: "19",
    title: "How to start a great OSS project",
    description: "A guide from GitLab on how to start and maintain a successful open source project.",
    type: "document",
    category: "git",
    url: "https://go.gitlab.com/Hm4BNB",
    author: "GitLab"
  },
  {
    id: "20",
    title: "5 things for your first time contributing",
    description: "Five essential tips from GitLab for making your first open source contribution.",
    type: "document",
    category: "git",
    url: "https://go.gitlab.com/nlPKcN",
    author: "GitLab"
  },
  {
    id: "21",
    title: "How open source contributions can boost your career",
    description: "Learn how contributing to open source can help you land a job and advance your career.",
    type: "document",
    category: "opensource",
    url: "https://opensource.com/article/19/5/how-get-job-doing-open-source",
    author: "opensource.com"
  },
  {
    id: "22",
    title: "How to write a good commit message",
    description: "A practical guide to writing clear and effective Git commit messages.",
    type: "document",
    category: "git",
    url: "https://dev.to/chrissiemhrk/git-commit-message-5e21",
    author: "dev.to"
  },
  // Open Source
  {
    id: "5",
    title: "How to Contribute to Open Source",
    description: "A complete guide to making your first open-source contribution. From finding projects to submitting PRs.",
    type: "video",
    category: "opensource",
    url: "https://www.youtube.com/watch?v=yzeVMecydCE",
    thumbnail: "https://img.youtube.com/vi/yzeVMecydCE/maxresdefault.jpg",
    duration: "25:47",
    author: "Eddie Jaoude"
  },
  {
    id: "6",
    title: "First Contributions Guide",
    description: "A hands-on tutorial that walks you through making your first contribution to open source.",
    type: "document",
    category: "opensource",
    url: "https://github.com/firstcontributions/first-contributions",
    author: "First Contributions"
  },
  {
    id: "7",
    title: "Open Source Guide",
    description: "Community guides for open-source creators. Learn how to launch and grow your project.",
    type: "document",
    category: "opensource",
    url: "https://opensource.guide/",
    author: "GitHub"
  },
  // Programming
  {
    id: "8",
    title: "JavaScript Full Course for Beginners",
    description: "Complete JavaScript tutorial for beginners. Learn JS fundamentals in one video.",
    type: "video",
    category: "programming",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    duration: "3:26:42",
    author: "freeCodeCamp"
  },
  {
    id: "13",
    title: "React Course for Beginners w/ Tailwind CSS [2025]",
    description: "Learn modern frontend web development using React and Tailwind CSS in this beginner course.",
    type: "video",
    category: "programming",
    url: "https://www.youtube.com/watch?v=IJ85kCdqWao",
    thumbnail: "https://i.ytimg.com/vi/IJ85kCdqWao/hqdefault.jpg",
    duration: "4:48:42",
    author: "freeCodeCamp"
  },
  {
    id: "14",
    title: "Intro to Backend Web Development – Node.js & Express Tutorial for Beginners",
    description: "This introductory guide teaches you how to construct a basic backend for a website using popular technologies like Node.js, Express.js, and the MongoDB NoSQL database. The tutorial covers the core components of backend development, walking you through the initial server setup, database connection, and code structure using a model, route, and controller pattern. You will learn to build practical APIs for user authentication, including password hashing, as well as full CRUD (Create, Read, Update, Delete) operations to manage data. Finally, the video demonstrates how to utilize Postman to test your server's requests and ensure your APIs are functioning correctly.",
    type: "video",
    category: "programming",
    url: "https://www.youtube.com/watch?v=KOutPbKc9UM",
    thumbnail: "https://i.ytimg.com/vi/KOutPbKc9UM/hqdefault.jpg",
    duration: "2:26:21",
    author: "freeCodeCamp"
  },
  {
    id: "9",
    title: "Python for Beginners",
    description: "Learn Python programming from scratch. Perfect for data science and automation.",
    type: "video",
    category: "programming",
    url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
    duration: "6:14:07",
    author: "Programming with Mosh"
  },
  {
    id: "10",
    title: "MDN Web Docs",
    description: "Resources for developers, by developers. The most comprehensive web development documentation.",
    type: "document",
    category: "programming",
    url: "https://developer.mozilla.org/",
    author: "Mozilla"
  },
  // Tools
  {
    id: "11",
    title: "VS Code Tutorial for Beginners",
    description: "Master Visual Studio Code with this complete tutorial. Tips, tricks, and essential extensions.",
    type: "video",
    category: "tools",
    url: "https://www.youtube.com/watch?v=WPqXP_kLzpo",
    thumbnail: "https://img.youtube.com/vi/WPqXP_kLzpo/maxresdefault.jpg",
    duration: "33:48",
    author: "freeCodeCamp"
  },
  {
    id: "12",
    title: "Linux Command Line Basics",
    description: "Essential command line skills for developers. Navigate, manage files, and run programs.",
    type: "video",
    category: "tools",
    url: "https://www.youtube.com/watch?v=oxuRxtrO2Ag",
    thumbnail: "https://i.ytimg.com/vi/oxuRxtrO2Ag/hqdefault.jpg",
    duration: "2:28:37",
    author: "freeCodeCamp"
  },
];

const categories = [
  { id: "all", label: "All Resources", icon: Star },
  { id: "git", label: "Git & GitHub", icon: GitBranch },
  { id: "opensource", label: "Open Source", icon: Rocket },
  { id: "programming", label: "Programming", icon: Code },
  { id: "tools", label: "Developer Tools", icon: Terminal },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const videoResources = filteredResources.filter((r) => r.type === "video");
  const documentResources = filteredResources.filter((r) => r.type === "document");

  return (
    <div className="min-h-screen bg-space-black relative overflow-x-hidden">
      <Starfield />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        {/* Hero Section */}
        <div className="pt-1 md:pt-10"></div>
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up pt-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-purple/10 border border-cosmic-purple/30 mb-6 shadow-lg shadow-cosmic-purple/10">
            <BookOpen className="w-4 h-4 text-cosmic-purple" />
            <span className="text-sm font-medium text-cosmic-purple">Learning Resources</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-stellar-cyan via-nebula-pink to-galaxy-violet animate-shimmer">
            Start Your Journey
          </h1>
          <p className="text-nebula-blue max-w-2xl mx-auto text-base sm:text-lg px-4">
            Curated resources to help you become a successful open-source contributor.<br />
            From Git basics to advanced programming concepts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
          <Search className="absolute left-5 sm:left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nebula-blue" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-midnight-blue/80 border-galaxy-violet/40 focus:border-stellar-cyan/70 text-white placeholder:text-nebula-blue"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2 sm:px-0">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                  border
                  ${isActive
                    ? "bg-gradient-to-r  text-white border-cosmic-purple shadow-lg shadow-cosmic-purple/25 animate-glow"
                    : "bg-midnight-blue/80 text-nebula-blue border-galaxy-violet/40 hover:text-white hover:bg-midnight-blue/90"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Video Resources Section */}
        {videoResources.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
              <div className="p-1.5 sm:p-2 rounded-lg bg-supernova-orange/20 shadow-md shadow-supernova-orange/10">
                <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-supernova-orange" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Video Tutorials</h2>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-midnight-blue text-nebula-blue">
                {videoResources.length} videos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {videoResources.map((resource, index) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-midnight-blue/80 rounded-xl border border-galaxy-violet/30 overflow-hidden hover:border-stellar-cyan/60 transition-all duration-300 hover:shadow-xl hover:shadow-stellar-cyan/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-black/90 via-space-black/10 to-transparent" />

                    {/* Duration Badge */}
                    {resource.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-space-black/90 text-xs font-medium text-nebula-blue border border-stellar-cyan/30">
                        {resource.duration}
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-supernova-orange/90 flex items-center justify-center shadow-lg shadow-supernova-orange/50 animate-float">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                        <PlayCircle className="w-8 h-8 text-white absolute" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base text-white mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-stellar-cyan transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-nebula-blue line-clamp-2 mb-2 sm:mb-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-nebula-blue truncate">{resource.author}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-stellar-cyan/10 text-stellar-cyan capitalize whitespace-nowrap flex-shrink-0">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Document Resources Section */}
        {documentResources.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
              <div className="p-1.5 sm:p-2 rounded-lg bg-cosmos-indigo/20 shadow-md shadow-cosmos-indigo/10">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-cosmos-indigo" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Documentation & Guides</h2>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-midnight-blue text-nebula-blue">
                {documentResources.length} docs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {documentResources.map((resource, index) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-midnight-blue/80 rounded-xl border border-galaxy-violet/30 hover:border-stellar-cyan/60 transition-all duration-300 hover:shadow-xl hover:shadow-stellar-cyan/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-cosmic-purple/20 to-nebula-blue/20 group-hover:from-cosmic-purple/30 group-hover:to-nebula-blue/30 transition-colors flex-shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-cosmic-purple" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-white mb-1 group-hover:text-stellar-cyan transition-colors flex items-center gap-2">
                      <span className="truncate">{resource.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </h3>
                    <p className="text-xs sm:text-sm text-nebula-blue line-clamp-2 mb-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs text-nebula-blue truncate">{resource.author}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-galaxy-violet/10 text-galaxy-violet capitalize whitespace-nowrap flex-shrink-0">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-midnight-blue/70 flex items-center justify-center">
              <Search className="w-10 h-10 text-nebula-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
            <p className="text-nebula-blue">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 sm:mt-16 text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cosmic-purple/10 via-nebula-blue/10 to-stellar-cyan/10 border border-cosmic-purple/20 shadow-lg shadow-cosmic-purple/10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
            Ready to Start Contributing?
          </h3>
          <p className="text-sm sm:text-base text-nebula-blue max-w-xl mx-auto px-4">
            Put your knowledge into practice. Join Winter of Code and start making your first contributions today!
          </p>
        </div>
      </main>
    </div>
  );
}
