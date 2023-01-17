import Link from 'next/link'

import { Category } from '@/lib/types'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  category: Category
}

const Category = ({ category }: Props) => {
  const { name, slug } = category
  return (
    <Link
      href={`/tags/${kebabCase(slug)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {name}
    </Link>
  )
}

export default Category
