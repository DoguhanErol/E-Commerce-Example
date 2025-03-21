import React from 'react'
import ordersPic from '../../assets/Orders.webp'
import { Link } from 'react-router-dom'
const HomeOrders = () => {
  return (
    <>
    <figure className="hero  h-auto  w-11/12 max-w-[100vh] rounded-2xl shadow-2xl bg-no-repeat  group" >
            <img src={ordersPic} alt="Orders" />
          <Link to='/orders' className="hero-overlay  rounded-2xl shadow-2xl btn btn-ghost group" >
          <h1 className="mb-5 text-4xl bg-gray-500 bg-opacity-70 rounded-md p-3 font-bold text-white pointer-events-none group-hover:text-secondary group-hover:text-5xl">Orders</h1>
          </Link>
        </figure>
    </>
  )
}

export default HomeOrders