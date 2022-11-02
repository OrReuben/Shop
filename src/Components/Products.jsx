import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import "./Products.css";
import Loader from "./Loader";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const location = useLocation();

  const Paginate = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    const getProducts = async () => {
      const products_url = cat ? `products?search=${cat}` : "products";
      try {
        setLoading(true);
        const res = await publicRequest(products_url);
        if (res.data) {
          setProducts(res.data);
          setLoading(false);
          if (products.length > 0) {
            setError(false);
          } else setError(true);
        }
      } catch (err) {}
    };
    getProducts();
  }, [cat, products.length]);

  useEffect(() => {
    filters
      ? setFilteredProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        )
      : location.pathname === "/"
      ? setFilteredProducts(products.slice(0, 12))
      : setFilteredProducts(products);
  }, [filters, products, location]);

  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <>
      {loading ? (
        <Container>
          <Loader />
        </Container>
      ) : (
        <Container>
          <>
            {!error ? (
              currentPosts.map((item) => <Product item={item} key={item._id} />)
            ) : (
              <div>No products found..</div>
            )}
          </>
          {location.pathname === "/" ? null : (
            <div>
              <Pagination
                auctions={filteredProducts.length}
                postsPerPage={postsPerPage}
                Paginate={Paginate}
              />
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default Products;
