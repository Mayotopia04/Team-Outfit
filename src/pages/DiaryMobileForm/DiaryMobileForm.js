import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import DatePicker from 'components/DatePicker';
import DiaryAddModalBtn from 'components/DiaryAddModal/DiaryAddModalBtn';
import DiaryAddModal from 'components/DiaryAddModal';
import DiaryProductsList from 'components/DiaryProductsList';
import DairyProductForm from 'components/DiaryProductForm';
import APIs from 'services/API/API';
import { productSchema } from 'services/validation/productSchema';
import s from './Diary.module.css';

export default function Diary() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    toast.dismiss();
    toast.info(errors.weight?.message);
  }, [errors.weight?.message]);

  const [searchParams] = useSearchParams();
  const choosenDate = searchParams.get('date') || new Date();
  const { dailyRate, setDailyRate } = useOutletContext();

  const userEatenProducts = dailyRate?.eatenProducts;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [date, setDate] = useState(new Date(choosenDate));
  const [eatenProducts, setEatenProducts] = useState([]);
  const [isDeliting, setIsDeliting] = useState(null);

  const normalizedDate = date.toLocaleDateString('en-CA').replaceAll('/', '-');

  useEffect(() => {
    setEatenProducts(userEatenProducts);
  }, [userEatenProducts]);

  const handleAddProductOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddProductClose = () => {
    setAddModalOpen(false);
  };

  const handleDeleteProduct = async deleteId => {
    const dayId = dailyRate.id;
    setIsDeliting(deleteId);
    try {
      const { data } = await APIs.deleteEatenProductRequest(dayId, deleteId);
      setDailyRate(prev => ({
        ...prev,
        daySummary: data?.newDaySummary,
        kcalLeft: data?.newDaySummary?.kcalLeft,
      }));
      setEatenProducts(prev => prev.filter(product => product.id !== deleteId));
      setIsDeliting(null);
    } catch (error) {
      // Handle error appropriately
    }
  };

  return (
    <>
      {!addModalOpen && (
        <div className={s.diaryBox}>
          <div className={s.productContainer}>
            <DatePicker date={date} setDate={setDate} />

            <div className={s.dairyAddProduct}>
              <DairyProductForm
                {...{
                  register,
                  handleSubmit,
                  reset,
                  normalizedDate,
                  watch,
                  setEatenProducts,
                }}
              />
            </div>

            <DiaryProductsList
              products={eatenProducts}
              handleDeleteProduct={handleDeleteProduct}
              isDeliting={isDeliting}
            />

            {eatenProducts?.length > 0 && <div className={s.gradient} />}
            <div className={s.dairyAddModalWrap}>
              <DiaryAddModalBtn
                type={'button'}
                onClick={handleAddProductOpen}
              />
            </div>
          </div>
        </div>
      )}
      {addModalOpen && (
        <DiaryAddModal
          handleClose={handleAddProductClose}
          handleDeleteProduct={handleDeleteProduct}
          {...{
            register,
            handleSubmit,
            reset,
            normalizedDate,
            watch,
            setEatenProducts,
          }}
        />
      )}
    </>
  );
}
