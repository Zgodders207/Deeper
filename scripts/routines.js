// ============================================
// ROUTINES MODULE
// Handles time-based routing and routine enforcement
// ============================================

const Routines = {
    // Check what mode the app should be in
    getCurrentMode() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeValue = hours * 60 + minutes;

        // Get user preferences (default to 6:30 AM and 9:00 PM)
        const data = window.appData || Storage.load();
        const morningTime = data.preferences.morningTime || '06:30';
        const eveningTime = data.preferences.eveningTime || '21:00';

        const [mHour, mMin] = morningTime.split(':').map(Number);
        const [eHour, eMin] = eveningTime.split(':').map(Number);

        const morningStart = mHour * 60 + mMin;
        const eveningStart = eHour * 60 + eMin;

        // Before morning time: locked (show message)
        if (timeValue < morningStart) {
            return 'pre-morning';
        }

        // Morning time onwards: check if morning routine is done
        if (timeValue >= morningStart && timeValue < eveningStart) {
            const morningComplete = Storage.isRoutineCompletedToday(data, 'morning');
            if (!morningComplete) {
                return 'morning-required';
            }
            return 'daytime';
        }

        // Evening time onwards: check if evening routine is done
        if (timeValue >= eveningStart) {
            const eveningComplete = Storage.isRoutineCompletedToday(data, 'evening');
            if (!eveningComplete) {
                return 'evening-required';
            }
            return 'evening-complete';
        }

        return 'daytime';
    },

    // Check if user should be redirected
    shouldRedirect(currentPage) {
        const mode = this.getCurrentMode();

        // Pre-morning: can only see locked screen
        if (mode === 'pre-morning' && currentPage !== 'locked') {
            return 'locked';
        }

        // Morning required: must do morning routine
        if (mode === 'morning-required' && currentPage !== 'morning-routine') {
            return 'morning-routine';
        }

        // Evening required: redirect to evening routine
        if (mode === 'evening-required' && currentPage !== 'evening-routine') {
            return 'evening-routine';
        }

        // Evening complete: only show completion screen
        if (mode === 'evening-complete' && currentPage !== 'evening-done') {
            return 'evening-done';
        }

        // During daytime, all pages accessible
        return null;
    },

    // Get morning routine progress
    getMorningProgress(data) {
        const items = data.routines.morning.items;
        const completed = items.filter(item => item.completed).length;
        const total = items.length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    },

    // Get evening routine progress
    getEveningProgress(data) {
        const items = data.routines.evening.items;
        const completed = items.filter(item => item.completed).length;
        const total = items.length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    },

    // Check if specific item is completed
    isItemCompleted(data, routineType, itemId) {
        const routine = data.routines[routineType];
        const item = routine.items.find(i => i.id === itemId);
        return item ? item.completed : false;
    },

    // Complete a routine item
    completeItem(data, routineType, itemId, value = null) {
        const routine = data.routines[routineType];
        const item = routine.items.find(i => i.id === itemId);

        if (item) {
            item.completed = true;

            // Handle special types
            if (item.type === 'text' && value !== null) {
                item.value = value;
            }

            if (item.type === 'counter' && value !== null) {
                item.current = value;
                if (item.current >= item.target) {
                    item.completed = true;
                }
            }
        }

        return data;
    },

    // Check if all items in routine are completed
    isRoutineFullyCompleted(data, routineType) {
        const routine = data.routines[routineType];
        return routine.items.every(item => item.completed);
    },

    // Finalize routine completion
    finalizeRoutine(data, routineType) {
        if (this.isRoutineFullyCompleted(data, routineType)) {
            // If evening routine, create journal entry
            if (routineType === 'evening') {
                const goodThings = data.routines.evening.items.find(i => i.id === 'good-things')?.value || '';
                const lessons = data.routines.evening.items.find(i => i.id === 'lessons')?.value || '';
                const improvements = data.routines.evening.items.find(i => i.id === 'improvements')?.value || '';

                Storage.addJournalEntry(data, {
                    goodThings: goodThings.split('\n').filter(s => s.trim()),
                    lessons: lessons.split('\n').filter(s => s.trim()),
                    improvements: improvements.split('\n').filter(s => s.trim())
                });
            }

            Storage.completeRoutine(data, routineType);
            return true;
        }
        return false;
    },

    // Get time until morning/evening
    getTimeUntil(targetTime) {
        const now = new Date();
        const [hours, minutes] = targetTime.split(':').map(Number);

        const target = new Date();
        target.setHours(hours, minutes, 0, 0);

        // If target time has passed today, set to tomorrow
        if (target < now) {
            target.setDate(target.getDate() + 1);
        }

        const diff = target - now;
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return { hours: hoursLeft, minutes: minutesLeft };
    },

    // Format time remaining
    formatTimeRemaining(hours, minutes) {
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    },

    // Get greeting based on time of day
    getGreeting() {
        const hours = new Date().getHours();

        if (hours < 12) return 'Good morning';
        if (hours < 17) return 'Good afternoon';
        if (hours < 21) return 'Good evening';
        return 'Good night';
    },

    // Timer helper for routine items
    createTimer(duration, onTick, onComplete) {
        let remaining = duration;

        const interval = setInterval(() => {
            remaining--;

            if (onTick) {
                onTick(remaining);
            }

            if (remaining <= 0) {
                clearInterval(interval);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 1000);

        return {
            stop: () => clearInterval(interval),
            remaining: () => remaining
        };
    },

    // Format timer display (mm:ss)
    formatTimer(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    // Check if it's the user's first visit today
    isFirstVisitToday() {
        const lastVisit = localStorage.getItem('deeper-last-visit');
        const today = Storage.getTodayString();

        if (lastVisit !== today) {
            localStorage.setItem('deeper-last-visit', today);
            return true;
        }

        return false;
    }
};

// Make available globally
window.Routines = Routines;
