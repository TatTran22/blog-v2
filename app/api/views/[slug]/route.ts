import { createBrowserClient } from 'lib/supabase-browser'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createBrowserClient()
  try {
    if (req.method === 'POST') {
      const { data, error } = await supabase.rpc('update_views', {
        // @ts-ignore
        page_slug: req.query.slug.toString(),
      })
      if (error) {
        throw error
      }
      return res.status(200).json(data)
    } else {
      return res.status(400).send('Invalid request method')
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
