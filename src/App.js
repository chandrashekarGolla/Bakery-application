import './App.css';
import Biscuits from './components/Biscuits/Biscuits';
import Cakes from './components/Cakes/PlainCakes'
import Chocolates from './components/Chocolates/Chocolates';
import Cupcakes from './components/Cupcakes/Cupcakes';
import Icecreams from './components/Icecreams/Icecreams';
import RootLayout from './components/RootLayout';
// import ThemedCakes from './components/ThemedCakes/ThemedCakes';
import Pastries from './components/Pastries/Pastries';
import Login from './components/Login/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AlmondCookies from './components/Biscuits/AlmondCookies';
import KarachiCookies from './components/Biscuits/KarachiCookies';
import NutellaCookies from './components/Biscuits/NutellaCookies';
import Brookies from './components/Biscuits/Brookies';
import Price from './components/Price/Price';
import Home from './components/Home';
import Register from './components/Register/Register';
import CartItems from './components/Cart/CartItems';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/cartItems',
          element: <CartItems />
        },
        {
          path:'price/:id',
          element:<Price/>
        },
       
        {
          path: '/biscuits',
          element: <Biscuits/>,
          children: [
            {
              path: '/biscuits/brookies',
              element: <Brookies />
            },
            {
              path: '/biscuits/almondCookies',
              element: <AlmondCookies />
            },
            {
              path: '/biscuits/karachiCookies',
              element: <KarachiCookies />
            },
            {
              path: '/biscuits/nutellaCookies',
              element: <NutellaCookies />
            }
          ]
        },
        {
          path: '/cakes',
          element: <Cakes/>,
        },
        {
          path: '/chocolates',
          element: <Chocolates />
        },

        {
          path: '/icecreams',
        element: <Icecreams />
        },
        {
          path: '/pastries',
          element: <Pastries />
        }, {
          path: '/cupcakes',
          element: <Cupcakes />
        }

      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <ImagesContext.Provider value={imagesinfo}>
      <Biscuits />
      <Chocolates />
      <Icecreams />
    </ImagesContext.Provider> */}
    </div>
  );
}

export default App;

