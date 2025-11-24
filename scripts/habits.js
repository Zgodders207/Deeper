// ============================================
// HABITS MODULE
// Helper functions for habit tracking and visualization
// ============================================

const Habits = {
    // Get last N days for habit display
    getLastNDays(n = 21) {
        const days = [];
        const today = new Date();

        for (let i = n - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            days.push({
                date: date.toISOString().split('T')[0],
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                weekday: date.getDay(),
                isToday: i === 0,
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            });
        }

        return days;
    },

    // Check if habit was completed on a specific date
    isCompletedOn(habit, date) {
        return habit.dates.includes(date);
    },

    // Get completion count for date range
    getCompletionCount(habit, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return habit.dates.filter(dateStr => {
            const date = new Date(dateStr);
            return date >= start && date <= end;
        }).length;
    },

    // Calculate current streak
    getCurrentStreak(habit) {
        if (!habit.dates || habit.dates.length === 0) return 0;

        const sortedDates = [...habit.dates].sort().reverse();
        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let dateStr of sortedDates) {
            const habitDate = new Date(dateStr + 'T00:00:00');
            const daysDiff = Math.floor((currentDate - habitDate) / (1000 * 60 * 60 * 24));

            // Allow for today or yesterday (streak continues if you did it today or yesterday)
            if (daysDiff <= streak + 1) {
                streak++;
                currentDate = habitDate;
            } else {
                break;
            }
        }

        return streak;
    },

    // Calculate longest streak ever
    getLongestStreak(habit) {
        if (!habit.dates || habit.dates.length === 0) return 0;

        const sortedDates = [...habit.dates].sort();
        let maxStreak = 1;
        let currentStreak = 1;

        for (let i = 1; i < sortedDates.length; i++) {
            const prevDate = new Date(sortedDates[i - 1]);
            const currDate = new Date(sortedDates[i]);

            const daysDiff = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }

        return maxStreak;
    },

    // Get completion rate for last N days
    getCompletionRate(habit, days = 7) {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }

        const completed = dates.filter(date => habit.dates.includes(date)).length;
        return Math.round((completed / days) * 100);
    },

    // Get weekly completion (this week vs last week)
    getWeeklyComparison(habit) {
        const today = new Date();
        const startOfThisWeek = new Date(today);
        startOfThisWeek.setDate(today.getDate() - today.getDay());

        const startOfLastWeek = new Date(startOfThisWeek);
        startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

        const thisWeek = this.getCompletionCount(
            habit,
            startOfThisWeek.toISOString().split('T')[0],
            today.toISOString().split('T')[0]
        );

        const lastWeek = this.getCompletionCount(
            habit,
            startOfLastWeek.toISOString().split('T')[0],
            new Date(startOfThisWeek - 1).toISOString().split('T')[0]
        );

        return {
            thisWeek,
            lastWeek,
            change: thisWeek - lastWeek,
            improved: thisWeek > lastWeek
        };
    },

    // Get habit statistics
    getStats(habit) {
        const today = Storage.getTodayString();
        const total = habit.dates.length;
        const current = this.getCurrentStreak(habit);
        const longest = this.getLongestStreak(habit);
        const rate7 = this.getCompletionRate(habit, 7);
        const rate30 = this.getCompletionRate(habit, 30);
        const completedToday = habit.dates.includes(today);

        return {
            total,
            currentStreak: current,
            longestStreak: longest,
            completionRate7Days: rate7,
            completionRate30Days: rate30,
            completedToday
        };
    },

    // Visualize habit pattern (for console debugging)
    visualize(habit, days = 21) {
        const daysData = this.getLastNDays(days);
        const visual = daysData.map(day => {
            const completed = this.isCompletedOn(habit, day.date);
            return completed ? '■' : '□';
        }).join(' ');

        console.log(`${habit.name}: ${visual}`);
        return visual;
    },

    // Get habits by category
    getByCategory(habits, category) {
        return habits.filter(h => h.category === category);
    },

    // Get all categories from habits
    getCategories(habits) {
        const categories = [...new Set(habits.map(h => h.category))];
        return categories.sort();
    },

    // Sort habits by completion rate
    sortByCompletionRate(habits, days = 7) {
        return habits.sort((a, b) => {
            const rateA = this.getCompletionRate(a, days);
            const rateB = this.getCompletionRate(b, days);
            return rateB - rateA;
        });
    },

    // Sort habits by current streak
    sortByStreak(habits) {
        return habits.sort((a, b) => {
            const streakA = this.getCurrentStreak(a);
            const streakB = this.getCurrentStreak(b);
            return streakB - streakA;
        });
    },

    // Get today's completion summary
    getTodaySummary(habits) {
        const today = Storage.getTodayString();
        const completed = habits.filter(h => h.dates.includes(today));
        const total = habits.length;
        const percentage = total > 0 ? Math.round((completed.length / total) * 100) : 0;

        return {
            completed: completed.length,
            total,
            percentage,
            remaining: total - completed.length,
            habits: {
                completed: completed.map(h => h.name),
                remaining: habits.filter(h => !h.dates.includes(today)).map(h => h.name)
            }
        };
    },

    // Predict tomorrow's performance based on patterns
    predictTomorrow(habit) {
        // Simple prediction: average of last 7 same weekdays
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const targetWeekday = tomorrow.getDay();

        const last8Weeks = [];
        for (let i = 0; i < 8; i++) {
            const checkDate = new Date(tomorrow);
            checkDate.setDate(tomorrow.getDate() - (7 * i));
            const dateStr = checkDate.toISOString().split('T')[0];

            if (habit.dates.includes(dateStr)) {
                last8Weeks.push(1);
            } else {
                last8Weeks.push(0);
            }
        }

        const avgCompletion = last8Weeks.reduce((a, b) => a + b, 0) / last8Weeks.length;
        return Math.round(avgCompletion * 100);
    },

    // Generate motivational message based on habit stats
    getMotivationalMessage(habit) {
        const stats = this.getStats(habit);
        const messages = [];

        if (stats.currentStreak >= 7) {
            messages.push(`🔥 Amazing! ${stats.currentStreak}-day streak on ${habit.name}!`);
        }

        if (stats.currentStreak >= 21) {
            messages.push(`🏆 Incredible! ${stats.currentStreak} days - this is now a habit!`);
        }

        if (stats.currentStreak >= 66) {
            messages.push(`⭐ Legendary! ${stats.currentStreak} days - you've mastered this!`);
        }

        if (stats.completionRate7Days === 100) {
            messages.push(`✨ Perfect week! Keep it up!`);
        }

        if (stats.currentStreak === 0 && stats.total > 0) {
            messages.push(`💪 Time to restart your ${habit.name} streak!`);
        }

        if (stats.currentStreak === stats.longestStreak && stats.currentStreak > 0) {
            messages.push(`🎯 New personal record! ${stats.currentStreak} days!`);
        }

        if (messages.length === 0) {
            return `Keep going with ${habit.name}!`;
        }

        return messages[Math.floor(Math.random() * messages.length)];
    },

    // Generate habit report
    generateReport(habits) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: this.getTodaySummary(habits),
            habits: habits.map(habit => ({
                name: habit.name,
                category: habit.category,
                stats: this.getStats(habit),
                weekly: this.getWeeklyComparison(habit)
            })),
            insights: []
        };

        // Add insights
        const bestHabit = this.sortByStreak(habits)[0];
        if (bestHabit) {
            report.insights.push(`Your strongest habit: ${bestHabit.name} (${this.getCurrentStreak(bestHabit)}-day streak)`);
        }

        const needsWork = habits.filter(h => this.getCompletionRate(h, 7) < 50);
        if (needsWork.length > 0) {
            report.insights.push(`Habits needing attention: ${needsWork.map(h => h.name).join(', ')}`);
        }

        return report;
    }
};

// Make available globally
window.Habits = Habits;
