import { Link } from "react-router-dom";

export const ListProduct = ({ data }) => {
  return (
    <>
      <ul className="row product-group">
        {data && Array.isArray(data) && data.length > 0
          ? data.map((item, index) => {
              return (
                <li className="product-item col-3" key={`cate-${index}`}>
                  <Link to={`/product/${item.id}}`}>
                    <div className="product-item-description">
                      <div className="product-img">
                        <img src={item?.img} alt={item?.name} />
                      </div>
                      <div className="product-body">
                        <div className="product-title">
                          <h4 className="product-name">{item?.name}</h4>
                        </div>
                        <p className="product-price">{item?.price}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          : ""}
      </ul>
    </>
  );
};
