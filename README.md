# AI Travel Planner App

Plan your next adventure effortlessly with this AI-powered travel planner mobile application. Built with React Native and Expo, this app leverages cutting-edge AI to generate personalized trip itineraries, suggest destinations, and help you organize your travel plans seamlessly.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [API Keys](#api-keys)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **AI-Powered Trip Generation:** Get personalized travel plans based on your destination, duration, travel style, and budget.
- **User Authentication:** Secure sign-up and sign-in functionality using Firebase Authentication.
- **Place Search:** Find and select destinations using MapTiler API.
- **Interactive Itinerary:** View detailed daily plans, including activities and estimated times.
- **Dynamic Image Loading:** Fetches relevant images for destinations and activities using Pixabay API.
- **My Trips:** Save and view your generated trip plans.
- **Intuitive User Interface:** Clean and user-friendly design for easy navigation.

## Technology Stack

- **Frontend:** React Native, Expo
- **Backend (BaaS):** Firebase (Authentication, Firestore Database)
- **AI:** Google Generative AI (for trip planning)
- **Mapping/Geocoding:** MapTiler API
- **Image API:** Pixabay API
- **Navigation:** Expo Router
- **Styling:** React Native StyleSheet
- **Date/Time:** Moment.js

## Prerequisites

- Node.js (LTS version recommended - v18 or newer)
- npm or Yarn package manager
- Expo Go app on your mobile device (for testing) or Android Studio/Xcode for emulators.
- Git (for version control)

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-travel-planner.git
    cd ai-travel-planner
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

### Environment Configuration

This project requires API keys for various services to function correctly.

1.  **Create a `.env` file:**
    Duplicate the `.env.example` file and rename it to `.env`.
    ```bash
    cp .env.example .env
    ```
2.  **Populate API Keys:**
    Open the `.env` file and fill in your actual API keys and Firebase configuration details. Refer to the [API Keys](#api-keys) section for more information on obtaining them.

    Example `.env` structure:
    ```env
    EXPO_PUBLIC_MAPTILER_API_KEY="YOUR_MAPTILER_API_KEY"
    EXPO_PUBLIC_GOOGLE_AI_API_KEY="YOUR_GOOGLE_AI_API_KEY"
    EXPO_PUBLIC_PIXABAY_API_KEY="YOUR_PIXABAY_API_KEY"
    EXPO_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
    # ... and other Firebase keys
    ```
    **Important:** Ensure all `EXPO_PUBLIC_` prefixed variables are correctly filled as these are exposed to the client-side Expo application.

## How to Run

1.  **Start the Expo development server:**
    ```bash
    npm start
    # OR
    yarn start
    ```
2.  **Open the app:**
    - **On your mobile device:** Scan the QR code displayed in the terminal using the Expo Go app.
    - **On an emulator/simulator:**
        - Press `a` for Android emulator.
        - Press `i` for iOS simulator.

## Project Structure

The project follows a standard Expo and React Native structure:

```
ai-travel-planner/
├── app/                      # Main application screens and navigation (using Expo Router)
│   ├── (tabs)/               # Tab-based navigation layout
│   │   ├── _layout.jsx
│   │   ├── index.jsx         # Could be a default tab or redirect
│   │   └── mytrip.jsx        # My Trips screen
│   ├── auth/                 # Authentication screens (sign-in, sign-up)
│   │   └── ...
│   ├── create-trip/          # Screens for the trip creation flow
│   │   └── ...
│   ├── trip-detail/          # Screen for displaying detailed trip plans
│   │   └── index.jsx
│   └── _layout.jsx           # Root layout for the app
│   └── index.jsx             # Entry point of the app (e.g., splash or redirect)
├── assets/                   # Static assets (images, fonts)
│   └── images/
│   └── fonts/
├── components/               # Reusable UI components
│   ├── Home/
│   ├── MyTrips/
│   └── TripDetails/
├── configs/                  # Configuration files (e.g., Firebase, AI Modal)
│   ├── AiModal.js
│   └── firebaseConfig.js
├── constants/                # Global constants (e.g., Colors, Options)
│   ├── Colors.js
│   └── Options.js
├── context/                  # React Context API for state management
│   └── CreateTripContext.js
├── .env                      # Environment variables (ignored by Git)
├── .env.example              # Example environment variables
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── README.md                 # This file
├── app.json                  # Expo app configuration
├── babel.config.js           # Babel configuration
└── package.json              # Project dependencies and scripts
```

## API Keys

You need to obtain API keys from the following services:

1.  **MapTiler API Key:**
    - Go to [MapTiler Cloud](https://cloud.maptiler.com/)
    - Sign up for an account.
    - Find your API key in your account settings.
    - Used for: Place search and geocoding.
    - `.env` variable: `EXPO_PUBLIC_MAPTILER_API_KEY`

2.  **Google Generative AI API Key:**
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey) (or Google Cloud Console for Vertex AI).
    - Create an API key for the Gemini models.
    - Used for: Generating trip itineraries.
    - `.env` variable: `EXPO_PUBLIC_GOOGLE_AI_API_KEY`

3.  **Pixabay API Key:**
    - Go to [Pixabay API Documentation](https://pixabay.com/api/docs/)
    - Sign up for an account.
    - Your API key will be available in your account.
    - Used for: Fetching relevant images for destinations and activities.
    - `.env` variable: `EXPO_PUBLIC_PIXABAY_API_KEY`

4.  **Firebase Configuration:**
    - Go to [Firebase Console](https://console.firebase.google.com/)
    - Create a new project or use an existing one.
    - Add a web application to your Firebase project.
    - Find your Firebase project settings and copy the configuration values (apiKey, authDomain, projectId, etc.).
    - Used for: User authentication and database (Firestore).
    - `.env` variables:
        - `EXPO_PUBLIC_FIREBASE_API_KEY`
        - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
        - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
        - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
        - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
        - `EXPO_PUBLIC_FIREBASE_APP_ID`
        - `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details (if one exists, otherwise state "MIT License").

## Acknowledgements

- Inspiration from various travel planning apps.
- The React Native and Expo communities.
- Providers of the APIs used in this project.
```
