import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Form, Select } from "antd";
import Highlighter from "react-highlight-words";
import Axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function UserAdmin() {
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get("/admin/user").then((data) => {
      setUserList(data.data);
    });
  }, []);
  useEffect(() => {
    let res = userList.map((item) => {
      return {
        id: item._id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        role: item.role,
      };
    });
    setData(res);
  }, [userList]);
  const loadData = () => {
    Axios.get("/admin/user").then((data) => {
      setUserList(data.data);
    });
    let res = userList.map((item) => {
      return {
        id: item._id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        role: item.role,
      };
    });
    setData(res);
  };
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (price) => <span>{price}</span>,
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
                updateUser(row);
                setIdUser(row.id);
                setVisible(true);
              }}
              type="primary"
              icon={<EditOutlined />}
            >
              Sửa
            </Button>{" "}
            <Button
              onClick={() => {
                setIdDeleteUser(row.id);
                setModalDel(true);
              }}
              type="danger"
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  //Form

  //=========Update Modal=============
  const [idUser, setIdUser] = useState("");
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setMessage("");
    setVisible(false);
  };
  const onFinish = (values) => {
    Axios.put("/admin/updateuser", {
      id: idUser,
      name: values.username,
      email: values.email,
      role: values.role,
    })
      .then((data) => {
        loadData();
        setMessage(data.data.msg);
        setMsgErr(data.data.msgErr)
      })
      .catch((err) => setMessage(err));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onGenderChange = (value) => {
    if (value) {
      form.setFieldsValue({ status: value });
    }
  };
  const updateUser = (info) => {
    form.resetFields();
    form.setFieldsValue({
      username: info.name,
      email: info.email,
      role: info.role,
    });
  };
  //====Delete====
  const [idDeleteUser, setIdDeleteUser] = useState("");
  const [msgErr, setMsgErr] = useState("");
  const [modalDel, setModalDel] = useState(false);
  const handleCancelDel = () => {
    setMessage("");
    setMsgErr("");
    setModalDel(false);
  };
  const deleteUser = () => {
    Axios.delete("/admin/deleteuser", { data: { id: idDeleteUser } })
      .then((data) => {
        setMessage(data.data.msg);
        setMsgErr(data.data.msgErr);
        loadData();
      })
      .catch((err) => setMessage(err));
  };
  return (
    <div className="page_admin">
      <Modal
        title="Bạn có đồng ý xóa ?"
        visible={modalDel}
        onCancel={handleCancelDel}
        footer={null}
      >
          <p style={{ textAlign: "center",color: "red" }}>{msgErr}</p>
        <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
          {message && message.length > 0 ? (
            <>
              <span style={{ color: "green" }}>
                <i className="far fa-check-circle"></i>
                {message}
              </span>
            </>
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginRight: "1rem" }}
                onClick={deleteUser}
              >
                Đồng ý
              </Button>
              <Button type="danger" onClick={handleCancelDel}>
                Hủy bỏ
              </Button>
            </>
          )}
        </p>
      </Modal>
      <Modal
        title="Cập nhật thông tin người dùng"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <p style={{color:"green", textAlign: "center" }}>{message}</p>
        <p style={{ color: "red",textAlign: "center" }}>{msgErr}</p>
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ tên"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Vai trò" name="role">
            <Select onChange={onGenderChange}>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="ad_title">
        <span>Thông tin về Tài khoản người dùng</span>
      </div>
      <div className="ad_info">
        <Table rowKey="id" columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default UserAdmin;
