import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { setModal } from "../../../stores/modal/action";
import { getProductOfBill, getDetailBill } from "../stores/action";
import { formatPrice } from "../../../shared/helpers/utils/formatPrice";
import { addRating } from "../../product/stores/action";

const status = {
  new: "Mới",
  shipping: "Đang giao",
  done: "Đã hoàn thành",
};

const ProductBill = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dataProducts, setDataProducts] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [indexShowRating, setIndexShowRating] = useState(null);

  const profileUser = useSelector((state) => state.profileReducer.dataProfile);
  const bill = useSelector((state) => state.profileReducer.bill);
  const listProduct = useSelector(
    (state) => state.profileReducer.listProductBill
  );

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getDetailBill(id));
    dispatch(getProductOfBill(id));
  }, []);

  const sendComment = async (productInfo) => {
    const data = {
      customerId: profileUser._id,
      customerInfo: {
        name: profileUser.name,
      },
      productId: productInfo.productId,
      rating: parseInt(rating),
      comment: comment,
      customerIdRating: profileUser.idRating,
      productIdRating: productInfo.product[0].idRating,
    };
    await dispatch(addRating(data));
    setRating(0);
    setComment("");
  };

  return (
    <section className="section-bill-detail">
      <div className="container">
        <p className="title text-uppercase">Thông tin đơn hàng</p>
        <div className="bill">
          <p className="title-bill">Thông tin khách hàng</p>
          <div className="bill-info">
            <span className="left">Tên khách hàng</span>
            <span className="right">{bill?.name}</span>
          </div>
          <div className="bill-info">
            <span className="left">Số điện thoại</span>
            <span className="right">{bill?.phone}</span>
          </div>
          <div className="bill-info">
            <span className="left">Địa chỉ email</span>
            <span className="right">{bill?.email}</span>
          </div>
          <div className="bill-info">
            <span className="left">Địa chỉ</span>
            <span className="right">{bill?.address}</span>
          </div>
          <p className="title-bill">Thông tin đơn hàng</p>
          <div className="bill-info">
            <span className="left">Tổng sản phẩm</span>
            <span className="right">{bill?.totalProduct}</span>
          </div>
          <div className="bill-info">
            <span className="left">Tổng tiền</span>
            <span className="right">{bill?.totalPrice}</span>
          </div>
          <div className="bill-info">
            <span className="left">Phương thức thanh toán</span>
            <span className="right">
              {bill?.paymentMethod === "Paypal" ? "Chuyển khoản" : "Tiền mặt"}
            </span>
          </div>
          {bill?.additional && (
            <div className="bill-info">
              <span className="left">Thông tin thêm</span>
              <span className="right">{bill?.additional}</span>
            </div>
          )}

          <div className="bill-info">
            <span className="left">Trạng thái thanh toán</span>
            <span className="right">
              {bill?.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
          </div>
          <div className="bill-info">
            <span className="left">Trạng thái đơn hàng</span>
            <span className="right">{status[bill?.status]}</span>
          </div>
          <ul className="list-product">
            {listProduct?.map((item, index) => (
              <li className="item-cart" key={index}>
                <div className="item">
                  <div className="img-product-cart">
                    <img
                      src={item.product[0].image}
                      alt={item.product[0].name}
                    />
                  </div>
                  <div className="info-product-cart">
                    <p className="name-product">{item.product[0].name}</p>
                    <span className="quantity-product">x{item.quantity}</span>
                    <span className="price">
                      {formatPrice(item.product[0].price || 0)}
                    </span>
                  </div>
                  {
                    status[bill?.status] === "Đã hoàn thành" ? (
                      <button
                        className="btn btn-black btn-show-rating"
                        onClick={() =>
                          setIndexShowRating(
                            indexShowRating === index ? null : index
                          )
                        }
                      >
                        Đánh giá
                      </button>
                    ) :
                    ''
                  }
                </div>
                {indexShowRating === index && (
                  <div className="section-rating">
                    {[...Array(5)].map((item, index) => (
                      <i
                        className={`far fa-star ${
                          index + 1 <= rating ? "active" : ""
                        }`}
                        id={index + 1}
                        key={index}
                        onClick={(e) => {
                          setRating(rating !== e.target.id ? e.target.id : 0);
                        }}
                      ></i>
                    ))}
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Nhập đánh giá ở đây"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      className="btn btn-black"
                      onClick={() => sendComment(item)}
                    >
                      Gửi
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductBill;
