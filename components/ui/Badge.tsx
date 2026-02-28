export default function Badge({
  children,
  variant = 'purple',
}: {
  children: React.ReactNode
  variant?: 'purple' | 'gray'
}) {
  return <span>{children}</span>
}
