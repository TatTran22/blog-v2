import { Card, Flex } from '@sanity/ui'

import AuthorAvatar from '@/components/AuthorAvatar'
import type { Author } from '@/lib/types'

export default function AuthorAvatarPreviewPane(props: Author) {
  return (
    <Card padding={6}>
      <Flex justify="center">
        <AuthorAvatar {...props} />
      </Flex>
    </Card>
  )
}
