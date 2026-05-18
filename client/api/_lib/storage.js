import { kv } from '@vercel/kv'

const ORDERS_KEY = 'nardin_orders'

export async function readOrders() {
  try {
    const orders = await kv.get(ORDERS_KEY)
    return orders || []
  } catch (err) {
    console.error('KV read error:', err)
    return []
  }
}

export async function writeOrders(orders) {
  try {
    await kv.set(ORDERS_KEY, orders)
  } catch (err) {
    console.error('KV write error:', err)
  }
}
