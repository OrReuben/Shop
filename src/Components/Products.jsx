import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import './Products.css'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

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
      const products_url = cat
        ? `http://localhost:5000/api/products?category=${cat}`
        : "http://localhost:5000/api/products";
      try {
        setLoading(true);
        const res = await axios.get(products_url);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

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
      ? setFilteredProducts(products.slice(0, 8))
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
          Loading...
        </Container>
      ) : (
        <Container>
          <>
            {currentPosts.map((item) => (
              <Product item={item} key={item._id} />
            ))}
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
