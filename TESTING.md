# Testing Checklist for Deeper Life Management Dashboard

## Pre-Testing Setup

### Browser Console Commands for Time Testing

Since the app uses time-based routing, you can temporarily override system time for testing:

```javascript
// Override Date.now() to simulate different times
const originalDate = Date;
Date = class extends originalDate {
    constructor() {
        return new originalDate('2025-01-15T05:00:00'); // 5:00 AM
    }
};

// Reset to normal
Date = originalDate;
```

**Better approach:** Temporarily modify `routines.js` for testing:
```javascript
// In getCurrentMode(), change:
const now = new Date();
// To:
const now = new Date('2025-01-15T07:00:00'); // Test time
```

## Testing Flows

### ✅ Test 1: Pre-Morning (Before 6:30 AM)

**Steps:**
1. Set system/test time to 5:00 AM
2. Navigate to index.html
3. Verify locked screen appears
4. Check displays time until morning
5. Try to navigate to dashboard.html directly
6. Verify redirect back to locked screen

**Expected:**
- [  ] Locked screen shows
- [  ] Time countdown displayed correctly
- [  ] All navigation blocked
- [  ] Message says "Go back to sleep or rest"

---

### ✅ Test 2: Morning Routine (6:30 AM onwards, not completed)

**Steps:**
1. Set time to 7:00 AM
2. Navigate to index.html
3. Verify automatic redirect to morning-routine.html
4. Check "Wake up" is auto-checked
5. Try each routine item type:
   - Manual check (push-ups)
   - Timer (stretch, shower)
   - Counter (squats)
   - Redirect (Bible study)
6. Try to navigate to dashboard.html directly
7. Verify redirect back to morning routine
8. Complete all items
9. Check completion modal appears
10. Click "Go to Dashboard"
11. Verify dashboard loads

**Expected:**
- [  ] Auto-redirects to morning routine
- [  ] Wake up auto-checked if past 6:30
- [  ] Timer modal works (stretch, shower)
- [  ] Counter modal works (squats)
- [  ] Bible study redirect works
- [  ] Can't access dashboard until complete
- [  ] Progress bar updates correctly
- [  ] Completion modal shows
- [  ] Dashboard accessible after completion

---

### ✅ Test 3: Dashboard (Daytime, Morning Complete)

**Steps:**
1. Complete morning routine
2. Navigate to dashboard.html
3. Test habit tracker:
   - Click cells to toggle completion
   - Check colors update
   - Verify last 21 days display correctly
4. Test quick actions:
   - Click "Bible Study" - opens bible-study.html
   - Click "Log Study" - shows study logger modal
   - Click "Journal" - opens journal.html
   - Click "Settings" - shows settings modal
5. Test study logger:
   - Enter duration, subject, notes
   - Click "Log Session"
   - Verify appears in today's stats
6. Test habit manager:
   - Click "+" in habit tracker
   - Add custom habit
   - Verify appears in tracker
   - Remove custom habit
   - Verify confirmation dialog
7. Test settings:
   - Change morning time
   - Change evening time
   - Export data (download JSON)
   - Import data (upload JSON)
   - Verify reset prompts double confirm
8. Check stats display correctly:
   - Study time today
   - Study time this week
   - Morning streak
   - Evening streak
   - Completion rates

**Expected:**
- [  ] Dashboard fully accessible
- [  ] Habit cells toggle correctly
- [  ] All quick actions work
- [  ] Study logger saves data
- [  ] Custom habits can be added/removed
- [  ] Settings save correctly
- [  ] Export downloads JSON file
- [  ] Import restores data
- [  ] Stats calculate correctly

---

### ✅ Test 4: Evening Notification (9:00 PM, Not Complete)

**Steps:**
1. Set time to 9:00 PM
2. Be on dashboard.html
3. Wait 1 minute or refresh
4. Verify evening notification appears at top
5. Check notification is dismissible
6. Verify can still use dashboard
7. Click "Start Evening Routine" button
8. Verify redirects to evening-routine.html

**Expected:**
- [  ] Red notification bar appears at top
- [  ] Says "Time to wind down"
- [  ] Dashboard still accessible
- [  ] Button redirects to evening routine

---

### ✅ Test 5: Evening Routine (9:00 PM onwards)

**Steps:**
1. Set time to 9:00 PM
2. Navigate to evening-routine.html
3. Test manual check items (lights, hygiene, plan, read)
4. Test text input items (good things, lessons, improvements):
   - Click item
   - Enter text
   - Save
   - Verify preview shows
5. Complete all items
6. Verify completion modal appears
7. Check journal entry was created
8. Click "Done"
9. Verify redirects to index.html
10. Check evening complete screen shows
11. Try to navigate to dashboard.html
12. Verify stays on evening complete screen

**Expected:**
- [  ] All routine items work correctly
- [  ] Text modals save properly
- [  ] Completion modal appears
- [  ] Journal entry auto-created
- [  ] Evening complete screen shows
- [  ] All navigation locked
- [  ] Can view today's stats
- [  ] Message says "See you tomorrow"

---

### ✅ Test 6: Bible Study Integration

**Steps:**
1. Access from morning routine
2. Verify return parameter in URL
3. Complete/interact with Bible study
4. Click back button
5. Verify returns to morning routine
6. Check Bible study marked complete in routine
7. Access from dashboard
8. Verify return to dashboard works
9. Check Bible study habit tracked

**Expected:**
- [  ] Opens with correct return URL
- [  ] Bible study interface works
- [  ] Returns to correct location
- [  ] Marks routine item complete
- [  ] Tracks as habit

---

### ✅ Test 7: Journal Viewer

