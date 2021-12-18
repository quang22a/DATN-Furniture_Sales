import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import PageRenderer from "../../../shared/components/modules/PageRenderer";
import { ListProduct } from "../../../shared/components/product/ListProduct";
import product from "../../../../assets/images/product.jpg";

const ListProductRenderer = PageRenderer(ListProduct);

const ProductList = () => {
  const { register, watch, control, setValue } = useForm();
  const [sortPrice, setSortPrice] = useState("asc");

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
      id: 4,
      title: "shoescabinet",
      name: "Tủ giày",
      img: product,
    },
    {
      id: 5,
      title: "bed",
      name: "Giường",
      img: product,
      price: 80,
    },
    {
      id: 6,
      title: "chair",
      name: "Ghế",
      img: product,
    },
    {
      id: 7,
      title: "cabinet",
      name: "Tủ",
      img: product,
    },
    {
      id: 8,
      title: "shoescabinet",
      name: "Tủ giày",
      img: product,
    },
    {
      id: 9,
      title: "bed",
      name: "Giường",
      img: product,
      price: 80,
    },
    {
      id: 10,
      title: "chair",
      name: "Ghế",
      img: product,
    },
    {
      id: 11,
      title: "cabinet",
      name: "Tủ",
      img: product,
    },
    {
      id: 12,
      title: "shoescabinet",
      name: "Tủ giày",
      img: product,
    },
  ];

  const searchPrice = (e) => {
    setSortPrice(e.target.value);
  };
  return (
    <section className="section-product-list">
      <div className="container">
        <form className="form-product-list">
          <div className="search-field">
            <div className="sort">
              <p>Danh mục</p>
              <select
                className="sort-list"
                defaultValue="asc"
                onChange={(e) => searchPrice(e)}
              >
                <option value="asc">Giá từ thấp đến cao</option>
                <option value="desc"> Giá từ cao đến thấp</option>
              </select>
            </div>
            <div className="sort">
              <p>Thương hiệu</p>
              <select
                className="sort-list"
                defaultValue="asc"
                onChange={(e) => searchPrice(e)}
              >
                <option value="asc">Giá từ thấp đến cao</option>
                <option value="desc"> Giá từ cao đến thấp</option>
              </select>
            </div>
            <div className="sort">
              <p>Giá</p>
              <select
                className="sort-list"
                defaultValue="asc"
                onChange={(e) => searchPrice(e)}
              >
                <option value="asc">Giá từ thấp đến cao</option>
                <option value="desc"> Giá từ cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className="row list-product">
            <ListProductRenderer data={listProduct} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductList;
