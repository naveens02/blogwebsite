// PostEdit.js

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTablePostRequest } from '../../Redux/tableposts/tablepostsActions';
import { useParams } from 'react-router-dom';
const PostEdit = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.tablePosts.tablePosts.find((post) => post.id === Number(postId))
  );
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        name: post.name,
        content: post.content,
      });
    }
  }, [form, post]);

  const onFileChange = (e) => {
    const img = e.target.files[0];
    setSelectedFile(img);
    setFileName(img.name);
  };

  const handleUpdate = async (values) => {
    try {
      await dispatch(updateTablePostRequest(postId, values.name, values.content, selectedFile));
      message.success('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      message.error('Post update failed');
    }
  };

  return (
    <Spin spinning={!post} size="large">
      {post && (
        <div>
          <h1>Edit Post</h1>
          <Form form={form} onFinish={handleUpdate}>
            <Form.Item label="Name" name="name" initialValue={post.name}>
              <Input />
            </Form.Item>
            <Form.Item label="Content" name="content" initialValue={post.content}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Image" name="image">
              <input type="file" onChange={onFileChange} accept=".jpg,.jpeg" />
              {selectedFile && <div>{fileName}</div>}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Spin>
  );
};

export default PostEdit;
