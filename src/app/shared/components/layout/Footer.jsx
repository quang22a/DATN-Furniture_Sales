import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";

import { Input } from "../partials/Input";

export const Footer = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.indexOf("/auth") === -1 ? (
        <footer className="page-footer">
          <div className="top-footer">
            <div className="container ">
              <div className="row">
                <div className="col-4">
                  <p className="logo">Luxury House</p>
                </div>
                <div className="col-4">
                  <p className="title-footer">Về Luxury House</p>
                  <ul className="list-about">
                    <li className="item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="item">
                      <Link to="/products">Sản phẩm</Link>
                    </li>
                    <li className="item space">
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-4">
                  <p className="title-footer">Newsletter</p>
                  <p className="des">
                    Liên lạc với chúng tôi qua: 0985747910
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <p>Copyright 2021 All Right Reserved By TWQ</p>
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
};
