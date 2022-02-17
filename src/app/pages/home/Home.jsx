import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesTrending,
  getBrandsFeatured,
  getListProductNew,
  getNoti
} from "./stores/action";

import { ListCategory } from "../../shared/components/category/ListCategory";
import { ListBrand } from "../../shared/components/brand/ListBrand";
import { ListProduct } from "../../shared/components/product/ListProduct";
import PageRenderer from "../../shared/components/modules/PageRenderer";
import { Contact } from "../../shared/components/contact/Contact";

const ListProductNew = PageRenderer(ListProduct);

const Home = () => {
  const dispatch = useDispatch();

  const listProductsNew = useSelector(
    (state) => state.homeReducer.dataProductsNew
  );
  const categoriesTrending = useSelector(
    (state) => state.homeReducer.dataCategoryTrending
  );
  const brandFeatured = useSelector(
    (state) => state.homeReducer.dataBrandFeatured
  );
  const noti = useSelector(
    (state) => state.homeReducer.dataNoti
  )

  useEffect(() => {
    dispatch(getCategoriesTrending());
    dispatch(getBrandsFeatured());
    dispatch(getListProductNew());
    dispatch(getNoti());
  }, []);

  return (
    <>
      <section className="section-category">
        <div className="container">
          <h2 className="title-h2">
            <strong>Danh mục </strong>nổi bật
          </h2>
          <ListCategory data={categoriesTrending?.slice(0, 3)} />
        </div>
      </section>
      <section className="section-brand">
        <div className="container">
          <h2 className="title-h2">
            <strong>Thương hiệu </strong>nổi bật
          </h2>
          <ListBrand data={brandFeatured?.slice(0, 4)} />
        </div>
      </section>
      {
        noti && <section className="section-notification">
          <div className="container">
            <h2 className="title-h2">Thông báo mới nhất</h2>
            <div className="notification">
              <div className="msg-notification">
                <p className="title-noti">{noti.title}</p>
                <p className="content-noti">{noti.content}</p>
              </div>
              <div className="img-notification">
                <img
                  src={noti.image}
                  alt="Thông báo mới"
                />
              </div>
            </div>
          </div>
        </section>
      }
      <section className="section-product">
        <div className="container">
          <h2 className="title-h2">
            <strong>Sản phẩm </strong>mới nhất
          </h2>
          <ListProductNew data={listProductsNew} />
        </div>
      </section>
      <Contact />
    </>
  );
};

export default Home;
