'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type FormEventHandler, useState } from 'react'

const InputSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')
  const router = useRouter()

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const newURLSearchParams = new URLSearchParams(searchParams)
    newURLSearchParams.set('search', searchValue)

    router.push(`${pathname}?${newURLSearchParams}`)
  }

  return (
    <form
      className="relative  flex w-72 cursor-default items-center justify-center overflow-hidden rounded-lg bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      onSubmit={handleSearch}
    >
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
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 caret-primary-600 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
      />
      <button type="submit" className="absolute right-3 text-gray-400 dark:text-gray-300">
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
  )
}

export default InputSearch
