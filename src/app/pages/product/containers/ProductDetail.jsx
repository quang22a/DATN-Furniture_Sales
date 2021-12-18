import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import {
  getDetailProduct,
  getListCategory,
  getListBrand,
  addRating,
  getRatings,
} from "../stores/action";
import { addToCartAction } from "../../cart/stores/action";
import ListComment from "../components/ListComment";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [checkMoreInfo, setCheckMoreInfo] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetail = useSelector((state) => state.productReducer.dataDetail);
  const listCategories = useSelector(
    (state) => state.productReducer.listCategories
  );
  const profileUser = useSelector((state) => state.profileReducer.dataProfile);
  const listBrands = useSelector((state) => state.productReducer.listBrands);
  const cart = useSelector((state) => state.cartReducer.data);
  const listRatings = useSelector((state) => state.productReducer.listRatings);

  useEffect(() => {
    dispatch(getDetailProduct(id));
    dispatch(getListCategory());
    dispatch(getListBrand());
    dispatch(getRatings(id, 1));
  }, []);

  const token = localStorage.getItem("token");

  const sendComment = async () => {
    const data = {
      customerId: profileUser._id,
      customerInfo: {
        name: profileUser.name,
      },
      productId: productDetail._id,
      rating: parseInt(rating),
      comment: comment,
    };
    await dispatch(addRating(data));
    dispatch(getRatings(id, 1));
    setRating(0);
    setComment("");
  };

  const addToCart = () => {
    let oldQuantity = 0;
    for (let item of cart) {
      if (item._id === id) {
        oldQuantity = item.quantity;
      }
    }
    dispatch(addToCartAction(productDetail, oldQuantity + quantity));
  };

  return (
    <section className="section-product-detail">
      <div className="container">
        {productDetail && (
          <div className="product-detail row">
            <div className="col-6 product-detail-img">
              <img src={productDetail.image} alt={productDetail.name} />
            </div>
            <div className="col-6">
              <h2 className="product-name">{productDetail.name}</h2>
              <div className="is-divider"></div>
              <p className="price">{productDetail.price}</p>
              <div className="product-attribute">
                <p>Thương hiệu:</p>
                <span>
                  {
                    listBrands?.find(
                      (item) => item._id === productDetail.brandId
                    )?.name
                  }
                </span>
              </div>
              <div className="product-attribute">
                <p>Danh mục:</p>
                <span>
                  {
                    listCategories?.find(
                      (item) => item._id === productDetail.categoryId
                    )?.name
                  }
                </span>
              </div>
              <div className="product-attribute">
                <p>Chất liệu:</p>
                <span>{productDetail.material}</span>
              </div>
              <div className="product-attribute">
                <p>Số lượng:</p>
                <span>{productDetail.quantity}</span>
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
                    onChange={() => {}}
                  />
                  <button
                    type="button"
                    className="quantity"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= productDetail.quantity ? true : false}
                  >
                    +
                  </button>
                </div>
                {token && (
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart()}
                  >
                    Thêm vào giỏ
                  </button>
                )}
              </div>
              <div className="more-info">
                <ul className="list-option">
                  <li className={checkMoreInfo === 0 ? "active" : ""}>
                    <button onClick={() => setCheckMoreInfo(0)}>Mô tả</button>
                  </li>
                  <li className={checkMoreInfo === 1 ? "active" : ""}>
                    <button onClick={() => setCheckMoreInfo(1)}>
                      Đánh giá(
                      {listRatings && listRatings.result?.length
                        ? listRatings.result?.length
                        : 0}
                      )
                    </button>
                  </li>
                  <li className={checkMoreInfo === 2 ? "active" : ""}>
                    <button onClick={() => setCheckMoreInfo(2)}>
                      Bảo hành
                    </button>
                  </li>
                  <li className={checkMoreInfo === 3 ? "active" : ""}>
                    <button onClick={() => setCheckMoreInfo(3)}>
                      Vận chuyển
                    </button>
                  </li>
                </ul>
                <div className="tab-panels">
                  <div className={checkMoreInfo !== 0 ? "hide" : ""}>
                    <p>{productDetail.description}</p>
                  </div>
                  <div className={checkMoreInfo !== 1 ? "hide" : ""}>
                    {listRatings && listRatings.result?.length ? (
                      ""
                    ) : (
                      <p>Chưa có bài đánh giá</p>
                    )}

                    {!token ? (
                      <p>Bạn phải đăng nhập để đánh giá sản phẩm này</p>
                    ) : (
                      <>
                        {[...Array(5)].map((item, index) => (
                          <i
                            className={`far fa-star ${
                              index + 1 <= rating ? "active" : ""
                            }`}
                            id={index + 1}
                            key={index}
                            onClick={(e) => {
                              setRating(
                                rating !== e.target.id ? e.target.id : 0
                              );
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
                          onClick={() => sendComment()}
                        >
                          Gửi
                        </button>
                      </>
                    )}
                    <ListComment data={listRatings ? listRatings.result : []} />
                  </div>
                  <div className={checkMoreInfo !== 2 ? "hide" : ""}>
                    <p>
                      Các sản phẩm nội thất tại Luxury House đa số đều được sản
                      xuất tại nhà máy của công ty cổ phần xây dựng kiến trúc AA
                      với đội ngũ nhân viên và công nhân ưu tú cùng cơ sở vật
                      chất hiện đại và được nhập từ các thương hiệu nổi tiếng.
                      Luxury House đã kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho
                      đến sản phẩm hoàn thiện cuối cùng.
                    </p>
                    <p>
                      Luxury House bảo hành một năm cho các trường hợp có lỗi về
                      kỹ thuật trong quá trình sản xuất hay lắp đặt.
                    </p>
                    <p>
                      Quý khách không nên tự sửa chữa mà hãy báo ngay cho Nhà
                      Xinh qua hotline: 1234 5678.
                    </p>
                  </div>
                  <div className={checkMoreInfo !== 3 ? "hide" : ""}>
                    <p className="title">Giao hàng tận nơi</p>
                    <p>
                      Luxury House cung cấp dịch vụ giao hàng tận nơi, lắp ráp
                      và sắp xếp vị trí theo đúng ý muốn của quý khách:
                    </p>
                    <p>
                      - MIỄN PHÍ giao hàng trong các Quận nội thành Tp.Đà Nẵng,
                      áp dụng cho các đơn hàng trị giá trên 10 triệu.
                    </p>
                    <p>
                      - Đối với khu vực các tỉnh lân cận: Tính phí hợp lý theo
                      dựa trên quãng đường vận chuyển.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
