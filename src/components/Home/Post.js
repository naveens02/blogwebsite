import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Modal, message, Spin, Upload, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTablePostRequest,
  fetchTablePostsRequest,
  deleteTablePostRequest,
  updatePostPublishRequest,
  updateTablePostRequest,
} from '../../Redux/tableposts/tablepostsActions';
import { Link } from 'react-router-dom';

import TopBar from './TopBar';
import './Post.css';

const Post = () => {
  const dispatch = useDispatch();
  const tablePosts = useSelector((state) => state.tablePosts.tablePosts);
  const loading = useSelector((state) => state.tablePosts.loading);
  const posts = useSelector((state) => state.dashboard.posts); 
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [editingPost, setEditingPost] = useState(null);

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

  const onEditFinish = async (values) => {
    try {
      await dispatch(updateTablePostRequest(editingPost.id, values.name, values.content, selectedFile));
      form.resetFields();
      setEditModalVisible(false);
      message.success('Post updated successfully');
      dispatch(fetchTablePostsRequest());
    } catch (error) {
      console.error('Error updating post:', error);
      message.error('Post update failed');
    }
  };

  const handleDelete = (postId) => {
    dispatch(deleteTablePostRequest(postId));
    message.success('Post deleted successfully');
    dispatch(fetchTablePostsRequest());
  };

  const handlePublish = async (postId, published) => {
    try {
      await dispatch(updatePostPublishRequest(postId, !published));

      // Update the local storage with the changed is_published value
      const updatedTablePosts = tablePosts.map((post) =>
        post.id === postId ? { ...post, is_published: !published } : post
      );

      localStorage.setItem('tablePosts', JSON.stringify(updatedTablePosts));

      // Remove the post from the 'posts' data in local storage if unpublished
      if (!published) {
        const updatedPosts = posts.filter(post => post.id !== postId);
        localStorage.setItem('posts', JSON.stringify(updatedPosts ));
        
      }

      message.success(`Post ${published ? 'unpublished' : 'published'} successfully`);
      dispatch(fetchTablePostsRequest()); // Fetch updated posts after publishing
    } catch (error) {
      console.error('Error updating post publish status:', error);
      message.error(`Post ${published ? 'unpublish' : 'publish'} failed`);
    }
  };

 

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleEdit = (postId) => {
    const postToEdit = tablePosts.find((post) => post.id === postId);
    setEditingPost(postToEdit);
    form.setFieldsValue({
      name: postToEdit.name,
      content: postToEdit.content,
    });
    setEditModalVisible(true);
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
          <Button className='button' type="primary" onClick={() => handlePublish(record.id, record.is_published)}>
            {record.is_published ? 'Unpublish' : 'Publish'}
          </Button>
          <Button className='button' type="primary" onClick={() => handleEdit(record.id)}>
            Edit
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
          title={editingPost ? "Edit Post" : "Create New Post"}
          visible={visible || editModalVisible}
          onCancel={() => {
            setVisible(false);
            setEditModalVisible(false);
            setEditingPost(null);
          }}
          footer={null}
          className="post-form-modal"
        >
          <Form form={form} onFinish={editingPost ? onEditFinish : onFinish}>
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
                {editingPost ? 'Update' : 'Submit'}
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
