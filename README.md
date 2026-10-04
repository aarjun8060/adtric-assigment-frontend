# One Click Drive - Project Management Dashboard

A modern, full-stack project management application built with Next.js 15, featuring real-time collaboration, task management, and team coordination tools.

## 🚀 Features

### Core Functionality

- **Project Management**: Create, organize, and track multiple projects
- **Task Management**: Comprehensive task creation, assignment, and status tracking
- **Real-time Notifications**: Live updates for task status changes and project activities
- **User Authentication**: Secure login/register system with JWT tokens
- **Dashboard Analytics**: Overview of projects, tasks, and team performance
- **Responsive Design**: Mobile-first approach with modern UI components

### Advanced Features

- **Real-time Collaboration**: WebSocket-based live updates
- **Drag & Drop Interface**: Intuitive task management with @dnd-kit
- **Search & Filtering**: Advanced search capabilities across projects and tasks
- **Theme Support**: Dark/light mode with customizable themes
- **Notification System**: Toast notifications and notification center
- **Data Tables**: Sortable, filterable tables with pagination

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Real-time**: Socket.io Client
- **Notifications**: Sonner toast library
- **Drag & Drop**: @dnd-kit
- **Data Tables**: TanStack Table

### Backend Integration

- **API**: RESTful API with Express.js
- **Authentication**: JWT-based auth
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io for live updates

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or cloud)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd braindx-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
one-click-drive/
├── app/                          # Next.js App Router
│   ├── (panel)/                  # Dashboard panel routes
│   │   ├── dashboard/            # Main dashboard
│   │   ├── projects/             # Project management
│   │   ├── tasks/                # Task management
│   │   └── settings/             # User settings
│   ├── (website)/                # Public website routes
│   ├── api/                      # API routes
│   ├── auth/                     # Authentication pages
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── dialogs/              # Modal dialogs
│   │   ├── table/                # Data table components
│   │   └── *.tsx                 # Dashboard components
│   ├── ui/                       # Base UI components
│   └── website/                  # Website components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── store/                        # Zustand stores
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions
└── config/                       # Configuration files
```

## 🎯 Key Components

### Dashboard Components

- **AppSidebar**: Navigation sidebar with project/task links
- **ProjectsPageClient**: Project management interface
- **TasksPageClient**: Task management interface
- **RealtimeNotificationToast**: Live notification system
- **NotificationPopover**: Notification center
- **DataTable**: Advanced data table with sorting/filtering

### Authentication

- **LoginForm**: User authentication form
- **useAuth**: Authentication hook with JWT handling
- **Auth middleware**: Route protection

### Real-time Features

- **useRealtime**: WebSocket connection management
- **useSocket**: Socket.io integration
- **Notification System**: Live updates and toast notifications

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Database (if using Prisma)
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
```

## 🌐 API Integration

The frontend integrates with a backend API for:

- **Authentication**: Login/logout endpoints
- **Projects**: CRUD operations for projects
- **Tasks**: Task management and status updates
- **Users**: User profile management
- **Notifications**: Real-time notification system

### API Endpoints

- `POST /api/login` - User authentication
- `POST /api/logout` - User logout
- `GET /api/projects` - Fetch projects
- `POST /api/projects` - Create project
- `GET /api/tasks` - Fetch tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task

## 🎨 Theming

The application supports:

- **Light/Dark Mode**: Automatic theme switching
- **Custom Themes**: Multiple theme presets
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant components

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Route Protection**: Protected dashboard routes
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protection

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch-Friendly**: Optimized touch interactions
- **Progressive Enhancement**: Works without JavaScript

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Arjun Singh** - Full Stack Developer
- **Braindx Assignment** - Project Management System

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact: [your-email@example.com]

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
