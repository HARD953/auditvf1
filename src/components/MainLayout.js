import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLoginInfos, logoutUser } from 'src/api/users';
import ShowUserProfile from './dialogs/showUserProfile';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';


import HeaderApp from './Header';
import SidebarApp from './SidebarApp';

import "src/assets/css/sidebar.css"
import { auditValue } from 'src/api/axiosInstance';
import { useDispatch } from 'react-redux';
import { putUserInfo } from 'src/redux/slices/userInfoSlice';


const {Content } = Layout;


const MainLayout = ({children}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [visible,setVisible] = useState(false)
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["login-infos"],
    queryFn: getLoginInfos,
    onSuccess: (data) => {
      console.log("connected user :",data)
      alert("cococh")
    },
    onError: (err) => {
      console.error(err);
      // setVisibleError(true)
    },
  });

  const mutationLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess : ()=>{
      // localStorage.removeItem('accessToken-audit-visibility');
      
      queryClient.clear()
      localStorage.clear();
      navigate('/')
    },
    onError: (err) => {
        console.error(err)
        // setVisibleError(true)
    }
})


  const loginInfos =  !!data?.length ? data[0]: {}

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    mutationLogout.mutate() 
  }
 

  const menuProps = [
    {
      label: 'Mon profil',
      icon: 'pi pi-user', 
      command: ()=>{
        setVisible(true)
      }
    },
    {
      label: 'Changer mot de passe',
      icon: 'pi pi-lock', 
      disabled: true, 
      command: ()=>{
        
      }
    },
    {
        separator: true
    },
    {
        label: 'Déconnexion',
        icon: 'pi pi-fw pi-power-off',
        className:"item-deconnexion",
        labelClassName:"item-deconnexion", 
        command: ()=>{
          confirm()
        }
    }
  ]


  const footer = ({reject}) => {
    return(
      <div className='d-flex-justify-content-between align-items-center'>
        <Button
          onClick={reject}
          className="px-5 rounded-pill"
          label="Non"
        />
        <Button
          loading={mutationLogout?.isPending}
          onClick={handleLogout}
          className="px-5 p-button-danger ms-4 rounded-pill"
          label="Oui"
      />
      </div>
    )
  }


  const confirm = () => {
    confirmDialog({
        contentClassName:'fw-bolder',
        headerClassName:"text-danger",
        message: 'Etes-vous sûr de vouloir vous déconnecter ?',
        header: 'Confirmation Déconnexion',
        icon: 'pi pi-info-circle',
        position:"top",
        footer:footer
    });
};

useEffect(() => {
  if(!!((Object.keys(data??{})).length)){
    const loginInfos = !!data?.length ? data[0] : {};
    const auditId = loginInfos.is_lanfia ? auditValue : "0928DJJD73992DB";
    localStorage.setItem("auditID", auditId);
    dispatch(putUserInfo(loginInfos));
  }
  else{
    localStorage.setItem("auditID", "092983HDIDH839HS");
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [data]);
 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarApp 
        loginInfo={loginInfos}
        collapsed={collapsed} />
      <HeaderApp 
        loginInfo={loginInfos}
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        menuProps={menuProps}
      />
      <Content
        style={{
          paddingLeft: collapsed ? '140px' : '300px',
          paddingRight: '50px',
          paddingTop: '90px',
          minHeight: 'calc(100vh - 70px)',
          background: 'rgba(255, 255, 255,1)',
          overflow: 'visible',
        }}
      >
        <Outlet />
      </Content>
      <ConfirmDialog />
      <ShowUserProfile
        visible={visible}
        setVisible={setVisible}
        data={loginInfos}
      />
    </Layout>
  );
};

export default MainLayout;
