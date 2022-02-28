import React, { useEffect, useState, useCallback } from "react";
import { DashboardLayout } from "./../../components/dashboard-layout";
import StreetLists from "./../../components/street/street-list";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { API, CONFIG } from "../../utils/api";
import { StreetListToolbar } from "./../../components/street/street-toolbar";

const Streets = () => {
  const [streets, setStreets] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const fetchStreets = useCallback(async (limit, page, name = "", districtId = "") => {
    await axios
      .get(
        API.GET_STREETS.url + `?limit=${limit}&page=${page}&name=${name}&districtId=${districtId}`,
        CONFIG
      )
      .then((res) => {
        setStreets(res.data.data);
        setPageCount(res.data.count);
      });
  }, []);

  useEffect(() => {
    fetchStreets(limit, page);
  }, [limit, page, fetchStreets]);

  return (
    <>
      <Container maxWidth={false}>
        <StreetListToolbar
          fetchStreets={fetchStreets}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <Box sx={{ mt: 3 }}>
          <StreetLists
            streets={streets}
            onLimitChange={handleLimitChange}
            onPageChange={handlePageChange}
            page={page}
            limit={limit}
            totalPages={pageCount}
          />
        </Box>
      </Container>
    </>
  );
};

Streets.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Streets;
