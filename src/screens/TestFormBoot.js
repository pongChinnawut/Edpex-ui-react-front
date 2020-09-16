import React from "react";
import { useFormik } from "formik";
import { Button, Form, FormGroup } from "react-bootstrap";
import { TextField, Container, Grid } from "@material-ui/core";

export default function TestFormBoot() {
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Require firstName";
    }
    if (!values.lastName) {
      errors.lastName = "Require lastName";
    }
    return errors;
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validate,
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group style={{ width: 250 }} controlId="validationFormik103">
        <Form.Label>FirstName</Form.Label>
        <Form.Control
          type="text"
          // placeholder="firstname"
          className="form-control"
          name="firstName"
          onChange={handleChange}
          values={values.firstName}
          isInvalid={errors.firstName}
        />

        {errors.firstName}
      </Form.Group>
      <Form.Group style={{ width: 250 }} controlId="validationFormik103">
        <Form.Label>LastName</Form.Label>
        <Form.Control
          type="text"
          // placeholder="firstname"
          className="form-control"
          name="lastName"
          onChange={handleChange}
          values={values.lastName}
          isInvalid={errors.lastName}
        />

        {errors.lastName}
      </Form.Group>

      <Form.Group style={{ width: 250 }} controlId="validationFormik103">
        {/* <Form.Label>LastName</Form.Label> */}
        <TextField
          required
          label="กรุณาชื่อผู้ใช้งาน"
          color="secondary"
          variant="standard"
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{
            style: {
              fontSize: 16,
              fontFamily: "Kanit",
              fontWeight: 100,
            },
          }}
          fullWidth
          // onChange={(e) => setUsername(e.target.value)}
        ></TextField>

        {errors.lastName}
      </Form.Group>
      <Form.Group style={{ width: 250 }} controlId="validationFormik103">
        {/* <Form.Label>LastName</Form.Label> */}
        <TextField
          required
          type="password"
          label="กรุณารหัส่าน"
          color="secondary"
          variant="standard"
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{
            style: {
              fontSize: 16,
              fontFamily: "Kanit",
              fontWeight: 100,
            },
          }}
          fullWidth
          // onChange={(e) => setUsername(e.target.value)}
        ></TextField>

        {errors.lastName}
      </Form.Group>
      <Button type="submit">Submit form</Button>
      {/* <input
        name="firstName"
        onChange={handleChange}
        values={values.firstname}
      />
      {errors.firstName ? errors.firstName : null}
      <input name="lastName" onChange={handleChange} values={values.lastName} />
      {errors.lastName ? errors.lastName : null}
      <button type="submit">Submit</button> */}
    </Form>
  );
}
