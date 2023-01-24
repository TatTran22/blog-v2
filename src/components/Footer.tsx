import { Author } from 'lib/types'

interface FooterProps {
  owner: Author
}

export default function Footer(props: FooterProps) {
  const { owner: author } = props
  return (
    <footer className="">
      <hr className="w-full mb-4 border-gray-200 border-1 dark:border-gray-800" />
      {/* <NowPlaying /> */}
      <div className="flex flex-col items-center">
        <div className="flex mb-2 space-x-2 text-xl font-semibold text-transparent background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text">
          <div>{` ${author.name} © ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
