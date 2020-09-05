import react, { useState, useEffect, useRef } from "react";

import "../static/style/page/goodarticle.css";
import { List, Pagination } from "antd";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

import axios from "axios";
import servicePath from "../config/apiUrl";

const GoodArticle = (props) => {
  const [goodArticleList, setGoodArticleList] = useState(props.data.result);
  const [count, setCount] = useState(props.data.count);
  let nowPage = useRef(1);
  const [limit, setLimit] = useState(5); // 显示的数量

  // 下一页文章
  const nextArticles = async (page, pageSize) => {
    nowPage.current = page;
    const nextGoodArticleData = await axios({
      method: "get",
      params: {
        page,
        limit,
      },
      url: servicePath.goodArticleList,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    });
    if (nextGoodArticleData.data.data.length != 0) {
      setGoodArticleList(nextGoodArticleData.data.data.result);
    } else {
      console.log("weiko ");
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/static/imgs/logo.ico" type="logo-ico" />
        <title>优秀文章 | 感谢大神们的指点迷津</title>
      </Head>
      <Header />
      <div className="goodarticle_content">
        <List
          itemLayout="horizontal"
          dataSource={goodArticleList}
          renderItem={(item) => (
            <List.Item>
              <div className="article">
                <div className="article_title">
                  <a href={item.goodarticle_url} target="_blank">
                    {item.goodarticle_title}
                  </a>
                </div>
                <div className="article_type">{item.goodarticle_type}</div>
                <div className="article_url">{item.goodarticle_url}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <div className="paging">
        <Pagination
          defaultCurrent={nowPage.current}
          defaultPageSize={limit}
          total={count}
          onChange={nextArticles}
        />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

GoodArticle.getInitialProps = async () => {
  const goodArticleData = await axios({
    method: "get",
    params: {
      page: 1, // 当前页数
      limit: 5, // 显示文章条数
    },
    url: servicePath.goodArticleList,
    header: { "Access-Control-Allow-Origin": "*" },
    withCredentials: true,
  });
  return {
    data: goodArticleData.data.data,
  };
};

export default GoodArticle;
