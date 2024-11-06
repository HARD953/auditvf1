import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  ContainerOutlined,
  CodepenCircleOutlined,
  UserOutlined,
  SettingOutlined,
  SendOutlined,

} from '@ant-design/icons';
import {useLocation, useNavigate } from 'react-router-dom';
// import logo_lanfia from 'src/assets/images/lanfiatech_main.png';
import logo_audit from 'src/assets/images/logo_audit_2.png';

import "src/assets/css/sidebar.css"
import { main_app_path } from 'src/router';
import { useSelector } from 'react-redux';
import { Image } from 'primereact/image';
import { attacheImageUrl } from 'src/api/axiosInstance';
import house_img from "src/images/House_1.png";

const { Sider } = Layout;



export default function SidebarApp({collapsed,loginInfo}){
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.data)

  
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


  const itemsSidebar = [
    getItem("Accueil", `${main_app_path}/accueil`, <DesktopOutlined />),
    getItem(
      "Supports publicitaires",
      `${main_app_path}/supports`,
      <ContainerOutlined />
    ),

    !!userInfo?.is_lanfia &&
      getItem(
        "Affectation agents",
        `${main_app_path}/affectations`,
        <SendOutlined />
      ),
    !!userInfo?.is_lanfia &&
      getItem(
        "Utilisateurs lanfiatech",
        `${main_app_path}/utilisateurs-lanfiatech`,
        <UserOutlined />
      ),
    !!userInfo?.is_lanfia &&
      getItem(
        "Agents recenseurs",
        `${main_app_path}/utilisateurs-recenseurs`,
        <UserOutlined />
      ),

    getItem(
      "Utilisateurs Entreprises",
      `${main_app_path}/utilisateurs-entreprises`,
      <UserOutlined />
    ),
    getItem(
      "Carte des supports",
      `${main_app_path}/cartographie`,
      <CodepenCircleOutlined />
    ),
    // getItem("Statistiques", `${main_app_path}/statistiques`, <LineChartOutlined />),
    !!userInfo?.is_lanfia &&
      getItem("Parametres", `${main_app_path}/parametres`, <SettingOutlined />),
    // getItem("Documentation", `${main_app_path}/documentation`, <ContainerOutlined />),
  ];

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  console.log("loginInfo ;;;", loginInfo);
 
  return (
    <Sider
      className="shadow sidebar-lanfiatech"
      trigger={null}
      width={250}
      collapsible
      collapsed={collapsed}
    >
      <div className="sidebar-lanfiatch-logo-container rounded">
        <img
          src={logo_audit}
          alt="Auditvisibilite Logo"
          className="img-fluid"
          z
        />
        <div className="text-dark ">
          <h4
            style={{ color: "var(--color-lanfia-primary-2)" }}
            className="fw-bold h4 "
          >
            Audit de Visibilité
          </h4>
        </div>
        <div
          className="text-white rounded border border-info py-3 sidebar-lanfiatech-entreprise"
        >
          {
            <Image
              src={`${
                !!loginInfo?.profile_image
                  ? attacheImageUrl(loginInfo?.profile_image)
                  : house_img
              }`}
              alt={`Image entreprise}`}
              width="100"
              preview
              imageClassName="img-fluid shadow rounded-pill my-0"
            />
          }
          <h6 className="fw-bolder text-uppercase  my-0 mt-2">
            {loginInfo?.entreprise}
          </h6>
        </div>
      </div>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        theme="light"
        className="sidebar-lanfiatch-menu"
        mode="inline"
        onSelect={(event) => handleMenuItemClick(event?.key)}
        items={itemsSidebar}
      />
    </Sider>
  );
};

