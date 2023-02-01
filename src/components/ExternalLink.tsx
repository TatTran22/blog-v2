import { HTMLProps } from 'react'
import { MdLaunch } from 'react-icons/md'

const ExternalLinkRenderer = (props) => (
  <span>
    {props.renderDefault(props)}
    <a contentEditable={false} href={props.value.href}>
      <MdLaunch />
    </a>
  </span>
)

interface ExternalLinkProps extends HTMLProps<HTMLAnchorElement> {
  href: string
}
const ExternalLink = ({ children, ...rest }: ExternalLinkProps) => (
  <a target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
)

export { ExternalLink, ExternalLinkRenderer }
