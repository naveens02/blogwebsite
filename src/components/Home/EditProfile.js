
import React, { useState, useEffect } from 'react';
import { Modal, Form, Space, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateProfileRequest } from '../../Redux/authSlice';

function EditProfile({ isModalOpen, setIsModalOpen, userData, updateProfileInContainer }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    form.setFieldsValue({
      firstname: userData?.first_name || '',
      lastname: userData?.last_name || '',
    });
    setSelectedFile(userData?.profile_Pic || null);
  }, [userData, form]);

  const beforeUpload = async (file) => {
    const base64 = await convertFileToBase64(file);
    setSelectedFile(base64);
    setFileName(file.name); 
    return false; 
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onFinish = (values) => {
    const updatedFirstName = values.firstname;
    const updatedLastName = values.lastname;
    const updatedImage = selectedFile || userData.profile_Pic;

    
    const updatedUserData = { ...userData, first_name: updatedFirstName, last_name: updatedLastName, profile_Pic: updatedImage };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    dispatch(
      updateProfileRequest({
        firstname: updatedFirstName,
        lastname: updatedLastName,
        image: updatedImage,
      })
    );

    updateProfileInContainer(updatedFirstName, updatedLastName, updatedImage);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Update Profile"
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Space direction="vertical" size={20}>
          <Form.Item name="firstname" rules={[{ required: true, message: 'Please enter your Firstname' }]}>
            <Input size="large" placeholder="Firstname" autoFocus={true} />
          </Form.Item>
          <Form.Item name="lastname" rules={[{ required: true, message: 'Please enter your Lastname' }]}>
            <Input size="large" placeholder="Lastname" />
          </Form.Item>
          <Upload showUploadList={false} beforeUpload={beforeUpload} accept=".jpg,.jpeg">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {selectedFile && <div>{fileName}</div>}
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}

export default EditProfile;
