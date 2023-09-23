import { PDFDocument } from 'pdf-lib'
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

    // Give the buffer to pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    pdfDoc.setTitle('Tat Tran - Resume')
    pdfDoc.setSubject('Tat Tran - Resume')
    pdfDoc.setKeywords(['Tat Tran', 'Resume', 'Software Engineer'])
    pdfDoc.setProducer('Tat Tran')
    pdfDoc.setCreator('Tat Tran')
    pdfDoc.setAuthor('Tat Tran')
    pdfDoc.setCreationDate(new Date())
    pdfDoc.setModificationDate(new Date())
    const pdfBytes = await pdfDoc.save()

    // Return the PDF with the correct MIME type
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch (error) {
    console.log(error)
    return new Response('Error generating PDF', {
      status: 500,
    })
  }
}
