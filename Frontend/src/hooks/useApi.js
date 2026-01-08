import { useQuery, useMutation } from '@tanstack/react-query';

// Single source of truth for backend API base
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/?$/, '')}/api/v1` : '') ||
  'http://localhost:5000/api/v1';

/**
 * Fetch leaderboard data with caching
 * Cache: 5 minutes (300000ms)
 */
export const useLeaderboard = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['leaderboard', page, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/users/leaderboard?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });
};

/**
 * Fetch all projects with caching
 * Cache: 10 minutes
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Fetch single project details
 */
export const useProject = (projectId) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json();
    },
    enabled: !!projectId, // Don't fetch if projectId is not available
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Fetch user data
 */
export const useUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!userId,
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Fetch pull requests
 */
export const usePullRequests = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['pullRequests', page, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/pull-requests?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error('Failed to fetch pull requests');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Fetch badges
 */
export const useBadges = () => {
  return useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/badges`);
      if (!response.ok) throw new Error('Failed to fetch badges');
      return response.json();
    },
    staleTime: 15 * 60 * 1000, // Badges change infrequently
    gcTime: 20 * 60 * 1000,
  });
};

/**
 * Fetch User Dashboard Data
 */
export const useUserDashboardData = () => {
  return useQuery({
    queryKey: ['userDashboardData'],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) throw new Error('Unauthorized');
      if (!response.ok) throw new Error('Failed to fetch user dashboard data');
      return response.json();
    },
    staleTime: 15 * 60 * 1000, // User dashboard data changes infrequently
    gcTime: 20 * 60 * 1000,
  });
};

/**
 * Fetch Pull request Data of logged in user
 */
export const useUserPullRequests = (id) => {
  return useQuery({
    queryKey: ['userPullRequests', id],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/pull-requests/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) throw new Error('Unauthorized');
      if (!response.ok) throw new Error('Failed to fetch user pull requests');
      return response.json();
    },
    enabled: !!id, // Don't fetch if id is not available
    staleTime: 15 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};



/**
 * Submit contact form
 * Usage: const submitContact = useSubmitContact();
 *        submitContact.mutate({ name, email, message });
 */
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to send message');
      }
      
      return result;
    },
  });
};
