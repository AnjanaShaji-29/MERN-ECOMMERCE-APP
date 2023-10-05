import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}` // Fetching the products by category
            : "http://localhost:5000/api/products"  // Fetching all products
        );
        setProducts(res.data); // Setting the 'products' 
      } catch (err) {} // Error
    };
    getProducts(); // Calling the getProducts function
  }, [cat]); // Adding  category dependency 

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => // Filtering the products
          Object.entries(filters).every(([key, value]) => 
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]); // Adding products, cat & filters dependency

  useEffect(() => {
    if (sort === "newest") { 
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt) // Sorting by newest first
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price) // Sorting in ascending order by price
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)  // Sorting in descending order by price
      );
    }
  }, [sort]); // Adding sort dependecy

  return (
    <Container>
      {cat 
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;