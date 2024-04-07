

import { Link } from 'react-router-dom'
import { navLinks } from '../../constants/NavLinks'
import Button from '../UI/Button/Button'


function NavLinksList() {
  return (
    <div className='flex justify-center items-center'>

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