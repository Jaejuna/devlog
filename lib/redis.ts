const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

function authHeaders() {
  return { Authorization: `Bearer ${REDIS_TOKEN ?? ''}` }
}

function todayKey() {
  const d = new Date()
  return `visits:daily:${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

function monthKey() {
  const d = new Date()
  return `visits:monthly:${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

export async function incrementVisits(): Promise<void> {
  if (!REDIS_URL || !REDIS_TOKEN) return
  try {
    await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify([['INCR', todayKey()], ['INCR', monthKey()]]),
    })
  } catch {}
}

export async function getVisitStats(): Promise<{ today: number; month: number }> {
  if (!REDIS_URL || !REDIS_TOKEN) return { today: 0, month: 0 }
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify([['GET', todayKey()], ['GET', monthKey()]]),
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return {
      today: Number(data[0]?.result ?? 0),
      month: Number(data[1]?.result ?? 0),
    }
  } catch {
    return { today: 0, month: 0 }
  }
}

export async function getViews(slug: string): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN) return 0
  try {
    const res = await fetch(`${REDIS_URL}/get/views:${slug}`, {
      headers: authHeaders(),
      next: { revalidate: 60 },
    })
    const { result } = await res.json()
    return Number(result ?? 0)
  } catch {
    return 0
  }
}

export async function incrementViews(slug: string): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN) return 0
  try {
    const res = await fetch(`${REDIS_URL}/incr/views:${slug}`, {
      method: 'POST',
      headers: authHeaders(),
    })
    const { result } = await res.json()
    return Number(result ?? 0)
  } catch {
    return 0
  }
}

export async function getTotalViews(slugs: string[]): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN || slugs.length === 0) return 0
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify([['MGET', ...slugs.map((s) => `views:${s}`)]]),
      next: { revalidate: 60 },
    })
    const data = await res.json()
    const values: (number | null)[] = data[0]?.result ?? []
    return values.reduce((sum: number, v) => sum + Number(v ?? 0), 0)
  } catch {
    return 0
  }
}

export async function getViewsMap(slugs: string[]): Promise<Record<string, number>> {
  if (!REDIS_URL || !REDIS_TOKEN || slugs.length === 0) return {}
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify([['MGET', ...slugs.map((s) => `views:${s}`)]]),
      next: { revalidate: 60 },
    })
    const data = await res.json()
    const values: (string | null)[] = data[0]?.result ?? []
    return Object.fromEntries(slugs.map((slug, i) => [slug, Number(values[i] ?? 0)]))
  } catch {
    return {}
  }
}
