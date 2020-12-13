export default {
  LOGIN: '/login',
  USERBYID: (userId) => {
    return `users/${userId}`;
  },
  PRODUCT: '/product',
  PRODUCTID: (productId) => {
    return `/product/${productId}`;
  },
};
