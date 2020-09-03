import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, Button, Switch, message } from "antd";
import axios from "axios";
import "../static/css/GoodArticleList.css";
import servicePath from "../config/apiUrl";

const { confirm } = Modal;

function GoodArticleList() {
  const [goodarticlelist, setGoodarticlelist] = useState([]);

  const getGoodArticleInfo = async () => {
    const result = await axios({
      method: "get",
      url: servicePath.goodArticleList,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    });
    setGoodarticlelist(result.data.data);
  };

  const delGoodArticle = async (id) => {
    confirm({
      title: "确定要删除这篇优秀文章吗？",
      content: "如果点击OK， 文章会让永久删除，无法恢复",
      onOk() {
        axios({
          method: "get",
          url: servicePath.delGoodArticleById,
          params: {
            id,
          },
          withCredentials: true,
        }).then((result) => {
          console.log(result);
          if (result.data.message === "删除成功") {
            message.success("文章删除成功");
            getGoodArticleInfo();
          }
        });
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };

  useEffect(() => {
    getGoodArticleInfo();
  }, []);

  return (
    <div>
      <List
        header={
          <Row>
            <Col span={4}>
              <b>优秀文章标题</b>
            </Col>
            <Col span={8}>
              <b>优秀文章地址</b>
            </Col>
            <Col span={4}>
              <b>优秀文章类型</b>
            </Col>
            <Col span={3}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={goodarticlelist}
        renderItem={(item, index) => (
          <List.Item>
            <Row className="list-div">
              <Col span={4} className="list-title">
                <b>{item.goodarticle_title}</b>
              </Col>
              <Col span={8}>
                <b>{item.goodarticle_url}</b>
              </Col>
              <Col span={4}>
                <b>{item.goodarticle_type}</b>
              </Col>
              <Col span={3}>
                <Button type="primary" onClick={() => delGoodArticle(item.Id)}>
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default GoodArticleList;
