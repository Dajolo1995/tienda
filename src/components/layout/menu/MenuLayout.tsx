import {
  GroupOutlined,
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { getAuthRol } from "../../../utils/auth";
import { useTranslation } from "react-i18next";

// #1677FF

const MenuLayout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Menu style={{ borderRight: 0, background: "#000" }}>
      <Menu.Item
        className={location.pathname === "/home" ? "btn-menus" : "btn-menu"}
        onClick={() => navigate("/home")}
        key="1"
        icon={<HomeOutlined />}
      >
        Home
      </Menu.Item>

      {getAuthRol() === "cliente" ? null : (
        <>
          {getAuthRol() === "bodega" ? null : (
            <>
              <Menu.Item
                className={
                  location.pathname === "/categorie" ? "btn-menus" : "btn-menu"
                }
                onClick={() => navigate("/categorie")}
                key="2"
                icon={<GroupOutlined />}
              >
                {t("Category")}
              </Menu.Item>
              <Menu.Item
                className={
                  location.pathname === "/products" ? "btn-menus" : "btn-menu"
                }
                onClick={() => navigate("/products")}
                key="3"
                icon={<HomeOutlined />}
              >
                {t("Products")}
              </Menu.Item>
            </>
          )}

          {getAuthRol() === "venta" ? null : (
            <>
              {getAuthRol() === "bodega" ? null : (
                <Menu.Item
                  className={
                    location.pathname === "/user" ? "btn-menus" : "btn-menu"
                  }
                  onClick={() => navigate("/user")}
                  key="3"
                  icon={<UserOutlined />}
                >
                  {t("User")}
                </Menu.Item>
              )}

              <Menu.Item
                className={
                  location.pathname === "/details" ? "btn-menus" : "btn-menu"
                }
                onClick={() => navigate("/details")}
                key="3"
                icon={<ShoppingOutlined />}
              >
                {t("productDetail")}
              </Menu.Item>
            </>
          )}
        </>
      )}
    </Menu>
  );
};

export default MenuLayout;
