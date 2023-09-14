import { createBrowserClient } from 'lib/supabase-browser'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createBrowserClient()
    const { data: pageviews, error } = await supabase
      .from('pageviews')
      .select('id, slug, view_count')

    return res.status(200).json({ pageviews, error })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
