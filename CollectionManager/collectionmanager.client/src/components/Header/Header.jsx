import { Layout, Menu } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const BaseHeader = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Link to="/">
        <DownCircleOutlined style={{ color: "white", fontSize: "large" }} />
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default BaseHeader;
