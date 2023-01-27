interface ContainerHeaderProps {
  title: string
}

export default function ContainerHeader({ title }: ContainerHeaderProps) {
  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>
    </div>
  )
}
