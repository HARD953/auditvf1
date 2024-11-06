import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

const MarqueTab = () => {
  const [marques, setMarques] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchMarques = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/marque/');
      const data = await response.json();
      setMarques(data.results);
    } catch (error) {
      console.error('Error fetching marques:', error);
    }
  };

  // useEffect(()=>{
  //   const dataMarquesRes = dataMarques?.results

  // },[])




  useEffect(() => {
    fetchMarques();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Marque',
      dataIndex: 'marque',
      key: 'marque',
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
      marque: record.marque,
    });
    setSelectedItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Appel à l'API pour supprimer la marque avec l'ID spécifié
      // Après la suppression réussie, rafraîchir la liste des marques
    } catch (error) {
      console.error('Error deleting marque:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (selectedItem) {
        // Logique pour modifier la marque sélectionnée
        // ...
      } else {
        try {
          // Logique pour ajouter une nouvelle marque
          const response = await fetch('https://auditapi.up.railway.app/api/marque/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ marque: values.marque }), // Les données à envoyer
          });
  
          if (response.ok) {
            // Si la requête est réussie, actualiser la liste des marques et fermer le modal
            fetchMarques();
            setModalVisible(false);
          } else {
            // Gérer les cas d'erreur
            console.error('Failed to add marque');
          }
        } catch (error) {
          console.error('Error adding marque:', error);
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
      <Table dataSource={marques} columns={columns} />
 
      <Modal
        title={selectedItem ? 'Modifier Marque' : 'Ajouter Marque'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Nom de la marque" name="marque">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MarqueTab;
