# 🎬 Movie Watchlist App

A React Native (Expo) mobile application that allows users to search for movies using the OMDb API and save their favorites to a persistent watchlist. The app works seamlessly across restarts and focuses on performance, clean architecture, and good UX.

---

## 📱 Features

- 🔍 Search movies by title (OMDb API)
- 📃 Display movies with poster, title, and year
- ❤️ Add / remove movies from a Watchlist
- 💾 Persistent storage using AsyncStorage
- 🔁 Pull-to-refresh support
- ⚡ Optimistic UI updates for instant feedback
- 🧠 Performance optimizations with memoization
- 🗂 Tab-based navigation using Expo Router
- 🧼 Clean empty, loading, and error states

---

## 🛠 Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **Expo Router** (Tabs)
- **Zustand** (State Management)
- **AsyncStorage** (Persistence)
- **React Query (TanStack Query)** (Data fetching & caching)
- **Axios** (HTTP client)
- **NativeWind / Tailwind** (Styling)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/official-daudu/movie-box.git
cd movie-box
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root of the project:

```env
EXPO_PUBLIC_OMDB_KEY=your_omdb_api_key_here
```

You can get a free API key from:
👉 [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

### 4️⃣ Start the app

```bash
npx expo start
```

Run on:

- iOS Simulator
- Android Emulator
- Physical device (Expo Go)

---

## 🧱 Project Structure

````txt
app/
 └─ (app)/
    ├─ index.tsx          # Movie search screen
    ├─ watch-list.tsx     # Watchlist screen
    └─ _layout.tsx        # Tab navigation layout

src/
 ├─ components/
 │   ├─ base/             # Reusable UI components (Text, Button, Input)
 │   └─ inc/              # Shared UI blocks (PageHeader)
 ├─ hooks/                # Custom hooks (debounce, font loader)
 ├─ lib/
 │   └─ api.ts            # OMDb API logic
 ├─ store/
 │   └─ watchlist.store.ts# Zustand store with persistence
 └─ assets/               # Fonts & images


---

## 🧠 Architectural Decisions

### State Management (Zustand)

* Zustand was chosen for its simplicity and minimal boilerplate.
* Watchlist state is globally accessible and persisted automatically.
* Store hydration state is used to prevent UI flicker on app launch.

### Data Fetching (React Query)

* Handles caching, loading, error, and refetching logic.
* Supports request cancellation via `AbortSignal`.
* Prevents unnecessary network calls with `staleTime`.

### Navigation (Expo Router)

* File-based routing for clarity and scalability.
* Tab navigation separates **Search** and **Watchlist** flows cleanly.

---

## 💾 Persistent Storage Logic

* Watchlist data is stored using **AsyncStorage**
* Integrated via `zustand/middleware/persist`
* Data is automatically rehydrated when the app restarts
* Hydration state (`hasHydrated`) ensures UI only renders after data is ready

```ts
persist(
  (set) => ({ movies: [] }),
  {
    name: "watchlist-storage",
    storage: createJSONStorage(() => AsyncStorage),
  }
);
````

✅ **Critical Requirement Met:**
Movies remain in the watchlist even after killing and reopening the app.

---

## ⚡ Performance Optimizations

- `React.memo` used on list items and empty states
- `useMemo` to compute derived state (e.g. `isSaved`)
- `useCallback` for stable handlers
- FlatList optimizations:
  - `initialNumToRender`
  - `maxToRenderPerBatch`
  - `removeClippedSubviews`

---

## ✨ Bonus Features Implemented

- ✅ Optimistic UI for save/remove actions
- ✅ Pull-to-refresh
- ✅ Search with debounce
- ✅ Graceful empty & error states
- ✅ Image caching with `expo-image`

---

## 📌 Possible Improvements

- Pagination / infinite scroll
- Movie detail screen
- Offline-first search caching
- Unit tests for store and API logic

---

## 👤 Author

Built as part of a **technical assessment** to demonstrate:

- React Native fundamentals
- State management
- Persistence
- Performance optimization
- Clean code and architecture
