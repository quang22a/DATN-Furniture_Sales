import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';

import { getListProductRs } from '../stores/action';
import { addToCartAction } from "../../cart/stores/action";
import { formatPrice } from "../../../shared/helpers/utils/formatPrice";

const ProductRs = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const listProductRs = useSelector((state) => state.productReducer.listRs);
  const cart = useSelector((state) => state.cartReducer.data);
  const token = localStorage.getItem("token");

  const [settings, setSettings] = useState({
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (token) {
      dispatch(getListProductRs());
    }
  }, []);

  useEffect(() => {
    setSettings({
      ...settings,
      infinite: listProductRs && listProductRs.length > 4 ? true : false,
    });
  }, [listProductRs]);

  return (
    <>
     {listProductRs && listProductRs.length > 0 ? (
       <section className='product-rs'>
        <h3>Sản phẩm được gợi ý</h3>
        <ul className='slide-wrap'>
          <Slider {...settings}>
            {
              listProductRs.slice(0, 10).map((item, index) => (
                <li key={index} className="">
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
              ))
            }
          </Slider>
        </ul>
       </section>
     ):''}
    </>
  )
}

export default ProductRs;
