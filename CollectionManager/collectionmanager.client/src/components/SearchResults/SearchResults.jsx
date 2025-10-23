import { React } from "react";
import { List, Button, Skeleton } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";

const SearchResults = ({ searchResults }) => {
  return (
    <List
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 7,
      }}
      dataSource={searchResults}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">edit</a>,
            <a key="list-loadmore-more">
              {" "}
              <Button
                icon={<DownCircleOutlined />}
                onClick={() => {
                  console.log(item.id);
                }}
              >
                Item
              </Button>
            </a>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              title={
                //to do: open item and details with WeightEntry component
                // <a href="https://ant.design">
                //   {new Date(item.date).toLocaleDateString("en-US")}
                // </a>
                <a href="https://ant.design">{item.title}</a>
              }
              description=""
            />
            <div>{item.id}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default SearchResults;
