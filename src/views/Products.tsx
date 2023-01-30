import React, { useEffect, useState } from "react";
import clienteAxios from "../config/ClienteAxios";
import ProductContent from "../components/product/ProductContent";

const Products = () => {
  const [menuContext, setMenuContext] = useState({
    popup: {
      record: [],
      visible: false,
      x: 0,
      y: 0,
    },
  });
  const [stateOpenModal, setStateOpenModal] = useState({
    vidible: false,
    title: "",
  });
  const [stateRecord, setStateRecord] = useState({});
  const [dataSource, setDataSource] = useState([] as any);
  const [products, setProducts] = useState([] as any);
  const [stateInput, setStateInput] = useState("");

  const getProducts = async () => {
    try {
      const res = await clienteAxios.get("/product");

      setProducts(res.data.products);
      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setStateRecord({});
    setStateOpenModal({
      vidible: true,
      title: "Crear Categoria",
    });
  };

  const closeModal = () => {
    getProducts();
    setStateRecord({});
    setStateOpenModal({
      vidible: false,
      title: "",
    });
  };

  const onRow = (record: any) => ({
    onContextMenu: (event: any) => {
      event.preventDefault();
      if (!menuContext.popup.visible) {
        document.addEventListener(`click`, function onClickOutside() {
          setMenuContext({
            popup: { record: [], visible: false, x: 0, y: 0 },
          });
          document.removeEventListener(`click`, onClickOutside);
        });
      }
      setMenuContext({
        popup: {
          record,
          visible: true,
          x: event.clientX,
          y: event.clientY,
        },
      });

      setStateRecord(record);
    },
  });

  const onSearch = (value) => {
    let filters;

    let copia = [...products];
    if (value.lenght === 0) {
      filters = copia;
    } else {
      filters = copia.filter(
        (u) =>
          u.id === value ||
          u.idCategory.toLowerCase().includes(value.toLowerCase()) ||
          u.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setDataSource(filters);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setDataSource(products);
  }, [products]);

  useEffect(() => {
    onSearch(stateInput);
  }, [stateInput]);

  return (
    <ProductContent
      dataSource={dataSource}
      openModal={openModal}
      onRow={onRow}
      stateOpenModal={stateOpenModal}
      closeModal={closeModal}
      stateRecord={stateRecord}
      menuContext={menuContext}
      setStateOpenModal={setStateOpenModal}
      setStateInput={setStateInput}
    />
  );
};

export default Products;
