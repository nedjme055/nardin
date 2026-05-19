import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
})

const ORDERS_KEY = 'nardin_orders'

export async function readOrders() {
  try {
    const orders = await redis.get(ORDERS_KEY)
    if (!orders) return []
    return Array.isArray(orders) ? orders : []
  } catch (err) {
    console.error('Redis read error:', err.message)
    return []
  }
}

export async function writeOrders(orders) {
  await redis.set(ORDERS_KEY, orders)
}
