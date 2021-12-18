import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { Input } from "../../../shared/components/partials/Input";
import product from "../../../../assets/images/product.jpg";

const ProductDetail = () => {
  const { register, watch, control, setValue } = useForm();
  const [sortPrice, setSortPrice] = useState("asc");
  const [quantity, setQuantity] = useState(1);
  const [checkMoreInfo, setCheckMoreInfo] = useState(0);
  const [addRating, setAddRating] = useState(0);

  const productDetail = {
    id: 11,
    title: "cabinet",
    name: "Tủ",
    img: product,
  };

  const token = localStorage.getItem("token");

  return (
    <section className="section-product-detail">
      <div className="container">
        <div className="product-detail row">
          <div className="col-6 product-detail-img">
            <img src={productDetail.img} alt={productDetail.name} />
          </div>
          <div className="col-6">
            <h2 className="product-name">{productDetail.name}</h2>
            <div className="is-divider"></div>
            <p className="product-price">44VNĐ</p>
            <div className="product-attribute">
              <p>Thương hiệu:</p>
              <span>Aaron</span>
            </div>
            <div className="product-attribute">
              <p>Danh mục:</p>
              <span>Phòng ngủ</span>
            </div>
            <div className="product-attribute">
              <p>Chất liệu:</p>
              <span>Phòng ngủ</span>
            </div>
            <div className="form-add-to-cart">
              <div className="quantity-product">
                <button
                  type="button"
                  className="quantity"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1 ? true : false}
                >
                  -
                </button>
                <input
                  name="quantity_product"
                  className="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                />
                <button
                  type="button"
                  className="quantity"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="btn btn-primary">Thêm vào giỏ</button>
            </div>
            <div className="more-info">
              <ul className="list-option">
                <li className={checkMoreInfo === 0 ? "active" : ""}>
                  <button onClick={() => setCheckMoreInfo(0)}>Mô tả</button>
                </li>
                <li className={checkMoreInfo === 1 ? "active" : ""}>
                  <button onClick={() => setCheckMoreInfo(1)}>
                    Đánh giá(0)
                  </button>
                </li>
                <li className={checkMoreInfo === 2 ? "active" : ""}>
                  <button onClick={() => setCheckMoreInfo(2)}>Bảo hành</button>
                </li>
                <li className={checkMoreInfo === 3 ? "active" : ""}>
                  <button onClick={() => setCheckMoreInfo(3)}>
                    Vận chuyển
                  </button>
                </li>
              </ul>
              <div className="tab-panels">
                <div className={checkMoreInfo !== 0 ? "hide" : ""}>
                  <p>
                    Khay donut hình tròn bằng gốm trông giống hệt mọt chiếc bánh
                    donut nhưng không có lỗ sẽ là một vật đựng đồ hoặc trang trí
                    trên bàn ăn tuyệt vời.
                  </p>
                </div>
                <div className={checkMoreInfo !== 1 ? "hide" : ""}>
                  <p>Chưa có bài đánh giá</p>
                  {token ? (
                    <p>Bạn phải đăng nhập để đánh giá sản phẩm này</p>
                  ) : (
                    <>
                      {[...Array(5)].map((item, index) => (
                        <i
                          class={`far fa-star ${
                            index + 1 <= addRating ? "active" : ""
                          }`}
                          id={index + 1}
                          key={index}
                          onClick={(e) => {
                            setAddRating(
                              addRating !== e.target.id ? e.target.id : 0
                            );
                          }}
                        ></i>
                      ))}
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Nhập đánh giá ở đây"
                      />
                      <button className="btn btn-black">Gửi</button>
                    </>
                  )}
                </div>
                <div className={checkMoreInfo !== 2 ? "hide" : ""}>
                  <p>
                    Các sản phẩm nội thất tại Nhà Xinh đa số đều được sản xuất
                    tại nhà máy của công ty cổ phần xây dựng kiến trúc AA với
                    đội ngũ nhân viên và công nhân ưu tú cùng cơ sở vật chất
                    hiện đại (http://www.aacorporation.com/). Nhà Xinh đã kiểm
                    tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản phẩm hoàn
                    thiện cuối cùng.
                  </p>
                  <p>
                    Nhà Xinh bảo hành một năm cho các trường hợp có lỗi về kỹ
                    thuật trong quá trình sản xuất hay lắp đặt.
                  </p>
                  <p>
                    Quý khách không nên tự sửa chữa mà hãy báo ngay cho Nhà Xinh
                    qua hotline: 1800 7200.
                  </p>
                </div>
                <div className={checkMoreInfo !== 3 ? "hide" : ""}>
                  <p className="title">Giao hàng tận nơi</p>
                  <p>
                    Nhà Xinh cung cấp dịch vụ giao hàng tận nơi, lắp ráp và sắp
                    xếp vị trí theo đúng ý muốn của quý khách:
                  </p>
                  <p>
                    - MIỄN PHÍ giao hàng trong các Quận nội thành Tp.Hồ Chí Minh
                    và Hà Nội, áp dụng cho các đơn hàng trị giá trên 10 triệu.
                  </p>
                  <p>
                    - Đối với khu vực các tỉnh lân cận: Tính phí hợp lý theo dựa
                    trên quãng đường vận chuyển.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
