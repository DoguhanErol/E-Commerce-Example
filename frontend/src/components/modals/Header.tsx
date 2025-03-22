import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuth";
import { Link } from 'react-router-dom';
import useFetchCategories from '../../hooks/useFetchCategories'; // Import your custom hook
import logo from '../../assets/logo.png'
import { useCart } from '../../context/CartContext';
import Loading from './Loading';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading } = useFetchCategories(); // Use the custom hook
  const { cartData } = useCart();
  const {isLoggedIn, logout, loadingAuth} = useAuthContext();

  const handleLogout = () => {
    logout(); // Logout the user
    if (loadingAuth) {
      <Loading />
    }else{
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <header>
      {/* Desktop Design */}
      <div className="hidden sm:flex navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost w-auto h-auto py-1 text-xl"> <img className='w-auto h-14  ' src={logo} alt="" /></Link>
        </div>
        <div className="flex-none">
          <div className="flex flex-1 justify-end px-2">
            <div className="flex items-stretch">
              <Link to="/products" className="btn btn-ghost rounded-btn">Products</Link>
              <div className="dropdown dropdown-bottom">
                {loading ? (
                  <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">.....</div>
                ) : (
                  <>
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                      Categories 
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
                        <path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                      {categories && categories.map((category) => (
                        <li key={category.id * 10}>
                          <Link to={'/products/category/' + category.name} key={category.id *100}>{category.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* User Avatar ,Profile and Cart */}
          {isLoggedIn ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  {/* Cart */}
                    <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {/* Cart product count */}
                    <span className="badge badge-sm indicator-item">{cartData?.cartItems.length ?? 0}</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                  <div className="card-body">
                    <span className="text-lg font-bold">{cartData?.cartItems.length ?? 0} Product</span>
                    <span className="text-info">Subtotal: ${cartData?.totalAmount?? 0}</span>
                    <div className="card-actions">
                      <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-1 border-gray-400 bg-slate-200">
                  <div className="w-10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#4B77D1"><path d="M480-480.67q-66 0-109.67-43.66Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.28 45.3 30.54 14.42 48.96 41.81Q800-296.67 800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33ZM480-547.33q37 0 61.83-24.84Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33Zm0-86.67Zm0 407.33Z"/></svg>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li key={'Profile'}>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li  key={'Orders'}>
                    <Link to="/orders" className="justify-between">
                      Orders
                    </Link>
                  </li>
                  <li  key={'Cart2'}>
                    <Link to="/cart" className="justify-between">
                      Cart
                    </Link>
                  </li>
                  <li><button onClick={handleLogout} className="btn btn-ghost text-red-700 border-2 border-red-700">Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate('/login')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C">
                <path d="M480-144v-72h264v-528H480v-72h264q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H480Zm-72-168-51-51 81-81H144v-72h294l-81-81 51-51 168 168-168 168Z" />
              </svg>
              <span className='text-green-200'>Login</span>
            </button>
          )}
        </div>
      </div>
      {/* Desktop Design */}

      {/* Mobile Design */}
        <div className="flex sm:hidden navbar bg-base-100">
          <div className="drawer flex h-auto w-auto">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn btn-circle swap swap-flip ">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </div>
            <div className="drawer-side  z-50  top-20">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 rounded-br-lg w-56 text-xl ">
                <h2 className="menu-title text-2xl">Navigation</h2>
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/products'}>Products</Link></li>
                  <li>
                    <h3 className="menu-title text-xl text-slate-500">Categories</h3>
                    <ul>
                    {loading ? (
                    <p>...</p>
                    ) : (
                      <>
                      {categories && categories.map((category) => (
                        <li key={category.id * 10}>
                          <Link to={'/products/category/' + category.name} key={category.id *100}>{category.name}</Link>
                        </li>
                      ))}
                      </>
                    )}

                    </ul>
                  </li>
                  {isLoggedIn ? (
                    <>
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/cart'}>Cart</Link></li>
                    <li><Link to={'/orders'}>Orders</Link></li>

                    <li className='text-red-700 border-2 border-red-700 rounded-lg my-2 items-center'><button onClick={handleLogout}>Logout</button></li>
                    </>
                  ):(
                    <><li className='text-green-700 border-2 border-green-700 rounded-lg my-2 items-center'><Link to={'/login'}>Login</Link></li></>
                  )}

                </ul>
            </div>
          </div>
        <div className="flex-1 scale-75">
          <Link to="/" className="btn btn-ghost w-auto h-auto py-1 text-xl"> <img className='w-auto h-14' src={logo} alt="Logo" /></Link>
        </div>
        <div className="flex-none">



          {/* User Avatar ,Profile and Cart */}
          {isLoggedIn ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-1 border-gray-400 bg-slate-200">
                  <div className="w-10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#4B77D1"><path d="M480-480.67q-66 0-109.67-43.66Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.28 45.3 30.54 14.42 48.96 41.81Q800-296.67 800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33ZM480-547.33q37 0 61.83-24.84Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33Zm0-86.67Zm0 407.33Z"/></svg>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li key={'Profile'}>
                    <Link to="/profile" className="justify-between text-xl">
                      Profile
                    </Link>
                  </li>
                  <li  key={'Orders'}>
                    <Link to="/orders" className="justify-between text-xl">
                      Orders
                    </Link>
                  </li>
                  <li  key={'Cart'}>
                    <Link to="/cart" className="justify-between text-xl">
                      Cart
                    </Link>
                  </li>
                  <li><button onClick={handleLogout} className="btn btn-ghost text-red-700 border-2 border-red-700 mt-3">Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <button
              className="btn btn-primary scale-90"
              onClick={() => navigate('/login')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C">
                <path d="M480-144v-72h264v-528H480v-72h264q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H480Zm-72-168-51-51 81-81H144v-72h294l-81-81 51-51 168 168-168 168Z" />
              </svg>
              <span className='text-green-200'>Login</span>
            </button>
          )}
        </div>
      </div>
      {/* Mobile Design */}



    </header>

  );
};

export default Header;
