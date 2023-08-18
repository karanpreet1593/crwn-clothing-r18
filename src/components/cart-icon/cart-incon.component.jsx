import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react'
import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const {isCartOpen, setisCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setisCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
          <ShoppingIcon className='shopping-icon' />
          <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
      );
    };

export default CartIcon