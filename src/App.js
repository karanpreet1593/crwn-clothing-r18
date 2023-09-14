import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";  
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clearCart } from './store/cart/cart.action';
import { setIsCartOpen } from './store/cart/cart.action';
import { useLocation } from 'react-router-dom';



const App = () => {
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname)
  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListner((user)=>{
     if(user) {
         createUserDocumentFromAuth(user)
     }
     dispatch(setCurrentUser(user))
     if(user ) {
        if(location.pathname === '/auth') {
          navigate('/')
        } else{
          navigate(location.pathname)
        }
     }
     else {
      navigate('/auth')
      dispatch(setIsCartOpen(false))
      dispatch(clearCart())
     }
    })
    return unsubscribe
 }, [])

  return (
    <Routes>
      <Route path = '/' element = {<Navigation/>}>
        <Route index element = {<Home />}/>
        <Route path='shop/*' element = {<Shop/>}/>
        <Route path='auth' element = {<Authentication/>}/>
        <Route path='checkout' element = {<Checkout/>} />
      </Route>
    </Routes>
    );
}

export default App;