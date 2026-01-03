import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';
import { 
  DollarSign, 
  Cloud, 
  Users, 
  Award, 
  Megaphone, 
  Rocket, 
  GraduationCap, 
  Globe, 
  Medal, 
  Link, 
  BookOpen,
  Trophy,
  Zap,
  Star,
  Moon,
  Telescope,
  Sparkles,
  Orbit,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom shimmer keyframes for CSS animations
const shimmerStyle = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  @keyframes subtle-float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  @keyframes star-twinkle {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
  
  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
    }
  }
  
  .shimmer {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }
  
  .subtle-float {
    animation: subtle-float 6s ease-in-out infinite;
  }
  
  .star-twinkle {
    animation: star-twinkle 3s ease-in-out infinite;
  }
  
  .glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
`;

// Inject shimmer styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerStyle;
  document.head.appendChild(style);
}

const RewardsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const prizePoolRef = useRef(null);
  const tiers = useRef([]);
  const rewardItemsRef = useRef([]);
  const progressBarRef = useRef(null);

  const rewardTypes = useMemo(() => [
    { icon: DollarSign, label: 'Cash Prizes' },
    { icon: Cloud, label: 'Cloud & Developer Credits' },
    { icon: Users, label: 'Leadership Opportunities' },
    { icon: Award, label: 'Verified Certificates & Digital Badges' },
    { icon: Megaphone, label: 'Public Recognition' },
  ], []);

  const leaderboardTiers = [
    {
      rank: '🥇 Top 1–5 Contributors',
      rankIcon: Trophy,
      title: 'Core Team Fast-Track',
      rewards: [
        { icon: Rocket, text: 'Direct invitation to join the DSCWoC Core Team' },
        { icon: GraduationCap, text: 'Work closely with mentors & organizers' },
        { icon: Cloud, text: 'Cloud Credits (AWS / DigitalOcean / Heroku / Supabase)' },
        { icon: Globe, text: 'Premium Developer Domain (1 year)' },
        { icon: Award, text: 'Elite Contributor Certificate' },
        { icon: Medal, text: '🌟 Legendary Badge' },
        { icon: Megaphone, text: 'Featured across official DSC platforms' },
      ],
      isGold: true,
      astronautIcon: Zap,
    },
    {
      rank: '🥈 Top 6–15 Contributors',
      rankIcon: Medal,
      title: 'Stellar Achievers',
      rewards: [
        { icon: Cloud, text: 'Cloud & SaaS Credits' },
        { icon: Globe, text: 'Free Developer Domain' },
        { icon: Award, text: 'Top Contributor – Verified Certificate' },
        { icon: Medal, text: '✨ Achiever Badge' },
        { icon: Megaphone, text: 'Public recognition on website & socials' },
      ],
      isSilver: true,
      astronautIcon: Zap,
    },
    {
      rank: '🌠 All Contributors',
      rankIcon: Award,
      title: 'Open Source Explorers',
      rewards: [
        { icon: Award, text: 'Verified Participation Certificate' },
        { icon: Medal, text: '🌌 Open Source Explorer Badge' },
        { icon: Link, text: 'GitHub-linked contribution record' },
        { icon: BookOpen, text: 'Access to expert sessions & workshops' },
      ],
      isBronze: true,
    },
  ];

  useEffect(() => {
    if (isMobile) return;

    // Animate title
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    }

    // Animate prize pool
    if (prizePoolRef.current) {
      gsap.from(prizePoolRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.2,
      });
    }

    // Animate reward items
    rewardItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: -30,
          duration: 0.6,
          delay: 0.3 + index * 0.1,
        });
      }
    });

    // Animate tier cards
    tiers.current.forEach((tier, index) => {
      if (tier) {
        gsap.from(tier, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.4 + index * 0.15,
        });
      }
    });

    // Animate progress bar
    if (progressBarRef.current) {
      const fills = progressBarRef.current.querySelectorAll('.progress-fill');
      fills.forEach((fill, index) => {
        gsap.from(fill, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          delay: 0.1 + index * 0.2,
          transformOrigin: 'left center',
        });
      });
    }

    return () => {
      // Kill all scroll triggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
      // Also kill all GSAP animations
      gsap.killTweensOf('*');
    };
  }, [isMobile]);

  return (
    <section 
      id="rewards"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950 overflow-hidden"
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebula effects */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
        
        {/* Constellation dots */}
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse" />
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-indigo-300/50 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
        
        {/* Orbital rings */}
        <div className="absolute top-1/3 right-20 w-32 h-32 border border-purple-500/20 rounded-full" style={{ transform: 'rotate(45deg)' }} />
        <div className="absolute bottom-1/4 left-20 w-40 h-40 border border-blue-500/15 rounded-full" style={{ transform: 'rotate(-30deg)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with cosmic theme */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h2 
              ref={titleRef}
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Cosmic Rewards
            </h2>
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="flex justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mb-4 text-center">
            Journey through our <span className="text-purple-300 font-semibold">reward galaxy</span>
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            In the vast universe of open source, every contribution creates ripples.
            Navigate through our cosmic reward system where your efforts illuminate the path to recognition, growth, and stellar opportunities.
          </p>
          <p className="text-sm sm:text-base text-purple-400 italic flex items-center justify-center gap-2">
            <Moon className="w-4 h-4 animate-pulse" />
            <span>✨ New celestial rewards unlock as your journey progresses.</span>
            <Moon className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </p>
        </div>

        {/* Mobile Mission Briefing */}
        {isMobile && (
          <div className="sm:hidden mb-12 px-3">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-br from-slate-900/70 via-indigo-900/60 to-purple-900/60 backdrop-blur-lg p-6 shadow-lg shadow-purple-900/30">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-blue-500/15 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center gap-2 text-purple-200 font-semibold text-lg mb-2">
                <Telescope className="w-5 h-5 text-purple-300" />
                <span>Mission Briefing</span>
              </div>
              <p className="relative z-10 text-sm text-gray-200 mt-1">
                Plot your course in under a minute. Follow these checkpoints to reach Legendary.
              </p>

              <ul className="relative z-10 mt-4 space-y-3 text-sm text-gray-100">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-300 mt-0.5" />
                  <span>Check open issues and pick a task aligned with your skills.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-300 mt-0.5" />
                  <span>Ship thoughtful PRs—include context, screenshots, and tests when possible.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-300 mt-0.5" />
                  <span>Log progress, help peers in discussions, and keep momentum daily.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-300 mt-0.5" />
                  <span>Climb tiers: Explorer → Achiever → Legendary to unlock ₹ 50,000+ rewards.</span>
                </li>
              </ul>

              <div className="relative z-10 mt-5 flex items-center gap-2 text-xs text-purple-200">
                <Sparkles className="w-4 h-4" />
                <span>Tip: small, consistent commits beat giant drops.</span>
              </div>
            </div>
          </div>
        )}

        {/* Cosmic Prize Pool */}
        <div 
          ref={prizePoolRef}
          className="relative bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-2xl p-8 sm:p-12 text-center mb-16 backdrop-blur-sm overflow-hidden hover:border-purple-400/80 transition-all duration-500"
        >
          {/* Shimmer overlay on hover */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 shimmer bg-gradient-to-r from-transparent via-purple-200/20 to-transparent pointer-events-none" />

          {/* Orbiting stars effect */}
          <div className="absolute top-2 right-2">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
          <div className="absolute bottom-2 left-2">
            <Star className="w-5 h-5 text-purple-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
            <Orbit className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '20s' }} />
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Stellar Prize Pool
            </h3>
            <Orbit className="w-8 h-8 text-pink-400 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          </div>
          <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent relative z-10">
            ₹ 50,000+ worth of cosmic rewards & opportunities
          </p>
          <p className="text-sm text-gray-300 mt-3 flex items-center justify-center gap-2 relative z-10">
            <Rocket className="w-4 h-4" />
            Spanning across the entire reward constellation
          </p>
        </div>

        {/* Reward Constellations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {rewardTypes.map((reward, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) rewardItemsRef.current[index] = el;
              }}
              className="relative group bg-gradient-to-br from-white/5 to-white/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-white/20 rounded-xl p-6 text-center transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:border-purple-400/50 overflow-hidden"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Twinkling star corner */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
              
              <div className="flex justify-center mb-3 relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                <reward.icon className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors relative z-10 subtle-float" />
              </div>
              <p className="text-white font-semibold text-sm">{reward.label}</p>
            </div>
          ))}
        </div>

        {/* Celestial Tier System */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Celestial Achievement Tiers
              </h3>
              <Star className="w-6 h-6 text-blue-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <p className="text-gray-400 mb-4">Ascend through the cosmos based on your contributions</p>
            <p className="text-sm text-purple-300 italic mb-8">Rewards are based on contribution quality, consistency, and impact.</p>

            {/* Tier Progression Bar - Hidden on Mobile */}
            <div 
              ref={progressBarRef}
              className="hidden sm:flex items-center justify-between gap-4 max-w-3xl mx-auto mb-12 px-4"
            >
              {/* Core Team - Legendary */}
              <div className="flex flex-col items-center flex-1">
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-500/40 to-orange-600/40 border-2 border-yellow-300/80 flex items-center justify-center shadow-2xl shadow-yellow-500/50 glow-pulse">
                    <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-200 animate-pulse" />
                  </div>
                  <Rocket className="absolute -top-1 -right-1 w-4 h-4 text-pink-400 animate-bounce" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-yellow-300">Legendary</p>
                <p className="text-xs text-gray-500">Top 1–5</p>
              </div>

              {/* Arrow with line */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-1 mb-2">
                  <div className="progress-fill h-full bg-gradient-to-r from-yellow-400 via-slate-400 to-orange-400 rounded-full opacity-0" />
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse hidden sm:block" />
              </div>

              {/* Stellar Achievers */}
              <div className="flex flex-col items-center flex-1">
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-500/30 to-slate-600/30 border-2 border-slate-300/60 flex items-center justify-center shadow-lg glow-pulse" style={{ animationDelay: '0.3s' }}>
                    <Star className="w-7 h-7 sm:w-8 sm:h-8 text-slate-200" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-slate-300 animate-spin" style={{ animationDelay: '0.5s' }} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-300">Achiever</p>
                <p className="text-xs text-gray-500">Top 6–15</p>
              </div>

              {/* Arrow with line */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-1 mb-2">
                  <div className="progress-fill h-full bg-gradient-to-r from-slate-400 via-orange-400 to-orange-400 rounded-full opacity-0" style={{ animationDelay: '0.2s' }} />
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse hidden sm:block" />
              </div>

              {/* All Contributors - Explorer */}
              <div className="flex flex-col items-center flex-1">
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/30 border-2 border-orange-400/60 flex items-center justify-center shadow-lg glow-pulse" style={{ animationDelay: '0.6s' }}>
                    <Medal className="w-7 h-7 sm:w-8 sm:h-8 text-orange-300" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-orange-300">Explorer</p>
                <p className="text-xs text-gray-500">All Contributors</p>
              </div>
            </div>
          </div>

          {/* Tier Cards - Visible on All Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 bg-gradient-to-b from-slate-900/50 to-transparent rounded-3xl p-8 sm:p-12">
            {leaderboardTiers.map((tier, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) tiers.current[index] = el;
                }}
                className={`relative group rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-105 overflow-hidden ${
                  tier.isGold
                    ? 'bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 border-yellow-500 lg:scale-105 shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-400/70'
                    : tier.isSilver
                    ? 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 border-slate-400 shadow-2xl shadow-slate-400/40 hover:shadow-slate-300/60'
                    : 'bg-gradient-to-br from-orange-800 via-amber-700 to-orange-800 border-orange-500 shadow-xl shadow-orange-500/40 hover:shadow-orange-400/60'
                }`}
              >
                {/* Cosmic glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                  tier.isGold ? 'bg-gradient-to-t from-yellow-400/60 to-transparent' :
                  tier.isSilver ? 'bg-gradient-to-t from-slate-300/60 to-transparent' :
                  'bg-gradient-to-t from-orange-400/60 to-transparent'
                }`} />

                {/* Shimmer overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  tier.isGold ? 'shimmer bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent' :
                  tier.isSilver ? 'shimmer bg-gradient-to-r from-transparent via-slate-200/30 to-transparent' :
                  'shimmer bg-gradient-to-r from-transparent via-orange-200/30 to-transparent'
                }`} />
                
                {/* Orbiting particles */}
                <div className="absolute top-4 right-4">
                  <Sparkles className={`w-5 h-5 animate-pulse ${
                    tier.isGold ? 'text-yellow-300' : tier.isSilver ? 'text-slate-300' : 'text-orange-300'
                  }`} />
                </div>

                {/* Constellation icon */}
                <div className="flex justify-center mb-4 relative">
                  <div className={`absolute inset-0 blur-2xl rounded-full scale-75 ${
                    tier.isGold ? 'bg-yellow-400/30' : tier.isSilver ? 'bg-slate-300/30' : 'bg-orange-400/30'
                  }`} />
                  <tier.rankIcon className={`w-10 h-10 relative z-10 ${
                    tier.isGold ? 'text-yellow-300' : tier.isSilver ? 'text-slate-200' : 'text-orange-300'
                  }`} />
                </div>

                {/* Rank Badge with shimmer */}
                <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 relative ${
                  tier.isGold ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30' :
                  tier.isSilver ? 'bg-slate-500/20 text-slate-200 border border-slate-400/30' :
                  'bg-orange-500/20 text-orange-200 border border-orange-400/30'
                }`}>
                  <span className={tier.isGold || tier.isSilver || tier.isBronze ? 'shimmer block' : ''}>
                    {tier.rank}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
                  {tier.title}
                </h4>

                {/* Divider with stars */}
                <div className="flex items-center justify-center gap-2 my-6">
                  <div className={`h-px flex-1 ${
                    tier.isGold ? 'bg-gradient-to-r from-transparent to-yellow-400/50' :
                    tier.isSilver ? 'bg-gradient-to-r from-transparent to-slate-400/50' :
                    'bg-gradient-to-r from-transparent to-orange-400/50'
                  }`} />
                  <Star className={`w-4 h-4 ${
                    tier.isGold ? 'text-yellow-400' : tier.isSilver ? 'text-slate-300' : 'text-orange-400'
                  }`} />
                  <div className={`h-px flex-1 ${
                    tier.isGold ? 'bg-gradient-to-l from-transparent to-yellow-400/50' :
                    tier.isSilver ? 'bg-gradient-to-l from-transparent to-slate-400/50' :
                    'bg-gradient-to-l from-transparent to-orange-400/50'
                  }`} />
                </div>

                {/* Rewards List */}
                <ul className="space-y-3 relative z-10">
                  {tier.rewards.map((reward, rewardIndex) => (
                    <li
                      key={rewardIndex}
                      className="text-gray-200 text-sm sm:text-base flex items-start gap-3 group/item"
                    >
                      <reward.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${
                        tier.isGold ? 'text-yellow-300 group-hover/item:text-yellow-200' :
                        tier.isSilver ? 'text-slate-300 group-hover/item:text-slate-200' :
                        'text-orange-300 group-hover/item:text-orange-200'
                      }`} />
                      <span className="group-hover/item:text-white transition-colors">{reward.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cosmic Journey Statement */}
        <div className="text-center mt-16 relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-6 h-6 text-purple-400 animate-pulse" />
            <Telescope className="w-6 h-6 text-blue-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Rocket className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mb-3">
            Every contribution is a star in your constellation of achievement
          </p>
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            The more you explore, the brighter your cosmic legacy shines
            <Sparkles className="w-4 h-4 text-blue-400" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
