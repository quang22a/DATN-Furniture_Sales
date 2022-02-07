import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";

import Pagination from "@mui/material/Pagination";
import PageRenderer from "../../../shared/components/modules/PageRenderer";
import { ListProduct } from "../../../shared/components/product/ListProduct";
import {
  getListProduct,
  getListCategory,
  getListBrand,
} from "../stores/action";

const ListProductRenderer = PageRenderer(ListProduct);

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [sortPriceState, setSortPrice] = useState("asc");
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchBrand, setSearchBrand] = useState(null);
  const [page, setPage] = useState(1);

  const listProducts = useSelector((state) => state.productReducer.dataList);
  const listCategories = useSelector(
    (state) => state.productReducer.listCategories
  );
  const listBrands = useSelector((state) => state.productReducer.listBrands);
  const search = useSelector((state) => state.searchReducer.textSearch);

  useEffect(() => {
    dispatch(getListCategory());
    dispatch(getListBrand());
  }, []);

  useEffect(() => {
    setPage(1);
    dispatch(
      getListProduct(searchCategory, searchBrand, sortPriceState, 1, 12, search)
    );
  }, [sortPriceState, searchCategory, searchBrand, search]);

  useEffect(() => {
    dispatch(
      getListProduct(
        searchCategory,
        searchBrand,
        sortPriceState,
        page,
        12,
        search
      )
    );
  }, [page]);

  const searchPrice = (e) => {
    setSortPrice(e.target.value);
  };

  const changeSearchCategory = (e) => {
    setSearchCategory(e.target.value);
  };

  const changeSearchBrand = (e) => {
    setSearchBrand(e.target.value);
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
                onChange={(e) => changeSearchCategory(e)}
              >
                <option value="">Chọn danh mục</option>
                {listCategories &&
                  listCategories.map((item, index) => (
                    <option value={item._id} key={`category-${index}`}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="sort">
              <p>Thương hiệu</p>
              <select
                className="sort-list"
                onChange={(e) => changeSearchBrand(e)}
              >
                <option value="">Chọn thương hiệu</option>
                {listBrands &&
                  listBrands.map((item, index) => (
                    <option value={item._id} key={`brand-${index}`}>
                      {item.name}
                    </option>
                  ))}
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
            <ListProductRenderer data={listProducts?.result} />
          </div>
          <div className="pagination">
            <Pagination
              count={listProducts?.numPages}
              showFirstButton
              showLastButton
              page={page}
              onChange={(e, value) => {
                setPage(value);
              }}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductList;
