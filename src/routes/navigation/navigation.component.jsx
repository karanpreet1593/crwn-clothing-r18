import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown (4).svg'
import { userContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-incon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
  }  from './navigation.styles.jsx'


const Navigation = () => {
    const { currentUser } = useContext(userContext);
    const { isCartOpen } = useContext(CartContext);

    return(
        <Fragment>
        <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation