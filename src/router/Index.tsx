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
import { PrivateApp } from "./PrivateApp";
import NotFound from "../views/NotFound";

import NotAuthorized from "../views/NotAuthorized";
import { getAuthRol } from "../utils/auth";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>

      <>
        <Route
          path="/home"
          element={
            <PrivateApp>
              <HomePrivate />
            </PrivateApp>
          }
        ></Route>
        <Route
          path="/product/:id"
          element={
            <PrivateApp>
              <ProductsClient />
            </PrivateApp>
          }
        ></Route>
        <Route
          path="/shopping/cart"
          element={
            <PrivateApp>
              {" "}
              <ShopingCart />
            </PrivateApp>
          }
        ></Route>
        <Route
          path="/categorie"
          element={
            getAuthRol() === "cliente" || getAuthRol() === "bodega" ? (
              <PrivateApp>
                <NotAuthorized />
              </PrivateApp>
            ) : (
              <PrivateApp>
                <Categorie />
              </PrivateApp>
            )
          }
        ></Route>
        <Route
          path="/products"
          element={
            getAuthRol() === "cliente" || getAuthRol() === "bodega" ? (
              <PrivateApp>
                <NotAuthorized />
              </PrivateApp>
            ) : (
              <PrivateApp>
                {" "}
                <Products />
              </PrivateApp>
            )
          }
        ></Route>
        <Route
          path="/details"
          element={
            getAuthRol() === "cliente" || getAuthRol() === "venta" ? (
              <PrivateApp>
                <NotAuthorized />
              </PrivateApp>
            ) : (
              <PrivateApp>
                {" "}
                <DetailsProducts />
              </PrivateApp>
            )
          }
        ></Route>
        <Route
          path="/user"
          element={
            getAuthRol() === "cliente" ||
            getAuthRol() === "bodega" ||
            getAuthRol() === "venta" ? (
              <PrivateApp>
                <NotAuthorized />
              </PrivateApp>
            ) : (
              <PrivateApp>
                {" "}
                <User />
              </PrivateApp>
            )
          }
        ></Route>
      </>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Index;
