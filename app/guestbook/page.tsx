import { createClient } from 'lib/supabase-server'
import { Message } from 'lib/types'

import CreateNewChannel from './create-new-channel'
import MessageSection from './message-section'
// do not cache this page
export const revalidate = 0

export default async function GuestBookRoute() {
  const supabase = createClient()

  const getChannel = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('*, channel_members(count), channel_messages(*, users:sender_id(*))')
      .eq('slug', 'general')
      .single()
    return { guestbook: data, error }
  }

  const { guestbook } = await getChannel()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Guestbook
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Questions? Comments? Leave a message in the guestbook!
          </p>
        </div>
        <div className="flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <div className="w-full space-y-8">
              {guestbook ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">{guestbook.name}</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 ">
                        {`(${guestbook.channel_members[0].count} joined)`}
                      </span>
                    </div>
                  </div>

                  <MessageSection
                    channel={guestbook}
                    serverMessages={(guestbook.channel_messages as Message[]) || []}
                  />
                </div>
              ) : (
                <CreateNewChannel />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const metadata = {
  title: 'Guestbook',
  description: 'Welcome to the guestbook',
}
