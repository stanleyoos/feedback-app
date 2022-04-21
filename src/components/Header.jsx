import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }
  return (
    <Link to="/">
      <header style={headerStyles}>
        <div className="container">{text}</div>
      </header>
    </Link>
  )
}

Header.defaultProps = {
  text: 'Feedback UI',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#fff',
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

export default Header
