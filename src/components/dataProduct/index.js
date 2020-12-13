import React, { useState, useEffect } from 'react';
import { authService } from '../../services';
import Pagination from './pagination';
import { Link } from 'react-router-dom';

const DataProduct = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(9);

  useEffect(() => {
    const getProduct = () => {
      authService
        .getProduct(search, productPerPage, currentPage)
        .then((res) => {
          console.log(res);
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getProduct();
  }, [search, productPerPage, currentPage]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Card = () => {
    return (
      <div className="row">
        {currentProduct.map((data) => {
          return (
            <div className="col-md-4 col-sm-12 mb-3" key={data.id}>
              <div className="card">
                {data.variants.map((image, req) => {
                  return (
                    <div key={req}>
                      {image.images.slice(0, 1).map((gambar, img) => {
                        return (
                          <div key={img}>
                            <img
                              src={gambar.original_url}
                              className="card-img-top"
                              aria-hidden
                              alt="Responsive image"
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                <div className="card-body">
                  <h5 className="card-title">{data.name}</h5>
                  <p className="card-text">{data.description}</p>
                  <h5
                    className="card-text text-danger"
                    style={{ textDecoration: 'line-through' }}
                  >
                    {data.display_normal_price}
                  </h5>
                  <h5 className="card-text">{data.display_price}</h5>
                  <Link to={`/product/${data.id}`}>
                    <h5 className="btn btn-primary">Detail Product</h5>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-md-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Keyword"
                autoComplete="off"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <input className="btn btn-primary" type="submit" disabled />
            </div>
          </form>
        </div>
      </div>
      <Card />
      <Pagination
        productPerPage={productPerPage}
        totalProduct={20}
        paginate={paginate}
      />
    </div>
  );
};

export default DataProduct;
