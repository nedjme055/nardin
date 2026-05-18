import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const ORDERS_FILE = join('/tmp', 'orders.json')

export function readOrders() {
  try {
    if (existsSync(ORDERS_FILE)) {
      return JSON.parse(readFileSync(ORDERS_FILE, 'utf8'))
    }
  } catch {}
  return []
}

export function writeOrders(orders) {
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}
