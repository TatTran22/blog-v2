'use client'
import Image from 'components/Image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Message } from 'lib/types'

dayjs.extend(relativeTime)

const MessageCard = ({ message }: { message: Message }) => {
  return (
    <div className="flex rounded-lg bg-white shadow-lg">
      <div className="flex w-48 items-center px-2 py-3">
        {message.users.avatar_url ? (
          <Image
            className="mr-2 h-8 w-8 rounded-full object-cover shadow"
            src={message.users.avatar_url}
            alt="avatar"
            width={32}
            height={32}
          />
        ) : (
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-200 object-cover shadow"></div>
        )}
        <div className="flex flex-col ">
          <h2 className="w-fit text-sm font-semibold text-gray-900">{message.users?.full_name}</h2>
          <p className="text-xs text-gray-700">
            {`Joined ${dayjs(message.users.created_at).format('MMM YYYY')}`}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center gap-4">
        <p className="flex-1 px-4 py-3 text-sm text-gray-700">{message.content}</p>
        <div className="flex flex-col items-center pr-4">
          <small className="text-xs text-gray-700 ">{dayjs(message.created_at).toNow(true)}</small>
          {/* <div className="flex mr-3 text-sm text-gray-700 ">
              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>12</span>
            </div> */}
          {/* <div className="flex flex-row items-center justify-center w-full text-sm text-gray-700">
              <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span>8</span>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default MessageCard
