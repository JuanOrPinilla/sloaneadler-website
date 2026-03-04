# Contributing Guide

## SLOANE / Adler Website

## Getting Started

### Fork and Clone

```bash
git clone https://github.com/devonshigaki/sloaneadler-website.git
cd sloaneadler-website
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Run Development Server

```bash
npm run dev
```

## Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits:

```
feat: Add new speaking section
fix: Correct timezone display
docs: Update API documentation
refactor: Simplify middleware logic
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Run `npm run lint` before committing
- **Prettier**: Format on save recommended

### File Organization

```
app/
├── [feature]/           # Feature-based organization
│   ├── page.tsx         # Page component
│   ├── layout.tsx       # Layout (if needed)
│   └── loading.tsx      # Loading state

components/
├── [feature]/           # Feature-specific components
├── ui/                  # shadcn/ui components
└── shared/              # Shared components
```

## Testing

### Local Testing

```bash
# Build test
npm run build

# Lint check
npm run lint

# Type check
npx tsc --noEmit
```

### Manual Testing Checklist

- [ ] Language switcher works (EN/ES/FR)
- [ ] Password protection functional
- [ ] Contact form validates correctly
- [ ] Responsive design on mobile
- [ ] Dark/light theme toggle works

## Adding New Pages

1. Create page in `app/[locale]/[page]/page.tsx`
2. Add metadata in page file
3. Add to sitemap.ts
4. Update navigation if needed
5. Add translations to messages/

## Adding Translations

1. Edit `messages/en.json`, `messages/es.json`, `messages/fr.json`
2. Use `useTranslations()` hook in components
3. Test all three languages

## Database Changes

1. Create migration in `database/migrations/`
2. Follow naming: `XXX_description.sql`
3. Update `lib/db/index.ts` if needed
4. Test locally with Cloud SQL Proxy

## Pull Request Process

1. Create feature branch
2. Make changes
3. Test locally
4. Push branch
5. Create PR to `main`
6. Request review
7. Merge after approval

## Deployment

Vercel automatically deploys on merge to `main`.

## Questions?

Contact: contact@sloaneadler.com
