import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";

const StreetLists = (props) => {
  let { streets, limit, page, totalPages, onPageChange, onLimitChange } = props;

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>District</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {streets.slice(0, limit).map((street) => (
                <TableRow hover key={street.id}>
                  <TableCell>
                    <Typography color="textPrimary">{street.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {street.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{street.description}</TableCell>
                  <TableCell>{street.status}</TableCell>
                  <TableCell>{format(street.createdAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(street.updatedAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{street.district.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalPages}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default StreetLists;
