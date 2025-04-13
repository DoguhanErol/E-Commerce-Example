//Permission: USER
import React from 'react'
import { useFetchOrders } from '../hooks/useFetchOrders'
import { Order } from '../models/Order'
import LoadingComponent from '../components/modals/Loading'
import ErrorComponent from '../components/modals/Error'
import OrderCard from '../components/modals/OrderCard'
import bg_image from '../assets/bg-orders.webp'
import InformationCard from '../components/ui/InformationCard'

const OrdersPage :React.FC = () => {

  const {error,isLoading,orders} = useFetchOrders()
  console.log('Orders page:')


  return (
    <>
    {isLoading ? (
      <LoadingComponent />
    ): error ?(
      <ErrorComponent message={error} />
    ): orders === null || orders.length <= 0 || orders === undefined  ? (
      <div className='bg-cover bg-center' style={{ backgroundImage: `url(${bg_image})` }}>
        <InformationCard
        mainMessage={'There is no order'}
        linkActivate= {false}
        />
      </div>
    ): orders ? (
      <div className=' bg-cover min-h-screen' style={{ backgroundImage: `url(${bg_image})` }}>
        <h1 className='flex justify-center text-2xl text-success'>Orders</h1>
        <div className='flex flex-col flex-wrap justify-center sm:justify-normal'>
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      </div>

    ):(
      <ErrorComponent message='Unexepted Error...' />
    )}
      
    </>
  )
}

export default OrdersPage