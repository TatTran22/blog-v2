'use client'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import cn from 'classnames'
import type { TagWithCount } from 'lib/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

interface TagsFilterProps {
  tags: TagWithCount[]
}

export default function TagsFilter(props: TagsFilterProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [selected, setSelected] = useState<TagWithCount[]>([])
  const [query, setQuery] = useState('')
  const { tags } = props

  useEffect(() => {
    const tagsParams = searchParams.get('tags')
    if (tagsParams) {
      const selectedTags = tagsParams
        .split(',')
        .map((slug) => tags.find((tag) => tag.slug === slug))
        .filter((tag) => tag)
      setSelected(selectedTags)
    }
  }, [searchParams, tags])

  const filteredTags =
    query === ''
      ? tags.filter((tag) => tag.count > 0)
      : tags.filter(
          (tag) =>
            tag.title
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')) && tag.count > 0
        )

  const handleOnComboboxTagsChange = (selectedTags: TagWithCount[]) => {
    setSelected(selectedTags)
    const tags = selectedTags.map((tag) => tag.slug)
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('tags', tags.join(','))
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <div className="relative w-72">
      <Combobox<TagWithCount[]> value={selected} onChange={handleOnComboboxTagsChange} multiple>
        {({ open }) => (
          <div className="relative ">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Label className="sr-only" htmlFor="tags">
                Filter by tag
              </Combobox.Label>
              <Combobox.Input
                id="tags"
                type="text"
                name="tags"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 caret-primary-600 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:ring-offset-gray-800 sm:text-sm"
                displayValue={(selectedTags: TagWithCount[]) =>
                  selectedTags.length === 0 ? '' : selectedTags.map((tag) => tag.title).join(', ')
                }
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by tag"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredTags.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    No tags found.
                  </div>
                ) : (
                  filteredTags.map((tag) => (
                    <Combobox.Option
                      key={tag._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={tag}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`flex items-center justify-start truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {tag.title}
                            <span
                              className={cn('ml-1 text-xs text-gray-500', {
                                'text-white': active,
                              })}
                            >
                              {`(${tag.count})`}
                            </span>
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              {!active ? (
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  )
}
