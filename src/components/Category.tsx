import { Category } from 'lib/types'
import Link from 'next/link'

interface Props {
  category: Category
}

const Category = ({ category }: Props) => {
  const { title, slug } = category
  return (
    <Link
      href={`/tags/${slug}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {title}
    </Link>
  )
}

export default Category
