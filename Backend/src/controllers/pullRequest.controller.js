import mongoose from 'mongoose';
import PullRequest from '../models/PullRequest.model.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * @desc    Get all pull requests
 * @route   GET /api/v1/pull-requests
 * @access  Public
 * @query   page, limit, status, user, project, isValidated
 */
export const getPullRequests = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.user) {
    filter.user = req.query.user;
  }

  if (req.query.project) {
    filter.project = req.query.project;
  }

  if (req.query.isValidated !== undefined) {
    filter['validation.isValidated'] = req.query.isValidated === 'true';
  }

  const pullRequests = await PullRequest.find(filter)
    .populate('user', 'name email github_username')
    .populate('project', 'name github_repo_url')
    .sort({ 'github_data.created_at': -1 })
    .skip(skip)
    .limit(limit);

  const total = await PullRequest.countDocuments(filter);

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    results: pullRequests.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data: pullRequests,
  });
});

/**
 * @desc    Get single pull request
 * @route   GET /api/v1/pull-requests/:id
 * @access  Public
 */
export const getPullRequest = asyncHandler(async (req, res) => {
  const pullRequest = await PullRequest.findById(req.params.id)
    .populate('user', 'name email github_username')
    .populate('project', 'name github_repo_url')
    .populate('validation.validatedBy', 'name email');

  if (!pullRequest) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      status: 'fail',
      message: 'Pull request not found',
    });
  }

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    data: pullRequest,
  });
});

/**
 * @desc    Get user's pull requests
 * @route   GET /api/v1/pull-requests/user/:userId
 * @access  Public
 * @query   page, limit, status, isValidated
 */
export const getUserPullRequests = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = { user: userId };

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.isValidated !== undefined) {
    filter['validation.isValidated'] = req.query.isValidated === 'true';
  }

  const pullRequests = await PullRequest.find(filter)
    .populate('project', 'name github_repo_url')
    .populate('validation.validatedBy', 'name email')
    .sort({ 'github_data.created_at': -1 })
    .skip(skip)
    .limit(limit);

  const total = await PullRequest.countDocuments(filter);

  // Calculate total points for this user
  const totalPoints = await PullRequest.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalPoints: { $sum: '$points' } } },
  ]);

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    results: pullRequests.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    totalPoints: totalPoints[0]?.totalPoints || 0,
    data: pullRequests,
  });
});

/**
 * @desc    Get project's pull requests
 * @route   GET /api/v1/pull-requests/project/:projectId
 * @access  Public
 * @query   page, limit, status, isValidated
 */
export const getProjectPullRequests = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = { project: projectId };

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.isValidated !== undefined) {
    filter['validation.isValidated'] = req.query.isValidated === 'true';
  }

  const pullRequests = await PullRequest.find(filter)
    .populate('user', 'name email github_username')
    .populate('validation.validatedBy', 'name email')
    .sort({ 'github_data.created_at': -1 })
    .skip(skip)
    .limit(limit);

  const total = await PullRequest.countDocuments(filter);

  // Calculate project stats
  const projectStats = await PullRequest.aggregate([
    { $match: { project: new mongoose.Types.ObjectId(projectId) } },
    {
      $group: {
        _id: null,
        totalPoints: { $sum: '$points' },
        totalAdditions: { $sum: '$github_data.additions' },
        totalDeletions: { $sum: '$github_data.deletions' },
        mergedCount: {
          $sum: { $cond: [{ $eq: ['$status', 'merged'] }, 1, 0] },
        },
        openCount: {
          $sum: { $cond: [{ $eq: ['$status', 'open'] }, 1, 0] },
        },
      },
    },
  ]);

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    results: pullRequests.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    stats: {
      totalPoints: projectStats[0]?.totalPoints || 0,
      totalAdditions: projectStats[0]?.totalAdditions || 0,
      totalDeletions: projectStats[0]?.totalDeletions || 0,
      mergedCount: projectStats[0]?.mergedCount || 0,
      openCount: projectStats[0]?.openCount || 0,
    },
    data: pullRequests,
  });
});

/**
 * @desc    Sync pull requests for a project
 * @route   POST /api/v1/pull-requests/sync/:projectId
 * @access  Private (Admin/Mentor)
 */
export const syncPullRequests = asyncHandler(async (req, res) => {
  // TODO: Fetch PRs from GitHub API
  // TODO: Update database with new/updated PRs
  // TODO: Update user stats

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    message: 'Sync pull requests - TODO: Implement this endpoint',
  });
});

/**
 * @desc    Update PR validation status
 * @route   PUT /api/v1/pull-requests/:id/validate
 * @access  Private (Admin/Mentor)
 */
export const validatePullRequest = asyncHandler(async (req, res) => {
  // TODO: Update PR validation status
  // TODO: Update user stats accordingly

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    message: 'Validate pull request - TODO: Implement this endpoint',
  });
});

/**
 * @desc    Get recent pull requests
 * @route   GET /api/v1/pull-requests/recent
 * @access  Public
 * @query   limit, status, project
 */
export const getRecentPullRequests = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;

  // Build filter object
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.project) {
    filter.project = req.query.project;
  }

  const pullRequests = await PullRequest.find(filter)
    .populate('user', 'name email github_username')
    .populate('project', 'name github_repo_url')
    .sort({ 'github_data.created_at': -1 })
    .limit(limit);

  res.status(HTTP_STATUS.OK).json({
    status: 'success',
    results: pullRequests.length,
    data: pullRequests,
  });
});
