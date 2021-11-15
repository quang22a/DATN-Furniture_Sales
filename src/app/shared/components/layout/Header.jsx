import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "../partials/Input";
import img1 from "../../../../assets/images/img1.png";
import { AuthStorageService } from "../../../core/services/authStorage.service";
import JwtHelper from "../../../core/helpers/jwtHelper";

const storage = new AuthStorageService();
const jwt = new JwtHelper();

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quantityCart, setQuantityCart] = useState(2);
  const [showSearch, setShowSearch] = useState(false);
  const [hideAction, setHideAction] = useState(true);
  const [isLogout, setLogout] = useState(false);

  const token = localStorage.getItem("token");
  const id = jwt.getUserId();

  const handleHide = () => {
    setHideAction(!hideAction);
  };
  const handleLogout = async () => {
    storage.removeToken();
    localStorage.removeItem("userInfo");
    setLogout(true);
  };
  useEffect(() => {
    if (isLogout) {
      navigate("/");
      window.location.reload();
    }
  }, [isLogout]);

  return (
    <>
      {location.pathname.indexOf("/auth") === -1 ? (
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
                      <Link to="/" className="btn btn-outline">
                        Trang chủ
                      </Link>
                    </li>
                    <li>
                      <Link to="/products" className="btn btn-outline">
                        Sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="btn btn-outline">
                        Liên lạc
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header-right">
                <form className="form-search" action="/">
                  {showSearch ? (
                    <Input
                      type={"search"}
                      className="form-control"
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
                    className="btn btn-outline btn-search"
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
                    <div className="cart-header">
                      <Link to="/cart">
                        <div className="cart">
                          <i className="fas fa-shopping-cart"></i>
                        </div>
                        {quantityCart ? (
                          <span className="quantity-cart">{quantityCart}</span>
                        ) : (
                          ""
                        )}
                      </Link>
                    </div>
                    <div className="avatar-header">
                      <Link to="/profile">
                        <div className="avatar">
                          <span className="avatar-alpha">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                      </Link>
                      <div className="dropdown-user">
                        <button
                          className="btn btn-outline"
                          onClick={() => {
                            handleHide();
                          }}
                        >
                          <i
                            className="fa fa-ellipsis-v"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul
                          className={`dropdown-user-content ${
                            hideAction && "hide"
                          }`}
                        >
                          <li
                            className="dropdown-user-item"
                            onClick={() => handleHide(true)}
                          >
                            <Link to={`/profile/${id}`}>
                              <button className="btn btn-outline">
                                <i
                                  className="fa fa-user"
                                  aria-hidden="true"
                                ></i>{" "}
                                Cá nhân
                              </button>
                            </Link>
                          </li>
                          <li className="dropdown-user-item">
                            <button
                              className="btn btn-outline"
                              onClick={() => {
                                handleLogout();
                              }}
                            >
                              <i
                                className="fa fa-sign-out"
                                aria-hidden="true"
                              ></i>{" "}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {location.pathname === "/" || location.pathname === "/products" ? (
            <div className="banner_section layout_padding">
              <div className="container-fluid">
                <div className="banner">
                  <div className="col-5">
                    <h1 className="furniture-text">
                      {`Mới nhất${"\n"}`}
                      <strong>sản phẩm nội thất</strong>
                    </h1>
                    <Link to="/product" className="btn btn-shopnow">
                      Mua ngay
                      <i className="fa fa-angle-right"></i>
                    </Link>
                  </div>
                  <div className="col-7">
                    <div>
                      <img src={img1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </header>
      ) : (
        ""
      )}
    </>
  );
};
