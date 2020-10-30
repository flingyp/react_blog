import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { PieChartOutlined, UserOutlined, FileImageFilled } from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import Weclome from "./Weclome";
import AddWellArticle from "./AddWellArticle";
import GoodArticleList from "./GoodArticleList";
import AddImgs from './AddImgs'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(["1"]);

  useEffect(() => {
    props.history.push("/index");
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = (e) => {
    if (e.key === "1") {
      props.history.push("/index");
      setDefaultSelectedKeys(["1"]);
    } else if (e.key === "2") {
      props.history.push("/index/add");
      setDefaultSelectedKeys(["2"]);
    } else if (e.key === "3") {
      props.history.push("/index/list");
      setDefaultSelectedKeys(["3"]);
    } else if (e.key === "4") {
      props.history.push("/index/goodarticle");
      setDefaultSelectedKeys(["4"]);
    } else if (e.key === "5") {
      props.history.push("/index/goodarticlelist");
      setDefaultSelectedKeys(["5"]);
    } else if (e.key === "6") {
      props.history.push("/index/addimgs")
      setDefaultSelectedKeys(["6"]);
    }
  };

  const renderBreadCrumbItem = () => {
    if (props.location.pathname === "/index/add") {
      return <Breadcrumb.Item>添加文章</Breadcrumb.Item>;
    } else if (props.location.pathname === "/index/list") {
      return <Breadcrumb.Item>文章列表</Breadcrumb.Item>;
    } else if (props.location.pathname === "/index/goodarticle") {
      return <Breadcrumb.Item>添加优秀文章</Breadcrumb.Item>;
    } else if (props.location.pathname === "/index/goodarticlelist") {
      return <Breadcrumb.Item>优秀文章列表</Breadcrumb.Item>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
        >
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={handleClickArticle}
          >
            工作台
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="文章管理"
            onClick={handleClickArticle}
          >
            <Menu.Item key="2">添加文章</Menu.Item>
            <Menu.Item key="3">文章列表</Menu.Item>
            <Menu.Item key="4">添加优秀文章</Menu.Item>
            <Menu.Item key="5">优秀文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item
            key="6"
            icon={<FileImageFilled />}
            title="上传图片"
            onClick={handleClickArticle}
          >
            上传图片
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
            {renderBreadCrumbItem()}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Route path="/index" exact component={Weclome}></Route>
              <Route path="/index/add" exact component={AddArticle}></Route>
              <Route path="/index/list" exact component={ArticleList}></Route>
              <Route path="/index/add/:id" exact component={AddArticle}></Route>
              <Route
                path="/index/goodarticle"
                exact
                component={AddWellArticle}
              ></Route>
              <Route
                path="/index/goodarticlelist"
                exact
                component={GoodArticleList}
              ></Route>
              <Route path="/index/addimgs" exact component={AddImgs}></Route>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          React + Ant Design 驱动的博客管理系统
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
