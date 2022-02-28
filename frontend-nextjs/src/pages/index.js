import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Test = () => {
  const router = useRouter();
  const [amountPerMonth, setAmountPerMonth] = useState(0);
  const [amountToBePaid, setAmountToBePaid] = useState(0);
  const formikInterestPerMonth = useFormik({
    initialValues: {
      loan: "",
      rate: "",
      tenure: "",
    },
    validationSchema: Yup.object({
      loan: Yup.number().min(0).max(1000000000).required("Loan is required"),
      rate: Yup.number().min(0).max(100).required("Rate is required"),
      tenure: Yup.number().min(0).max(300).required("Tenure is required"),
    }),
    onSubmit: (values) => {
      const sentObject = {
        loan: values.loan,
        rate: values.rate,
        tenure: values.tenure,
      };

      console.log(sentObject);
      axios
        .post("http://localhost:8080/api/v1/calculateInterest", JSON.stringify(sentObject), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((data) => {
          setAmountPerMonth(data.data.toFixed(2));
        });
    },
  });

  const formikLoanNeededToBePaid = useFormik({
    initialValues: {
      loan: "",
      rate: "",
    },
    validationSchema: Yup.object({
      loan: Yup.number().min(0).max(1000000000).required("Loan is required"),
      rate: Yup.number().min(0).max(100).required("Rate is required"),
    }),
    onSubmit: (values) => {
      const sentObject = {
        loan: values.loan,
        rate: values.rate,
      };

      console.log(sentObject);
      axios
        .post(
          "http://localhost:8080/api/v1/calculateTotalLoanToBePaid",
          JSON.stringify(sentObject),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          setAmountToBePaid(data.data.toFixed(2));
        });
    },
  });

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formikInterestPerMonth.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Calculate the total loan amount
              </Typography>
            </Box>
            <TextField
              error={Boolean(
                formikInterestPerMonth.touched.loan && formikInterestPerMonth.errors.loan
              )}
              fullWidth
              helperText={formikInterestPerMonth.touched.loan && formikInterestPerMonth.errors.loan}
              label="Loan"
              margin="normal"
              name="loan"
              onBlur={formikInterestPerMonth.handleBlur}
              onChange={formikInterestPerMonth.handleChange}
              value={formikInterestPerMonth.values.loan}
              variant="outlined"
              type="number"
            />
            <TextField
              error={Boolean(
                formikInterestPerMonth.touched.rate && formikInterestPerMonth.errors.rate
              )}
              fullWidth
              helperText={formikInterestPerMonth.touched.rate && formikInterestPerMonth.errors.rate}
              label="Rate of interest"
              margin="normal"
              name="rate"
              onBlur={formikInterestPerMonth.handleBlur}
              onChange={formikInterestPerMonth.handleChange}
              value={formikInterestPerMonth.values.rate}
              variant="outlined"
              type="number"
            />
            <TextField
              error={Boolean(
                formikInterestPerMonth.touched.tenure && formikInterestPerMonth.errors.tenure
              )}
              fullWidth
              helperText={
                formikInterestPerMonth.touched.tenure && formikInterestPerMonth.errors.tenure
              }
              label="Tenure"
              margin="normal"
              name="tenure"
              onBlur={formikInterestPerMonth.handleBlur}
              onChange={formikInterestPerMonth.handleChange}
              value={formikInterestPerMonth.values.tenure}
              variant="outlined"
              type="number"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={!formikInterestPerMonth.isValid}
              >
                Calculate interest per month
              </Button>
            </Box>
          </form>
          <Typography color="textPrimary" variant="h5">
            Total amount need to pay per month: {amountPerMonth}
          </Typography>

          <form onSubmit={formikLoanNeededToBePaid.handleSubmit} className="mt-5">
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Calculate the total amount to finish debt
              </Typography>
            </Box>
            <TextField
              error={Boolean(
                formikLoanNeededToBePaid.touched.loan && formikLoanNeededToBePaid.errors.loan
              )}
              fullWidth
              helperText={
                formikLoanNeededToBePaid.touched.loan && formikLoanNeededToBePaid.errors.loan
              }
              label="Loan left to pay"
              margin="normal"
              name="loan"
              onBlur={formikLoanNeededToBePaid.handleBlur}
              onChange={formikLoanNeededToBePaid.handleChange}
              value={formikLoanNeededToBePaid.values.loan}
              variant="outlined"
              type="number"
            />
            <TextField
              error={Boolean(
                formikLoanNeededToBePaid.touched.rate && formikLoanNeededToBePaid.errors.rate
              )}
              fullWidth
              helperText={
                formikLoanNeededToBePaid.touched.rate && formikLoanNeededToBePaid.errors.rate
              }
              label="Rate of early settlement"
              margin="normal"
              name="rate"
              onBlur={formikLoanNeededToBePaid.handleBlur}
              onChange={formikLoanNeededToBePaid.handleChange}
              value={formikLoanNeededToBePaid.values.rate}
              variant="outlined"
              type="number"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={!formikLoanNeededToBePaid.isValid}
              >
                Calculate interest per month
              </Button>
            </Box>
          </form>
          <Typography color="textPrimary" variant="h5" sx={{ mb: "6rem" }}>
            Total amount need to pay to finish debt: {amountToBePaid}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Test;
