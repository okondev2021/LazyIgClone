import logo from '../assets/instagram.png'
const Nav = () => {
    return (
        <nav className='navBar'>
            <div className="logo left">
                <img src={logo} alt="" />
            </div>
            <div className="center">
                <input type="text" placeholder='Search' />
            </div>
            <div className="right">
                <ul>
                    <li>
                        <i className="bi bi-house-door-fill"/>
                    </li>
                    <li>
                        <i className="bi bi-compass"/>
                    </li>
                    <li>
                        <i className="bi bi-chat-right"/>
                    </li>
                    <li>
                        <i className="bi bi-heart"/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav