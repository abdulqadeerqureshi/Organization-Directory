# Organization Directory

A modern, responsive user directory application built with React, TypeScript, and Tailwind CSS. This application provides a clean interface for browsing organization members with advanced filtering, search, and pagination capabilities.

![Organization Directory](https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- **User Directory**: Browse through organization members with card-based layout
- **Advanced Search**: Search by name, username, or email
- **Role Filtering**: Filter users by their roles within the organization
- **Pagination**: Navigate through large datasets with 10 users per page
- **Detailed Profiles**: View comprehensive user information in a slide-out sidebar
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Smooth loading indicators for better UX
- **Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with TypeScript support

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd organization-directory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Avatar.tsx      # User avatar component
│   ├── Button.tsx      # Button component
│   ├── Card.tsx        # Card container component
│   ├── ErrorMessage.tsx # Error display component
│   ├── FilterSelect.tsx # Dropdown filter component
│   ├── Loader.tsx      # Loading spinner component
│   ├── Modal.tsx       # Modal dialog component
│   ├── Pagination.tsx  # Pagination component
│   ├── SearchInput.tsx # Search input component
│   └── Sidebar.tsx     # Slide-out sidebar component
├── features/
│   └── users/          # User-related features
│       ├── UserCard.tsx           # Individual user card
│       ├── UserDetailsSidebar.tsx # User profile sidebar
│       ├── UserFilters.tsx        # Search and filter controls
│       ├── UserList.tsx           # Main user listing component
│       ├── useUsers.ts            # User data hook
│       └── users.types.ts         # User type definitions
├── hooks/              # Custom React hooks
│   ├── usePagination.ts # Pagination logic hook
│   └── useToggle.ts     # Toggle state hook
├── tests/              # Test files
│   ├── components/     # Component tests
│   ├── features/       # Feature tests
│   ├── hooks/          # Hook tests
│   ├── utils/          # Utility tests
│   └── setupTests.ts   # Test configuration
├── utils/              # Utility functions
│   └── date.ts         # Date formatting utilities
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Design System

The application follows a consistent design system with:

- **Color Palette**: Blue primary, gray neutrals, semantic colors for states
- **Typography**: Clean, readable font hierarchy
- **Spacing**: 8px grid system for consistent spacing
- **Components**: Reusable, accessible components with hover states
- **Responsive**: Mobile-first design with breakpoints at sm, md, lg, xl

## 🔧 API Integration

The application fetches user data from a mock API endpoint:
```
https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users
```

Expected API response format:
```json
{
  "data": {
    "users": [
      {
        "id": "string",
        "username": "string",
        "firstname": "string",
        "lastname": "string",
        "email": "string",
        "avatar": "string",
        "role": "string",
        "join_date": "string",
        "description": "string"
      }
    ]
  }
}
```

## 🧪 Testing

The project includes comprehensive tests covering:

- **Unit Tests**: Individual component functionality
- **Integration Tests**: Feature workflows and user interactions
- **Hook Tests**: Custom hook behavior
- **Utility Tests**: Helper function logic

Run tests with:
```bash
npm run test
```

View test coverage:
```bash
npm run test:coverage
```

## 📱 Features in Detail

### User Cards
- Display user avatar, name, and role
- Hover effects for better interactivity
- "View More" button to access detailed profile

### Search & Filtering
- Real-time search across name, username, and email
- Role-based filtering with dynamic options
- Active filter indicators with easy removal
- Combined search and filter functionality

### Pagination
- 10 users per page for optimal performance
- Page navigation with Previous/Next buttons
- Direct page number navigation
- Pagination info showing current range
- Automatic reset when filters change

### User Profile Sidebar
- Slide-out design for detailed user information
- Contact information display
- Join date with relative formatting
- User description and role details
- Keyboard accessible (ESC to close)

### Responsive Design
- Mobile-optimized card grid (1 column on mobile, up to 4 on desktop)
- Responsive search and filter controls
- Touch-friendly interface elements
- Optimized sidebar for mobile viewing

## 🚀 Performance Optimizations

- **Memoization**: Strategic use of `useMemo` for expensive calculations
- **Pagination**: Limits DOM elements for better performance
- **Lazy Loading**: Components load only when needed
- **Optimized Re-renders**: Careful state management to minimize updates

## 🔮 Future Enhancements

- [ ] User profile editing capabilities
- [ ] Advanced filtering (department, location, etc.)
- [ ] Export functionality (CSV, PDF)
- [ ] User favorites/bookmarking
- [ ] Dark mode support
- [ ] Infinite scroll option
- [ ] User analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm run test`
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Pexels](https://pexels.com) for stock photography
- [Lucide](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [React Testing Library](https://testing-library.com) for testing utilities

---

Built with ❤️ using React, TypeScript, and Tailwind CSS