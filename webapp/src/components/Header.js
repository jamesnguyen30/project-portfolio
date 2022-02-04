import PropTypes from 'prop-types'


const Header = (props) => {
    return (
        <header>
            <h2>This is the header component {props.title}</h2>
        </header>
    )
}

Header.defaultProps = {
    title: "Default Title"
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header;