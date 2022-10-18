import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as modalAction from "../../action/modal.action";
import Axios from "axios";
function ModalAdd() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { isModalFixProduct, name, url, price, id } = modal;
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      name: name,
      url: url,
      price: price,
    });
  }, [modal, name, url, price, form]);
  const handleCancel = () => {
    form.resetFields();
    setMessage('')
    setMsgErr('')
    dispatch(modalAction.hideModalFixProduct());
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
  const [message, setMessage] = useState('')
  const [msgErr, setMsgErr] = useState('')
  const onFinish = (values) => {
    Axios.put("/admin/updateproduct", {
      id: id,
      name: values.name,
      url: values.url,
      price: values.price,
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
  useEffect(() => {
    form.setFieldsValue({ name: "2" });
  }, [form]);
  return (
    <div>
      <Modal
        title="Sửa sản phẩm"
        visible={isModalFixProduct}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <p style={{ color: "red",textAlign: "center" }}>{msgErr}</p>
         {message&& message === "Cập nhật sản phẩm thành công!" ? (
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
          form={form}
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            shouldUpdate={true}
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
            <Input />
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
