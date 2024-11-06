import React, { useRef } from 'react';
import { Layout, Button,Space } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,

} from '@ant-design/icons';
import { Avatar } from 'primereact/avatar';

import { Menu } from 'primereact/menu';
import "src/assets/css/headerApp.css"


const { Header } = Layout;




function HeaderApp({collapsed,toggleSidebar,menuProps,loginInfo}) {
  const menu = useRef(null);

    return (
      <Header
        className="shadow header-app-audit"
        style={{
          position: "fixed",
          top: 0,
          left: collapsed ? "80px" : "250px",
          right: 0,
          zIndex: 999,
          padding: 0,
          // backgroundColor: ' var(--color-lanfia-primary-2)', // Remplacez par la couleur souhaitée
          // borderBottom: '3px solid var(--color-lanfia-primary-3)',
          transition: "left 0.1s ease-in-out",
        }}
      >
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined  />
            ) : (
              <MenuFoldOutlined  />
            )
          }
          onClick={toggleSidebar}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            color: "white",
          }}
        />
        <Space
          wrap
          className="mr-2"
          style={{
            float: "right",
            marginRight: 15,
            position: "relative",
            top: "-60px",
          }}
        >
          <Menu popup ref={menu} id="popup_menu_audit" model={menuProps} />
          <div
            onClick={(e) => menu.current.toggle(e)}
            className="header-dropdown-inner"
          >
            <p className="header-dropdown-inner-username">
              {" "}
              {`${loginInfo?.first_name} ${loginInfo?.last_name}`}{" "}
            </p>
            <Avatar
              size="large"
              icon="pi pi-user"
              className="shadow header-dropdown-inner-avatar"
              shape="circle"
            />
          </div>
        </Space>
      </Header>
    );
}

export default HeaderApp;