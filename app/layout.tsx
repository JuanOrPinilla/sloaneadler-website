// Root layout - passes through to [locale] layout
// All i18n configuration is handled in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
