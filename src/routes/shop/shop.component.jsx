import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import {useEffect} from "react";  
import './shop.styles.scss';
import { useDispatch } from 'react-redux';
import { fetchCategoriesStartAsync } from '../../store/categories/category.action';

const Shop = () => {
  const dispatch = useDispatch()

  useEffect( () => {
      dispatch(fetchCategoriesStartAsync())
    }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;