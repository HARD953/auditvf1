import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

const EtatTab = () => {
  const [etats, setEtats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchEtats = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/etat/');
      const data = await response.json();
      setEtats(data.results);
    } catch (error) {
      console.error('Error fetching etats:', error);
    }
  };

  useEffect(() => {
    fetchEtats();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Etat',
      dataIndex: 'etat',
      key: 'etat',
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
      etat: record.etat,
    });
    setSelectedItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Appel à l'API pour supprimer l'état avec l'ID spécifié
      // Après la suppression réussie, rafraîchir la liste des états
    } catch (error) {
      console.error('Error deleting etat:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (selectedItem) {
        // Logique pour modifier l'état sélectionné
        // ...
      } else {
        try {
          const response = await fetch('https://auditapi.up.railway.app/api/etat/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ etat: values.etat }), // Les données à envoyer
          });

          if (response.ok) {
            fetchEtats();
            setModalVisible(false);
          } else {
            console.error('Failed to add etat');
          }
        } catch (error) {
          console.error('Error adding etat:', error);
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
      <Table dataSource={etats} columns={columns} />

      <Modal
        title={selectedItem ? 'Modifier Etat' : 'Ajouter Etat'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Nom de l'état" name="etat">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EtatTab;
