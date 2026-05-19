import { put, list } from '@vercel/blob'

const BLOB_PATH = 'nardin-orders.json'

export async function readOrders() {
  try {
    const result = await list({ prefix: BLOB_PATH, limit: 1 })
    if (!result.blobs || result.blobs.length === 0) return []

    const response = await fetch(result.blobs[0].url)
    if (!response.ok) return []

    const text = await response.text()
    const orders = JSON.parse(text)
    return Array.isArray(orders) ? orders : []
  } catch (err) {
    console.error('Blob read error:', err.message)
    return []
  }
}

export async function writeOrders(orders) {
  try {
    await put(BLOB_PATH, JSON.stringify(orders), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    })
  } catch (err) {
    console.error('Blob write error:', err.message)
    throw err
  }
}
