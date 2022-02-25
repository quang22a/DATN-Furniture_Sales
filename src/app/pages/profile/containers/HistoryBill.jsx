import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getHistoryBill } from "../stores/action";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";

import { convertDate } from "../../../shared/helpers/utils/convertDate";

const status = {
  new: "Mới",
  shipping: "Đang giao",
  done: "Đã hoàn thành",
};

const HistoryBill = () => {
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.profileReducer.historyBill);

  useEffect(() => {
    dispatch(getHistoryBill());
  }, []);

  const columns = [
    {
      id: "totalPrice",
      label: "Tổng tiền",
      type: "number",
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
    },
    {
      id: "updatedAt",
      label: "Ngày cập nhật",
    },
    {
      id: "paymentStatus",
      label: "Thanh toán",
      type: "boolean",
      align: "center",
    },
    {
      id: "status",
      label: "Trạng thái",
      align: "center",
    },
    {
      id: "action",
      label: "",
    },
  ];

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className="section-profile">
      <div className="container">
        <div className="profile">
          <p className="text-uppercase title-profile">Đơn hàng</p>
          <ul className="list-bill">
            {bill && bill.listProduct
              ? bill.map(
                  (item, index) => (
                    <li key={`bill-${index}`}>
                      <ul className="list-product-bill"></ul>
                    </li>
                  )
                  // bill.listProduct.map((item1, index1) => (
                  //   <li className="item-bill" key={`${index}-${index1}`}>
                  //     <div className="description">
                  //       <div className="img-product-bill">
                  //         <img
                  //           src={item1?.productImg}
                  //           alt={item1?.productImg}
                  //         />
                  //       </div>
                  //       <div className="info-product-bill">
                  //         <p className="name-product">{item1?.productName}</p>
                  //         <span className="quantity-product">
                  //           {item1?.quantity}
                  //         </span>
                  //         <span className="price">{item1?.price}</span>
                  //       </div>
                  //     </div>
                  //     <div className="action">
                  //       <span className="time">{item?.createdAt}</span>
                  //       <button
                  //         className="btn btn-black"
                  //         onClick={() => openModalRating()}
                  //       >
                  //         Đánh giá
                  //       </button>
                  //     </div>
                  //   </li>
                )
              : ""}
            {bill ? (
              <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bill.map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            {columns.map((column) => {
                              let value = row[column.id];
                              if (
                                column.id === "createdAt" ||
                                column.id === "updatedAt"
                              ) {
                                value = convertDate(value);
                              }
                              if (column.id === "paymentStatus") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <Switch
                                      {...label}
                                      style={{ textAlign: "center" }}
                                      checked={value}
                                    />
                                  </TableCell>
                                );
                              }
                              if (column.id === "action") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <Link
                                      to={`/profile/bills/${row._id}`}
                                      className="btn btn-edit"
                                    >
                                      Chi tiết
                                    </Link>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === "status"
                                    ? status[value]
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoryBill;
