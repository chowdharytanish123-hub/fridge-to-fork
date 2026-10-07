import Link from 'next/link';

const useSoon = [
  { name: 'Spinach', detail: 'Expires tomorrow' },
  { name: 'Curd', detail: 'Expires in 2 days' },
  { name: 'Tomatoes', detail: 'Use soon' },
];

const aiPicks = [
  { name: 'Spinach Paneer Bhurji', time: '18 mins', kcal: '420 kcal', protein: '24g protein' },
  { name: 'Moong Dal Tadka', time: '25 mins', kcal: '360 kcal', protein: '18g protein' },
  { name: 'Vegetable Biryani', time: '35 mins', kcal: '510 kcal', protein: '16g protein' },
];

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 md:px-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-olive">Fridge to Fork</p>
          <h1 className="mt-2 font-serif text-5xl text-forest">Good evening, Tanish.</h1>
        </div>
        <Link href="/dashboard" className="btn-primary">
          Open dashboard
        </Link>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-forest">Use soon</h2>
            <span className="badge">3 items</span>
          </div>
          <div className="space-y-3">
            {useSoon.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl border border-[#F0E8DF] bg-[#F9F7F3] p-3">
                <div>
                  <p className="font-medium text-charcoal">{item.name}</p>
                  <p className="text-sm text-olive">{item.detail}</p>
                </div>
                <span className="rounded-full bg-[#F6E8D7] px-2 py-1 text-xs font-semibold text-[#B0672E]">Priority</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-forest">Today&apos;s nutrition</h2>
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm"><span>Calories</span><span>1,680 / 2,400 kcal</span></div>
              <div className="h-2 rounded-full bg-[#F2E9E0]"><div className="h-2 w-[70%] rounded-full bg-forest" /></div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm"><span>Protein</span><span>118 / 160g</span></div>
              <div className="h-2 rounded-full bg-[#F2E9E0]"><div className="h-2 w-[74%] rounded-full bg-success" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-forest">✦ AI picks for you</h2>
          <Link href="/dashboard" className="text-sm font-medium text-forest">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {aiPicks.map((meal) => (
            <div key={meal.name} className="rounded-2xl border border-[#F0E8DF] bg-[#F9F7F3] p-4">
              <div className="mb-4 flex h-16 items-center justify-center rounded-2xl bg-[#F3E4D4] text-3xl">🍽️</div>
              <h3 className="font-semibold text-charcoal">{meal.name}</h3>
              <div className="mt-3 flex items-center justify-between text-sm text-olive">
                <span>{meal.time}</span>
                <span>{meal.kcal}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-success">{meal.protein}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card p-5">
          <p className="text-sm uppercase tracking-[0.15em] text-olive">Kitchen</p>
          <h3 className="mt-3 font-serif text-3xl text-forest">27 ingredients</h3>
          <p className="mt-2 text-sm text-olive">4 expiring soon</p>
        </div>

        <div className="card p-5">
          <p className="text-sm uppercase tracking-[0.15em] text-olive">Food waste</p>
          <h3 className="mt-3 font-serif text-3xl text-forest">2.8 kg saved</h3>
          <p className="mt-2 text-sm text-olive">₹740 estimated savings</p>
        </div>

        <div className="card p-5">
          <p className="text-sm uppercase tracking-[0.15em] text-olive">Cook now</p>
          <h3 className="mt-3 font-serif text-3xl text-forest">3 ready</h3>
          <p className="mt-2 text-sm text-olive">Based on fridge inventory</p>
        </div>
      </section>
    </main>
  );
}
