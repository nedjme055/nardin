import { put, list, del } from '@vercel/blob'

const BLOB_NAME = 'orders.json'

export async function readOrders() {
  try {
    const { blobs } = await list({ prefix: BLOB_NAME })
    if (blobs.length === 0) return []
    
    const response = await fetch(blobs[0].url)
    const orders = await response.json()
    return orders || []
  } catch (err) {
    console.error('Blob read error:', err)
    return []
  }
}

export async function writeOrders(orders) {
  try {
    // Delete old blob first
    const { blobs } = await list({ prefix: BLOB_NAME })
    for (const blob of blobs) {
      await del(blob.url)
    }
    // Write new blob
    await put(BLOB_NAME, JSON.stringify(orders), {
      access: 'public',
      addRandomSuffix: false,
    })
  } catch (err) {
    console.error('Blob write error:', err)
  }
}
