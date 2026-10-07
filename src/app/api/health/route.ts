export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
      <div className="card w-full p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-olive">Sign in</p>
        <h1 className="mt-2 font-serif text-4xl text-forest">Fridge to Fork</h1>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-charcoal">Email</label>
            <input className="w-full rounded-xl border border-[#E1D8CD] bg-[#FFFDF8] px-3 py-2 outline-none focus:border-forest" type="email" placeholder="name@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-charcoal">Password</label>
            <input className="w-full rounded-xl border border-[#E1D8CD] bg-[#FFFDF8] px-3 py-2 outline-none focus:border-forest" type="password" placeholder="••••••••" />
          </div>
          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
