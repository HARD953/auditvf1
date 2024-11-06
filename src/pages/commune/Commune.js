import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

const CommuneTab = () => {
  const [marques, setMarques] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchMarques = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/commune/');
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
      title: 'Commune',
      dataIndex: 'commune',
      key: 'commune',
    },
    {
      title: 'Taux ODP',
      dataIndex: 'tauxODP',
      key: 'tauxODP',
    },
    {
      title: 'Taux TSP',
      dataIndex: 'tauxTSP',
      key: 'tauxTSP',
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
      marque: record.commune,
      tauxODP: record.tauxODP,
      tauxTSP: record.tauxTSP,
    });
    setSelectedItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Appel à l'API pour supprimer la marque avec l'ID spécifié
      // Après la suppression réussie, rafraîchir la liste des marques
    } catch (error) {
      console.error('Error deleting Commune:', error);
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
          const response = await fetch('https://auditapi.up.railway.app/api/commune/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               commune: values.commune ,
               tauxODP: values.tauxODP,
               tauxTSP: values.tauxTSP,
              }), // Les données à envoyer
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
          console.error('Error adding Commune:', error);
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
        title={selectedItem ? 'Modifier Commune' : 'Ajouter Commune'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Nom de la cummune" name="commune">
            <Input />
          </Form.Item>
          <Form.Item label="Taux ODP" name="tauxODP">
            <Input />
          </Form.Item>
          <Form.Item label="Taux TSP" name="tauxTSP">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CommuneTab;
