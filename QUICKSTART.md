# Quick Start Guide - Deeper Life Management Dashboard

## 🚀 Getting Started in 5 Minutes

### 1. Open the App
Simply open `index.html` in your browser. The app will automatically:
- Route you based on the current time
- Initialize your data storage
- Guide you through your first routine

### 2. First Morning (6:30 AM onwards)
When you first open the app after 6:30 AM:

1. **You'll be redirected to Morning Routine**
2. **Complete 9 items in order:**
   - ✓ Wake up (auto-checked)
   - ⏱ Stretch for 5 min (timer)
   - ✓ Push-ups
   - 🔢 50 squats (counter)
   - ⏱ Shower (5 min timer)
   - ✓ Drink water
   - ✓ Eat breakfast
   - 📖 Bible study
   - ✓ Start studying

3. **Click each item** to complete it
4. **Dashboard unlocks** after all items done

### 3. Using the Dashboard (Daytime)
Once morning routine is complete:

#### Habit Tracker
- **Visual grid:** Last 21 days × all your habits
- **Click any cell:** Toggle completion for that day
- **Colors:**
  - Green = Completed
  - Empty = Not done
  - Border = Today

#### Quick Actions
- **📖 Bible Study:** Read and reflect on scripture
- **⏱ Log Study:** Record study sessions (duration, subject)
- **📝 Journal:** View all evening journal entries
- **⚙ Settings:** Adjust times, export/import data

#### Stats
- Study time logged today and this week
- Current streaks for morning/evening routines
- Bible study completion rate

### 4. First Evening (9:00 PM onwards)
At 9 PM, a notification will appear:

1. **Click "Start Evening Routine"**
2. **Complete 7 items:**
   - ✓ Turn on red lights
   - ✓ Brush teeth, change into pyjamas
   - 📝 3 good things from today (text)
   - 📝 3 lessons from today (text)
   - 📝 Improvements for tomorrow (text)
   - ✓ Plan tomorrow on paper
   - ✓ Read a book

3. **Journal entry auto-created** from your inputs
4. **App locks** after completion
5. **Message:** "Now shut down and go read, then sleep"

### 5. Adding Custom Habits

1. Go to Dashboard
2. Click **"+"** button in Habit Tracker section
3. Enter habit name: "Exercise 30min"
4. Select category: "Health"
5. Click **"Add Habit"**
6. New row appears in tracker
7. Click cells to track completion

### 6. Changing Routine Times

1. Dashboard → **Settings**
2. Adjust times:
   - Morning Routine Start: `06:30` (default)
   - Evening Routine Start: `21:00` (default)
3. Click **"Save Times"**
4. New times take effect immediately

### 7. Exporting Your Data

1. Dashboard → **Settings**
2. Click **"Export Data"**
3. JSON file downloads: `deeper-backup-2025-01-15.json`
4. Save this file somewhere safe
5. Use it to restore data or sync to another device

### 8. Importing Data (Cross-Device Sync)

1. Dashboard → **Settings**
2. Click **"Import Data"**
3. Select your exported JSON file
4. Click **Open**
5. All data restores instantly

## ⏰ Time-Based Flow Summary

| Time | Mode | Access |
|------|------|--------|
| **Before 6:30 AM** | Pre-Morning | ❌ Locked screen only |
| **6:30 AM - 9:00 PM** | Morning Required | ✅ Morning routine must complete |
| **After Morning** | Daytime | ✅ Full dashboard access |
| **9:00 PM onwards** | Evening Prompt | ⚠️ Notification to wind down |
| **After Evening** | Evening Complete | ❌ Locked until next morning |
| **Midnight** | New Day | 🔄 Routines reset |

## 🎯 Key Features at a Glance

### Habit Tracking
- **21-day rolling window** - See patterns over 3 weeks
- **Click to toggle** - Any day, any habit
- **Auto-tracked** - Morning/evening routines, Bible study
- **Custom habits** - Add unlimited habits with categories

### Study Logging
- **Quick entry** - Duration, subject, notes
- **Today's total** - See time logged today
- **Weekly stats** - Track productivity trends
- **Subject tracking** - Organize by what you study

### Journal System
- **Auto-created** - From evening routine
- **3 good things** - Practice gratitude
- **3 lessons** - Reflect on learnings
- **Improvements** - Plan tomorrow better
- **View history** - Browse past entries

