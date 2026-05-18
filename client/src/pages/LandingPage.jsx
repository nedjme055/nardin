import { useState, useEffect } from 'react'
import { Moon, Brain, ShieldCheck, Clock, Truck, Star, ChevronDown, Package, BadgeCheck, Sparkles, AlertTriangle, MessageCircle, Phone } from 'lucide-react'
import OrderForm from './OrderForm'

const WILAYAS = [
  "أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة",
  "تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة",
  "سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة",
  "وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة",
  "سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان",
  "تيميمون","برج باجي مختار","أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت","المغير","المنيعة"
]

export default function LandingPage() {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#07091b] text-white font-cairo overflow-x-hidden">
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showNav ? 'bg-[#07091b]/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-gold-400" />
            <span className="text-lg font-bold text-gold-400">عشبة الناردين</span>
          </div>
          <button onClick={scrollToOrder} className="btn-cta !py-2 !px-6 !text-sm">
            اطلب الآن
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0d1233] to-[#07091b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,110,245,0.15),transparent_70%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center md:text-right order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">⏳ الباك راهو قرّب وما بقاش الوقت!</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
                تخلص من <span className="text-gold-400">الخلعة</span> وابدأ <span className="text-gold-400">التركيز</span> الآن
              </h1>
              
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
                ما تخليش التوتر يضيع لك عام كامل من التعب. كبسولات عشبة الناردين (Valériane) هي سلاحك السري للهدوء والنوم العميق باش تراجع بذكاء وتنجح بامتياز.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <button onClick={scrollToOrder} className="btn-cta w-full sm:w-auto text-center animate-pulse-glow">
                  🛒 اطلب الآن
                </button>
                <div className="flex items-center gap-2 text-gray-400">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">توصيل سريع لـ 58 ولاية</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>100% طبيعي</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span>40 كبسولة</span>
                </div>
                <div className="flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-purple-400" />
                  <span>500 ملغ</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#07091b] via-transparent to-transparent z-10 rounded-2xl" />
                <img
                  src="/images/image5.jpg"
                  alt="عشبة الناردين - Valériane Herbe"
                  className="rounded-2xl max-w-full h-auto max-h-[500px] object-cover img-shadow animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 md:py-24 section-darker">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              هل تمر بهذه اللحظات <span className="text-red-400">الصعبة</span>؟
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: '/images/image4.jpg',
                title: 'الباك راهو على الأبواب',
                desc: 'الباك راهو على الأبواب وما بقاش الوقت للتردد؟ الضغط الدراسي راهو حابسك؟',
                icon: '😰'
              },
              {
                image: '/images/image3.jpg',
                title: 'الأرق والتخمام بزاف',
                desc: 'تخمام بزاف في الليل والأرق اللي يحرمك من الراحة؟',
                icon: '😴'
              },
              {
                image: '/images/image2.jpg',
                title: 'الخلعة والتوتر الدائم',
                desc: 'الخلعة والتوتر الدائم اللي يأثر على حياتك اليومية؟',
                icon: '😫'
              }
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1027] to-transparent" />
                  <span className="absolute top-4 right-4 text-3xl">{item.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-red-300">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Image Panels */}
      <section className="py-16 md:py-24 section-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden card-hover">
              <img src="/images/image2.jpg" alt="رحلة النجاح" className="w-full h-auto object-cover rounded-2xl" />
            </div>
            <div className="rounded-2xl overflow-hidden card-hover">
              <img src="/images/image3.jpg" alt="قصص الطلاب" className="w-full h-auto object-cover rounded-2xl" />
            </div>
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden card-hover">
            <img src="/images/image4.jpg" alt="من القلق إلى النجاح" className="w-full h-auto object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 section-darker">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              عشبة الناردين: <span className="text-gold-400">رفيقك للهدوء والنجاح</span>
            </h2>
            <p className="text-gray-400 text-lg">حل طبيعي، فعال، وبدون آثار جانبية</p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-10 h-10" />,
                title: 'تركيز عالي',
                desc: 'يساعدك على تصفية ذهنك والتركيز في دراستك أو عملك بكل هدوء.',
                color: 'from-blue-500 to-indigo-600',
                iconBg: 'bg-blue-500/10 text-blue-400'
              },
              {
                icon: <Moon className="w-10 h-10" />,
                title: 'نوم عميق',
                desc: 'وداعاً للأرق، استمتع بنوم مريح لتستيقظ بكامل طاقتك ونشاطك.',
                color: 'from-purple-500 to-violet-600',
                iconBg: 'bg-purple-500/10 text-purple-400'
              },
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: 'آمن وطبيعي',
                desc: 'مستخلص نباتي نقي 100%، لا يسبب الإدمان ولا الخمول الصباحي.',
                color: 'from-green-500 to-emerald-600',
                iconBg: 'bg-green-500/10 text-green-400'
              }
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center card-hover">
                <div className={`w-20 h-20 ${item.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 md:py-24 section-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src="/images/image1.jpg"
                alt="منتج عشبة الناردين"
                className="rounded-2xl max-w-full h-auto max-h-[500px] object-cover img-shadow"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                عشبة الناردين: <span className="text-gold-400">بوابتك للنوم العميق والاسترخاء الطبيعي</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                هدئ عقلك وجسدك مع كبسولاتنا عالية الجودة (500 ملغ).
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="glass rounded-xl px-6 py-4 text-center">
                  <Package className="w-6 h-6 text-gold-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gold-400">40</div>
                  <div className="text-sm text-gray-400">كبسولة</div>
                </div>
                <div className="glass rounded-xl px-6 py-4 text-center">
                  <BadgeCheck className="w-6 h-6 text-gold-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gold-400">500</div>
                  <div className="text-sm text-gray-400">ملغ</div>
                </div>
                <div className="glass rounded-xl px-6 py-4 text-center">
                  <ShieldCheck className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-400">100%</div>
                  <div className="text-sm text-gray-400">طبيعي</div>
                </div>
              </div>
              <button onClick={scrollToOrder} className="btn-cta">
                اطلب الآن واستمتع بنوم هانئ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 section-darker" id="pricing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              اختر <span className="text-gold-400">العرض المناسب</span> لك
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-10 max-w-xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm font-semibold text-center">
              ⚠️ تنبيه: المخزون قليل جداً، اطلب الآن قبل ما تخلص الكمية وتندم على ضياع العرض!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Plan 1 */}
            <div className="glass rounded-2xl p-6 card-hover border border-white/5">
              <div className="text-center mb-6">
                <span className="text-sm text-gray-400 font-semibold">تجربة</span>
                <h3 className="text-2xl font-black mt-1">1 علبة</h3>
                <div className="text-3xl font-black text-gold-400 mt-3">2900 <span className="text-lg">د.ج</span></div>
                <p className="text-sm text-gray-400 mt-1">+ مصاريف التوصيل</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> 40 كبسولة × 500 ملغ</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> منتج طبيعي 100%</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> توصيل لـ 58 ولاية</li>
              </ul>
              <button onClick={scrollToOrder} className="w-full btn-cta text-center">اطلب الآن</button>
            </div>

            {/* Plan 2 - Popular */}
            <div className="relative glass rounded-2xl p-6 card-hover border-2 border-gold-400/50 scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-black text-xs font-bold px-4 py-1 rounded-full">
                الأكثر طلباً ⭐
              </div>
              <div className="text-center mb-6">
                <span className="text-sm text-gold-400 font-semibold">التوفير</span>
                <h3 className="text-2xl font-black mt-1">2 علب</h3>
                <div className="text-3xl font-black text-gold-400 mt-3">5300 <span className="text-lg">د.ج</span></div>
                <p className="text-sm text-green-400 mt-1 font-semibold">وفرت 500 دج! 🎉</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> 80 كبسولة × 500 ملغ</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> منتج طبيعي 100%</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> توصيل لـ 58 ولاية</li>
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold-400" /> توفير 500 دج</li>
              </ul>
              <button onClick={scrollToOrder} className="w-full btn-cta text-center">اطلب الآن</button>
            </div>

            {/* Plan 3 - Premium */}
            <div className="relative glass rounded-2xl p-6 card-hover border border-green-400/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-600 text-black text-xs font-bold px-4 py-1 rounded-full">
                أفضل قيمة 🏆
              </div>
              <div className="text-center mb-6">
                <span className="text-sm text-green-400 font-semibold">باك بريميوم</span>
                <h3 className="text-2xl font-black mt-1">3 علب</h3>
                <div className="text-3xl font-black text-gold-400 mt-3">7700 <span className="text-lg">د.ج</span></div>
                <p className="text-sm text-green-400 mt-1 font-semibold">توصيل مجاني + توفير 1000 دج 🚀</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> 120 كبسولة × 500 ملغ</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-green-400" /> منتج طبيعي 100%</li>
                <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-green-400" /> توصيل مجاني</li>
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold-400" /> توفير 1000 دج</li>
              </ul>
              <button onClick={scrollToOrder} className="w-full btn-cta text-center">اطلب الآن</button>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-16 md:py-24 section-dark" id="order-form">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              أكد <span className="text-gold-400">طلبك</span> الآن
            </h2>
            <p className="text-gray-400">املأ المعلومات وسنتصل بك لتأكيد الطلب</p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mt-4" />
          </div>
          <OrderForm wilayas={WILAYAS} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 section-darker">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              واش قالوا لي جربوها <span className="text-gold-400">في الباك لي فات ونجحوا</span>؟ 🎓
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: 'والله غير روعة، كنت نعاني من قلق الباك وما نقدتش نرقد، بصح ملي بديت نشرب كبسولة قبل النوم وليت نرقد هاني ونوض ناشط.',
                name: 'أحمد م.',
                location: 'الجزائر العاصمة',
                stars: 5
              },
              {
                text: 'منتج طبيعي وبزاف هايل. ساعدني بزاف باش نقص التوتر تاع الخدمة. التوصيل كان سريع وصلني في يومين لوهران.',
                name: 'سارة ب.',
                location: 'وهران',
                stars: 5
              },
              {
                text: 'جربت بزاف صوالح بصح هادي عشبة الناردين هي اللي ريحتني. الخلعة نقصت بزاف و وليت نركز خير في قرايتي.',
                name: 'محمد ك.',
                location: 'قسنطينة',
                stars: 5
              }
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.stars)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold text-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e27] via-[#1a1145] to-[#0a0e27]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,110,245,0.2),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            ما تخليش القلق <span className="text-red-400">يفسد حياتك</span>!
          </h2>
          <p className="text-gray-300 text-lg mb-8">اطلب الآن قبل نفاذ الكمية</p>
          <button onClick={scrollToOrder} className="btn-cta text-xl px-10 py-4 animate-pulse-glow">
            🛒 اطلب الآن
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-gold-400" />
            <span className="text-gold-400 font-bold">عشبة الناردين</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 جميع الحقوق محفوظة - عشبة الناردين الجزائر</p>
        </div>
      </footer>
    </div>
  )
}
