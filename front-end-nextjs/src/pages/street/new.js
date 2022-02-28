import React from "react";
import { DashboardLayout } from "./../../components/dashboard-layout";
import { Container, Box } from "@mui/material";
import NewStreet from "./../../components/street/new-street";

const NewStreetPage = () => {
  return (
    <Container maxWidth={false}>
      <Box sx={{ mt: 3 }}>
        <NewStreet />
      </Box>
    </Container>
  );
};

NewStreetPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewStreetPage;
