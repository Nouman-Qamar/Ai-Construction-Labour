import { useState } from "react";
import "./App.css";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import HeaderPage from "./Components/Header/header";
import Sidebar from "./Components/Sidebar/sidebar";


import { BrowserRouter, Routes, Route } from "react-router-dom";


import DashboardOverview from "./components/Dashboard-Page/landing";
import ClientProfilePage from "./components/Profile/profile";


const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">
          <Sidebar />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
          />
          <hr />
        </Sider>

        <Layout>
          <Header className="header">
            <HeaderPage />
          </Header>

          <Content className="content">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              
              <Route path="/Client/profile" element={<ClientProfilePage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    
  );
}

export default App;
