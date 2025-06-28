
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100 font-janeLight px-10">
      <main className="pt-5">{children}</main>
    </div>
  )
}

