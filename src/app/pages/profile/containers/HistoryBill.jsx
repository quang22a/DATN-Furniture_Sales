import { useEffect } from "react";
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
                                    {value ? 'Đã thanh toán' : 'Chưa thanh toán'}
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
