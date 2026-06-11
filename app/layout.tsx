import type { ReactNode } from 'react'

// [locale]/layout.tsx provides the full HTML structure.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children as never
}
