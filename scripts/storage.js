// ============================================
// DATA STORAGE MODULE
// Handles all localStorage operations and data structure
// ============================================

const Storage = {
    STORAGE_KEY: 'deeper-life-v1',

    // Default data structure
    getDefaultData() {
        return {
            // User preferences
            preferences: {
                morningTime: '06:30',
                eveningTime: '21:00'
            },

            // Daily routines
            routines: {
                morning: {
                    lastCompleted: null,
                    items: [
                        { id: 'wake', label: 'Wake up (6:30 AM)', type: 'auto', completed: false },
                        { id: 'stretch', label: 'Stretch for 5 minutes', type: 'timer', duration: 300, completed: false },
                        { id: 'pushups', label: '1 failure set of push-ups', type: 'manual', completed: false },
                        { id: 'squats', label: '50x bodyweight squats', type: 'counter', target: 50, current: 0, completed: false },
                        { id: 'shower', label: 'Quick shower (max 5 min)', type: 'timer', duration: 300, completed: false },
                        { id: 'water', label: 'Drink full bottle of water', type: 'manual', completed: false },
                        { id: 'breakfast', label: 'Good breakfast', type: 'manual', completed: false },
                        { id: 'bible', label: 'Bible study and prayer', type: 'redirect', completed: false },
                        { id: 'study', label: 'Start studying', type: 'manual', completed: false }
                    ]
                },
                evening: {
                    lastCompleted: null,
                    items: [
                        { id: 'lights', label: 'Turn on red lights', type: 'manual', completed: false },
                        { id: 'hygiene', label: 'Brush teeth and change into pyjamas', type: 'manual', completed: false },
                        { id: 'good-things', label: '3 good things from today', type: 'text', value: '', completed: false },
                        { id: 'lessons', label: '3 lessons from today', type: 'text', value: '', completed: false },
                        { id: 'improvements', label: 'Improvements for tomorrow', type: 'text', value: '', completed: false },
                        { id: 'plan', label: 'Plan tomorrow on paper', type: 'manual', completed: false },
                        { id: 'read-book', label: 'Read a book', type: 'manual', completed: false }
                    ]
                }
            },

            // Habit tracking (21 days rolling window)
            habits: [
                { id: 'morning-routine', name: 'Morning Routine', category: 'routine', dates: [] },
                { id: 'evening-routine', name: 'Evening Routine', category: 'routine', dates: [] },
                { id: 'bible-study', name: 'Bible Study', category: 'spiritual', dates: [] },
                { id: 'exercise', name: 'Exercise', category: 'health', dates: [] },
                { id: 'study-time', name: 'Study Time', category: 'productivity', dates: [] }
            ],

            // Study time logging
            studySessions: [],

            // Journal entries
            journalEntries: [],

            // To-do list
            todos: [],

            // Bible study data (from existing app)
            bible: {
                day: 1,
                completedDates: [],
                streak: 0,
                best: 0,
                lastDate: null
            },

            // Metadata
            meta: {
                version: '1.0',
                created: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            }
        };
    },

    // Load data from localStorage
    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                // Merge with defaults to handle version updates
                return { ...this.getDefaultData(), ...parsed };
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        return this.getDefaultData();
    },

    // Save data to localStorage
    save(data) {
        try {
            data.meta.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

            // Create backup in separate key
            this.createBackup(data);
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    },

    // Create automatic backup
    createBackup(data) {
        try {
            const backupKey = `${this.STORAGE_KEY}-backup`;
            localStorage.setItem(backupKey, JSON.stringify({
                data: data,
                timestamp: new Date().toISOString()
            }));
        } catch (error) {
            console.warn('Could not create backup:', error);
        }
    },

    // Restore from backup
    restoreBackup() {
        try {
            const backupKey = `${this.STORAGE_KEY}-backup`;
            const backup = localStorage.getItem(backupKey);
            if (backup) {
                const parsed = JSON.parse(backup);
                return parsed.data;
            }
        } catch (error) {
            console.error('Error restoring backup:', error);
        }
        return null;
    },

    // Export data as JSON file
    exportData(data) {
        try {
            const exportData = {
                ...data,
                exportDate: new Date().toISOString(),
                version: data.meta.version
            };

            const jsonString = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `deeper-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('Error exporting data:', error);
            return false;
        }
    },

    // Import data from JSON file
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);

                    // Validate data structure
                    if (imported.meta && imported.preferences) {
                        // Merge with current structure to handle version differences
                        const merged = { ...this.getDefaultData(), ...imported };
                        resolve(merged);
                    } else {
                        reject(new Error('Invalid data format'));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsText(file);
        });
    },

    // Reset all data
    reset() {
        const confirmed = confirm('Are you sure you want to reset ALL data? This cannot be undone.');
        if (confirmed) {
            const doubleConfirm = confirm('Really reset everything? Your data will be permanently deleted.');
            if (doubleConfirm) {
                localStorage.removeItem(this.STORAGE_KEY);
                localStorage.removeItem(`${this.STORAGE_KEY}-backup`);
                localStorage.removeItem('deeper-last-visit');
                window.location.reload();
                return true;
            }
        }
        return false;
    },

    // Get today's date string
    getTodayString() {
        return new Date().toISOString().split('T')[0];
    },

    // Check if a routine was completed today
    isRoutineCompletedToday(data, routineType) {
        const routine = data.routines[routineType];
        if (!routine.lastCompleted) return false;
        return routine.lastCompleted === this.getTodayString();
    },

    // Mark routine as completed
    completeRoutine(data, routineType) {
        const today = this.getTodayString();
        data.routines[routineType].lastCompleted = today;

        // Add to habit tracking
        const habitId = `${routineType}-routine`;
        const habit = data.habits.find(h => h.id === habitId);
        if (habit && !habit.dates.includes(today)) {
            habit.dates.push(today);
            // Keep only last 21 days
            if (habit.dates.length > 21) {
                habit.dates.sort();
                habit.dates = habit.dates.slice(-21);
            }
        }

        // Reset routine items for next day
        data.routines[routineType].items.forEach(item => {
            item.completed = false;
            if (item.type === 'counter') item.current = 0;
            if (item.type === 'text') item.value = '';
        });

        return data;
    },

    // Track habit completion
    trackHabit(data, habitId, date = null) {
        const dateStr = date || this.getTodayString();
        const habit = data.habits.find(h => h.id === habitId);

        if (habit && !habit.dates.includes(dateStr)) {
            habit.dates.push(dateStr);
            habit.dates.sort();
            // Keep only last 21 days
            if (habit.dates.length > 21) {
                habit.dates = habit.dates.slice(-21);
            }
        }

        return data;
    },

    // Log study session
    logStudySession(data, session) {
        const sessionData = {
            id: Date.now(),
            date: this.getTodayString(),
            startTime: session.startTime || new Date().toISOString(),
            endTime: session.endTime || new Date().toISOString(),
            duration: session.duration || 0, // minutes
            subject: session.subject || '',
            notes: session.notes || ''
        };

        data.studySessions.push(sessionData);

        // Track as habit
        this.trackHabit(data, 'study-time');

        return data;
    },

    // Add journal entry
    addJournalEntry(data, entry) {
        const journalEntry = {
            id: Date.now(),
            date: this.getTodayString(),
            timestamp: new Date().toISOString(),
            goodThings: entry.goodThings || [],
            lessons: entry.lessons || [],
            improvements: entry.improvements || [],
            notes: entry.notes || ''
        };

        data.journalEntries.push(journalEntry);

        return data;
    },

    // Get study time for date range
    getStudyTimeForRange(data, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return data.studySessions
            .filter(session => {
                const sessionDate = new Date(session.date);
                return sessionDate >= start && sessionDate <= end;
            })
            .reduce((total, session) => total + session.duration, 0);
    },

    // Get today's study time
    getTodayStudyTime(data) {
        const today = this.getTodayString();
        return data.studySessions
            .filter(session => session.date === today)
            .reduce((total, session) => total + session.duration, 0);
    },

    // Get habit completion rate for last N days
    getHabitCompletionRate(data, habitId, days = 7) {
        const habit = data.habits.find(h => h.id === habitId);
        if (!habit) return 0;

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

    // Get current streak for habit
    getHabitStreak(data, habitId) {
        const habit = data.habits.find(h => h.id === habitId);
        if (!habit || habit.dates.length === 0) return 0;

        const sortedDates = [...habit.dates].sort().reverse();
        let streak = 0;
        let checkDate = new Date();

        for (let dateStr of sortedDates) {
            const habitDate = new Date(dateStr + 'T12:00:00');
            const daysDiff = Math.floor((checkDate - habitDate) / (1000 * 60 * 60 * 24));

            if (daysDiff <= streak + 1) {
                streak++;
                checkDate = habitDate;
            } else {
                break;
            }
        }

        return streak;
    }
};

// Make available globally
window.Storage = Storage;
