import "../static/style/components/author.css";
import { Avatar, Divider, Tooltip } from "antd";
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import {
  AuthorIntroduce,
  gitHubSrc,
  yyblogVuepress,
  QQ,
  WX,
} from "../config/setUserInfo";

const Author = () => {
  return (
    <div className="author-div common-box">
      <div className="author-img">
        <Avatar size={200} shape="circle" src="/static/imgs/logo.png" />
      </div>
      <div className="author-introduction">
        {AuthorIntroduce}
        <Divider>社交账号</Divider>
        <Tooltip placement="top" title={gitHubSrc}>
          <a href={gitHubSrc} target="_blank">
            <Avatar size={30} icon={<GithubOutlined />} className="account" />
          </a>
        </Tooltip>
        <Tooltip placement="top" title={yyblogVuepress}>
          <a href={yyblogVuepress} target="_blank">
            <Avatar size={30} icon={<ShareAltOutlined />} className="account" />
          </a>
        </Tooltip>
        <Tooltip placement="top" title={QQ}>
          <Avatar size={30} icon={<QqOutlined />} className="account" />
        </Tooltip>
        <Tooltip placement="top" title={WX}>
          <Avatar size={30} icon={<WechatOutlined />} className="account" />
        </Tooltip>
      </div>
    </div>
  );
};

export default Author;
