import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { reduce } from "lodash";
import moment from "moment";
import React, { FC, memo, useCallback, useState } from "react";
import "../../../../sass/cms/style.scss";
import { Recipient } from "../../../_comp/_form/grouped/Recipient/Recipient";
import { InvoiceItem, ItemProps } from "./InvoiceItem";

interface InvoiceDataProps {
  uuid?: string;
  dueDate: Date;
  subject: string;
  from: string;
  to: string;
  total: number;
  tax?: number;
  items?: ItemProps[];
}

const StyledTableCell = withStyles(() => ({
  root: {
    padding: "2px 0",
    fontSize: 14,
  },
}))(TableCell);

export const Invoice: FC = memo(() => {
  const [data, setData] = useState<InvoiceDataProps>({
    dueDate: new Date("now"),
    subject: "",
    from: "",
    to: "",
    total: 0,
    items: [
      {
        description: "Trial period with AEI Group",
        qty: 2,
        unitPrice: 229.885,
      },
    ],
  });

  const handleItemChange = useCallback(
    (item: ItemProps, id: number) => {
      if (data?.items?.[id]) {
        setData({
          ...data,
          items: data.items.map((dataItem: ItemProps, index: number) =>
            index === id ? item : dataItem,
          ),
        });
      }
    },
    [setData, data],
  );

  const getSubTotal = (items?: ItemProps[]) =>
    reduce(items, (acc: any, item: any) => acc + item.qty * item.unitPrice, 0);

  return (
    <div className="invoice">
      <div className="invoice__head">
        <div className="invoice-wrapper invoice-wrapper--space-between">
          <div className="invoice__logo">ZM</div>
          <div className="entity entity--align-right">
            <p className="entity__name">Zinox Media</p>
            <p className="entity__address">
              20 Riverview Road <br />
              Greenhithe, Kent <br />
              DA9 9NJ
            </p>
            <p className="entity__email">zinoxmedia@gmail.com</p>
            <p className="entity__phone">07572259862</p>
          </div>
        </div>

        <div className="invoice-wrapper invoice-wrapper--space-between">
          <div className="entity invoice__entity">
            <Recipient />
          </div>
          <div className="entity entity--align-right ">
            <h3 className="entity__name invoice__title">Invoice</h3>
            <p className="entity__other-info">
              <span>Invoice No</span>
              <span>00000002</span>
            </p>
            <p className="entity__other-info">
              <span>Invoice Date</span>
              <span>{moment().format("MMMM D, YYYY")}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="invoice__body">
        <TableContainer component="div">
          <Table aria-label="invoice items">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{ width: "280px", boxSizing: "border-box" }}
                >
                  Description
                </StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Unit Price</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items &&
                data.items.map((item: ItemProps, index: number) => (
                  <InvoiceItem
                    key={index}
                    id={index}
                    data={item}
                    onChange={handleItemChange}
                  />
                ))}
              <TableRow style={{ marginTop: "20px" }}>
                <StyledTableCell colSpan={2} />
                <StyledTableCell
                  style={{
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  Total
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {getSubTotal(data?.items)}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div
          className="invoice-wrapper invoice-wrapper--space-between"
          style={{ marginTop: 80 }}
        >
          <div className="entity">
            <p className="entity__name invoice__title">Account Details</p>
            <p className="entity__other-info">
              <span>Sort Code</span>
              <span>20-25-43</span>
            </p>
            <p className="entity__other-info">
              <span>Account No</span>
              <span>80247758</span>
            </p>
          </div>
          <div className="invoice__logo" />
        </div>
      </div>
    </div>
  );
});
