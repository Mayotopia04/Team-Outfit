import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Modal from './Modal';
import Button from 'components/Shared/Button';

export const App = () => {

  return (
    <>
      <Header />
      <UserRoutes />
      <Modal children={
        <Button
          text="Start losing weight"
          type="button"
          btnClass="btn"
        />}/>
    </>
  );
};
