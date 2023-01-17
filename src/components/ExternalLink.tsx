import { MdLaunch } from 'react-icons/md'

const ExternalLinkRenderer = (props) => (
  <span>
    {props.renderDefault(props)}
    <a contentEditable={false} href={props.value.href}>
      <MdLaunch />
    </a>
  </span>
)

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 transition hover:text-gray-600"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)

export { ExternalLink, ExternalLinkRenderer }
