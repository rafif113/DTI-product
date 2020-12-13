import BaseService from './baseService';
import API from '../config/rest';

const login = (username, password) => {
  return BaseService.post(API.LOGIN, { username, password });
};

const getProduct = (search, limit, offset) => {
  return BaseService.get(API.PRODUCT, {
    params: {
      limit,
      offset,
      search,
    },
  });
};

const getProductId = (productId) => {
  return BaseService.get(API.PRODUCTID(productId));
};

export default { login, getProduct, getProductId };
