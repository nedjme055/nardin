import { useState } from 'react'
import { Send, CheckCircle, Loader2, User, Phone, MapPin, Package } from 'lucide-react'
import toast from 'react-hot-toast'

const PRODUCTS = [
  { id: 'single', name: 'تجربة - 1 علبة', price: 2900, label: '2900 د.ج + توصيل' },
  { id: 'double', name: 'التوفير - 2 علب', price: 5300, label: '5300 د.ج (وفرت 500 دج)' },
  { id: 'premium', name: 'باك بريميوم - 3 علب', price: 7700, label: '7700 د.ج + توصيل مجاني' },
]

export default function OrderForm({ wilayas }) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    product: 'double',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'الاسم مطلوب'
    if (!form.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    else if (!/^(0[5-7]\d{8})$/.test(form.phone.trim())) errs.phone = 'رقم هاتف غير صالح'
    if (!form.wilaya) errs.wilaya = 'اختر الولاية'
    if (!form.product) errs.product = 'اختر المنتج'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          productName: PRODUCTS.find(p => p.id === form.product)?.name,
          productPrice: PRODUCTS.find(p => p.id === form.product)?.price,
        })
      })

      if (!res.ok) throw new Error('خطأ في الإرسال')

      const selectedProduct = PRODUCTS.find(p => p.id === form.product)

      // Meta Pixel: Lead event
      if (typeof window.fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: selectedProduct?.name,
          content_category: 'عشبة الناردين',
          value: selectedProduct?.price,
          currency: 'DZD',
        })
        fbq('track', 'Purchase', {
          content_name: selectedProduct?.name,
          value: selectedProduct?.price,
          currency: 'DZD',
        })
      }

      setSuccess(true)
      toast.success('تم إرسال طلبك بنجاح! سنتصل بك قريباً')
    } catch (err) {
      toast.error('حدث خطأ، حاول مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  if (success) {
    return (
      <div className="glass rounded-2xl p-8 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-black text-gold-400 mb-3">شكراً لثقتكم! 🎉</h3>
        <p className="text-gray-300 leading-relaxed">
          تم استلام طلبك بنجاح. سنتصل بك خلال ساعات لتأكيد العنوان والشحن.
        </p>
        <button
          onClick={() => { setSuccess(false); setForm({ fullName: '', phone: '', wilaya: '', product: 'double', notes: '' }) }}
          className="mt-6 text-gold-400 underline text-sm hover:text-gold-300"
        >
          إرسال طلب جديد
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
          <User className="w-4 h-4 text-gold-400" />
          الاسم الكامل <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.fullName}
          onChange={e => handleChange('fullName', e.target.value)}
          placeholder="أدخل اسمك الكامل"
          className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 transition-colors`}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
          <Phone className="w-4 h-4 text-gold-400" />
          رقم الهاتف <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => handleChange('phone', e.target.value)}
          placeholder="0555123456"
          dir="ltr"
          className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 transition-colors text-left`}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Wilaya */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
          <MapPin className="w-4 h-4 text-gold-400" />
          الولاية <span className="text-red-400">*</span>
        </label>
        <select
          value={form.wilaya}
          onChange={e => handleChange('wilaya', e.target.value)}
          className={`w-full bg-white/5 border ${errors.wilaya ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors appearance-none`}
          style={{ backgroundImage: 'none' }}
        >
          <option value="" className="bg-[#1a1f3a]">اختر الولاية</option>
          {wilayas.map((w, i) => (
            <option key={i} value={w} className="bg-[#1a1f3a]">{`${String(i + 1).padStart(2, '0')} - ${w}`}</option>
          ))}
        </select>
        {errors.wilaya && <p className="text-red-400 text-xs mt-1">{errors.wilaya}</p>}
      </div>

      {/* Product Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
          <Package className="w-4 h-4 text-gold-400" />
          اختر العرض <span className="text-red-400">*</span>
        </label>
        <div className="space-y-3">
          {PRODUCTS.map(p => (
            <label
              key={p.id}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                form.product === p.id
                  ? 'border-gold-400 bg-gold-400/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name="product"
                value={p.id}
                checked={form.product === p.id}
                onChange={e => handleChange('product', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                form.product === p.id ? 'border-gold-400' : 'border-gray-500'
              }`}>
                {form.product === p.id && <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{p.name}</div>
                <div className="text-xs text-gray-400">{p.label}</div>
              </div>
              {p.id === 'double' && (
                <span className="text-xs bg-gold-400/20 text-gold-400 px-2 py-0.5 rounded-full font-semibold">الأكثر طلباً</span>
              )}
              {p.id === 'premium' && (
                <span className="text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">أفضل قيمة</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
          ملاحظات إضافية
        </label>
        <textarea
          value={form.notes}
          onChange={e => handleChange('notes', e.target.value)}
          placeholder="أي ملاحظة إضافية..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-cta text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed !py-4 !text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            أكد الطلب الآن
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        سنتصل بك خلال ساعات لتأكيد طلبك. الدفع عند الاستلام.
      </p>
    </form>
  )
}
