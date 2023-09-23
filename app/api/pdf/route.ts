const fs = require('fs')
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET(request: Request) {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    })
    const page = await browser.newPage()
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/resume2`, {
      waitUntil: 'networkidle0',
    })
    await page.emulateMediaType('print')

    const pdfBuffer = await page.pdf({
      // scale: 0.67,
      format: 'A4',
      margin: {
        top: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
        right: '0.5in',
      },
      printBackground: true,
      preferCSSPageSize: true,
    })
    await browser.close()
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
  } catch (error) {
    console.log(error)
    return new Response('Error generating PDF', {
      status: 500,
    })
  }
}
