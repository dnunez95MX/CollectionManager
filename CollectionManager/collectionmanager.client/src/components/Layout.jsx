import { Breadcrumb, Layout } from "antd";
import BaseHeader from "./Header/Header.jsx";
import BaseSidebar from "./Sidebar/Sidebar.jsx";
import BaseContent from "./Content/Content.jsx";

const BaseLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <BaseHeader />
      <Layout>
        <BaseSidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <BaseContent />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default BaseLayout;
