import React from 'react'
import { useParams } from 'react-router-dom'
import { useMyorder } from '../hook/useMyOrders';

function DetailsOrder() {
  const id = useParams();
  localStorage.setItem("orderId" , id);
  const {showById}=useMyorder();
  console.log(showById);
  
  
  return (
    <div>
      DetailsOrder
    </div>
  )
}

export default DetailsOrder
