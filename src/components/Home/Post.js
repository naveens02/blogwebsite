import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Modal, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTablePostRequest,
  fetchTablePostsRequest,
  deleteTablePostRequest,
  updatePostPublishRequest
} from '../../Redux/tableposts/tablepostsActions';
import TopBar from './TopBar';

const Post = () => {
  const dispatch = useDispatch();
  const tablePosts = useSelector(state => state.tablePosts.tablePosts);
  const loading = useSelector(state => state.tablePosts.loading);
  const error = useSelector(state => state.tablePosts.error);

  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    dispatch(fetchTablePostsRequest());
  }, [dispatch]);

  const onFileChange = e => {
    const img = e.target.files[0];
    setSelectedFile(img);
    setFileName(img.name);
  };

  const onFinish = async values => {
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

  const handleDelete = postId => {
    dispatch(deleteTablePostRequest(postId));
    message.success('Post deleted successfully');
  };

  const handlePublish = (postId, published) => {
    dispatch(updatePostPublishRequest(postId, !published));
    const publishMessage = published ? 'unpublished' : 'published';
    message.success(`Post ${publishMessage} successfully`);
  };

  const handleSearch = value => {
    setSearchValue(value);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
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
        <span>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => handlePublish(record.id, record.published)}
          >
            {record.published ? 'Unpublish' : 'Publish'}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Spin spinning={loading} size="large">
      <div style={{ height: '100vh' }}>
        <TopBar />
        <h1>Create New Post</h1>
        <Button type="primary" onClick={() => setVisible(true)}>
          Create Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
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
              rules={[{ required: true, message: 'Please input the image!' }]}
            >
              <input type="file" onChange={onFileChange} accept=".jpg,.jpeg" />
              {selectedFile && <div>{fileName}</div>}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <h1>Table Posts</h1>
        <Input.Search
          placeholder="Search by post title"
          onSearch={value => handleSearch(value)}
          style={{ width: 200 }}
        />
        <Table
          columns={columns}
          dataSource={tablePosts.filter(post =>
            post.name.toLowerCase().includes(searchValue.toLowerCase())
          )}
        />
      </div>
    </Spin>
  );
};

export default Post;
