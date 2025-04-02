# Visa Navigator - Client

A modern web application that helps users find visa requirements for different countries and manage visa applications.

## Features

- Browse visa information for different countries
- Search and filter visa options
- User registration and login (using local storage)
- Add and manage visa listings
- Track visa applications
- Responsive design with Tailwind CSS

## Technology Stack

- React 19
- React Router DOM 7
- React Hook Form
- TanStack Query
- Tailwind CSS
- DaisyUI
- React Hot Toast for notifications
- React Icons
- Swiper for image carousels
- React Awesome Reveal for animations

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/visa-navigator-client.git
   cd visa-navigator-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Development Notes

### Mock Data

The application is configured to use mock data for development purposes. This allows you to work on the UI without needing to connect to a real backend server.

To use real data from your backend:
1. Open `src/hooks/useFetch.js`
2. Change `USE_MOCK_DATA` from `true` to `false`
3. Update the `API_BASE_URL` to point to your actual backend server

### Authentication

This version uses a simplified authentication approach with local storage instead of JWT tokens:

- User credentials are stored in localStorage
- Authentication state is managed through the React Context API
- Protected routes still work by checking the authentication state

### Adding New Features

When adding new features:
1. Create any necessary mock data in the appropriate files
2. Implement the UI components
3. Connect to the mock data through the `useFetch` hook
4. Once ready to connect to a real backend, ensure your API endpoints match

## Building for Production

```bash
npm run build
```

This will create a `dist` folder with the compiled application ready for deployment.

## License

MIT
