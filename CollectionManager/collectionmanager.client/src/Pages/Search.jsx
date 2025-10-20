import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios_instance from "../utils/apiconfig";
import axios from "axios";
import queryBuilder from "../utils/query_builder";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Search = () => {
  const [response, setResponse] = useState("");
  const [size, setSize] = useState("");

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get("api/home");
      // ...
      console.log(response);
    }
    fetchData();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const searchQuery = queryBuilder(values);

    try {
      console.log(searchQuery);

      const params = { query: searchQuery.query, per_page: 500 };

      const res = await axios_instance.get("api/vintedproxy/search", {
        params,
      });
      setResponse(res.data.items);
      console.log(response);
    } catch (err) {
      if (err.response) {
        setResponse(err.response.data.error);
      } else {
        setResponse("Error de conexión con la API.");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Team"
          name="team"
          rules={[
            { required: true, message: "Please input your jersey's team!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="size" label="Size" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option"
            onChange={(value) => setSize(value)}
            allowClear
          >
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Form.Item>

        <Form.Item name="longSleeve" valuePropName="islongsleeve" label={null}>
          <Checkbox>Check for long sleeve</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <h1>Response</h1>
      {response &&
        response.map((item, index) => <li key={index}>{item.title}</li>)}
    </>
  );
};

export default Search;
