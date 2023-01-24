import Image from 'next/image'

import { urlForImage } from '@/lib/sanity.image'
import type { Author } from '@/lib/types'

export default function AuthorAvatar(props: Author) {
  const { name, avatar } = props
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <Image
          src={
            avatar?.asset?._ref
              ? urlForImage(avatar).height(96).width(96).fit('crop').url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          className="rounded-full"
          height={96}
          width={96}
          // @TODO add alternative text to avatar image schema
          alt=""
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
