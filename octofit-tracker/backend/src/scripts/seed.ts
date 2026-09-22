import { connectDatabase, disconnectDatabase } from '../config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    await connectDatabase()
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const [alex, jordan, sam] = await User.create([
      {
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        avatar: 'AM',
        weeklyGoal: 4,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        avatar: 'JL',
        weeklyGoal: 5,
      },
      {
        name: 'Sam Rivera',
        email: 'sam.rivera@example.com',
        avatar: 'SR',
        weeklyGoal: 3,
      },
    ])

    await Team.create([
      {
        name: 'Morning Momentum',
        description: 'A supportive team for consistent early workouts.',
        members: [alex._id, jordan._id],
        points: 420,
      },
      {
        name: 'Weekend Warriors',
        description: 'Friendly competition with a focus on outdoor activities.',
        members: [sam._id],
        points: 185,
      },
    ])

    await Activity.create([
      {
        user: alex._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 320,
        points: 90,
        completedAt: new Date('2026-09-20T07:30:00Z'),
      },
      {
        user: jordan._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 280,
        points: 110,
        completedAt: new Date('2026-09-21T17:00:00Z'),
      },
      {
        user: sam._id,
        type: 'Cycling',
        durationMinutes: 60,
        calories: 510,
        points: 125,
        completedAt: new Date('2026-09-21T09:00:00Z'),
      },
    ])

    await Leaderboard.create([
      { user: jordan._id, points: 580, rank: 1, streakDays: 12 },
      { user: sam._id, points: 495, rank: 2, streakDays: 8 },
      { user: alex._id, points: 420, rank: 3, streakDays: 6 },
    ])

    await Workout.create([
      {
        title: 'Full-body foundation',
        description: 'A balanced strength session for building consistency.',
        level: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Dead bugs'],
      },
      {
        title: 'Tempo cardio intervals',
        description: 'Short intervals to improve endurance and pacing.',
        level: 'intermediate',
        durationMinutes: 30,
        exercises: ['Warm-up jog', 'Tempo run', 'Recovery walk'],
      },
    ])

    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await disconnectDatabase()
  }
}

seedDatabase()
