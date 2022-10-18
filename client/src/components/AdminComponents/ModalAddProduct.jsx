import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as modalAction from "../../action/modal.action";
import Axios from "axios";
function ModalAdd() {
  const [message, setMessage] = useState("");
  const [msgErr, setMsgErr] = useState('')
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { isModalAddProduct } = modal;
  const [form] = Form.useForm();
  const handleCancel = () => {
    setMsgErr('')
    setMessage('')
    dispatch(modalAction.hideModalAddProduct());
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = (values) => {
    Axios.post("/admin/addproduct", {
      name: values.name,
      url: values.url,
      price: values.price,
      type: values.type,
      category: values.category,
    })
      .then((msg) => {
        setMessage(msg.data.msg);
        setMsgErr(msg.data.msgErr)
        form.resetFields();
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Modal
        title="Thêm sản phẩm"
        visible={isModalAddProduct}
        onCancel={handleCancel}
        footer={null}
      >
        <p style={{ color: "red",textAlign: "center" }}>{msgErr}</p>
        {message&& message === "Thêm sản phẩm thành công!" ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              color: "#2ecc71",
            }}
          >
            <i
              style={{ fontSize: "1.3rem", color: "#2ecc71" }}
              className="far fa-check-circle"
            ></i>
            {message}
          </p>
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.3rem", color: "red" }}>
            {message}
          </p>
        )}
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Đường dẫn ảnh"
            name="url"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input value="Hello" />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thể loại"
            name="type"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại hàng"
            name="category"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAdd;
