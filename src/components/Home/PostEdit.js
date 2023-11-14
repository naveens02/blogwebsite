// PostEdit.js

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, message, Upload, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTablePostRequest } from '../../Redux/tableposts/tablepostsActions';
import { useParams, Link } from 'react-router-dom';

import './PostEdit.css'; // Import your CSS file

const PostEdit = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.tablePosts.tablePosts.find((p) => p.id === Number(postId))
  );
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        name: post.name,
        content: post.content,
      });
    }
  }, [form, post]);

  const onFileChange = (info) => {
    if (info.file.status === 'done') {
      setSelectedFile(info.file.originFileObj);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('content', values.content);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await dispatch(updateTablePostRequest(postId, values.name, values.content, selectedFile));

      message.success('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      message.error('Post update failed');
    }
  };

  return (
    <Spin spinning={!post} size="large">
      <div className="post-edit-container">
        <Link to="/post" className="BackButton">
          ← Back
        </Link>
        <div className="form-container">
          <p>Edit Post</p>
          {post && (
            <div>
              <Form form={form} onFinish={handleUpdate}>
                <Form.Item className="form-item" label="Name" name="name" initialValue={post.name}>
                  <Input />
                </Form.Item>
                <Form.Item
                  className="form-item"
                  label="Content"
                  name="content"
                  initialValue={post.content}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item className="form-item" label="Image" name="image">
                  <Upload
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess('ok');
                      }, 0);
                    }}
                    onChange={onFileChange}
                    showUploadList={false}
                  >
                    <Button>Upload Image</Button>
                  </Upload>
                  {selectedFile && <Image width={100} src={URL.createObjectURL(selectedFile)} />}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default PostEdit;
