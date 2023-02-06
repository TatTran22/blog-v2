import { Author } from 'lib/types'

interface FooterProps {
  owner: Author
}

export default function Footer(props: FooterProps) {
  const { owner: author } = props
  return (
    <footer className="flex h-16 w-full flex-col items-center justify-center">
      <hr className="border-1 mb-4 w-full border-gray-200 dark:border-gray-800" />
      {/* <NowPlaying /> */}
      <div className="flex flex-col items-center justify-center">
        <div className="background-author-animate mb-2 flex space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-xl font-semibold text-transparent">
          <div>{`${author.name} © ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
