# CampusEvents – University Event Management App

## Student Information

- **Name:** Dilukshi Jayawardhane
- **Student ID:** FGS/MSc/CS/2025/007
- **Project:** CampusEvents
- **Platform:** React Native (Expo)

## 1. Project Overview

CampusEvents is a mobile application developed using React Native and Expo. It allows university students to explore upcoming campus events, view event details, manage favourite events, filter events by category, and set reminders for events.

The application provides a simple and user-friendly interface for keeping students informed about university activities.

## 2. Main Features

- **Event Listing:** Displays five predefined university events.
- **Event Details:** Allows users to view individual event information.
- **Category Filtering:** Filters events by categories such as Technology, Academic, Entertainment, Career, and Sports.
- **Favourite Events:** Users can add and remove events from their favourites.
- **Local Notifications:** Users can schedule local reminders for events.
- **Background Detection:** Uses the React Native AppState API to detect when the application returns to the foreground.

## 3. Application Screens

1. **Home Screen:** Displays available university events.
2. **Event Details Screen:** Shows information about a selected event.
3. **Favourites Screen:** Displays events marked as favourites.

## 4. Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- React Context API
- React Native FlatList
- React Native Modal
- React Native AppState API
- Expo Notifications

## 5. Navigation Structure

The application uses Expo Router for file-based navigation.

```text
app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── favorites.tsx
├── event/
│   └── [id].tsx
└── modal.tsx

context/
└── FavoritesContext.tsx
```

- The tab layout provides navigation between the Home and Favourites screens.
- The dynamic event route displays individual event details.
- The FavoritesContext shares favourite-event state across screens.

## 6. Local Notification Implementation

The application uses the Expo Notifications library to implement local event reminders.

Users can select the reminder option for an event. The application requests notification permission and schedules a local notification to appear after five seconds.

## 7. AppState Implementation

The React Native AppState API is used to monitor application state changes.

When the application moves into the background and subsequently returns to the foreground, a welcome-back alert is displayed.

## 8. Installation and Execution

Clone the repository:

```bash
git clone https://github.com/dilukshijayawardhane-droid/CampusEvents.git
```

Navigate to the project directory:

```bash
cd CampusEvents
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Open the application using Expo Go on a mobile device.

## 9. GitHub Repository

[CampusEvents – GitHub Repository](https://github.com/dilukshijayawardhane-droid/CampusEvents)

## 10. Demonstration Video

**Demo Video:** (https://drive.google.com/file/d/1LSBKA-SvCvt1BYP4GOjoRI_zCEbB4hen/view?usp=sharing)

