import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Modal, Form, Select } from "antd";
import Highlighter from "react-highlight-words";
import Axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
function OrderAdmin() {
  const [form] = Form.useForm();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    Axios.get("/admin/order").then((data) => {
      setOrderList(data.data);
    });
  }, []);
  const [data, setData] = useState([]);
  const loadData = () => {
    Axios.get("/admin/order").then((data) => {
      setOrderList(data.data);
    });
    let data1 = [];
    orderList.forEach((item, index) => {
      item.product.forEach((pro) => {
        data1.push({
          idOrder: item._id,
          userName: item.name,
          email: item.email,
          idProduct: pro.id,
          productName: pro.name,
          url: pro.url,
          price: pro.price,
          quantity: pro.amount,
          size: pro.size,
          address: item.address,
          phoneNumber: item.phonenumber,
          note: item.note,
          sizeProduct: pro.size,
          timeOrder: item.createdAt.slice(0, 19),
          status: item.status,
        });
      });
    });
    setData(data1);
  };
  useEffect(() => {
    let data1 = [];
    if(orderList.length>0){
      orderList.forEach((item, index) => {
        item.product.forEach((pro) => {
          data1.push({
            idOrder: item._id,
            userName: item.name,
            email: item.email,
            idProduct: pro.id,
            productName: pro.name,
            url: pro.url,
            price: pro.price,
            quantity: pro.amount,
            size: pro.size,
            address: item.address,
            phoneNumber: item.phonenumber,
            note: item.note,
            sizeProduct: pro.size,
            timeOrder: item.createdAt.slice(0, 19),
            status: item.status,
          });
        });
      });
    }
    setData(data1);
  }, [orderList]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      ...getColumnSearchProps("productName"),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Hình ảnh",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        return (
          <img style={{ width: "7rem", height: "7rem" }} alt={url} src={url} />
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Kích thước",
      dataIndex: "sizeProduct",
      key: "sizeProduct",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price?price.toLocaleString():""}đ</span>,
    },
    {
      title: "Tên người nhận",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ["descend"],
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "10%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span>
            {status === "processing" ? "Đang lấy hàng" : ""}
            {status === "completed" ? "Đã nhận hàng" : ""}
            {status === "refunded" ? "Hoàn trả" : ""}
            {status === "cancelled" ? "Đã hủy" : ""}
          </span>
        );
      },
    },
    ,
    {
      title: "Thời gian đặt",
      dataIndex: "timeOrder",
      key: "timeOrder",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (id, row) => {
        return (
          <React.Fragment>
            <Button
              onClick={() => {
                modalUpdate(row);
                setIdOrder(row.idOrder);
                setIdProduct(row.idProduct);
                setVisible(true);
              }}
              type="primary"
              icon={<EditOutlined />}
            >
              Sửa
            </Button>{" "}
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => {
                setModalDel(true);
                setIdDelete(row.idOrder);
              }}
            >
              Xóa
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  //Form
  //update
  const [visible, setVisible] = useState(false);
  const modalUpdate = (info) => {
    form.resetFields();
    form.setFieldsValue({
      name: info.productName,
      url: info.url,
      price: info.price,
      email: info.email,
      address: info.address,
      note: info.note,
      phoneNumber: info.phoneNumber,
      quantity: info.quantity,
      size: info.size,
      status: info.status,
      username: info.userName,
    });
  };
  const handleCancel = () => {
    setMessage('')
    setVisible(false);
  };
  const [idProduct, setIdProduct] = useState("");
  const [idOrder, setIdOrder] = useState("");
  const [message, setMessage] = useState("");
  const onFinish = (values) => {
    Axios.put("/admin/updateorder", {
      idOrder: idOrder,
      idProduct: idProduct,
      name: values.name,
      url: values.url,
      price: values.price,
      email: values.email,
      address: values.address,
      note: values.note,
      phoneNumber: values.phoneNumber,
      quantity: values.quantity,
      size: values.size,
      status: values.status,
      username: values.username,
    })
      .then((data) => {
        loadData();
        setMessage(data.data.msg);
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onGenderChange = (value) => {
    if (value) {
      form.setFieldsValue({ status: value });
    }
  };

  //Delete Order
  const [messageDelete, setMessageDelete] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [modalDel, setModalDel] = useState(false);
  const hideModal = () => {
    setModalDel(false);
    setMessageDelete("");
  };
  const deleteOrder = () => {
    Axios.delete("/admin/deleteorder", { data: { id: idDelete } })
      .then((data) => {
        setMessageDelete(data.data.msg);
        loadData();
      })
      .catch((err) => setMessageDelete(err));
  };
  const total = () => {
    let a = 0;
    data.map((item) => {
      if (item.status === "completed") {
        a += item.price * item.quantity;
      }
      return a
    });
    return a.toLocaleString();
  };
  return (
    <div className="page_admin">
      {/* Modal delete  */}
      <Modal
        title="Bạn có đồng ý xóa ?"
        visible={modalDel}
        onCancel={hideModal}
        footer={null}
      >
        <p style={{ textAlign: "center", color: "green", fontSize: "1.3rem" }}>
          {messageDelete&&messageDelete.length > 0 ? (
            <span>
              <i className="far fa-check-circle"></i>
              {messageDelete}
            </span>
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginRight: "1rem" }}
                onClick={() => deleteOrder()}
              >
                Đồng ý
              </Button>
              <Button type="danger" onClick={hideModal}>
                Hủy bỏ
              </Button>
            </>
          )}
        </p>
      </Modal>
      {/* End Modal delete */}
      <Modal
        title="Sửa thông tin đơn hàng"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <p
          style={{
            textAlign: "center",
            color: "green",
            fontSize: "1.3rem",
            fontWeight: 600,
          }}
        >
          {message}
        </p>
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
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Size" name="size">
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ tên"
            name="username"
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
            label="Email"
            name="email"
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
            label="Địa chỉ"
            name="address"
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
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status">
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
            >
              <Select.Option value="processing">Đang lấy hàng</Select.Option>
              <Select.Option value="completed">Đã nhận hàng</Select.Option>
              <Select.Option value="refunded">Hoàn trả</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="ad_title">
        <span>Thông tin về Giày Converse</span>
        <span>Số tiền đã thanh toán : {total()}đ</span>
      </div>
      <div className="ad_info">
        <Table rowKey="id" columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default OrderAdmin;
