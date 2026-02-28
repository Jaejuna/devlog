export default function Tag({
  children,
  variant = 'blue',
}: {
  children: React.ReactNode
  variant?: 'blue' | 'gray'
}) {
  return <span>#{children}</span>
}
