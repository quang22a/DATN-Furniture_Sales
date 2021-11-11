import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../partials/Input";
import img1 from "../../../../assets/images/img1.png";

export const Header = () => {
  const [show, setShow] = useState(false);
  const [quantityCart, setQuantityCart] = useState(2);
  const [showSearch, setShowSearch] = useState(false);
  const token = "";

  return (
    <header className="header-container">
      <div className="container container-md">
        <div className="header">
          <div className="header-left">
            <a href="/">
              <p className="logo">Luxury House</p>
            </a>
          </div>
          <div className="header-center">
            <nav>
              <ul>
                <li>
                  <a href="/" className="btn btn-outline">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/product" className="btn btn-outline">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="/contact" className="btn btn-outline">
                    Liên lạc
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <form className="form-search" action="/">
              {showSearch ? (
                <Input
                  type={"search"}
                  className={`form-control ${!show ? "hide-mb" : "block"}`}
                  label={""}
                  placeholder={"Search"}
                  id={"search"}
                  validate={""}
                  para={""}
                />
              ) : (
                ""
              )}

              <button
                type="button"
                className={`btn btn-outline btn-search ${
                  show ? "hide-mb" : "block"
                }`}
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
            <div className={`header-right-desktop ${token && "hide"}`}>
              <i className="fas fa-user"></i>
              <Link to="/auth/login">
                <button className="btn btn-secondary">Đăng nhập</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn btn-secondary">Đăng ký</button>
              </Link>
            </div>
            {token && (
              <>
                <div className="avatar-header">
                  <a href="/profile">
                    <div className="avatar">
                      <span className="avatar-alpha">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </a>
                </div>
                <div className="cart-header">
                  <a href="/cart">
                    <div className="cart">
                      <i class="fas fa-shopping-cart"></i>
                    </div>
                    {quantityCart ? (
                      <span className="quantity-cart">{quantityCart}</span>
                    ) : (
                      ""
                    )}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="banner_section layout_padding">
        <div className="container-fluid">
          <div className="banner">
            <div className="col-5">
              <h1 className="furniture-text">
                {`Mới nhất${"\n"}`}
                <strong>sản phẩm nội thất</strong>
              </h1>
              <a href="/product" className="btn btn-shopnow">
                Mua ngay
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
            <div className="col-7">
              <div>
                <img src={img1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
