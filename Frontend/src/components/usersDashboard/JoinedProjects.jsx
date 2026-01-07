import { Star, GitFork, ExternalLink, Code2, FolderKanban } from "lucide-react";

const languageColors = {
  TypeScript: "bg-star-blue",
  JavaScript: "bg-supernova-orange",
  Python: "bg-galaxy-violet",
  Go: "bg-stellar-cyan",
  Rust: "bg-nebula-pink",
};

function ProjectSkeleton() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-32 h-5 bg-muted rounded" />
        <div className="w-16 h-5 bg-muted rounded" />
      </div>
      <div className="w-full h-4 bg-muted rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="w-16 h-6 bg-muted rounded-full" />
        <div className="w-16 h-6 bg-muted rounded-full" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-4 bg-muted rounded" />
        <div className="w-16 h-4 bg-muted rounded" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass-card p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
        <FolderKanban className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No Projects Yet</h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        You haven't joined any projects yet. Browse available projects and start contributing!
      </p>
    </div>
  );
}

export function JoinedProjects({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Joined Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          Joined Projects
        </h2>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Code2 className="w-5 h-5 text-primary" />
        Joined Projects
        <span className="text-sm font-normal text-muted-foreground">({projects.length})</span>
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-card p-5 glow-border group hover:bg-card/90 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${languageColors[project.language] || "bg-muted"}`} />
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
              </div>
              <a
                href={`https://github.com/${project.owner}/${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.openIssues} open issues
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
