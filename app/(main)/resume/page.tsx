'use client'

import { genPageMetadata } from 'app/seo'
import type { Authors } from 'contentlayer/generated'
import { allResumes, Resume } from 'contentlayer/generated'
import { MDXComponents } from 'mdx/types'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { useCallback, useEffect, useState } from 'react'
import { GrGithub, GrLocation, GrMail, GrSkype } from 'react-icons/gr'

import Image from '@/components/Image'
import { components as baseComponents } from '@/components/MDXComponents'
import SocialIcon from '@/components/social-icons'

export default function ResumePage() {
  const resume = allResumes.find((p) => p.slug === 'tattran') as Resume
  const [isPageReady, setIsPageReady] = useState(false)

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }

  const components: MDXComponents = {
    ...baseComponents,
    h2: (props) => (
      <h2
        className="mb-1 mt-3 border-b-2 text-base font-bold leading-6 tracking-wide text-primary-600"
        {...props}
      >
        {props.children}
      </h2>
    ),
    h3: (props) => (
      <h3 className="mb-1 mt-2 text-base font-bold" {...props}>
        {props.children}
      </h3>
    ),
    h4: (props) => (
      <h4 className="my-1 text-sm font-semibold" {...props}>
        {props.children}
      </h4>
    ),
    p: (props) => <p className={`indent-10 text-sm leading-normal`} {...props} />,
    ul: (props) => <ul className="list-inside list-disc text-sm" {...props} />,
    ol: (props) => <ol className="list-inside list-decimal text-sm" {...props} />,
    li: (props) => <li className="text-sm" {...props} />,
    a: (props) => (
      <a className="text-blue-500 hover:underline" {...props}>
        {props.children}
      </a>
    ),
    blockquote: (props) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />
    ),
  }

  function getOuterHeight(el: HTMLElement) {
    let height = el.offsetHeight
    const style = getComputedStyle(el)

    height += parseInt(style.marginTop) + parseInt(style.marginBottom)
    return height
  }

  const calculatePage = useCallback(() => {
    console.log('calculatePage')
    const documentRef = document.getElementById('baseResume')
    if (!documentRef || !documentRef?.children) {
      return
    }
    const childNodes = documentRef?.children
    const pageHeight = 11.69 * 96
    const marginY = (0.39 + 0.38) * 96
    const contentMaxHeight = pageHeight - marginY
    let page = 1
    let pageHeightLeft = contentMaxHeight

    if (!childNodes) {
      return
    }

    Array.from(childNodes).forEach((node: HTMLElement) => {
      const nodeHeight = getOuterHeight(node)
      if (nodeHeight > pageHeightLeft) {
        if (node.tagName === 'UL') {
          const cloneNode = node.cloneNode() as HTMLElement
          cloneNode.setAttribute('data-page', page.toString())
          Array.from(cloneNode.children).forEach((li) => {
            cloneNode.removeChild(li)
          })
          const pageEl = node.parentElement
          pageEl?.appendChild(cloneNode)
          Array.from(node.children).every((li) => {
            const liHeight = getOuterHeight(li as HTMLElement)

            if (liHeight > pageHeightLeft) {
              return false
            }
            cloneNode.appendChild(li)
            pageHeightLeft -= liHeight
            return true
          })
        }
        page += 1
        pageHeightLeft = contentMaxHeight
        const prevNode = node.previousElementSibling
        const headingTags = ['H1', 'H2', 'H3']
        if (prevNode && headingTags.includes(prevNode.tagName)) {
          prevNode.setAttribute('data-page', page.toString())
          pageHeightLeft -= getOuterHeight(prevNode as HTMLElement)
        }
      }

      pageHeightLeft -= getOuterHeight(node)
      node.setAttribute('data-page', page.toString())
    })

    const pages = Array.from(Array(page).keys()).map((i) => {
      const page = i + 1
      const pageEl = document.createElement('article')
      pageEl.className =
        'relative h-[11.69in] w-[8.27in] border pl-[0.39in] pr-[0.38in] pt-[0.39in] pb-[0.38in] shadow-md'
      pageEl.setAttribute('data-page', page.toString())
      pageEl.setAttribute('id', 'page-' + page.toString())
      const pageNumberEl = document.createElement('div')
      pageNumberEl.className = 'absolute bottom-10 right-10 text-sm text-gray-500'
      pageNumberEl.innerText = `${page}`
      pageEl.appendChild(pageNumberEl)
      return pageEl
    })

    Array.from(childNodes).forEach((node) => {
      const page = node.getAttribute('data-page')
      const pageEl = pages[parseInt(page || '0') - 1]
      pageEl?.appendChild(node)
    })

    pages.forEach((page) => {
      documentRef?.parentElement?.appendChild(page)
    })

    documentRef?.parentElement?.removeChild(documentRef)
  }, [])

  useEffect(() => {
    calculatePage()
  }, [calculatePage])

  return (
    <>
      <article
        id="baseResume"
        className="relative h-[11.69in] w-[8.27in] border pb-[0.38in] pl-[0.39in] pr-[0.38in] pt-[0.39in]"
        // ref={resumeRef}
      >
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex flex-col items-center space-x-2">
            {resume.avatar && (
              <Image
                src={resume.avatar}
                alt={resume.name}
                width={144}
                height={144}
                className="rounded-full"
              />
            )}
          </div>
          <div className="col-span-2 flex flex-col space-y-1">
            <h1 className="mb-2 pb-2 pt-3 font-serif text-6xl font-bold leading-8 tracking-tight text-primary-600">
              {resume.name}
            </h1>
            <h4 className="font-serif text-xl font-semibold leading-8 tracking-tight text-gray-700">
              {resume.occupation}
            </h4>
            <div className="flex flex-row space-x-6 text-sm">
              {/* <div className="flex flex-row items-center justify-center space-x-1">
              <GrPhone className="h-4 w-4" />
              <a className="text-base" href={`tel:${resume.phone}`}>
                {resume.phone}
              </a>
            </div> */}
              <div className="flex flex-row items-center justify-center space-x-1">
                <GrMail className="h-4 w-4" />
                <a className="text-base" href={`mailto:${resume.email}`} target="_blank">
                  {resume.email}
                </a>
              </div>
              <div className="flex flex-row items-center justify-center space-x-1">
                <GrSkype className="h-4 w-4" />
                <a className="text-base" href={`skype:${resume.skype}?chat`} target="_blank">
                  {resume.skype}
                </a>
              </div>
              <div className="flex flex-row items-center justify-center space-x-1">
                <GrGithub className="h-4 w-4" />
                <a
                  className="text-base"
                  href={`https://github.com/${resume.github}`}
                  target="_blank"
                >
                  {resume.github}
                </a>
              </div>
            </div>
            <address className="flex flex-row items-center space-x-1">
              <GrLocation className="h-4 w-4" />
              <a
                className="text-base"
                href={`https://maps.app.goo.gl/xMBVW59dfBiKJB6a7`}
                target="_blank"
              >
                {resume.address}
              </a>
            </address>
          </div>
        </div>
        <MDXLayoutRenderer code={resume.body.code} components={components} />
      </article>
    </>
  )
}
