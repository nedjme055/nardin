import { readOrders, writeOrders } from '../_lib/storage.js'

export default function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PATCH') {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'حالة غير صالحة' })
    }

    const orders = readOrders()
    const idx = orders.findIndex(o => o.id === id)
    if (idx === -1) return res.status(404).json({ error: 'الطلب غير موجود' })

    orders[idx].status = status
    orders[idx].updatedAt = new Date().toISOString()
    writeOrders(orders)

    return res.status(200).json({ success: true, order: orders[idx] })
  }

  if (req.method === 'DELETE') {
    let orders = readOrders()
    const initialLen = orders.length
    orders = orders.filter(o => o.id !== id)

    if (orders.length === initialLen) {
      return res.status(404).json({ error: 'الطلب غير موجود' })
    }

    writeOrders(orders)
    return res.status(200).json({ success: true })
  }

  res.setHeader('Allow', 'PATCH, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
