import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import {useEffect} from "react";  
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import './shop.styles.scss';
import { useDispatch } from 'react-redux';
import { setCategoriesArray } from '../../store/categories/category.action';

const Shop = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    const getCategoriesArray =  async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategoriesArray(categoriesArray))
    }

    getCategoriesArray()
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;