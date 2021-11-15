import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesTrending, getBrandsFeatured } from "./stores/action";

import { ListCategory } from "../../shared/components/category/ListCategory";
import { ListBrand } from "../../shared/components/brand/ListBrand";
import { ListProduct } from "../../shared/components/product/ListProduct";
import PageRenderer from "../../shared/components/modules/PageRenderer";
import { Contact } from "../../shared/components/contact/Contact";
import bedroom from "../../../assets/images/bedroom.jpg";
import livingroom from "../../../assets/images/livingroom.jpg";
import outdoor from "../../../assets/images/outdoor.jpg";
import p1 from "../../../assets/images/p1.png";
import p2 from "../../../assets/images/p2.png";
import p3 from "../../../assets/images/p3.png";
import p4 from "../../../assets/images/p4.png";
import product from "../../../assets/images/product.jpg";

const ListProductNew = PageRenderer(ListProduct);

const Home = () => {
  const dispatch = useDispatch();

  const errorCategory = useSelector((state) => state.homeReducer.errorCategory);
  const errorBrand = useSelector((state) => state.homeReducer.errorBrand);
  const categoriesTrending = useSelector(
    (state) => state.homeReducer.dataCategoryTrending
  );
  const brandFeatured = useSelector(
    (state) => state.homeReducer.dataBrandFeatured
  );

  useEffect(() => {
    console.log(categoriesTrending, brandFeatured);
  }, [categoriesTrending, brandFeatured]);

  useEffect(() => {
    dispatch(getCategoriesTrending());
    dispatch(getBrandsFeatured());
  }, []);

  const listCategory = [
    {
      id: 1,
      title: "outdoor",
      name: "Ngoài trời",
      img: outdoor,
    },
    {
      id: 2,
      title: "livingroom",
      name: "Phòng khách",
      img: livingroom,
    },
    {
      id: 3,
      title: "bedroom",
      name: "Phòng ngủ",
      img: bedroom,
    },
  ];
  const listBrand = [
    {
      id: 1,
      title: "bed",
      name: "Giường",
      img: p1,
      price: 80,
    },
    {
      id: 2,
      title: "chair",
      name: "Ghế",
      img: p2,
    },
    {
      id: 3,
      title: "cabinet",
      name: "Tủ",
      img: p3,
    },
    {
      id: 3,
      title: "shoescabinet",
      name: "Tủ giày",
      img: p4,
    },
  ];
  const listProduct = [
    {
      id: 1,
      title: "bed",
      name: "Giường",
      img: product,
      price: 80,
    },
    {
      id: 2,
      title: "chair",
      name: "Ghế",
      img: product,
    },
    {
      id: 3,
      title: "cabinet",
      name: "Tủ",
      img: product,
    },
    {
      id: 3,
      title: "shoescabinet",
      name: "Tủ giày",
      img: product,
    },
  ];
  return (
    <>
      <section className="section-category">
        <div className="container">
          <h2 className="title-h2">
            <strong>Danh mục </strong>nổi bật
          </h2>
          <ListCategory data={listCategory.slice(0, 3)} />
        </div>
      </section>
      <section className="section-brand">
        <div className="container">
          <h2 className="title-h2">
            <strong>Thương hiệu </strong>nổi bật
          </h2>
          <ListBrand data={listBrand.slice(0, 4)} />
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
          <ListProductNew data={listProduct.slice(0, 4)} />
        </div>
      </section>
      <Contact />
    </>
  );
};

export default Home;
