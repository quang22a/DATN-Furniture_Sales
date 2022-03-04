import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import qs from 'qs';

import Pagination from "@mui/material/Pagination";
import PageRenderer from "../../../shared/components/modules/PageRenderer";
import { ListProduct } from "../../../shared/components/product/ListProduct";
import {
  getListProduct,
  getListCategory,
  getListBrand,
} from "../stores/action";
import ProductRs from '../components/ProductRs';

const ListProductRenderer = PageRenderer(ListProduct);

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = location.search;
  const objQuery = new URLSearchParams(query);

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
    setSortPrice(objQuery.get('sortPrice'));
    setSearchCategory(objQuery.get('category'));
    setSearchBrand(objQuery.get('brand'));
    // dispatch(setTextSearch(objQuery.get('search')));
  }, []);

  useEffect(() => {
    dispatch(
      getListProduct(searchCategory, searchBrand, sortPriceState, 1, 12, search)
    );
    updateURL(1);
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

  const updateURL = (pageUpdate) => {
    const newUrl = qs.stringify(
      {
        category: searchCategory || null,
        brand: searchBrand || null,
        sortPrice: sortPriceState === 'desc' ? sortPriceState : null,
      },
      { encode: false, skipNulls: true, arrayFormat: 'comma', addQueryPrefix: true },
    )
    navigate(`..${newUrl}`)
  }

  return (
    <section className="section-product-list">
      <div className="container">
        <form className="form-product-list">
          <div className="search-field">
            {
              listCategories &&  <div className="sort">
                <p>Danh mục</p>
                <select
                  className="sort-list"
                  defaultValue={objQuery.get('category') && listCategories ? listCategories.find((item) => item._id === objQuery.get('category'))?._id : ''}
                  onChange={(e) => changeSearchCategory(e)}
                >
                  <option value="">Chọn danh mục</option>
                  {listCategories.map((item, index) => (
                    <option value={item._id} key={`category-${index}`}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            }
            {listBrands && <div className="sort">
                <p>Thương hiệu</p>
                <select
                  className="sort-list"
                  defaultValue={objQuery.get('brand') && listBrands ? listBrands.find((item) => item._id === objQuery.get('brand'))?._id : ''}
                  onChange={(e) => changeSearchBrand(e)}
                >
                  <option value="">Chọn thương hiệu</option>
                  {listBrands.map((item, index) => (
                      <option value={item._id} key={`brand-${index}`}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            }
            <div className="sort">
              <p>Giá</p>
              <select
                className="sort-list"
                defaultValue={objQuery.get('sortPrice')}
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
        <ProductRs />
      </div>
    </section>
  );
};

export default ProductList;
