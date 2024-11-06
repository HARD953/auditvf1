import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Upload, message,Row,Col, Card, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import "./Utilisateurs.css"
const UtilisateursOld = () => {
  const [usersData, setUsersData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({}); // Utilisateur sélectionné pour la mise à jour
  const [profileImageFile, setProfileImageFile] = useState(null); // État local pour stocker le fichier d'image
  const [userDataLoaded, setUserDataLoaded] = useState(false); // État pour suivre si les données des utilisateurs ont été chargées
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm(); // Créez une instance de formulaire


  const fetchData = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/users/');
      const data = await response.json();
      setUsersData(data.results);
      setUserDataLoaded(true); // Marquez les données des utilisateurs comme chargées
    } catch (error) {
      console.error('Erreur lors de la récupération des données des utilisateurs : ', error);
    }
  };

  useEffect(() => {
    if (!userDataLoaded) {
      fetchData(); // Chargez les données des utilisateurs lors du montage initial
    }
  }, [userDataLoaded]);

  const handleOpenModal = (user) => {
    setSelectedUser(user); // Mettez à jour selectedUser après avoir ouvert le modal
    setIsModalOpen(true);
  };
  


  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setIsCreateModalOpen(false);
  };

  const handleUpdateUser = async (values) => {
    try {
      if (profileImageFile) {
        // Si un fichier d'image a été téléchargé, supprimez l'ancienne image de profil du serveur
        await fetch(`https://auditapi.up.railway.app/api/users/${selectedUser.id}/delete_profile_image/`, {
          method: 'POST',
        });
  
        // Puis envoyez la nouvelle image
        const formData = new FormData();
        formData.append('profile_image', profileImageFile);
  
        const imageResponse = await fetch(`https://auditapi.up.railway.app/api/users/${selectedUser.id}/upload_profile_image/`, {
          method: 'POST',
          body: formData,
        });
  
        if (!imageResponse.ok) {
          console.error('Erreur lors du téléchargement de la nouvelle image de profil.');
          message.error('Erreur lors de la mise à jour de l\'utilisateur');
          return;
        }
      }
  
      // Ensuite, mettez à jour les autres informations de l'utilisateur
      const response = await fetch(`https://auditapi.up.railway.app/api/users/${selectedUser.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const updatedUserData = [...usersData];
        const userIndex = updatedUserData.findIndex((user) => user.id === selectedUser.id);
        updatedUserData[userIndex] = { ...selectedUser, ...values };
        setUsersData(updatedUserData);
        setIsModalOpen(false);
        message.success('Utilisateur mis à jour avec succès');
      } else {
        console.error('Erreur lors de la mise à jour de l\'utilisateur.');
        message.error('Erreur lors de la mise à jour de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur : ', error);
      message.error('Erreur lors de la mise à jour de l\'utilisateur');
    }
  };

  const handleCreateUser = async (values) => {
    try {
      const formData = new FormData(); // Créez un objet FormData pour envoyer des données multipart/form-data
  
      // Itérez sur les valeurs du formulaire et ajoutez-les à l'objet FormData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
  
      if (profileImageFile) {
        // Si un fichier d'image a été téléchargé, ajoutez-le à l'objet FormData
        formData.append('profile_image', profileImageFile);
 
  
      const response = await fetch('https://auditapi.up.railway.app/api/users/', {
        method: 'POST',
        body: formData, 
        // Utilisez l'objet FormData pour la requête
      });
  
      if (response.ok) {
        setIsCreateModalOpen(false);
        message.success('Utilisateur créé avec succès');
      } else {
        console.error('Erreur lors de la création de l\'utilisateur.');
        message.error('Erreur lors de la création de l\'utilisateur');
      }
      console.log(values)
      
    }   else{
      
      const response = await fetch('https://auditapi.up.railway.app/api/users/', {
        method: 'POST',
        body: JSON.stringify(values), 
        headers: {
     'Content-Type': 'application/json' ,
        }
      })
  
      if (response.ok) {
        setIsCreateModalOpen(false);
        message.success('Utilisateur créé avec succès');
      } else {
        console.error('Erreur lors de la création de l\'utilisateur.');
        message.error('Erreur lors de la création de l\'utilisateur');
      }
      console.log(values)
    }
  }catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur : ', error);
    message.error('Erreur lors de la création de l\'utilisateur');
  }

  };
  
  
const handleDeleteUser = async (userId) => {
  try {
    setIsLoading(true); // Définissez isLoading sur true au début de la suppression

    const response = await fetch(`https://auditapi.up.railway.app/api/users/${userId}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Si la suppression réussit, mettez à jour les données des utilisateurs localement
      const updatedUserData = usersData.filter((user) => user.id !== userId);
      setUsersData(updatedUserData);
    } else {
      console.error('Erreur lors de la suppression de l\'utilisateur.');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur : ', error);
  } finally {
    setIsLoading(false); // Définissez isLoading sur false une fois que la suppression est terminée
  }
};
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Prénom',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Nom de famille',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Région',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Département',
      dataIndex: 'departement',
      key: 'departement',
    },
    {
      title: 'Sous-préfecture',
      dataIndex: 'sous_prefecture',
      key: 'sous_prefecture',
    },
    {
      title: 'Commune',
      dataIndex: 'commune',
      key: 'commune',
    },
    // {
    //   title: 'Image de profil',
    //   dataIndex: 'profile_image',
    //   key: 'profile_image',
    //   render: (profileImage) => (
    //     profileImage ? (
    //       <img
    //         src={profileImage}
    //         alt="Image de profil"
    //         style={{ maxWidth: '50px' }}
    //       />
    //     ) : null
    //   ),
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <div>
<Button
  type="default"
  icon={<EditOutlined />}
  onClick={() => handleOpenModal(user)}
