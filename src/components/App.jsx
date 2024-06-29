import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Modal from './Modal';
import FoodModal from './Modal/FoodModal';

export const App = () => {

  return (
    <>
      <Header />
      <UserRoutes />
      <Modal children={<FoodModal/>}/>
    </>
  );
};
