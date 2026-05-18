export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nardin2026'
  const { password } = req.body

  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, token: 'admin-' + Date.now() })
  }

  return res.status(401).json({ error: 'كلمة المرور خاطئة' })
}
