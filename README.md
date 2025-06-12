# 📝 RN-Tasks – Task Management App

A full-stack task management application built with:

- **React Native + Expo** (frontend)
- **Express.js + NeonDB** (backend)
- **Clerk** for authentication

---

## 📱 Features

- User authentication with Clerk
- Create, update, delete, and complete tasks
- Fully responsive mobile UI with Expo
- Backend API built with Express and PostgreSQL (NeonDB)
- Live reload and hot refresh enabled for development

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI
- NeonDB (PostgreSQL as a service)
- Git

---

### ⚙️ Setup Instructions

#### 1. Clone the repository:

```bash
git clone https://github.com/rana-rishu/rn-Tasks.git
cd rn-Tasks

Install dependencies

npm install


Setup Environment Variables

DATABASE_URL=your_neon_postgres_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

Start Backend

cd backend
npm install
npm run dev


Start Frontend (Expo)
cd ..
npx expo start
