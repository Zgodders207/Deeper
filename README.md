# Deeper - Life Management Dashboard

A comprehensive daily routine and habit tracking application that enforces healthy habits through time-based access control.

## Overview

**Deeper** has been transformed from a Bible study app into a full life management system that:

- Enforces morning and evening routines with time restrictions
- Tracks habits over 21-day rolling windows
- Logs study sessions and maintains journal entries
- Provides contextual Bible reading access
- Syncs data across devices using localStorage

## File Structure

```
deeper/
├── index.html                 # Main router (time-based redirects)
├── index-original.html        # Backup of original Bible study app
├── dashboard.html             # Main dashboard (daytime access)
├── morning-routine.html       # Morning checklist (6:30 AM+)
├── evening-routine.html       # Evening checklist (9:00 PM+)
├── bible-study.html           # Bible reading interface
├── journal.html               # Journal entry viewer
├── scripts/
│   ├── storage.js            # Data persistence & management
│   ├── routines.js           # Time-based routing logic
│   └── habits.js             # Habit tracking helpers
└── styles/
    ├── main.css              # Core design system
    ├── routines.css          # Routine page styles
    └── dashboard.css         # Dashboard styles
```

## Time-Based Flow

### Pre-Morning (Before 6:30 AM)
- App shows locked screen
- Displays time until morning routine
- All other features inaccessible

### Morning (6:30 AM onwards)
**On first access:** Immediately redirects to morning routine

**Morning Routine Checklist:**
1. Wake up (6:30 AM) - auto-checked based on time
2. Stretch for 5 minutes - timer included
3. 1 failure set of push-ups - manual check
4. 50x bodyweight squats - counter included
5. Quick shower - max 5 min timer
6. Drink full bottle of water - manual check
7. Good breakfast - manual check
8. Bible study and prayer - redirects to Bible study
9. Start studying - manual check

**Only after completing ALL items:** Access to dashboard unlocked

### Daytime
Full access to:
- Dashboard with habit tracker
- Bible study ("Read More Bible" button)
- Study time logger
- Journal viewer
- Habit manager
- Settings

### Evening (9:00 PM onwards)
**Gentle notification:** "Time to wind down"

**Evening Routine Checklist:**
1. Turn on red lights - manual check
2. Brush teeth and change into pyjamas - manual check
3. Journal: 3 good things from today - text input
4. Journal: 3 lessons from today - text input
5. Journal: Improvements for tomorrow - text input
6. Plan tomorrow on paper - manual check
7. Read a book - manual check

**After completion:**
- Creates journal entry automatically
- Shows: "Great job! Now shut down your computer and go read, then sleep."
- Locks all app features until next morning
- Only displays: "Evening routine completed. See you tomorrow!"

## Features

### 1. Habit Tracker
- **Visual grid:** Last 21 days displayed
- **Each row:** One habit
- **Each column:** One day
- **Color coding:**
  - Green: Completed
  - Empty: Missed
  - Border: Today
- **Click cells:** Toggle completion for any day
- **Auto-tracked:** Morning routine, evening routine, Bible study

### 2. Study Time Logger
- Log study sessions with duration
- Optional subject and notes
- Displays: Total today, total this week, average per day
- Visual bar chart for last 7 days

### 3. Bible Study Integration
- Same functionality as original app
- Accessible via dashboard or morning routine
- "Read More Bible" suggests contextual passages
- Tracks completion as habit

### 4. Journal System
- Auto-created from evening routine
- Stores: 3 good things, 3 lessons, improvements
- Searchable/filterable by date
- View all previous entries

### 5. Habit Manager
- Add custom habits with categories
- Remove habits (deletes all tracking data)
- Built-in habits (routines) cannot be removed
- Categories: Health, Productivity, Spiritual, Social, Learning, Creative, Other

### 6. Data Management
- **Local Storage:** All data stored in browser localStorage
- **Automatic Backups:** Created on every save
- **Export:** Download JSON backup file
- **Import:** Upload JSON to restore data
- **Cross-Device Sync:** Manual via export/import
- **Data Structure:** Fully validated on import

## Data Structure

```javascript
{
  preferences: {
    morningTime: '06:30',
    eveningTime: '21:00'
  },
  routines: {
    morning: { lastCompleted: 'YYYY-MM-DD', items: [...] },
    evening: { lastCompleted: 'YYYY-MM-DD', items: [...] }
  },
  habits: [
    { id: 'habit-id', name: 'Habit Name', category: 'health', dates: ['YYYY-MM-DD', ...] }
  ],
  studySessions: [
    { id: timestamp, date: 'YYYY-MM-DD', duration: 30, subject: '', notes: '' }
  ],
  journalEntries: [
    { id: timestamp, date: 'YYYY-MM-DD', goodThings: [], lessons: [], improvements: [] }
  ],
  bible: {
    day: 1,
    completedDates: [],
    streak: 0,
    best: 0
  },
  meta: {
    version: '1.0',
    created: 'ISO timestamp',
    lastUpdated: 'ISO timestamp'
  }
}
```

