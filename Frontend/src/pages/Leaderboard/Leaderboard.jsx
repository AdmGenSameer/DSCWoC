import { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useLeaderboard } from '../../hooks/useApi';
import Navbar from '../../components/Navbar';
import './Leaderboard.css';

// Lazy load Starfield for performance
const Starfield = lazy(() => import('../../components/Starfield'));

// Constants for pagination
const MOBILE_ITEMS_PER_PAGE = 12;

/**
 * Leaderboard Page Component
 * 
 * Displays a grid of contributors with filtering options.
 * Features:
 * - Overall and Weekly filter toggle
 * - Grid layout (5 per row on desktop)
 * - Top 5 highlighting with special styling
 * - Mobile pagination (12 per page)
 * - Mobile-first responsive design
 * 
 * @returns {JSX.Element} Leaderboard page component
 */
const Leaderboard = () => {
    // Filter state: 'overall' or 'weekly'
    const [filter, setFilter] = useState('overall');
    // Mobile pagination state
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch leaderboard data with current filter
    // Uses React Query for caching and refetching
    const {
        data: leaderboardData,
        isLoading,
        isError,
        error,
        refetch
    } = useLeaderboard(1, 100, filter);

    /**
     * Returns the appropriate CSS class for rank badge based on position
     * Top 5 get special highlighting
     * @param {number} rank - User's rank position
     * @returns {string} CSS class name for rank styling
     */
    const getRankClass = (rank) => {
        if (rank === 1) return 'rank-1';
        if (rank === 2) return 'rank-2';
        if (rank === 3) return 'rank-3';
        if (rank <= 5) return 'rank-top5';
        return 'rank-default';
    };

    /**
     * Returns medal/crown emoji for top 5 ranks
     * @param {number} rank - User's rank position
     * @returns {string} Medal emoji or empty string
     */
    const getMedalIcon = (rank) => {
        switch (rank) {
            case 1:
                return '👑';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            case 4:
                return '🏅';
            case 5:
                return '🏅';
            default:
                return '';
        }
    };

    /**
     * Returns card class for top 5 special styling
     * @param {number} rank - User's rank position
     * @returns {string} CSS class for card styling
     */
    const getCardClass = (rank) => {
        if (rank === 1) return 'user-card top-1';
        if (rank === 2) return 'user-card top-2';
        if (rank === 3) return 'user-card top-3';
        if (rank <= 5) return 'user-card top-5';
        return 'user-card';
    };

    /**
     * Handles filter button click
     * Resets pagination when filter changes
     * @param {string} newFilter - Filter type ('overall' or 'weekly')
     */
    const handleFilterChange = (newFilter) => {
        if (newFilter !== filter) {
            setFilter(newFilter);
            setCurrentPage(1); // Reset to first page on filter change
        }
    };

    // Get users array from response
    const users = leaderboardData?.data || leaderboardData?.users || [];

    // Calculate pagination for mobile
    const totalPages = Math.ceil(users.length / MOBILE_ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * MOBILE_ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(startIndex, startIndex + MOBILE_ITEMS_PER_PAGE);

    /**
     * Handle page navigation
     * @param {number} page - Target page number
     */
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top of list when changing pages
            document.querySelector('.leaderboard-content')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="leaderboard-container">
            {/* Starfield Background - Lazy loaded for performance */}
            <Suspense fallback={<div className="fixed inset-0 bg-slate-950" />}>
                <Starfield />
            </Suspense>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <div className="leaderboard-content">
                {/* Header */}
                <header className="leaderboard-header">
                    <h1 className="leaderboard-title">🏆 Leaderboard</h1>
                    <p className="leaderboard-subtitle">
                        {filter === 'weekly'
                            ? 'Top contributors this week'
                            : 'All-time top contributors'}
                    </p>
                </header>

                {/* Filter Buttons */}
                <div className="filter-container">
                    <button
                        className={`filter-btn ${filter === 'overall' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('overall')}
                        aria-pressed={filter === 'overall'}
                    >
                        Overall
                    </button>
                    <button
                        className={`filter-btn ${filter === 'weekly' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('weekly')}
                        aria-pressed={filter === 'weekly'}
                    >
                        Weekly
                    </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="loading-container">
                        <div className="loading-spinner" />
                        <p className="loading-text">Loading leaderboard...</p>
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <p className="error-message">
                            {error?.message || 'Failed to load leaderboard'}
                        </p>
                        <button className="retry-btn" onClick={() => refetch()}>
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && users.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">📊</div>
                        <p>
                            {filter === 'weekly'
                                ? 'No contributions this week yet. Be the first!'
                                : 'No contributors found.'}
                        </p>
                        <Link to="/" className="retry-btn" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>
                            Back to Home
                        </Link>
                    </div>
                )}

                {/* Leaderboard Grid - Desktop shows all, Mobile shows paginated */}
                {!isLoading && !isError && users.length > 0 && (
                    <>
                        {/* Desktop Grid - shows all users */}
                        <div className="leaderboard-grid desktop-only">
                            {users.map((user) => (
                                <div
                                    key={user._id || user.id}
                                    className={getCardClass(user.rank)}
                                >
                                    {/* Medal/Crown for top 5 */}
                                    {user.rank <= 5 && (
                                        <span className="medal-icon">{getMedalIcon(user.rank)}</span>
                                    )}

                                    {/* Rank Badge */}
                                    <div className={`rank-badge ${getRankClass(user.rank)}`}>
                                        {user.rank}
                                    </div>

                                    {/* Avatar */}
                                    <img
                                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=8b5cf6&color=fff`}
                                        alt={user.fullName || 'User avatar'}
                                        className={`user-avatar ${user.rank <= 5 ? 'top-avatar' : ''}`}
                                        loading="lazy"
                                    />

                                    {/* User Info */}
                                    <div className="user-info">
                                        <p className="user-name">{user.fullName || 'Unknown User'}</p>
                                        <p className="user-username">@{user.github_username || 'unknown'}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="user-stats">
                                        <div className="stat-points">
                                            <span>⭐</span>
                                            <span>
                                                {filter === 'weekly' && user.weeklyStats
                                                    ? user.weeklyStats.points
                                                    : user.stats?.points || 0}
                                            </span>
                                        </div>
                                        <p className="stat-prs">
                                            {filter === 'weekly' && user.weeklyStats
                                                ? `${user.weeklyStats.prs} PRs`
                                                : `${user.stats?.totalPRs || 0} PRs`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile List - shows paginated users */}
                        <div className="leaderboard-list mobile-only">
                            {paginatedUsers.map((user) => (
                                <div
                                    key={user._id || user.id}
                                    className={getCardClass(user.rank)}
                                >
                                    {/* Medal/Crown for top 5 */}
                                    {user.rank <= 5 && (
                                        <span className="medal-icon-mobile">{getMedalIcon(user.rank)}</span>
                                    )}

                                    {/* Rank Badge */}
                                    <div className={`rank-badge ${getRankClass(user.rank)}`}>
                                        {user.rank}
                                    </div>

                                    {/* Avatar */}
                                    <img
                                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=8b5cf6&color=fff`}
                                        alt={user.fullName || 'User avatar'}
                                        className={`user-avatar ${user.rank <= 5 ? 'top-avatar' : ''}`}
                                        loading="lazy"
                                    />

                                    {/* User Info */}
                                    <div className="user-info">
                                        <p className="user-name">{user.fullName || 'Unknown User'}</p>
                                        <p className="user-username">@{user.github_username || 'unknown'}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="user-stats">
                                        <div className="stat-points">
                                            <span>⭐</span>
                                            <span>
                                                {filter === 'weekly' && user.weeklyStats
                                                    ? user.weeklyStats.points
                                                    : user.stats?.points || 0}
                                            </span>
                                        </div>
                                        <p className="stat-prs">
                                            {filter === 'weekly' && user.weeklyStats
                                                ? `${user.weeklyStats.prs} PRs`
                                                : `${user.stats?.totalPRs || 0} PRs`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="pagination-container mobile-only">
                                <button
                                    className="pagination-btn"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    aria-label="Previous page"
                                >
                                    ←
                                </button>

                                <div className="pagination-info">
                                    <span className="current-page">{currentPage}</span>
                                    <span className="page-separator">/</span>
                                    <span className="total-pages">{totalPages}</span>
                                </div>

                                <button
                                    className="pagination-btn"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    aria-label="Next page"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
