import { Link } from 'react-router-dom'
import { navLinks } from '../../constants/NavLinks'
import Button from '../UI/Button/Button'
import "./NavLinksLiist.style.scss"


function NavLinksList() {
  return (
    <div className='container'>

        {navLinks.map(el => (
            <Link to={el.link} key={el.name}>
                <Button>
                    <div className='mx-2'>
                        {el.icon}
                    </div>
                    <h1>{el.name}</h1>
                </Button>
            </Link>
        ))}

    </div>
  )
}

export default NavLinksList