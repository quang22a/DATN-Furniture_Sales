import React from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import CartItem from "./components/CartItem";
import { formatPrice } from "../../shared/helpers/utils/formatPrice";

const CartPage = () => {
  const listProductCart = useSelector((state) => state.cartReducer.data);
  const totalPrice = listProductCart.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      parseFloat(
        (
          (currentItem.price * (100 - (currentItem.discount || 0))) /
          100
        ).toFixed(2)
      ) *
        currentItem.quantity
    );
  }, 0);

  return (
    <section className="section-cart">
      <div className="container">
        <p className="title-cart">Giỏ hàng</p>
        {!listProductCart || listProductCart.length === 0 ? (
          <div className="empty-cart">
            <p className="empty">Hiện không có sản phẩm trong cửa hàng</p>
            <Link to="/products" className="btn btn-primary">
              Mua ngay
            </Link>
          </div>
        ) : (
          <div className="product-cart row">
            <div className="col-7">
              <div className="cart-wrapper">
                <ul className="list-cart">
                  {listProductCart.map((item, index) => (
                    <CartItem data={item} key={index} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-5">
              <div className="pay-cart">
                <p className="title">Tóm tắt đơn hàng</p>
                <div className="info-cart">
                  <span className="left">Thành tiền</span>
                  <span className="right price">{formatPrice(totalPrice)}</span>
                </div>
                <div className="info-cart border-bottom">
                  <span className="left">Vận chuyển</span>
                  <span className="right">
                    Phí vận chuyển sẽ từ 10.000 - 30.000đ. Vui lòng thanh toán
                    cho bên giao hàng
                  </span>
                </div>
                <div className="info-cart">
                  <span className="left">Tổng cộng</span>
                  <span className="right price">{formatPrice(totalPrice)}</span>
                </div>
                <div className="shipping-info">
                  <p className="title">Thông tin giao hàng</p>
                  <p className="info">
                    Đối với những sản phẩm có sẵn tại khu vực, Luxury House sẽ
                    giao hàng trong vòng 2-7 ngày. Đối với những sản phẩm không
                    có sẵn, thời gian giao hàng sẽ được nhân viên Luxury House
                    thông báo đến quý khách.
                  </p>
                </div>
                <div className="action">
                  <Link to="/products" className="btn btn-back">
                    Tiếp tục mua hàng
                  </Link>
                  <Link to="/pay-ment" className="btn btn-primary">
                    Đặt hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
