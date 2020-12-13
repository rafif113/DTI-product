import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authService } from '../../services';

const DetailProduct = () => {
  const [productId, setProductId] = useState([]);
  const [isDataLoading, setDataLoading] = useState(false);
  const params = useParams();
  const { getProductId } = params;

  useEffect(() => {
    setDataLoading(true);
    authService
      .getProductId(getProductId)
      .then((res) => {
        console.log(res);
        setProductId(res.data);
      })
      .catch((err) => {
        return console.log(err);
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [getProductId]);

  return <div>Product DETAIL</div>;
};

export default DetailProduct;
