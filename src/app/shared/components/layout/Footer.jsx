import { Link } from "react-router-dom";

import { Input } from "../partials/Input";

export const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="top-footer">
        <div className="container ">
          <div className="row">
            <div className="col-4">
              <p className="logo">Luxury House</p>
              <div className="follow">
                <p>Theo dõi chúng tôi</p>
                <div className="app">
                  <a href="https://facebook.com" target="_blank">
                    Facebook-
                  </a>
                  <a href="https://facebook.com" target="_blank">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <p className="title-footer">Về Luxury House</p>
              <ul className="list-about">
                <li className="item">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="item">
                  <Link to="/product">Sản phẩm</Link>
                </li>
                <li className="item space">
                  <Link to="/insurance">Bảo hành</Link>
                </li>
                <li className="item">
                  <Link to="/delivery">Giao hàng</Link>
                </li>
                <li className="item">
                  <Link to="/terms">Điều khoản riêng tư</Link>
                </li>
              </ul>
            </div>
            <div className="col-4">
              <p className="title-footer">Newsletter</p>
              <p className="des">
                Hãy để lại email của bạn để nhận được những ý tưởng trang trí
                mới và những thông tin, ưu đãi từ Luxury House
              </p>
              <form className="form-newsletter">
                <Input
                  id="email-footer"
                  placeholder="Nhập email của bạn"
                  className="form-control"
                />
                <button type="button" className="btn btn-contact">
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <p>Copyright 2021 All Right Reserved By TWQ</p>
      </div>
    </footer>
  );
};
