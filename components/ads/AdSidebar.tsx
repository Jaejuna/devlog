export default function AdSidebar({ sticky = false }: { sticky?: boolean }) {
  return <div className={sticky ? 'sticky top-4' : ''}>사이드바 광고</div>
}
