import React from "react";
import { Field } from "formik";
import { Select, MenuItem, Typography } from "@mui/material";

const SelectInput = (props) => {
  const { title, name, values, errors, touched, listForeignDatas } = props;

  return (
    <>
      <div className="col-2 py-3 mt-2">
        <h5 className="font-weight-bold">{title}</h5>
      </div>
      <div className="col-10">
        {/* <Field name="title"> */}
        <Field name={name}>
          {({ field, form }) => (
            <Select
              name={name}
              value={values}
              errors={errors}
              touched={touched}
              onChange={form.handleChange}
              style={{ width: "20%" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listForeignDatas.map((foreignData, index) => (
                <MenuItem value={foreignData.id} key={foreignData.id}>
                  {foreignData.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Field>
      </div>
      {errors && touched ? (
        <div className="offset-2 col-10">
          <Typography variant="inherit" color="error">
            {errors}
          </Typography>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SelectInput;
