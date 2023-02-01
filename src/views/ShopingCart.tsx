import React from "react";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import { getShoppingCart } from "../utils/shoppingCart";
import ShoppingCart from "../components/shopping/ShoppingCart";
import NotFound from "./NotFound";

const ShopingCart = () => {
  return (
    <LayoutPrivate>
      {getShoppingCart() === undefined || getShoppingCart() === null ? (
        <NotFound />
      ) : (
        <ShoppingCart />
      )}
    </LayoutPrivate>
  );
};

export default ShopingCart;
