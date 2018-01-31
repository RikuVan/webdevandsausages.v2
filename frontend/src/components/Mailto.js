import { h, Component } from 'preact'
import styled from 'styled-components'

const Link = styled.a`
  flex: 1;
  color: #fff;
  text-decoration: none;
`

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-mail"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

class Mailto extends Component {
  handleClick = event => {
    event.preventDefault()
    const { email } = this.props
    window.location.href = `mailto:${email}`
  }

  render({ email, children }) {
    return (
      <Link onClick={this.handleClick} href="mailto:obfuscated">
        {children[0] ? children[0] : <EmailIcon />}
      </Link>
    )
  }
}

export default Mailto
