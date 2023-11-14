// Post.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Modal, message, Spin, Upload, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTablePostRequest,
  fetchTablePostsRequest,
  deleteTablePostRequest,
  updatePostPublishRequest,
} from '../../Redux/tableposts/tablepostsActions';
import { Link } from 'react-router-dom';

import TopBar from './TopBar';
import './Post.css';

const Post = () => {
  const dispatch = useDispatch();
  const tablePosts = useSelector((state) => state.tablePosts.tablePosts);
  const loading = useSelector((state) => state.tablePosts.loading);

  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    dispatch(fetchTablePostsRequest());
  }, [dispatch]);

  const onFileChange = (file) => {
    setSelectedFile(file.file);
    setFileName(file.file.name);
  };

  const onFinish = async (values) => {
    try {
      await dispatch(createTablePostRequest(values.name, values.content, selectedFile));
      form.resetFields();
      setSelectedFile(null);
      setFileName('');
      setVisible(false);
      message.success('Post created successfully');
      dispatch(fetchTablePostsRequest());
    } catch (error) {
      console.error('Error creating post:', error);
      message.error('Post creation failed');
    }
  };

  const handleDelete = (postId) => {
    dispatch(deleteTablePostRequest(postId));
    message.success('Post deleted successfully');
    dispatch(fetchTablePostsRequest());
  };

  const handlePublish = (postId, published) => {
    dispatch(updatePostPublishRequest(postId, !published));
    const publishMessage = published ? 'unpublished' : 'published';
    message.success(`Post ${publishMessage} successfully`);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };



  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/preview/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button className='DeleteButton' type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button className='button' type="primary" onClick={() => handlePublish(record.id, record.published)}>
            {record.published ? 'Unpublish' : 'Publish'}
          </Button>
         
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading} size="large">
      <div className="post-container">
        <TopBar />
        <h1>Post</h1>

        <Button type="primary" className="create-post-button" onClick={() => setVisible(true)}>
          Create Post
        </Button>
        <Input.Search
          placeholder="Search by post title"
          onSearch={(value) => handleSearch(value)}
          className="search-input"
        />
        <Modal
          title="Create New Post"
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          className="post-form-modal"
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input the content!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: 'Please upload an image!' }]}
              className="file-input-container"
            >
              <Upload.Dragger
                multiple={false}
                beforeUpload={() => false}
                onChange={onFileChange}
                accept=".jpg,.jpeg"
              >
                <p className="ant-upload-drag-icon">Click or drag image to this area to upload</p>
              </Upload.Dragger>
              {selectedFile && <div>{fileName}</div>}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <div className="table-container">
          <Table
            columns={columns}
            dataSource={tablePosts.filter((post) =>
              post.name.toLowerCase().includes(searchValue.toLowerCase())
            )}
          />
        </div>
      </div>
    </Spin>
  );
};

export default Post;