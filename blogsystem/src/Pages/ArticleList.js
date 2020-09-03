import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, Button, Switch, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleLisst.css";

const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);

  const getList = async () => {
    const result = await axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    if (result.data.data === "请重新登录") {
      props.history.push("/login");
    } else {
      setList(result.data.list);
    }
  };

  const delArticle = async (id) => {
    // 删除文章
    confirm({
      title: "确定要删除这篇文章吗？",
      content: "如果点击OK，文章会被永远删除，无法恢复",
      onOk() {
        axios({
          method: "get",
          url: servicePath.delArticle + "/" + id,
          withCredentials: true,
        }).then((result) => {
          console.log(result);
          if (result.data.message === "删除成功") {
            message.success("文章删除成功");
            getList();
          }
        });
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };

  const updateArticle = async (id) => {
    // 根据文章ID获取详情， 跳转到添加文章页面
    props.history.push("/index/add/" + id);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={3}>
              <b>序号</b>
            </Col>
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>文章类型</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <Row className="list-div">
              <Col span={3}>{index}</Col>
              <Col span={8} className="list-title">
                {item.title}
              </Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>
              <Col span={3}>{item.view_count}</Col>
              <Col span={4}>
                <Button type="primary" onClick={() => updateArticle(item.id)}>
                  修改
                </Button>
                &nbsp;
                <Button onClick={() => delArticle(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
