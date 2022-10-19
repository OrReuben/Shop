import React from 'react'
import { useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()
    const data = location.state.data;
    const cart = location.state.cart;
    console.log(data, cart);
  return (
    <div>Successful</div>
  )
}

export default Success