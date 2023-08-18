import './navigation.styles.scss'
import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown (4).svg'
import { userContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-incon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

const Navigation = () => {
    const { currentUser } = useContext(userContext);
    const { isCartOpen } = useContext(CartContext);

    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to = '/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to = '/shop'> SHOP </Link>
                    {currentUser ? 
                        (<span className='nav-link' onClick={signOutUser}>
                        Sign Out</span>)
                        : (
                             <Link className='nav-link' to = '/auth'> 
                             SIGN IN </Link>
                        )
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/> }
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation