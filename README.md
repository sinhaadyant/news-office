# News Hub - Next.js News Application

A modern, feature-rich news application built with Next.js, TypeScript, and React. This application demonstrates best practices in web development including TypeScript migration, error handling, performance optimization, SEO, accessibility, and comprehensive testing.

## 🚀 Features

### Core Features

- **TypeScript Migration**: Fully typed codebase with strict TypeScript configuration
- **Error Boundaries**: Global and component-level error handling with graceful fallbacks
- **Skeleton Loading**: Comprehensive skeleton loading states for all components
- **Image Optimization**: Next.js Image component with fallbacks and lazy loading
- **SEO Optimization**: Dynamic meta tags, structured data, and sitemap generation
- **Infinite Scroll**: SEO-friendly infinite scrolling with URL updates
- **Ad-block Detection**: Global ad-block detection with user-friendly modals
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support

### Technical Features

- **Performance**: Optimized bundle size, lazy loading, and caching strategies
- **Testing**: Comprehensive unit tests with Jest and React Testing Library
- **CI/CD**: GitHub Actions workflow with linting, testing, and deployment
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **Monitoring**: Performance monitoring and error tracking integration

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sarsa-nextjs-v2.0-unzip-first/1.Sarsa-Nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── components/                 # React components
│   ├── ErrorBoundary.tsx      # Global error boundary
│   ├── OptimizedImage.tsx     # Image optimization component
│   ├── SEOHead.tsx           # SEO meta tags component
│   ├── AdBlockModal.tsx      # Ad-block detection modal
│   └── skeletons/            # Skeleton loading components
├── hooks/                     # Custom React hooks
│   ├── useInfiniteScroll.ts  # Infinite scroll hook
│   └── useAdBlockDetector.ts # Ad-block detection hook
├── types/                     # TypeScript type definitions
│   └── index.ts              # Domain interfaces
├── pages/                     # Next.js pages
│   ├── _app.tsx              # App wrapper with providers
│   ├── index.tsx             # Home page
│   └── api/                  # API routes
├── public/                    # Static assets
├── styles/                    # CSS and styling
├── utils/                     # Utility functions
└── __tests__/                # Test files
```

## 🎯 Key Components

### Error Boundaries

- **Global Error Boundary**: Catches all unhandled errors in the app
- **Component Error Boundaries**: Isolated error handling for specific components
- **Retry Mechanisms**: User-friendly error recovery options

### Skeleton Loading

- **SkeletonArticleCard**: Loading state for article cards
- **SkeletonArticleList**: Loading state for article lists
- **SkeletonHero**: Loading state for hero sections
- **SkeletonSidebar**: Loading state for sidebar components

### Image Optimization

- **OptimizedImage**: Wrapper around Next.js Image component
- **Fallback Images**: Graceful handling of missing images
- **Lazy Loading**: Performance-optimized image loading
- **Responsive Images**: Automatic image sizing and optimization

### SEO Features

- **Dynamic Meta Tags**: Page-specific SEO optimization
- **Structured Data**: JSON-LD schema markup
- **Sitemap Generation**: Automated sitemap creation
- **Canonical URLs**: Proper URL canonicalization

### Infinite Scroll

- **SEO-Friendly**: Server-side rendering with client-side enhancement
- **URL Updates**: Browser history integration
- **Performance Optimized**: Intersection Observer API
- **Accessibility**: Keyboard navigation support

### Ad-block Detection

- **Global Detection**: Site-wide ad-block monitoring
- **User-Friendly Modal**: Non-intrusive ad-block notifications
- **Analytics Integration**: Ad-block usage tracking
- **Subscription Integration**: Seamless subscription flow

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Component and hook testing
- **Integration Tests**: Page and feature testing
- **Accessibility Tests**: ARIA and keyboard navigation
- **Performance Tests**: Lighthouse audits

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run test         # Run tests
npm run analyze      # Analyze bundle size
```

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Husky**: Git hooks for code quality

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://...
```

### Deployment Platforms

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment option
- **AWS**: Custom server deployment
- **Docker**: Containerized deployment

## 📊 Performance

### Lighthouse Scores

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

### Optimization Features

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Static and API response caching
- **Bundle Analysis**: Webpack bundle analyzer

## 🔒 Security

### Security Features

- **Content Security Policy**: CSP headers
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Token-based protection
- **Rate Limiting**: API rate limiting

## ♿ Accessibility

### Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Ensure accessibility compliance
- Follow the existing code style
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for the excellent library
- TypeScript team for type safety
- All contributors and maintainers

## 📞 Support

For support, email support@newshub.com or join our Slack channel.

## 🔄 Changelog

### Version 2.0.0

- Complete TypeScript migration
- Added comprehensive error boundaries
- Implemented skeleton loading states
- Added SEO optimization
- Integrated ad-block detection
- Added accessibility features
- Comprehensive testing setup
- CI/CD pipeline implementation

---

**Built with ❤️ by the News Hub Team**
