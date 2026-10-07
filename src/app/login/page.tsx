import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-olive">Dashboard</p>
          <h1 className="mt-2 font-serif text-4xl text-forest">Your kitchen intelligence</h1>
        </div>
        <Link href="/" className="btn-secondary">Home</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="card p-5">
          <p className="text-sm text-olive">Inventory</p>
          <p className="mt-3 font-serif text-4xl text-forest">24</p>
          <p className="mt-2 text-sm text-olive">Ingredients tracked</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-olive">Meals planned</p>
          <p className="mt-3 font-serif text-4xl text-forest">7</p>
          <p className="mt-2 text-sm text-olive">Across the week</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-olive">Waste avoided</p>
          <p className="mt-3 font-serif text-4xl text-forest">2.8kg</p>
          <p className="mt-2 text-sm text-olive">Estimated this month</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-olive">Protein goal</p>
          <p className="mt-3 font-serif text-4xl text-forest">118g</p>
          <p className="mt-2 text-sm text-olive">of 160g target</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-forest">AI recommended meals</h2>
          <div className="mt-5 space-y-3">
            {['Spinach Paneer Bhurji', 'Moong Dal Tadka', 'Vegetable Biryani'].map((recipe) => (
              <div key={recipe} className="flex items-center justify-between rounded-2xl border border-[#F1E9E1] bg-[#F9F7F3] p-3">
                <div>
                  <p className="font-medium text-charcoal">{recipe}</p>
                  <p className="text-sm text-olive">Uses 5 of 6 ingredients</p>
                </div>
                <button className="btn-secondary px-3 py-2 text-xs">Cook</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-forest">Use before expiry</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex items-center justify-between"><span>Spinach</span><span className="text-danger">Tomorrow</span></li>
            <li className="flex items-center justify-between"><span>Curd</span><span className="text-warning">In 2 days</span></li>
            <li className="flex items-center justify-between"><span>Tomatoes</span><span className="text-olive">In 3 days</span></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
