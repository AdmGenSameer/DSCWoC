import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../components/usersDashboard/DashboardHeader.jsx";
import { ProfileSection } from "../components/usersDashboard/ProfileSection.jsx";
import { StatsOverview } from "../components/usersDashboard/StatsOverview.jsx";
import { JoinedProjects } from "../components/usersDashboard/JoinedProjects.jsx";
import { PullRequestsTable } from "../components/usersDashboard/PullRequestsTable.jsx";
import { BadgesSection } from "../components/usersDashboard/BadgesSection.jsx";
import { LeaderboardPreview } from "../components/usersDashboard/LeaderboardPreview.jsx";
import { EventCountdown } from "../components/usersDashboard/EventCountdown.jsx";
import Starfield from "../components/Starfield.jsx";
import {
  currentUser,
  userProjects,
  userPullRequests,
  userBadges,
  leaderboard,
  getUserRank,
  eventDates,
} from "../data/mockData";
function getInitialUser() {
  const userData = localStorage.getItem('user');
  const accessToken = localStorage.getItem('access_token');

  if (userData && accessToken) {
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser && parsedUser.id && parsedUser.github_username) {
        return parsedUser;
      }
    } catch (err) {
      console.error('Error parsing user data:', err);
    }
  }
  return null;
}

export default function Dashboard() {
  const [user] = useState(getInitialUser);
  const userRank = getUserRank(user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Clear invalid data and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Starfield />
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Starfield />
      <DashboardHeader avatar={user.avatar_url}/>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-fade-in">
          {/* Event Countdown */}
          <EventCountdown eventStartDate={eventDates.start} eventEndDate={eventDates.end} />

          {/* Profile Section */}
          <ProfileSection
            user={currentUser}
            rank={userRank}
            isLoading={false}
          />

          {/* Stats Overview */}
          <StatsOverview
            totalPRs={currentUser.totalPRs}
            mergedPRs={currentUser.mergedPRs}
            totalPoints={currentUser.totalPoints}
            rank={userRank}
            isLoading={false}
          />

          {/* Badges Section */}
          <BadgesSection badges={userBadges} isLoading={false} />

          {/* Two Column Layout for larger screens */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Joined Projects */}
              <JoinedProjects projects={userProjects} isLoading={false} />

              {/* Pull Requests Table */}
              <PullRequestsTable
                pullRequests={userPullRequests}
                isLoading={false}
              />
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-8">
              {/* Leaderboard Preview */}
              <LeaderboardPreview
                entries={leaderboard}
                currentUserId={currentUser.id}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}