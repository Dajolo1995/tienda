import React from "react";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import { getShoppingCart } from "../utils/shoppingCart";
import ShoppingCart from "../components/shopping/ShoppingCart";

const ShopingCart = () => {
  return (
    <>
      {getShoppingCart() === undefined || getShoppingCart() === null ? (
        <> </>
      ) : (
        <LayoutPrivate>
          <ShoppingCart />
        </LayoutPrivate>
      )}
    </>
  );
};

export default ShopingCart;
