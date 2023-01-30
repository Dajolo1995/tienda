import Head from "../header/Head";
import { Layout, theme } from "antd";
import MenuLayout from "./menu/MenuLayout";

const { Header, Content, Footer, Sider } = Layout;

const LayoutPrivate = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#000",
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "#515151",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "cursive",
          }}
        >
          DIVA MARKET
        </div>

        <MenuLayout />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          style={{
            padding: 0,
            background: "#f9f9f9",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <Head />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial", minHeight:"80vh" }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutPrivate;
