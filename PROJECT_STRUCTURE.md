# Project Structure

```
phase-one/
├── src/                      # Source directory
│   ├── app/                  # Next.js app directory (pages and layouts)
│   │   ├── (auth)/          # Authentication routes
│   │   ├── dashboard/       # Dashboard routes
│   │   └── layout.tsx       # Root layout
│   │
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── forms/          # Form components
│   │
│   ├── lib/                # Utility functions and shared logic
│   │   ├── supabase/      # Supabase client and utilities
│   │   ├── utils.ts       # General utilities
│   │   └── theme.ts       # Theme configuration
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.ts  # Mobile detection hook
│   │   └── use-auth.ts    # Authentication hook
│   │
│   ├── styles/            # Global styles
│   │   └── globals.css    # Global CSS
│   │
│   └── types/             # TypeScript type definitions
│
├── public/                # Static files
│   ├── icons/            # SVG icons
│   └── images/           # Image assets
│
├── supabase/             # Supabase configuration
│   └── migrations/       # Database migrations
│
├── .vscode/             # VS Code configuration
├── .gitignore          # Git ignore rules
├── components.json     # UI components configuration
├── docker-compose.yml  # Docker compose configuration
├── Dockerfile         # Docker configuration
├── eslint.config.mjs  # ESLint configuration
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── vercel.json        # Vercel deployment configuration
```

## Directory Structure Guidelines

### `/src/app`
- Contains all Next.js pages and layouts
- Organized by feature/route
- Each route can have its own components, styles, and utilities

### `/src/components`
- `ui/`: Reusable UI components (buttons, inputs, cards, etc.)
- `dashboard/`: Dashboard-specific components
- `forms/`: Form-related components
- Each component should be in its own directory with:
  - Component file
  - Styles (if needed)
  - Tests (if needed)
  - Types (if needed)

### `/src/lib`
- Shared utilities and configurations
- Database clients and utilities
- API clients
- Theme and styling utilities

### `/src/hooks`
- Custom React hooks
- Each hook in its own file
- Include TypeScript types and documentation

### `/src/types`
- Shared TypeScript type definitions
- API response types
- Component prop types

### `/public`
- Static assets
- Organized by type (icons, images, etc.)

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use TypeScript for all components
   - Include proper documentation
   - Follow consistent naming conventions

2. **File Naming**
   - Use kebab-case for file names
   - Use PascalCase for component names
   - Add appropriate extensions (.tsx, .ts, .css)

3. **Code Organization**
   - Keep related code together
   - Use index files for clean exports
   - Maintain clear separation of concerns

4. **TypeScript**
   - Use strict type checking
   - Define interfaces for props
   - Avoid using `any`

5. **Testing**
   - Write tests for critical components
   - Use Jest and React Testing Library
   - Keep tests close to the code they test

6. **Documentation**
   - Document complex logic
   - Include JSDoc comments for functions
   - Keep README files up to date 