### Bible Study
- **Daily readings** - Structured plan
- **Contextual suggestions** - Related passages
- **Progress tracking** - Completion calendar
- **Streak counting** - Stay consistent

## 💡 Pro Tips

### Tip 1: Don't Fight the System
The time-based restrictions are intentional. If you find yourself wanting to "hack around" them, that's exactly the behavior it's designed to prevent. Trust the discipline.

### Tip 2: Export Weekly
Set a reminder every Sunday to export your data. Store it in cloud storage for backup.

### Tip 3: Start Small
Don't add 20 habits on day one. Start with the built-in routines, then add 1-2 custom habits per week.

### Tip 4: Review Patterns
Every week, look at your habit tracker grid. You'll see patterns (weekends weak? mid-week strong?) and can adjust.

### Tip 5: Evening Journaling
Take the evening journal seriously. The "3 good things" practice has been scientifically shown to improve wellbeing.

### Tip 6: Mobile Friendly
Add to your phone's home screen:
- Safari: Share → Add to Home Screen
- Chrome: Menu → Add to Home Screen
- Opens like a native app

### Tip 7: Airplane Mode Testing
If you need to test time-based features, use airplane mode and change system time. Don't do this in normal use though!

## 🐛 Troubleshooting

### "I can't access the dashboard"
- Check the time. Is it after 6:30 AM?
- Have you completed ALL 9 morning routine items?
- Refresh the page (F5)

### "My data disappeared"
- Are you in private/incognito mode? Data won't persist there.
- Did your browser clear localStorage? Check browser settings.
- Do you have an export backup? Import it.

### "Habit tracker not updating"
- Click directly on cells to toggle
- Refresh page to see changes
- Check browser console (F12) for errors

### "Time-based routing seems wrong"
- Check your system time is correct
- Time zones matter - uses local time
- Refresh the page to re-check time

### "Export/Import not working"
- Check file is valid JSON
- Don't edit exported files manually
- Try different browser if issues persist

## 📱 Mobile Usage

The app is fully responsive and works on mobile:

1. **Chrome Mobile:** Menu → Add to Home Screen
2. **Safari iOS:** Share → Add to Home Screen
3. **Standalone mode:** Opens fullscreen, no browser bars
4. **Touch optimized:** All buttons 44px+ for easy tapping
5. **Habit tracker:** Scroll horizontally on small screens

## 🔒 Privacy & Data

- **100% local:** All data stored in your browser
- **No tracking:** Zero analytics or telemetry
- **No accounts:** No registration required
- **No servers:** Nothing sent to internet
- **Export anytime:** You own your data completely

## 🎨 Customization

While the app is designed to enforce discipline, you CAN customize:

### ✅ You Can Change:
- Morning routine start time
- Evening routine start time
- Custom habits (add/remove unlimited)
- Habit categories

### ❌ You Cannot Change (by design):
- Morning routine items (fixed 9 items)
- Evening routine items (fixed 7 items)
- Time-based access restrictions
- 21-day habit window
- Core design/layout

## 🚧 Roadmap Ideas

Want these features? You can add them:

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Reminder notifications
- [ ] Custom routine items
- [ ] Habit streak achievements
- [ ] Data visualization charts
- [ ] Weekly reports via email
- [ ] Dark/light theme toggle
- [ ] Custom Bible reading plans
- [ ] Social accountability features
- [ ] API integrations

## 📞 Need Help?

1. **Read the full README.md** - Comprehensive documentation
2. **Check TESTING.md** - See how features should work
3. **Browser Console (F12)** - Check for JavaScript errors
4. **GitHub Issues** - Report bugs or request features

## ✨ Start Your Journey

Remember: This app is about building sustainable habits through structure and discipline. The restrictions aren't limitations - they're training wheels for better habits.

**Your first day:**
1. Complete morning routine
2. Explore the dashboard
3. Log your first study session
4. Complete evening routine
5. Review your first journal entry

**After one week:**
- Check your habit grid for patterns
- Adjust routine times if needed
- Add 1-2 custom habits
- Export your data for backup

**After one month:**
- Review your streaks
- Celebrate consistency
- Identify habits needing work
- Share your success

---

**You've got this. Start tomorrow morning.**

---

*Version 1.0 - Life management starts with daily discipline.*
