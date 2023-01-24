// 'tailwindcss/tailwind.css'

export default async function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="divide-y">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">{children}</div>
    </div>
  )
}
