const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001
const ORDERS_FILE = path.join(__dirname, 'orders.json')
const ADMIN_PASSWORD = 'nardin2026'

app.use(cors())
app.use(express.json())

// Helper to read/write orders
function readOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
  } catch {
    return []
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

// Create order
app.post('/api/orders', (req, res) => {
  const { fullName, phone, phone2, wilaya, address, product, productName, productPrice, notes } = req.body

  if (!fullName || !phone || !wilaya || !product) {
    return res.status(400).json({ error: 'الحقول المطلوبة ناقصة' })
  }

  const orders = readOrders()
  const newOrder = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    fullName,
    phone,
    phone2: phone2 || '',
    wilaya,
    address: address || '',
    product,
    productName: productName || product,
    productPrice: productPrice || 0,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  orders.unshift(newOrder)
  writeOrders(orders)

  res.status(201).json({ success: true, order: newOrder })
})

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'admin-' + Date.now() })
  } else {
    res.status(401).json({ error: 'كلمة المرور خاطئة' })
  }
})

// Get all orders (admin)
app.get('/api/orders', (req, res) => {
  const orders = readOrders()
  res.json(orders)
})

// Update order status
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params
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

  res.json({ success: true, order: orders[idx] })
})

// Delete order
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params
  let orders = readOrders()
  const initialLen = orders.length
  orders = orders.filter(o => o.id !== id)

  if (orders.length === initialLen) {
    return res.status(404).json({ error: 'الطلب غير موجود' })
  }

  writeOrders(orders)
  res.json({ success: true })
})

// Get stats
app.get('/api/stats', (req, res) => {
  const orders = readOrders()
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.productPrice || 0), 0),
    todayOrders: orders.filter(o => {
      const today = new Date().toISOString().split('T')[0]
      return o.createdAt?.startsWith(today)
    }).length
  }
  res.json(stats)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
