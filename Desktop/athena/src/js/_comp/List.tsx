import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { head } from "lodash";
import React, { FC, memo } from "react";
import { useHistory } from "react-router-dom";

export interface ListProps {
  headers: string[];
  collection: string[][];
}

export const List: FC<ListProps> = memo(({ headers, collection }) => {
  const history = useHistory();

  return (
    <div className="list">
      <TableContainer component="div">
        <Table aria-label="invoice items">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {headers.map((field: string, index: number) => (
                <TableCell key={index}>{field}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map((item, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {item.map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() =>
                      history.push(`/admin/menu/edit/${head(item)}`)
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});
