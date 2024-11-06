import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

const VisibiliteTab = () => {
  const [visibilites, setVisibilites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchVisibilites = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/visibilite/');
      const data = await response.json();
      setVisibilites(data.results);
    } catch (error) {
      console.error('Error fetching visibilites:', error);
    }
  };

  useEffect(() => {
    fetchVisibilites();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Visibilité',
      dataIndex: 'visibilite',
      key: 'visibilite',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Modifier</Button>
          <Button onClick={() => handleDelete(record.id)}>Supprimer</Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue({
      visibilite: record.visibilite,
    });
    setSelectedItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Appel à l'API pour supprimer la visibilité avec l'ID spécifié
      // Après la suppression réussie, rafraîchir la liste des visibilités
    } catch (error) {
      console.error('Error deleting visibilite:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (selectedItem) {
        // Logique pour modifier la visibilité sélectionnée
        // ...
      } else {
        try {
          const response = await fetch('https://auditapi.up.railway.app/api/visibilite/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ visibilite: values.visibilite }), // Les données à envoyer
          });

          if (response.ok) {
            fetchVisibilites();
            setModalVisible(false);
          } else {
            console.error('Failed to add visibilite');
          }
        } catch (error) {
          console.error('Error adding visibilite:', error);
        }
      }
      form.resetFields();
      setModalVisible(false);
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setSelectedItem(null);
  };

  return (
    <>
     <Button className='mb-4' type='primary' onClick={showModal}>Ajouter</Button>
      <Table dataSource={visibilites} columns={columns} />

      <Modal
        title={selectedItem ? 'Modifier Visibilité' : 'Ajouter Visibilité'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Nom de la visibilité" name="visibilite">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VisibiliteTab;
