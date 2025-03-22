import React from 'react';
import { Cart } from '../../models/Cart';
import { API_URL_MEDIA } from '../../config/authConfig';
import InformationCard from '../ui/InformationCard';
import useCreateOrder from '../../hooks/useCreateOrder';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için import edin
import FailedAlert from '../ui/FailedAlert';
import { useCart } from '../../context/CartContext';
import Loading from './Loading';

type Tprops = {
  cartData: Cart;
};

const CartItemCard = (props: Tprops) => {
  const { createOrderResponse, isLoading, error, handleCreateOrder } = useCreateOrder();
  const navigate = useNavigate(); // useNavigate hook'unu kullanarak yönlendirme fonksiyonu oluşturun
  const { refetch } = useCart();

  const handleOrderProducts = async () => {

    await handleCreateOrder(); // Siparişi oluştur
    console.log('Cart Item Card:',createOrderResponse)
    if (error) {
      <FailedAlert message={'Unexpected error!!! Error message:'+ createOrderResponse} />

    } else {
      refetch();
      // Hata yoksa, kullanıcıyı yönlendir
      navigate('/orders'); // Kullanıcıyı /orderstatus sayfasına yönlendir
    }
  };
  if (isLoading) {
    return <Loading />
  }

  // If Cart is Empty
  if (props.cartData.cartItems.length <= 0) {
    return (
      <InformationCard
        mainMessage={'Cart is empty'}
        linkActivate={false}
      />
    );
  }

  // If Cart Not Empty
  return (
    <>
  <div className="overflow-x-auto min-h-screen p-2">
    <table className="table bg-base-200 shadow-2xl opacity-95 my-2 min-w-full">
      {/* head */}
      <thead className="hidden md:table-header-group">
        <tr>
          <th>Product</th>
          <th>Color</th>
          <th>Size</th>
          <th>Piece Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      {/* body */}
      <tbody>
        {props.cartData.cartItems.map((cartItem, index) => (
          <tr key={index} className="flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-none">
            <td className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={API_URL_MEDIA + cartItem.product.image}
                    alt="Product Image"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{cartItem.product.name}</div>
                <div className="text-sm opacity-50">Quantity: {cartItem.quantity}</div>
              </div>
            </td>
            <td className="md:table-cell hidden">{cartItem.color}</td>
            <td className="md:table-cell hidden">{cartItem.size}</td>
            <td className="md:table-cell hidden">{parseInt(cartItem.product.price).toString()}$</td>
            <td className="md:table-cell hidden">{cartItem.quantity * parseInt(cartItem.product.price)}$</td>
            {/* Mobil için alternatif */}
            <td className="md:hidden flex flex-col gap-1 mt-2">
              <span>Color: {cartItem.color}</span>
              <span>Size: {cartItem.size}</span>
              <span>Price: {parseInt(cartItem.product.price).toString()}$</span>
              <span>Total: {cartItem.quantity * parseInt(cartItem.product.price)}$</span>
            </td>
          </tr>
        ))}
      </tbody>
      {/* foot */}
      <tfoot className="hidden md:table-footer-group">
        <tr>
          <th>Product</th>
          <th>Color</th>
          <th>Size</th>
          <th>Total Amount: <span className="text-base text-primary">{parseInt(props.cartData.totalAmount).toString()}$</span></th>
        </tr>
      </tfoot>
    </table>

    {/* Mobil için total fiyat gösterimi */}
    <div className="md:hidden text-right my-3 text-lg font-bold border-2 flex justify-center bg-base-200 bg-opacity-70 rounded-lg">
      Total Amount: <span className="text-primary">{parseInt(props.cartData.totalAmount).toString()}$</span>
    </div>

    <div className="flex flex-col items-center md:items-end my-4">
      <button 
        onClick={handleOrderProducts} 
        className="btn btn-primary w-full md:w-auto" 
        disabled={isLoading}
      >
        Order Products
      </button>
    </div>
  </div>
</>

  );
};

export default CartItemCard;
