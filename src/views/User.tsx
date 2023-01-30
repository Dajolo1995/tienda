import React, { useEffect, useState } from "react";

import clienteAxios from "../config/ClienteAxios";
import UserContent from "../components/user/UserContent";

const User = () => {
  //State
  const [stateUser, setUserState] = useState([] as any);
  const [dataSource, setDataSource] = useState([] as any);
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

  const [stateInput, setStateInput] = useState("");

  //Peticion api
  const getUser = async () => {
    try {
      const res = await clienteAxios.get("/user");
      setUserState(res.data.usuario);
      return res.data.usuario;
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (value) => {
    let filters;

    let copia = [...stateUser];
    if (value.lenght === 0) {
      filters = copia;
    } else {
      filters = copia.filter(
        (u) =>
          u.id === value ||
          u.email.toLowerCase().includes(value.toLowerCase()) ||
          u.nickName.toLowerCase().includes(value.toLowerCase()) ||
          u.name.toLowerCase().includes(value.toLowerCase()) ||
          u.phone.toLowerCase().includes(value.toLowerCase()) ||
          u.rol.toLowerCase().includes(value.toLowerCase())
      );
    }
    setDataSource(filters);
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
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setDataSource(stateUser);
  }, [stateUser]);

  useEffect(() => {
    onSearch(stateInput);
  }, [stateInput]);

  return (
    <UserContent
      onRow={onRow}
      setStateInput={setStateInput}
      dataSource={dataSource}
      setStateOpenModal={setStateOpenModal}
      stateRecord={stateRecord}
      menuContext={menuContext}
    />
  );
};

export default User;
