interface ContainerHeaderProps {
  title: string
}

export default function ContainerHeader({ title }: ContainerHeaderProps) {
  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-transparent background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>
    </div>
  )
}
