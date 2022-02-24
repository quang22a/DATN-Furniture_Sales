import { Link } from "react-router-dom";

import { formatPrice } from "../../helpers/utils/formatPrice";

export const ListProduct = ({ data }) => {

  return (
    <>
      <ul className="row product-group">
        {data && Array.isArray(data) && data.length > 0
          ? data.map((item, index) => (
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
                        {
                          item?.discount > 0 ? 
                            <>
                            <del className="price">{formatPrice(item?.price || 0)}</del>
                            <p className="price discount-price">{formatPrice((item?.price || 0)-(item?.price || 0)*item?.discount/100)}</p>
                            </>
                          : <p className="price">{formatPrice(item?.price || 0)}</p>
                        }                    
                      </div>
                    </div>
                  </Link>
                </li>
              )
            )
          : ""}
      </ul>
    </>
  );
};
