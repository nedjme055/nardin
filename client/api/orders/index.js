import { readOrders, writeOrders } from '../_lib/storage.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const orders = await readOrders()
      return res.status(200).json(orders)
    }

    if (req.method === 'POST') {
      const { fullName, phone, wilaya, product, productName, productPrice, notes } = req.body

      if (!fullName || !phone || !wilaya || !product) {
        return res.status(400).json({ error: 'الحقول المطلوبة ناقصة' })
      }

      const orders = await readOrders()
      const newOrder = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        fullName,
        phone,
        wilaya,
        product,
        productName: productName || product,
        productPrice: productPrice || 0,
        notes: notes || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      orders.unshift(newOrder)
      await writeOrders(orders)

      return res.status(201).json({ success: true, order: newOrder })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('Orders API error:', err)
    return res.status(500).json({ error: err.message })
  }
}
