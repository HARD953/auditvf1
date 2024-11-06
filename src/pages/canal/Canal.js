import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

const CanalTab = () => {
  const [canals, setCanals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchCanals = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/canal/');
      const data = await response.json();
      setCanals(data.results);
    } catch (error) {
      console.error('Error fetching canals:', error);
    }
  };

  useEffect(() => {
    fetchCanals();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Canal',
      dataIndex: 'canal',
      key: 'canal',
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
      canal: record.canal,
    });
    setSelectedItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Appel à l'API pour supprimer le canal avec l'ID spécifié
      // Après la suppression réussie, rafraîchir la liste des canaux
    } catch (error) {
      console.error('Error deleting canal:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (selectedItem) {
        // Logique pour modifier le canal sélectionné
        // ...
      } else {
        try {
          // Logique pour ajouter un nouveau canal
          const response = await fetch('https://auditapi.up.railway.app/api/canal/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ canal: values.canal }), // Les données à envoyer
          });

          if (response.ok) {
            // Si la requête est réussie, actualiser la liste des canaux et fermer le modal
            fetchCanals();
            setModalVisible(false);
          } else {
            // Gérer les cas d'erreur
            console.error('Failed to add canal');
          }
        } catch (error) {
          console.error('Error adding canal:', error);
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
      <Table dataSource={canals} columns={columns} />

      <Modal
        title={selectedItem ? 'Modifier Canal' : 'Ajouter Canal'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Nom du canal" name="canal">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CanalTab;
