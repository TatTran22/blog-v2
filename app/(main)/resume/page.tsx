'use client'

import { allResumes, Resume } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { useCallback, useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { GrGithub, GrLocation, GrMail, GrSkype } from 'react-icons/gr'

import Image from '@/components/Image'
import { ResumeContactComponents, ResumeMDXComponents } from '@/components/ResumeComponents'

export default function ResumePage() {
  const resume = allResumes.find((p) => p.slug === 'tattran') as Resume

  if (!resume) {
    throw new Error(`Cannot find resume with slug "${'tattran'}"`)
  }
  const { Name, Occupation, Github, Skype, Address, Email } = ResumeContactComponents
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
    const contentMaxHeight = pageHeight
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
        'relative h-[10.92in] ml-[0.39in] mr-[0.38in] mt-[0.39in] mb-[0.38in] before:content-[""] before:absolute before:top-[-0.39in] before:left-[-0.39in] before:right-[-0.38in] before:bottom-[-0.38in] before:border-[1px] before:border-gray-300 before:shadow-md before:z-[-1]'
      pageEl.setAttribute('data-page', page.toString())
      pageEl.setAttribute('id', 'page-' + page.toString())
      const pageNumberEl = document.createElement('div')
      pageNumberEl.className = 'absolute bottom-0 right-0 text-sm text-gray-500'
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
      <article id="baseResume" className="relative mb-[0.38in] ml-[0.39in] mr-[0.38in] mt-[0.39in]">
        <div className="flex flex-row space-x-6">
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
            <Name>{resume.name}</Name>
            <Occupation>{resume.occupation}</Occupation>
            <div className="flex flex-row space-x-6 text-base">
              {!!resume.email && <Email email={resume.email} />}
              {!!resume.skype && <Skype skype={resume.skype} />}
              {!!resume.github && <Github github={resume.github} />}
            </div>
            {!!resume.address && <Address address={resume.address} />}
          </div>
        </div>
        <MDXLayoutRenderer code={resume.body.code} components={ResumeMDXComponents} />
      </article>
    </>
  )
}
