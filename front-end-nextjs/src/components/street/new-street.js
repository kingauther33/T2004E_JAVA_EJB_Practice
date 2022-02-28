import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API, CONFIG } from "./../../utils/api";
import axios from "axios";
import Link from "next/link";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import TextInput from "./../forms/TextInput";
import SelectInput from "./../forms/SelectInput";
import { useRouter } from "next/router";

const initialValues = {
  name: "",
  description: "",
  status: "",
  districtId: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  description: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  status: Yup.string().required("Required"),
  districtId: Yup.string().required("Required"),
});

const listStatuses = [
  {
    id: "USING",
    name: "USING",
  },
  {
    id: "FIX",
    name: "FIX",
  },
  {
    id: "UNDER_CONSTRUCTION",
    name: "UNDER_CONSTRUCTION",
  },
];

const NewStreet = (props) => {
  const router = useRouter();
  const [listDistricts, setListDistricts] = useState([]);

  const fetchDistricts = async () => {
    await axios
      .get(API.GET_DISTRICTS.url, CONFIG)
      .then((response) => {
        setListDistricts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = async (values) => {
    const json = JSON.stringify(values);

    await axios
      .post(API.POST_STREET.url, json, CONFIG)
      .then((res) => {
        alert("Success");
      })
      .catch((err) => {
        alert("Error");
      })
      .finally(() => {
        router.push("/street");
      });
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
          my: 3,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Add new Street
        </Typography>
      </Box>
      <Box>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleBlur, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="row align-items-center" style={{ gapY: "3rem" }}>
                <TextInput
                  title="Name"
                  type="text"
                  fullWidth={true}
                  name="name"
                  values={values.name}
                  errors={errors.name}
                  touched={touched.name}
                />
                <TextInput
                  title="Description"
                  type="text"
                  fullWidth={true}
                  name="description"
                  values={values.description}
                  errors={errors.description}
                  touched={touched.description}
                />
                <SelectInput
                  title="Status"
                  name="status"
                  values={values.status}
                  errors={errors.status}
                  touched={touched.status}
                  listForeignDatas={listStatuses}
                />
                <SelectInput
                  title="District"
                  name="districtId"
                  values={values.districtId}
                  errors={errors.districtId}
                  touched={touched.districtId}
                  listForeignDatas={listDistricts}
                />
              </div>
              <Button type="submit" color="primary" variant="contained" className="btn btn-primary mt-4">
              Submit
          </Button>
            </Form>
          )}  
        </Formik>
      </Box>
    </Box>
  );
};

export default NewStreet;
