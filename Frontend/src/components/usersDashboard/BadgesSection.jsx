import { Award } from "lucide-react";
import { format } from "date-fns";

const rarityStyles = {
  common: {
    border: "border-muted-foreground/30",
    bg: "bg-muted/50",
    glow: "",
    label: "Common",
    labelColor: "text-muted-foreground",
  },
  rare: {
    border: "border-star-blue/50",
    bg: "bg-star-blue/10",
    glow: "hover:shadow-[0_0_20px_hsl(217_91%_60%/0.3)]",
    label: "Rare",
    labelColor: "text-star-blue",
  },
  epic: {
    border: "border-cosmic-purple/50",
    bg: "bg-cosmic-purple/10",
    glow: "hover:shadow-[0_0_20px_hsl(256_100%_68%/0.3)]",
    label: "Epic",
    labelColor: "text-cosmic-purple",
  },
  legendary: {
    border: "border-supernova-orange/50",
    bg: "bg-supernova-orange/10",
    glow: "hover:shadow-[0_0_25px_hsl(25_95%_53%/0.4)] animate-glow",
    label: "Legendary",
    labelColor: "text-supernova-orange",
  },
};

function BadgeSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="w-24 h-4 bg-muted rounded" />
          <div className="w-32 h-3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass-card p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
        <Award className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No Badges Yet</h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        Keep contributing to earn badges and showcase your achievements!
      </p>
    </div>
  );
}

export function BadgesSection({ badges, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Badges
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <BadgeSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Badges
        </h2>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Award className="w-5 h-5 text-primary" />
        Badges
        <span className="text-sm font-normal text-muted-foreground">({badges.length})</span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const rarity = rarityStyles[badge.rarity];
          
          return (
            <div
              key={badge.id}
              className={`glass-card p-4 border ${rarity.border} ${rarity.glow} transition-all duration-300 group cursor-default`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-xl ${rarity.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{badge.icon}</span>
                </div>
                
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {badge.name}
                </h3>
                
                <span className={`text-xs font-medium ${rarity.labelColor} mb-2`}>
                  {rarity.label}
                </span>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {badge.description}
                </p>
                
                <span className="text-xs text-muted-foreground/70">
                  {format(new Date(badge.earnedAt), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}