'use client'
import cn from 'classnames'
import { PostHeading } from 'lib/types'
import slugify from 'slugify'

const TableOfContent = ({ headings }: { headings: PostHeading[] }) => {
  console.log(headings)

  return (
    <div className="py-4 xl:py-8">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Table of contents
      </h2>
      <div className="flex flex-wrap">
        <ul className="flex w-full flex-col space-y-2 xl:w-auto  xl:space-y-0 ">
          {headings.map((heading) => {
            if (!['h2', 'h3'].includes(heading.style)) return null

            const slug = slugify(heading.children.map((c) => c.text).join(''))
            return (
              <li key={slug}>
                <a
                  href={`#${slug}`}
                  className={cn(
                    'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400',
                    {
                      'pl-4': heading.style === 'h3',
                    }
                  )}
                >
                  {heading.children.map((c) => c.text).join('')}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TableOfContent
