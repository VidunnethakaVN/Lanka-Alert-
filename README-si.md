# LankaAlert V2.4 — භාවිතය සහ සීමාවන්

V2.4 යනු ජංගම සහ පරිගණක තිර සඳහා සකස් කළ LankaAlert පෙරදසුනකි. පෙරදසුනට කාලගුණ/වැසි අනාවැකි තිරය, ආරක්ෂක තත්ත්ව සාරාංශය, ඇඟවීම්, ගංගා මට්ටම්, ප්‍රජා වාර්තා, ආරක්ෂක මඟපෙන්වීම, SOS ආදර්ශ ප්‍රවාහය සහ සූදානම් වීමේ පිරික්සුම් ලැයිස්තුව එක් කර ඇත. Road status කොටස සහ එයට අදාළ navigation ඉවත් කර ඇත.

## ගොනු

- `index.html` — යෙදුම් තිර, වැසි අනාවැකි, ඇඟවීම්, checklist සහ navigation
- `styles.css` — ජංගම/පරිගණක පෙනුම, අඳුරු තේමාව සහ ප්‍රවේශ පහසුකම්
- `app.js` — භාෂා, අන්තර්ක්‍රියා, ප්‍රජා වාර්තා, ස්ථාන අවසරය, check-in, SOS සහ local preferences
- `sw.js`, `manifest.webmanifest` — HTTPS hosting සඳහා offline app shell සහ ස්ථාපනය
- `assets/` — LankaAlert ලාංඡන
- `FEATURE-STATUS-SI.md` — V2.4 විශේෂාංග සාරාංශය

## භාවිතය

සරල පෙරදසුනකට `index.html` බ්‍රවුසරයෙන් විවෘත කරන්න. GPS සහ service worker පහසුකම් සඳහා HTTPS hosting හෝ localhost භාවිතා කරන්න. භාෂාව, දිස්ත්‍රික්කය, පෙනුම සහ අකුරු ප්‍රමාණය Settings තුළින් වෙනස් කළ හැකියි.

```powershell
firebase emulators:start --only hosting --project lankaalert-d6364
```

## V2.4 ඇතුළත් දේ

- පැය 24/72 වැසි අනාවැකි පෙරදසුන සහ දෘශ්‍ය rainfall bars
- flood/landslide අවදානම් තත්ත්ව සාරාංශය සහ preparedness score
- ගංගා ජල මට්ටම් සහ ස්ථර මාරු කළ හැකි රූපමය සිතියම
- වෙනම Alerts තිරයක්; notice සහ forecast tabs
- දේශීය GPS අවසරය ඉල්ලීම (පරිශීලකයා බොත්තම ඔබන විට පමණි)
- ප්‍රජා reports, announcements සහ archive tabs
- shelter සාරාංශය, safety guide, emergency contacts, audio briefing සහ SOS/check-in demo flows
- අයිතම 8ක safety checklist; ප්‍රගතිය මෙම බ්‍රවුසරයේ සුරකියි
- profile, language, district, dark mode, contrast, text size, reduced motion සහ low data settings
- search shortcut සහ notification permission control
- Road status screen, nav item සහ road-report samples ඉවත් කර ඇත

## දත්ත සහ ආරක්ෂාව

මෙය UI හා workflow පෙරදසුනකි. කාලගුණය, අවදානම් මට්ටම්, ගංගා මට්ටම්, නිවේදන, නවාතැන් ධාරිතාව සහ වෙනත් දර්ශන අගයන් ආදර්ශ දත්ත වේ; ඒවා live/official ලෙස සලකන්න එපා. කිසිදු weather, river, community හෝ government API එකක් එක් කර නැත. මෙම zip එකෙන් SMS යවන්නේ නැත; SOS ක්‍රියාත්මක වූ පසුත් එය දුරස්ථ සහන කණ්ඩායමකට නොයයි. වාර්තා, profile, settings සහ checklist මෙම බ්‍රවුසරයේ local storage එකේ පමණක් තබා ඇත. GPS එක ලබාගන්නේ පරිශීලකයා ස්ථාන බොත්තම ඔබා browser අවසරය දුන්නොත් පමණි; එය සේවාදායකයකට යවන්නේ නැත. වාර්තා form එකේ ස්ථානය ඇතුළත් කිරීමට තෝරාගත්තොත්, එම වාර්තාවේ ස්ථාන පෙළ මෙම බ්‍රවුසරයේ local storage එකේ පමණක් රැඳේ.

සැබෑ හදිසි අවස්ථාවකදී නිල ආපදා කළමනාකරණ හා කාලගුණ නිවේදන අනුගමනය කර අවශ්‍ය හදිසි අංක අමතන්න.

## Firebase Hosting

`.firebaserc` හි තිබූ Firebase project configuration එක වෙනස් කර නැත. Deploy කිරීමට පෙර නිවැරදි project එක තහවුරු කරගන්න.

```powershell
firebase login
firebase deploy --only hosting --project lankaalert-d6364
```
