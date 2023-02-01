import { useEffect, useState } from "react";
import {
  getShoppingCart,
  deleteShoppingCart,
  setShoppingCart,
} from "../../utils/shoppingCart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ShoppingCartTable from "./ShoppingCartTable";
import clienteAxios from "../../config/ClienteAxios";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState(getShoppingCart());

  const [stateTotal, setStateTotal] = useState(0);
  const [menuContext, setMenuContext] = useState({
    popup: {
      record: [],
      visible: false,
      x: 0,
      y: 0,
    },
  });
  const [stateRecord, setStateRecord] = useState({});

  const [stateOpenModal, setStateOpenModal] = useState({
    vidible: false,
    title: "",
  });

  const totalFunction = () => {
    let total = 0;
    dataSource.forEach((f) => {
      let sum = parseInt(f.amount) * parseInt(f.price);
      total = total + sum;
    });

    setStateTotal(total);
  };

  useEffect(() => {
    totalFunction();
  }, []);

  const buyProducts = async () => {
    Swal.fire({
      title: "Estas seguro que desea comprar",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await clienteAxios.post("/shopee", dataSource);

          console.log(res.data);

          Swal.fire({
            title: ":)",
            text: res.data.msg,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }

        deleteShoppingCart();

        navigate("/");
      } else if (result.isDenied) {
        Swal.fire("No se ha comprado nada", "", "info");
      }
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

  const editShoppeCart = (record) => {
    const edit = getShoppingCart();
    console.log(edit);

    let editFilter = edit.filter((f) => f.id !== stateRecord.id);

    let variable = {
      ...stateRecord,
      amount: record.amount,
    };

    editFilter.push(variable);

    setShoppingCart(editFilter);
    setDataSource(editFilter);
    setStateOpenModal({
      vidible: false,
      title: "",
    });
  };

  const deleteShoppeCart = () => {
    const edit = getShoppingCart();

    let editFilter = edit.filter((f) => f.id !== stateRecord.id);

    setShoppingCart(editFilter);
    setDataSource(editFilter);
    if (edit.length === 1) {
      navigate("/");
      deleteShoppingCart();
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <ShoppingCartTable
        buyProducts={buyProducts}
        dataSource={dataSource}
        stateTotal={stateTotal}
        menuContext={menuContext}
        stateRecord={stateRecord}
        onRow={onRow}
        editShoppeCart={editShoppeCart}
        setStateOpenModal={setStateOpenModal}
        stateOpenModal={stateOpenModal}
        deleteShoppeCart={deleteShoppeCart}
      />
    </div>
  );
};

export default ShoppingCart;
