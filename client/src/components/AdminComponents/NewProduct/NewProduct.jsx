import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Modal } from "antd";
import Highlighter from "react-highlight-words";
import Axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as modalAction from "../../../action/modal.action";
import { useDispatch } from "react-redux";
function NewAdmin() {
  const dispatch = useDispatch();
  const [converseList, setConverseList] = useState([]);
  useEffect(() => {
    Axios.get("/admin/new").then((data) => {
      setConverseList(data.data);
    });
  }, []);
  const [data, setData] = useState([]);
  useEffect(() => {
    let res = converseList.map((item) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.url,
      };
    });
    setData(res);
  }, [converseList]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "20%",
      render: (image) => (
        <img
          style={{ width: "7rem", height: "7rem" }}
          alt={image}
          src={image}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()}đ</span>,
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
                dispatch(
                  modalAction.showModalFixProduct(
                    row.id,
                    row.name,
                    row.image,
                    row.price
                  )
                );
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
                setVisible(true);
                setId(row.id);
              }}
            >
              Xóa
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  //
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //Delelte product
  const deleteProduct = (id) => {
    Axios.delete("/admin/deleteproduct", { data: { id: id } })
      .then((data) => {
        setMessage(data.data.msg);
      loadData()
      setMsgErr(data.data.msgErr)
      })
      .catch((err) => console.log(err));
  };
  //Form
  //Modal
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [msgErr, setMsgErr] = useState('')
  const handleCancel = () => {
    setMessage('')
    setVisible(false);
    setMsgErr('')
  };
  const loadData = () => {
    Axios.get("/admin/new").then((data) => {
      setConverseList(data.data);
    });
  };
  return (
    <div className="page_admin">
      <Modal
        title="Bạn có đồng ý xóa sản phẩm"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
         <p style={{ color: "red",textAlign: "center" }}>{msgErr}</p>
        <p style={{ textAlign: "center" }}>
          {message&&message.length > 0 ? (
            <span>{message}</span>
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginRight: "1rem" }}
                onClick={() => deleteProduct(id)}
              >
                Xác nhận
              </Button>
              <Button type="danger" onClick={handleCancel}>
                Hủy bỏ
              </Button>
            </>
          )}
        </p>
      </Modal>
      <div className="ad_title">
        <span>Thông tin về Giày Converse</span>
      </div>
      <Button
      style={{marginRight:"1rem"}}
        type="primary"
        onClick={() => dispatch(modalAction.showModalAddProduct())}
      >
        Thêm sản phẩm
      </Button>
      <Button type="primary" onClick={() => loadData()}>
        Load Data
      </Button>
      <div className="ad_info">
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
}

export default NewAdmin;
