import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteProductAction, addToCartAction } from "../stores/action";
import { formatPrice } from "../../../shared/helpers/utils/formatPrice";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(data.quantity);

  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
  };

  const onChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const updateProduct = (quantity) => {
    setQuantity(quantity);
  };

  useEffect(() => {
    if (quantity > 0) {
      dispatch(addToCartAction(data, quantity));
    }
  }, [quantity]);

  return (
    <li className="item-cart">
      <div className="img-product-cart">
        <img src={data.image} alt={data.name} />
      </div>
      <div className="info-product-cart">
        <Link
          to={`products/${data._id}`}
          className="btn btn-outline name-product"
        >
          {data.name}
        </Link>
        <p className="attribute-product">Chất liệu: {data.material}</p>
        {/* <p className="price">{formatPrice(data.price || 0)}</p> */}
        {
          data?.discount > 0 ? 
            <>
            <del className="price">{formatPrice(data?.price || 0)}</del>
            <p className="price discount-price">{formatPrice((data?.price || 0)-(data?.price || 0)*data?.discount/100)}</p>
            </>
          : <p className="price">{formatPrice(data?.price || 0)}</p>
        }                    
        <div className="quantity-product">
          <button
            type="button"
            className="quantity"
            disabled={data.quantity === 1 ? true : false}
            onClick={() => updateProduct(data.quantity - 1)}
          >
            -
          </button>
          <input
            name="quantity_product"
            className="quantity"
            type="number"
            min="1"
            value={data.quantity}
            onChange={() => {}}
          />
          <button
            type="button"
            className="quantity"
            onClick={() => updateProduct(data.quantity + 1)}
          >
            +
          </button>
        </div>
        <i className="fas fa-trash" onClick={() => deleteProduct(data._id)}></i>
      </div>
    </li>
  );
};

export default CartItem;