/>

<Popconfirm
  title="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
  onConfirm={() => handleDeleteUser(user.id)}
  okText="Oui"
  cancelText="Non"
  disabled={isLoading} // Désactivez le Popconfirm pendant la suppression
>
  <Button
    type="default"
    icon={<DeleteOutlined />}
  />
</Popconfirm>

        </div>
      ),
    },
  ];
  
  const normFile = (e) => {
    if (!e) {
      return [];
    }
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList) {
      return e.fileList;
    }
    return [e];
  };
  

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Vous pouvez uniquement télécharger des fichiers JPG/PNG !');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('L\'image doit être inférieure à 2 Mo !');
    }
    if (isJpgOrPng && isLt2M) {
      // Stockez le fichier d'image dans l'état local
      setProfileImageFile(file);
    }
    return false; // Retournez false pour empêcher le téléchargement automatique du fichier
  };
  const cardHeadStyleBloc = {
    borderBottom: '',
    color: 'white',
    background: '#0958d9',
  };


  return (
    <div>
     <Divider><h4>Utilisateurs</h4></Divider>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleOpenCreateModal}
        style={{ marginBottom: '16px' }}
      >
        Créer un utilisateur
      </Button>
      {/* Table d'Ant Design */}
      <Card
            title={
              <span>
                Utilisateurs
              </span>
            }
            headStyle={cardHeadStyleBloc}
            className='border border'
            bordered={true}
            // style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}
          >
            <Table
            dataSource={usersData}
            columns={columns}
            pagination={{
              pageSize: 4, // Nombre d'éléments par page
            }}
            />
    </Card>
<br/>
<Modal
  title="Modifier l'utilisateur"
  visible={isModalOpen}
  onCancel={handleCloseModal}
  footer={null}
  width={700}
  style={{ position: 'relative', top: 50 }}
>
  {selectedUser && (
    <Form onFinish={handleUpdateUser} initialValues={selectedUser}>
     <Row gutter={16}>
     <Col md={12}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Veuillez entrer l'email de l'utilisateur" }]}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Prénom"
        name="first_name"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Nom de famille"
        name="last_name"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Adresse"
        name="adresse"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="District"
        name="district"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Région"
        name="region"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Département"
        name="departement"
      >
        <Input />
      </Form.Item>
      </Col>

      <Col  md={12}>
      <Form.Item
        label="Sous-préfecture"
        name="sous_prefecture"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Commune"
        name="commune"
      >
        <Input />
      </Form.Item>
      </Col>
      <Col  md={12}>
      <Form.Item
        label="Mot de passe"
        name="password"
      >
        <Input type="password" />
      </Form.Item>
      </Col>
      </Row>
      <Form.Item
        label="Image de profil"
        name="profile_image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "Veuillez télécharger une image de profil" }]}
      >
        <Upload
          name="profile_image"
          listType="picture"
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />}>Télécharger une image</Button>
        </Upload>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Enregistrer les modifications
      </Button>
    </Form>
  )}
</Modal>


      <Modal
        title="Créer un utilisateur"
        visible={isCreateModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
        style={{ position: 'relative', top: 50 }}
      >
        <Form onFinish={handleCreateUser} className="vertical-label-form">
          <Row gutter={16}>
          <Col  md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Veuillez entrer l'email de l'utilisateur" }]}
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Prénom"
            name="first_name"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Nom de famille"
            name="last_name"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Adresse"
            name="adresse"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="District"
            name="district"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Région"
            name="region"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Département"
            name="departement"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Sous-préfecture"
            name="sous_prefecture"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Commune"
            name="commune"
          >
            <Input />
          </Form.Item>
          </Col>
          <Col  md={12}>
          <Form.Item
            label="Mot de passe"
            name="password"
          >
            <Input type="password" />
          </Form.Item>
          </Col>
          </Row>
          <Form.Item
            label="Image de profil"
            name="profile_image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: false, message: "Veuillez télécharger une image de profil" }]}
          >
            <Upload
              name="profile_image"
              listType="picture"
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Télécharger une image</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Créer un utilisateur
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UtilisateursOld;
