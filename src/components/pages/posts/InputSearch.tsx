'use client'
import { useRouter } from 'next/navigation'
import { type FormEventHandler, useState } from 'react'

interface InputSearchProps {
  search?: string
}

const InputSearch = ({ search }: InputSearchProps) => {
  const [searchValue, setSearchValue] = useState(search || '')
  const router = useRouter()

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    router.push(`/posts?search=${searchValue}`)
  }

  return (
    <div className="relative max-w-lg">
      <form className="flex items-center" onSubmit={handleSearch}>
        <label htmlFor="search" className="sr-only">
          Search articles
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles"
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
        />
        <button type="submit" className="absolute right-3 top-3 text-gray-400 dark:text-gray-300">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Search"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default InputSearch
