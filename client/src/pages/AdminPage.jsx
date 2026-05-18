import { useState, useEffect, useCallback } from 'react'
import { 
  Lock, LogOut, Package, Clock, Truck, CheckCircle, XCircle, Search, 
  RefreshCw, TrendingUp, ShoppingBag, DollarSign, Calendar, ChevronDown,
  Trash2, Eye, X, Filter
} from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_MAP = {
  pending: { label: 'قيد الانتظار', color: 'status-pending', icon: Clock },
  confirmed: { label: 'مؤكد', color: 'status-confirmed', icon: CheckCircle },
  shipped: { label: 'تم الشحن', color: 'status-shipped', icon: Truck },
  delivered: { label: 'تم التسليم', color: 'status-delivered', icon: Package },
  cancelled: { label: 'ملغي', color: 'status-cancelled', icon: XCircle },
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('admin_token'))
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const [ordersRes, statsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/stats')
      ])
      setOrders(await ordersRes.json())
      setStats(await statsRes.json())
    } catch {
      toast.error('خطأ في تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) fetchOrders()
  }, [isLoggedIn, fetchOrders])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      localStorage.setItem('admin_token', data.token)
      setIsLoggedIn(true)
      toast.success('تم تسجيل الدخول')
    } catch {
      toast.error('كلمة المرور خاطئة')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsLoggedIn(false)
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!res.ok) throw new Error()
      toast.success('تم تحديث الحالة')
      fetchOrders()
      if (selectedOrder?.id === id) {
        setSelectedOrder(prev => ({ ...prev, status }))
      }
    } catch {
      toast.error('خطأ في تحديث الحالة')
    }
  }

  const deleteOrder = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('تم حذف الطلب')
      setSelectedOrder(null)
      fetchOrders()
    } catch {
      toast.error('خطأ في الحذف')
    }
  }

  const filteredOrders = orders.filter(o => {
    const matchesSearch = !search || 
      o.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      o.phone?.includes(search) ||
      o.wilaya?.includes(search) ||
      o.id?.includes(search)
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gold-400" />
              </div>
              <h1 className="text-2xl font-black text-white">لوحة التحكم</h1>
              <p className="text-gray-400 text-sm mt-1">أدخل كلمة المرور للدخول</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-400"
                autoFocus
              />
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gold-400 hover:bg-gold-500 text-black font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {loginLoading ? 'جاري الدخول...' : 'دخول'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white font-cairo" dir="rtl">
      {/* Top Bar */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-gold-400" />
            <h1 className="text-lg font-bold">لوحة التحكم - عشبة الناردين</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchOrders} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="تحديث">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'إجمالي الطلبات', value: stats.total, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { label: 'طلبات اليوم', value: stats.todayOrders, icon: Calendar, color: 'text-green-400', bg: 'bg-green-400/10' },
              { label: 'قيد الانتظار', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
              { label: 'الإيرادات', value: `${stats.revenue?.toLocaleString()} د.ج`, icon: DollarSign, color: 'text-gold-400', bg: 'bg-gold-400/10' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                    <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {[
            { key: 'all', label: 'الكل', count: orders.length },
            { key: 'pending', label: 'قيد الانتظار', count: stats?.pending || 0 },
            { key: 'confirmed', label: 'مؤكد', count: stats?.confirmed || 0 },
            { key: 'shipped', label: 'تم الشحن', count: stats?.shipped || 0 },
            { key: 'delivered', label: 'تم التسليم', count: stats?.delivered || 0 },
            { key: 'cancelled', label: 'ملغي', count: stats?.cancelled || 0 },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === f.key
                  ? 'bg-gold-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="بحث بالاسم، الهاتف، الولاية..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pr-10 pl-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-sm">
                  <th className="text-right px-4 py-3 font-semibold">#</th>
                  <th className="text-right px-4 py-3 font-semibold">الاسم</th>
                  <th className="text-right px-4 py-3 font-semibold">الهاتف</th>
                  <th className="text-right px-4 py-3 font-semibold">الولاية</th>
                  <th className="text-right px-4 py-3 font-semibold">المنتج</th>
                  <th className="text-right px-4 py-3 font-semibold">السعر</th>
                  <th className="text-right px-4 py-3 font-semibold">الحالة</th>
                  <th className="text-right px-4 py-3 font-semibold">التاريخ</th>
                  <th className="text-right px-4 py-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-gray-500">
                      {loading ? 'جاري التحميل...' : 'لا توجد طلبات'}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, idx) => (
                    <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-sm">{order.fullName}</td>
                      <td className="px-4 py-3 text-sm font-mono" dir="ltr">{order.phone}</td>
                      <td className="px-4 py-3 text-sm">{order.wilaya}</td>
                      <td className="px-4 py-3 text-sm">{order.productName}</td>
                      <td className="px-4 py-3 text-sm text-gold-400 font-bold">{order.productPrice?.toLocaleString()} د.ج</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border-none cursor-pointer ${STATUS_MAP[order.status]?.color || ''}`}
                        >
                          {Object.entries(STATUS_MAP).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">{formatDate(order.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setSelectedOrder(order)} className="p-1.5 hover:bg-gray-600 rounded-lg transition-colors" title="عرض">
                            <Eye className="w-4 h-4 text-blue-400" />
                          </button>
                          <button onClick={() => deleteOrder(order.id)} className="p-1.5 hover:bg-gray-600 rounded-lg transition-colors" title="حذف">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-700">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {loading ? 'جاري التحميل...' : 'لا توجد طلبات'}
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold">{order.fullName}</div>
                      <div className="text-sm text-gray-400 font-mono" dir="ltr">{order.phone}</div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_MAP[order.status]?.color || ''}`}>
                      {STATUS_MAP[order.status]?.label || order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">{order.wilaya} | {order.productName}</div>
                    <div className="text-gold-400 font-bold">{order.productPrice?.toLocaleString()} د.ج</div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="text-xs bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white"
                      >
                        {Object.entries(STATUS_MAP).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 bg-gray-700 rounded-lg">
                        <Eye className="w-4 h-4 text-blue-400" />
                      </button>
                      <button onClick={() => deleteOrder(order.id)} className="p-1.5 bg-gray-700 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          عرض {filteredOrders.length} من {orders.length} طلب
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-bold text-lg">تفاصيل الطلب</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {[
                { label: 'رقم الطلب', value: selectedOrder.id },
                { label: 'الاسم الكامل', value: selectedOrder.fullName },
                { label: 'الهاتف', value: selectedOrder.phone, dir: 'ltr' },
                { label: 'هاتف احتياطي', value: selectedOrder.phone2 || '-', dir: 'ltr' },
                { label: 'الولاية', value: selectedOrder.wilaya },
                { label: 'العنوان', value: selectedOrder.address || '-' },
                { label: 'المنتج', value: selectedOrder.productName },
                { label: 'السعر', value: `${selectedOrder.productPrice?.toLocaleString()} د.ج` },
                { label: 'ملاحظات', value: selectedOrder.notes || '-' },
                { label: 'تاريخ الطلب', value: formatDate(selectedOrder.createdAt) },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <span className="text-sm text-gray-400 flex-shrink-0">{item.label}</span>
                  <span className="text-sm font-semibold text-right" dir={item.dir}>{item.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400">الحالة</span>
                <select
                  value={selectedOrder.status}
                  onChange={e => updateStatus(selectedOrder.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer ${STATUS_MAP[selectedOrder.status]?.color || ''}`}
                >
                  {Object.entries(STATUS_MAP).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex gap-3">
              <a
                href={`tel:${selectedOrder.phone}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-center text-sm transition-colors"
              >
                📞 اتصل الآن
              </a>
              <button
                onClick={() => deleteOrder(selectedOrder.id)}
                className="px-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
