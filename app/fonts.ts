import { Fira_Code, Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const fira_code = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const radiance = localFont({
  src: [
    {
      weight: '500',
      path: '../public/static/fonts/radiance/radiance.woff',
    },
    {
      weight: '600',
      path: '../public/static/fonts/radiance/radiance-semibold.woff',
    },
    {
      weight: '700',
      path: '../public/static/fonts/radiance/radiance-bold.woff',
    },
  ],
  variable: '--font-radiance',
  display: 'swap',
})

export const reaver = localFont({
  src: [
    {
      weight: '500',
      path: '../public/static/fonts/reaver/Reaver-Regular.woff',
    },
    {
      weight: '600',
      path: '../public/static/fonts/reaver/Reaver-SemiBold.woff',
    },
    {
      weight: '700',
      path: '../public/static/fonts/reaver/Reaver-Bold.woff',
    },
  ],
  variable: '--font-reaver',
  display: 'swap',
})
