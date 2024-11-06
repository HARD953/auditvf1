import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

const SiteTab = () => {
  const [sites, setSites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchSites = async () => {
    try {
      const response = await fetch('https://auditapi.up.railway.app/api/site/');
      const data = await response.json();
      setSites(data.results);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
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
      site: record.site,
    });
    setSelectedItem(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Appel à l'API pour supprimer le site avec l'ID spécifié
      // Après la suppression réussie, rafraîchir la liste des sites
    } catch (error) {
      console.error('Error deleting site:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (selectedItem) {
        // Logique pour modifier le site sélectionné
        // ...
      } else {
        try {
          const response = await fetch('https://auditapi.up.railway.app/api/site/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ site: values.site }), // Les données à envoyer
          });

          if (response.ok) {
            fetchSites();
            setModalVisible(false);
          } else {
            console.error('Failed to add site');
          }
        } catch (error) {
          console.error('Error adding site:', error);
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
      <Table dataSource={sites} columns={columns} />

      <Modal
        title={selectedItem ? 'Modifier Site' : 'Ajouter Site'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Nom du site" name="site">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SiteTab;
