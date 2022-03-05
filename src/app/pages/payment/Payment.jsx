import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { io } from "socket.io-client";

import { Input } from "../../shared/components/partials/Input";
import { formatPrice } from "../../shared/helpers/utils/formatPrice";
import { setModal } from "../../stores/modal/action";
import { clearCart } from "../cart/stores/action";
import { validateEmail, validatePhone } from "../../shared/validate";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM});

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [additional, setAdditional] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const listProduct = useSelector((state) => state.cartReducer.data);
  if (!listProduct || listProduct.length === 0) {
    navigate("/products");
  }
  const profileUser = useSelector((state) => state.profileReducer.dataProfile);
  const error = useSelector((state) => state.paymentReducer.errorCreate);

  const totalPrice = listProduct.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      parseFloat(
        (
          (currentItem.price * (100 - (currentItem.discount || 0))) /
          100
        ).toFixed(0)
      ) *
        currentItem.quantity
    );
  }, 0);
  const totalPriceUsd = totalPrice / 23000;
  const watchName = watch("name");
  const watchEmail = watch("email");
  const watchPhone = watch("phone");
  const watchAdress = watch("address");

  useEffect(() => {
    setValue("name", profileUser?.name);
    setValue("email", profileUser?.email);
    setValue("phone", profileUser?.phone);
    setValue("address", profileUser?.address);
  }, [profileUser]);

  const onSubmit = (method) => {
    const totalProduct = listProduct.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
    const dataSubmit = {
      customerId: profileUser?._id,
      name: watchName || profileUser?.name,
      email: watchEmail || profileUser?.email,
      phone: watchPhone || profileUser?.phone,
      address: watchAdress || profileUser?.address,
      totalPrice,
      totalProduct,
      paymentMethod: method === 'Paypal' ? 'Paypal' : 'Cash',
      paymentStatus: method === "Paypal" ? true : false,
      additional: additional,
      listProducts: listProduct.map((item) => {
        return {
          productId: item._id,
          productName: item.name,
          quantity: item.quantity,
          price: (item.price - item.price*item.discount/100) * item.quantity,
        };
      }),
    };
    if (!additional) {
      delete dataSubmit.additional;
    }
    const socket = io.connect("http://localhost:8000");
    socket.on("connect", () => {
      socket.emit("client-create-bill", dataSubmit);
    });
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && !error) {
      dispatch(
        setModal({
          key: "snapback",
          title: "",
          content: "Đặt hàng thành công",
        })
      );
      dispatch(clearCart());
      navigate("/products");
    }
    setIsSubmit(false);
  }, [isSubmit]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPriceUsd.toFixed(0), // Can reference variables or functions. Example: `value: document.getElementById('...').value`
          },
        },
      ],
    });
  }
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (orderData) {
      onSubmit('Paypal');
      alert(
        "Thanh toán thành công"
      );
    });
  }

  return (
    <section className="section-payment">
      <div className="container">
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-7">
            <p className="title-info-payment text-uppercase">
              Địa chỉ giao hàng
            </p>
            <div className="form-row">
              <Input
                type="text"
                className="form-control"
                label="Họ tên"
                placeholder={"Họ tên"}
                id={"name"}
                validate={register("name", {
                  required: "Bạn phải nhập họ tên",
                })}
                errors={errors.name}
                para={""}
              />
            </div>
            <div className="form-row">
              <Input
                type="email"
                className="form-control"
                label="Địa chỉ email"
                placeholder={"Email"}
                id={"email"}
                validate={register("email", { ...validateEmail })}
                errors={errors.email}
                para={""}
              />
            </div>
            <div className="form-row">
              <Input
                type="text"
                className="form-control"
                label="Số điện thoại"
                placeholder={"Số điện thoại"}
                id={"phone"}
                validate={register("phone", { ...validatePhone })}
                errors={errors.phone}
                para={""}
              />
            </div>
            <div className="form-row">
              <Input
                type="text"
                className="form-control"
                label="Địa chỉ"
                placeholder={"Địa chỉ"}
                id={"address"}
                validate={register("address", {
                  required: "Bạn phải nhập địa chỉ",
                })}
                errors={errors.address}
                para={""}
              />
            </div>
            <div className="additional-field">
              <p className="title-info-payment text-uppercase">
                Thông tin thêm
              </p>
              <p className="note">Lưu ý cho đơn hàng (tùy chọn)</p>
              <textarea
                className="text-additional"
                name="additional"
                id="additional"
                rows="4"
                placeholder="Viết lưu ý cho cửa hàng, ví dụ: lưu ý khi vận chuyển."
                onChange={(e) => setAdditional(e.target.value)}
              />
            </div>
          </div>
          <div className="col-5">
            <div className="summary-order">
              <p className="title">Tóm tắt đơn hàng</p>
              <div className="info-cart">
                <span className="left">Thành tiền</span>
                <span className="right price">{formatPrice(totalPrice)}</span>
              </div>
              <div className="info-cart border-bottom">
                <span className="left">Vận chuyển</span>
                <span className="right">
                  Phí vận chuyển sẽ từ 10.000 - 30.000đ. Vui lòng thanh toán cho
                  bên giao hàng
                </span>
              </div>
              <div className="info-cart">
                <span className="left">Tổng cộng</span>
                <span className="right price">{formatPrice(totalPrice)}</span>
              </div>
              <div className="products">
                <p className="title">Sản phẩm</p>
                <ul className="list-cart">
                  {listProduct.map((item, index) => (
                    <li className="item-cart" key={index}>
                      <div className="img-product-cart">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="info-product-cart">
                        <p className="name-product">{item.name}</p>
                        <span className="quantity-product">x1</span>
                        <span className="price">
                          {formatPrice((item.price || 0) - (item.price || 0)*(item.discount || 0)/100)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div>
                  <PayPalButton 
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Thanh toán bằng tiền mặt
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;
