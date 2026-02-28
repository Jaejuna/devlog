export default function AdBanner({
  adClient,
  adSlot,
}: {
  adClient: string
  adSlot: string
}) {
  return (
    <div data-ad-client={adClient} data-ad-slot={adSlot}>
      광고
    </div>
  )
}
