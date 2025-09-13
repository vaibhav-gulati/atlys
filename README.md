# foo-rum - Social Media Frontend App

A React-based social media application with authentication flow and post creation functionality.

## Features

### Core Features
- **Feed Page**: Landing page with post creation and viewing
- **Authentication**: Sign in and sign up functionality
- **Modal System**: Auth modals for unauthenticated interactions
- **Post Creation**: Rich text editor with publish functionality
- **Post Interaction**: Like, comment, and share buttons (with alerts)

### Authentication Flow
- Unauthenticated users can view posts but cannot interact
- Any interaction triggers a sign-in modal
- Users can sign in/sign up from dedicated pages or modals
- Authentication state persists across sessions

### Post Editor Features
- **Input Field**: Text area for post content
- **Publish Button**: Creates new posts (authenticated users only)
- **Toolbar**: Formatting options (shows "function not implemented" alert)
- **Action Bar**: Attachment, voice, camera buttons (shows "function not implemented" alert)

### Post Display
- User avatars and names
- Post content with emoji support
- Timestamp (e.g., "5 mins ago")
- Like, comment, share buttons with counts

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with logo and auth
│   ├── AuthModal.tsx   # Authentication modal
│   ├── PostEditor.tsx  # Post creation component
│   └── Post.tsx        # Individual post display
├── pages/              # Page components
│   ├── Feed.tsx        # Main feed page
│   ├── SignIn.tsx      # Sign in page
│   └── SignUp.tsx      # Sign up page
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ModalContext.tsx # Modal state management
├── types/              # TypeScript type definitions
│   └── index.ts        # App-wide types
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions
└── App.tsx             # Main app component
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atlys
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Authentication
- Click "Login" in the header to open the sign-in modal
- Or navigate to `/signin` or `/signup` for dedicated pages
- Use any email/password combination (no backend validation)

### Creating Posts
- Type in the post editor on the feed page
- Click the paper airplane button to publish
- Posts appear at the top of the feed

### Interacting with Posts
- Click like, comment, or share buttons to see "function not implemented" alerts
- All interactions require authentication

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

### Code Quality

The application follows these principles:
- **Modularity**: Components are reusable and well-separated
- **Type Safety**: Full TypeScript implementation
- **Clean Architecture**: Clear separation of concerns
- **Responsive Design**: Mobile-friendly with TailwindCSS

## API Design

### Component APIs

**PostEditor**
```typescript
interface PostEditorProps {
  onPostCreated: (content: string) => void;
}
```

**Post**
```typescript
interface PostProps {
  post: PostType;
}
```

**AuthModal**
- Uses context for state management
- No props required

### Context APIs

**AuthContext**
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, repeatPassword: string) => Promise<void>;
  logout: () => void;
}
```

**ModalContext**
```typescript
interface ModalContextType {
  isModalOpen: boolean;
  modalType: 'login' | 'signup' | null;
  openModal: (type: 'login' | 'signup') => void;
  closeModal: () => void;
}
```

## Design Implementation

The application closely follows the provided Figma designs:
- Clean, minimalist UI with proper spacing
- Consistent color scheme (white, gray, blue accents)
- Proper typography and visual hierarchy
- Responsive design that works on different screen sizes
- Smooth transitions and hover effects

## Future Enhancements

- Backend integration with real APIs
- Real-time updates with WebSocket
- Image and file upload functionality
- Advanced text formatting
- User profiles and settings
- Search and filtering
- Notifications system
