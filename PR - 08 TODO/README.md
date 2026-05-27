# API Hunter 🎯 - Premium React To-Do Dashboard

API Hunter is a state-of-the-art, feature-rich To-Do dashboard application built with **React.js**, **Bootstrap 5**, and custom **CSS3 variables**. It simulates a production-grade database interaction by integrating with a local **JSON-Server** REST backend. The user interface features glassmorphism design elements, responsive charts/progress bars, micro-animations, and a highly customizable Light/Dark mode.

---

## ✨ Features

- **💡 Complete CRUD Operations**: Add, read, update status/details, and delete tasks dynamically. Your changes sync instantly with the local database.
- **📊 Real-time Productivity Metrics**: The stats dashboard calculates overall progress, counts active versus completed items, and highlights urgent/high-priority tasks.
- **🎨 Modern Glassmorphic Design**: Customized cards, filters, and forms styled with smooth hover effects, Outfit font face, and interactive details.
- **🌓 Adaptive Theme Modes**: Instant Light/Dark mode switcher synced to local storage, adapting both native Bootstrap elements (`data-bs-theme`) and custom HSL parameters.
- **🔍 Advanced Search & Filters**: Search tasks by text queries and filter them by category tags (Work, Personal, Shopping, Health, Finance), status badges (Pending, In Progress, Completed), or priority weights.
- **📅 Smart Sorting**: Sort tasks by Due Date, Priority values, or creation timestamps.
- **🔔 Toast Notification System**: Interactive notification triggers that report successful actions or connection errors and fade out automatically.
- **🛡️ Form Validation**: Front-end validation prevents empty title inputs, past due dates, or incorrect selections during task creation/editing.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **UI & Layout**: [Bootstrap 5](https://getbootstrap.com/) & [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Database/API Mocking**: [JSON-Server](https://github.com/typicode/json-server)
- **Dev Runner**: [Concurrently](https://github.com/open-cli-tools/concurrently)

---

## 📂 Project Structure

```text
To-do/
├── db.json                  # Fake database seed file (REST backend)
├── package.json             # NPM dependencies & execution scripts
├── index.html               # Main HTML markup entrypoint
├── src/
│   ├── main.jsx             # Main JavaScript entrypoint
│   ├── App.jsx              # Main App layout & state orchestrator
│   ├── index.css            # Custom CSS themes & CSS3 glassmorphism
│   ├── services/
│   │   └── api.js           # API CRUD wrapper (Fetch client)
│   └── components/
│       ├── StatsDashboard.jsx # Productivity metric panel
│       ├── TaskCard.jsx       # Individual task display component
│       ├── TaskModal.jsx      # Add/Edit task modal
│       └── ToastNotification.jsx # Animated notification alerts
```

---

## 🚀 Getting Started

Follow these instructions to run the application on your local machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
Open your terminal in the `To-do` directory and install the packages:
```bash
cd "d:\React_JS\API Hunter\To-do"
npm install
```

### 3. Launch Development Servers
Start both the React web application and the JSON-Server mock backend concurrently with a single script command:
```bash
npm run dev:all
```

**To start the frontend separately:**
```bash
npm run dev
```

**To start the backend separately:**
```bash
npm run server
```

Once running:
- **Client Application**: Open [http://localhost:5175/](http://localhost:5175/) in your browser.
- **Local API Endpoint**: The backend serves task entries at [http://localhost:5000/tasks](http://localhost:5000/tasks).

### 4. Build Production Bundle
To compile and optimize your project for production deployment:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.
