import "../static/style/components/footer.css";
import { FooterInfoRunning, FooterInfoIntroduce } from "../config/setUserInfo";
const Footer = () => (
  <div className="footer-div">
    <div>{FooterInfoRunning}</div>
    <div>{FooterInfoIntroduce}</div>
  </div>
);

export default Footer;