**Steps:**
1. Navigate to journal.html
2. If no entries, verify empty state
3. Complete evening routine to create entry
4. View journal.html again
5. Verify entry appears
6. Click entry
7. Check modal shows all data:
   - Good things (3)
   - Lessons (3)
   - Improvements
   - Date/time
8. Close modal
9. Check ESC key closes modal
10. Click back button
11. Verify returns to dashboard

**Expected:**
- [  ] Empty state shows correctly
- [  ] Entries display in reverse order (newest first)
- [  ] Entry modal shows all data
- [  ] ESC key works
- [  ] Back button returns to dashboard

---

### ✅ Test 8: Data Persistence

**Steps:**
1. Complete morning routine
2. Add custom habit
3. Toggle some habit cells
4. Log study session
5. Complete evening routine
6. Refresh page (F5)
7. Verify all data persists:
   - Morning routine stays complete
   - Custom habit exists
   - Habit toggles saved
   - Study session logged
   - Evening routine complete
   - Journal entry exists
8. Export data
9. Reset all data
10. Import exported data
11. Verify everything restored

**Expected:**
- [  ] All data persists across refresh
- [  ] Export creates valid JSON
- [  ] Reset clears all data
- [  ] Import restores all data
- [  ] No data loss or corruption

---

### ✅ Test 9: Mobile Responsiveness

**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different viewports:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)
4. For each viewport, test:
   - Index/router screens
   - Morning routine
   - Evening routine
   - Dashboard
   - Modals
   - Habit tracker scrolling
5. Verify touch targets are 44px+
6. Check text is readable
7. Verify no horizontal scroll
8. Test landscape orientation

**Expected:**
- [  ] All pages responsive
- [  ] Touch targets large enough
- [  ] Text readable at all sizes
- [  ] No horizontal scroll
- [  ] Habit tracker scrolls horizontally on mobile
- [  ] Modals fit on small screens
- [  ] Landscape works

---

### ✅ Test 10: Edge Cases

**Steps:**
1. **Midnight transition:**
   - Set time to 11:59 PM
   - Wait 1 minute
   - Verify new day starts correctly
   - Check routines reset

2. **Browser back button:**
   - Navigate through pages
   - Use browser back
   - Verify routing still enforced

3. **Multiple tabs:**
   - Open app in 2 tabs
   - Make changes in tab 1
   - Refresh tab 2
   - Verify data synced

4. **localStorage full:**
   - Fill localStorage (difficult to test)
   - Verify graceful error handling

5. **Invalid data:**
   - Manually edit localStorage
   - Add invalid JSON
   - Refresh page
   - Verify falls back to defaults

6. **Very long streaks:**
   - Manually add 100+ days
   - Check stats calculate correctly
   - Verify no overflow issues

7. **Empty states:**
   - Reset all data
   - Check each page handles empty data:
     - No habits
     - No study sessions
     - No journal entries

**Expected:**
- [  ] Midnight resets routines correctly
- [  ] Back button doesn't bypass routing
- [  ] Data syncs across tabs on refresh
- [  ] Handles localStorage errors
- [  ] Invalid data doesn't crash app
- [  ] Large numbers handled correctly
- [  ] Empty states display properly

---

### ✅ Test 11: Accessibility

**Steps:**
1. Tab through pages (keyboard only)
2. Verify all buttons reachable
3. Check focus indicators visible
4. Test with screen reader (optional)
5. Verify color contrast (WCAG AA)
6. Check reduced motion preference
7. Test with increased font size
8. Verify semantic HTML

**Expected:**
- [  ] All interactive elements keyboard accessible
- [  ] Focus indicators visible
- [  ] Color contrast meets WCAG
- [  ] Animations respect prefers-reduced-motion
- [  ] Text readable at 200% zoom
- [  ] Semantic HTML used

---

### ✅ Test 12: Performance

**Steps:**
1. Open DevTools → Performance
2. Record page load
3. Check:
   - Time to interactive < 2s
   - No layout shifts
   - Smooth animations
4. Test with 100+ habits
5. Test with 365 days of data
6. Check localStorage size
7. Verify no memory leaks

**Expected:**
- [  ] Fast initial load
- [  ] No layout shifts
- [  ] 60fps animations
- [  ] Handles large datasets
- [  ] localStorage under 5MB
- [  ] No memory leaks

---

## Browser Compatibility

Test in:
- [  ] Chrome (latest)
- [  ] Firefox (latest)
- [  ] Safari (macOS/iOS)
- [  ] Edge (latest)
- [  ] Mobile Safari (iOS)
- [  ] Chrome Mobile (Android)

---

## Known Limitations

- localStorage doesn't work in private/incognito mode
- Time-based routing can be bypassed by changing system time (intentional - trust the user)
- No server-side validation (client-only app)
- Manual export/import for cross-device sync

---

## Quick Test Script (Console)

```javascript
// Run this in console for quick data setup
const data = Storage.load();

// Add test habits
for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    data.habits.forEach(habit => {
        if (Math.random() > 0.3) {
            if (!habit.dates.includes(dateStr)) {
                habit.dates.push(dateStr);
            }
        }
    });
}

// Add test study sessions
for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    Storage.logStudySession(data, {
        duration: Math.floor(Math.random() * 120) + 30,
        subject: 'Test Subject',
        notes: 'Test notes'
    });
}

Storage.save(data);
console.log('Test data generated!');
```

---

## Regression Testing

After any code changes, re-run:
- [  ] Test 2 (Morning Routine)
- [  ] Test 3 (Dashboard)
- [  ] Test 5 (Evening Routine)
- [  ] Test 8 (Data Persistence)

---

## Sign-Off

- [  ] All critical tests passing
- [  ] Mobile responsive
- [  ] Data persists correctly
- [  ] No console errors
- [  ] Performance acceptable
- [  ] Ready for deployment

**Tester:** _______________
**Date:** _______________
**Build Version:** 1.0
