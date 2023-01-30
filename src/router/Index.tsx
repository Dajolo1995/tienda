import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePrivate from "../views/HomePrivate";
import ProductsClient from "../views/ProductsClient";
import ShopingCart from "../views/ShopingCart";
import Categorie from "../views/Categorie";
import Products from "../views/Products";
import DetailsProducts from "../views/DetailsProducts";
import User from "../views/User";
import Auth from "../views/Auth";

import NotAuthorized from "../views/NotAuthorized";
import { getAuthRol } from "../utils/auth";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>
      <Route path="/home" element={<HomePrivate />}></Route>
      <Route path="/product/:id" element={<ProductsClient />}></Route>
      <Route path="/shopping/cart" element={<ShopingCart />}></Route>
      <Route
        path="/categorie"
        element={
          getAuthRol() === "cliente" || getAuthRol() === "bodega" ? (
            <NotAuthorized />
          ) : (
            <Categorie />
          )
        }
      ></Route>
      <Route
        path="/products"
        element={
          getAuthRol() === "cliente" || getAuthRol() === "bodega" ? (
            <NotAuthorized />
          ) : (
            <Products />
          )
        }
      ></Route>
      <Route
        path="/details"
        element={
          getAuthRol() === "cliente" || getAuthRol() === "venta" ? (
            <NotAuthorized />
          ) : (
            <DetailsProducts />
          )
        }
      ></Route>
      <Route
        path="/user"
        element={
          getAuthRol() === "cliente" ||
          getAuthRol() === "bodega" ||
          getAuthRol() === "venta" ? (
            <NotAuthorized />
          ) : (
            <User />
          )
        }
      ></Route>
    </Routes>
  );
};

export default Index;
