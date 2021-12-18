import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesTrending,
  getBrandsFeatured,
  getListProductNew,
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

  useEffect(() => {
    dispatch(getCategoriesTrending());
    dispatch(getBrandsFeatured());
    dispatch(getListProductNew());
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
      <section className="section-notification">
        <div className="container">
          <h2 className="title-h2">Thông báo mới</h2>
          <div className="notification">
            <div className="msg-notification">
              <p>Sản phẩm sắp được khuyến mãi</p>
            </div>
            <div className="img-notification">
              <img
                src="https://nhaxinh.com/wp-content/uploads/2021/11/nha-xinh-phong-an-miami-bac-au-1200x800.jpg"
                alt="Khuyến mãi"
              />
            </div>
          </div>
        </div>
      </section>
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
