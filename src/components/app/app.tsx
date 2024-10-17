import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

// import components
import { AppHeader } from '@components';
import { Feed } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { ConstructorPage } from '@pages';

import { Modal } from '@components'
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';

import { ProtectedRoute } from '../protected-route/protected-route';



const App = () => {
  const location = useLocation()
  // console.log(location);
  
  const background = location.state?.background || location

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background}>
          <Route path='/' element={<ConstructorPage />}/>
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
          <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
          <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
          <Route path='/*' element={<ProtectedRoute><NotFound404 /></ProtectedRoute>} />
        </Routes>

        {location.state?.background && (
          <Routes>
            <Route path='/feed/:number' element={<Modal children={<OrderInfo />} title={'Заказ'} onClose={() => {}} />} />
            <Route path='/ingredients/:id' element={<Modal children={<IngredientDetails />} title={'Детали ингредиента'} onClose={() => {}} />} />
            <Route path='/profile/orders/:number' element={<ProtectedRoute><Modal children={<OrderInfo />} title={'Заказ'} onClose={() => {}} /></ProtectedRoute>} />
          </Routes>
        )}
      </div>
    </>
  )
};

export default App;
