import { InputBase, TableCell, TableRow, withStyles } from "@material-ui/core";
import React, { FC, useCallback } from "react";

export interface ItemProps {
  description?: string;
  qty?: number;
  unitPrice?: number;
  total?: number;
}

export interface InvoiceItemProps {
  id: number;
  data: ItemProps;
  onChange?: (items: ItemProps, id: number) => void;
}

const StyledInputBase = withStyles(() => ({
  root: {
    padding: 0,
    width: "100%",
    fontSize: 12,
  },
}))(InputBase);

const StyledTableCell = withStyles(() => ({
  root: {
    padding: "8px 0",
    fontSize: 12,
  },
}))(TableCell);

export const InvoiceItem: FC<InvoiceItemProps> = ({ id, data, onChange }) => {
  const handleFieldChange = useCallback(
    (event) => {
      const name = event?.target?.name;
      const value = event?.target?.value;

      if (name && value && name !== "total") {
        onChange &&
          onChange({ ...data, [event.target.name]: event.target.value }, id);
      }
    },
    [onChange, data, id],
  );

  /**
   * description
   * qty
   * unit_price
   * total
   */
  return (
    <TableRow>
      <StyledTableCell component="th" scope="row">
        <StyledInputBase
          type="text"
          name="description"
          value={data.description}
          onChange={handleFieldChange}
        />
      </StyledTableCell>
      <StyledTableCell>
        <StyledInputBase
          name="qty"
          type="number"
          value={data.qty}
          onChange={handleFieldChange}
        />
      </StyledTableCell>
      <StyledTableCell>
        <StyledInputBase
          name="unitPrice"
          type="number"
          value={data.unitPrice}
          onChange={handleFieldChange}
        />
      </StyledTableCell>
      <StyledTableCell>
        <StyledInputBase
          type="text"
          name="total"
          disabled
          value={data.qty && data.unitPrice ? data.qty * data.unitPrice : 0}
          onChange={handleFieldChange}
        />
      </StyledTableCell>
    </TableRow>
  );
};