## Dashboard Components

### Header
- Current date and time
- Greeting based on time of day
- Status indicators for routines

### Habit Tracker Section
- Visual grid: 21 days × all habits
- Click any cell to toggle
- Shows completion patterns
- Add/remove habits button

### Today's Focus Section
- Current routine status if incomplete
- Study time logged today
- Quick actions: Bible, Log Study, View Journal

### Quick Stats
- Study hours this week
- Morning routine streak
- Evening routine streak
- Bible study completion rate (7 days)

## Technical Implementation

### Time-Based Routing
**Robust time checking that can't be easily bypassed:**
- Checks every page load
- Re-checks every minute
- Enforces redirects automatically
- No client-side time manipulation bypass

### Data Integrity
- Validates all data before saving
- Automatic backup on every change
- Rollback capability via backup restore
- Handles version differences on import

### Mobile Optimization
- Touch-friendly buttons (min 44px)
- Readable text at all sizes
- Efficient use of space
- Responsive grid layouts

### Performance
- Lightweight: No external dependencies
- Fast load times: ~2KB gzipped
- Efficient rendering: Minimal reflows
- Service worker ready for offline use

## Design System

### Colors
```css
--bg-primary: #0D1117
--bg-elevated: #161B22
--text-primary: #C9D1D9
--text-secondary: rgba(201, 209, 217, 0.85)
--text-tertiary: rgba(201, 209, 217, 0.64)
--border-primary: #30363D
--border-subtle: #21262D
```

### Typography
- **Font:** JetBrains Mono (monospace)
- **Scale:** 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px
- **Weights:** 300 (light), 400 (regular), 600 (semibold), 700 (bold)

### Spacing
- **8-point grid:** 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Consistent spacing:** Maintains visual rhythm

### Evening Mode
- **Red-tinted theme:** Easier on eyes at night
- **Darker backgrounds:** Promotes wind-down
- **Softer colors:** Reduces blue light

## Configuration

### Changing Routine Times
1. Go to Dashboard
2. Click "Settings"
3. Adjust "Morning Routine Start" and "Evening Routine Start"
4. Click "Save Times"

### Adding Custom Habits
1. Go to Dashboard
2. Click "+" button in Habit Tracker section
3. Enter habit name and select category
4. Click "Add Habit"

### Exporting Data
1. Settings → "Export Data"
2. JSON file downloads automatically
3. Save securely (contains all your data)

### Importing Data
1. Settings → "Import Data"
2. Select exported JSON file
3. Data validates and imports
4. Page refreshes with imported data

## Browser Support

- **Chrome/Edge:** Full support
- **Firefox:** Full support
- **Safari:** Full support (iOS 12+)
- **Opera:** Full support

**Requirements:**
- JavaScript enabled
- localStorage available (not in private/incognito mode)
- Modern browser (ES6+ support)

## Hosting on GitHub Pages

Already configured for GitHub Pages:
1. Repository is ready
2. All paths are relative
3. No server-side code required
4. Works entirely in browser

**URL:** `https://yourusername.github.io/deeper/`

## Privacy & Security

- **All data stored locally:** Nothing sent to servers
- **No tracking:** No analytics or third-party scripts
- **No accounts:** No login required
- **Encrypted export:** Optional password protection (future feature)

## Future Enhancements

- [ ] Cloud sync option (Firebase/Supabase)
- [ ] Encrypted data export with password
- [ ] Reminder notifications (browser/desktop)
- [ ] Custom routine items
- [ ] Habit streaks with achievements
- [ ] Data visualization charts
- [ ] Bible reading plan customization
- [ ] Dark/light theme toggle
- [ ] Offline-first PWA support

## Troubleshooting

### App won't let me access dashboard
- **Check the time:** Morning routine required after 6:30 AM
- **Complete morning routine:** All 9 items must be checked

### Data disappeared
- **Check for backup:** Settings → "Import Data"
- **Browser cleared data:** Export regularly to prevent loss
- **Private mode:** Data doesn't persist in incognito

### Time-based routing not working
- **Check system time:** Must be accurate
- **Refresh page:** Routing checks on load
- **Clear cache:** Hard refresh (Ctrl+Shift+R)

### Habit tracker not updating
- **Click cells:** Directly toggle any day
- **Check localStorage:** Ensure browser allows storage
- **Export data:** Verify habit dates array

## Credits

**Original Bible Study App:** Your existing "deeper" application
**Transformation:** Complete rework into life management system
**Design System:** Maintained from original (JetBrains Mono, dark theme)
**Philosophy:** Enforce healthy routines through time-based restrictions

## License

Personal use only. Not licensed for redistribution or commercial use.

---

**Remember:** The app enforces routines to build discipline. If you find yourself wanting to "hack around" the time restrictions, that's exactly the behavior it's designed to prevent. Trust the system.

**Version:** 1.0
**Last Updated:** 2025
