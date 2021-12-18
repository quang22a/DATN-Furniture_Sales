import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { addToCartAction } from "../../../pages/cart/stores/action";
import { formatPrice } from "../../helpers/utils/formatPrice";

export const ListProduct = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.data);

  const addToCart = (e, product) => {
    let oldQuantity = 0;
    for (let item of cart) {
      if (item._id === product._id) {
        oldQuantity = item.quantity;
      }
    }
    dispatch(addToCartAction(product, oldQuantity + 1));
    e.stopPropagation();
  };

  return (
    <>
      <ul className="row product-group">
        {data && Array.isArray(data) && data.length > 0
          ? data.map((item, index) => {
              return (
                <li className="product-item col-3" key={`cate-${index}`}>
                  <Link to={`/products/${item._id}`}>
                    <div className="product-item-description">
                      <div className="product-img">
                        <img src={item?.image} alt={item?.name} />
                      </div>
                      <div className="product-body">
                        <div className="product-title">
                          <h4 className="product-name">{item?.name}</h4>
                        </div>
                        <p className="price">{formatPrice(item?.price || 0)}</p>
                      </div>
                    </div>
                  </Link>
                  {location.pathname.indexOf("/products") !== -1 && (
                    <button
                      className="btn btn-primary btn-add-cart"
                      onClick={(e) => addToCart(e, item)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  )}
                </li>
              );
            })
          : ""}
      </ul>
    </>
  );
};
