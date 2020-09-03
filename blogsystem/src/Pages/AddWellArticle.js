import React, { useState } from "react";
import { Row, Col, Button, Input, message } from "antd";
import "../static/css/AddWellArticle.css";
import axios from "axios";
import servicePath from "../config/apiUrl";

function AddWellArticle() {
  const [goodarticle_title, setGoodArticle_title] = useState(""); // 文章的标题
  const [goodarticle_url, setGoodArticle_url] = useState(""); // 文章的网址
  const [goodarticle_type, setGoodArticle_type] = useState(""); // 文章的类型

  const changeGoodarticle_title = async (e) => {
    setGoodArticle_title(e.target.value);
  };

  const changeGoodarticle_url = async (e) => {
    setGoodArticle_url(e.target.value);
  };

  const changeGoodarticle_type = async (e) => {
    setGoodArticle_type(e.target.value);
  };

  const saveGoodArticle = async () => {
    // 添加优秀文章
    if (!goodarticle_title) {
      message.error("优秀文章标题不能为空");
    } else if (!goodarticle_url) {
      message.error("优秀文章网址不能为空");
    } else if (!goodarticle_type) {
      message.error("优秀文章类型不能为空");
    }
    // 提交的参数
    const props = {
      goodarticle_title: goodarticle_title,
      goodarticle_url: goodarticle_url,
      goodarticle_type: goodarticle_type,
    };

    // 提交 数据
    const result = await axios({
      method: "post",
      url: servicePath.addGoodArticle,
      data: props,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    });
    if (result.data.isSuccess == "成功添加优秀文章") {
      message.success(result.data.isSuccess);
    }
  };

  return (
    <div>
      <Row justify="center" gutter={15}>
        <Col span={12}>
          <div className="addwellarticle_input">
            <Input
              placeholder="文章标题"
              size="large"
              onChange={changeGoodarticle_title}
            ></Input>
            <Input
              placeholder="文章网址"
              size="large"
              onChange={changeGoodarticle_url}
            ></Input>
            <Input
              placeholder="文章类型"
              size="large"
              onChange={changeGoodarticle_type}
            ></Input>
          </div>
        </Col>
        <Col span={8}>
          <div className="addwellarticle_button">
            <Button type="primary" size="large" onClick={saveGoodArticle}>
              提交
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddWellArticle;
