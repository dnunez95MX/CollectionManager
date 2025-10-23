import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const BaseContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Outlet />
    </Content>
  );
};

export default BaseContent;
