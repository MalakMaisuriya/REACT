# Firebase Auth (Mock UI Template)

This is a modern React-based authentication template with an elegant UI and role-based access control. Currently, this project utilizes `localStorage` to mock backend authentication logic, meaning it functions completely on the client side without needing a real database.

## Features

- **Mock Authentication:** Sign up, sign in, forgot password, and change password functionalities using `localStorage`.
- **Role-Based Access Control:** Separate dashboards and permissions for `User` and `Admin` roles.
- **Protected Routes:** Unauthorized users cannot access dashboards.
- **Modern UI:** Built with custom CSS featuring glassmorphism, dynamic animations, and responsive design.
- **Dashboards:**
  - **Admin Dashboard:** System reports, server analytics, user activity mock data.
  - **User Dashboard:** Task management, active projects, support ticket mock flow.

## Available Pages

- `/login` - Sign In page
- `/register` - Sign Up page (Choose between User/Admin role)
- `/forgot-password` - Reset password (verifies against local storage)
- `/change-password` - Change password for authenticated users
- `/user-dashboard` - Protected dashboard for standard users
- `/admin-dashboard` - Protected dashboard for administrators

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd API
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## How to Test the Flow

1. Open the app and go to the **Sign Up** page (`/register`).
2. Create an account. Make sure to remember the email and role you selected.
3. You will be redirected to the **Login** page (`/login`).
4. Sign in with your registered email and password.
5. Explore your respective dashboard (`User` or `Admin`).
6. You can log out safely; your mock account data is saved in `localStorage`.
7. Test the **Forgot Password** flow by entering the exact email you registered.

## Future Enhancements
- Integration with real Firebase Authentication (Google Auth, Email/Password, etc.).
- Integration with Firestore for real-time data syncing.
- Context API or Redux for better state management.
