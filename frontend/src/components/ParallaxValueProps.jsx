import { Truck, RefreshCcw, Headphones, ShieldCheck, Heart, Gift, Leaf, Star } from 'lucide-react';

const valueProps = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On all orders over $50, fast and reliable.'
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    desc: '30-day hassle-free returns on every order.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Our team is here for you anytime, anywhere.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    desc: 'Your payment and data are always protected.'
  },
  {
    icon: Heart,
    title: 'Wishlist',
    desc: 'Save your favorites and shop later.'
  },
  {
    icon: Gift,
    title: 'Gift Cards',
    desc: 'Perfect for any occasion, delivered instantly.'
  },
  {
    icon: Leaf,
    title: 'Eco Packaging',
    desc: 'Sustainable, planet-friendly materials.'
  },
  {
    icon: Star,
    title: 'Top Rated',
    desc: 'Loved by thousands of happy customers.'
  }
];

export default function ParallaxValueProps() {
  return (
    <section
      className="relative w-full py-20 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.92),rgba(255,255,255,0.92)), url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-light text-neutral-900 mb-12 text-center tracking-tight">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {valueProps.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center bg-white/80 rounded-xl shadow-soft p-6 text-center backdrop-blur-md border border-neutral-100"
            >
              <Icon className="mb-4 text-primary-600" size={36} />
              <h3 className="font-semibold text-neutral-900 mb-2 text-lg">{title}</h3>
              <p className="text-neutral-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 