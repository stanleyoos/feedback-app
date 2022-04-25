import PropTypes from 'prop-types'

const Button = ({ children, version, type, isDisabled }) => {
  return (
    // {children} =>  <Button>Send</Button> in other components
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}
// if no props are passed, use default props
Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false,
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
