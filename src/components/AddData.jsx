import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Container, Grid } from "@mui/material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const AddData = () => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [formDataArray, setFormDataArray] = useState([]);

  const validationSchema = Yup.object().shape({
    crdtname: Yup.string()
      .required("Creditor Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    debtname: Yup.string()
      .required("Debtor Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    gender: Yup.string().required("Gender is required"),
    education: Yup.array()
      .required("Education is required")
      .min(1, "Please select at least one option"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact: Yup.string()
      .required("Contact No is required")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter a valid 10-digit Indian phone number",
        excludeEmptyString: false,
      }),
    paymentMode: Yup.string().required("Payment Mode is required"),
    paymentApp: Yup.string().test(
      "conditional-required",
      "Payment Application is required",
      function (value) {
        if (this.parent.paymentMode !== "cash") {
          return Yup.string().required().isValidSync(value);
        }
        return true;
      }
    ),
    type: Yup.string().required("Payment Type is required"),
    amount: Yup.number()
      .required("Principle Amount is required")
      .max(5000, "Maximum amount allowed is 5000"),
    paydate: Yup.date().required("Pay Date is required"),
    receivedate: Yup.date()
      .required("Receive Date is required")
      .min(Yup.ref("paydate"), "Receive Date must be after the Pay Date"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Too Short!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log('values are here------------------->',values)
    alert("User successfully Inserted.");

    const education = values.education.join(", ");

    const newData = [...formDataArray, { ...values, education }];

    localStorage.setItem("formDataArray", JSON.stringify(newData));

    resetForm();
    setSubmitting(false);
  };

  useEffect(() => {
    const storedFormDataArray = localStorage.getItem("formDataArray");

    if (storedFormDataArray) {
      const parsedFormDataArray = JSON.parse(storedFormDataArray);
      setFormDataArray(parsedFormDataArray);
    }
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "40px" }}>Add Data</h1>
      <Container>
        <Formik
          initialValues={{
            crdtname: "",
            debtname: "",
            gender: "",
            education: [],
            email: "",
            contact: "",
            paymentMode: "",
            paymentApp: "",
            type: "",
            amount: "",
            paydate: "",
            receivedate: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
        >
          {(formik) => (
            <Form>
              <Grid container direction={"row"} spacing={3}>
                <Grid item xs={6}>
                  <Field
                    id="crdtname"
                    name="crdtname"
                    label="Creditor Name"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="crdtname"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    id="debtname"
                    name="debtname"
                    label="Debtor Name"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="debtname"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <label id="demo-simple-select-label">Gender</label>
                    <RadioGroup
                      row
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                  <ErrorMessage
                    name="gender"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-select-label">
                      Education
                    </InputLabel>
                    <Select
                      id="education"
                      name="education"
                      labelId="demo-multiple-select-label"
                      label="Education"
                      multiple
                      value={formik.values.education}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem value="Highschool">High School</MenuItem>
                      <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                      <MenuItem value="Graduate">Graduate</MenuItem>
                      <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage
                    name="education"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={7}>
                  <Field
                    id="email"
                    name="email"
                    label="Email"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="email"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={7}>
                  <Field
                    id="contact"
                    name="contact"
                    label="Contact No"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="contact"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Payment Mode
                    </InputLabel>
                    <Select
                      id="paymentMode"
                      name="paymentMode"
                      labelId="demo-simple-select-label"
                      label="Payment Mode"
                      value={formik.values.paymentMode}
                      onChange={(event) => {
                        formik.handleChange(event);
                        setSelectedPaymentMode(event.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="cash">CASH</MenuItem>
                      <MenuItem value="upi">UPI</MenuItem>
                      <MenuItem value="net">NET BANKING</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage
                    name="paymentMode"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                {(selectedPaymentMode === "upi" ||
                  selectedPaymentMode === "net") && (
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Payment Application
                      </InputLabel>
                      <Select
                        id="paymentApp"
                        name="paymentApp"
                        labelId="demo-simple-select-label"
                        label="Payment Application"
                        value={formik.values.paymentApp}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="paytm">PayTM</MenuItem>
                        <MenuItem value="googlepay">Google Pay</MenuItem>
                        <MenuItem value="phonepay">Phone Pay</MenuItem>
                        <MenuItem value="axispay">Axis Pay</MenuItem>
                        <MenuItem value="sbi">SBI</MenuItem>
                        <MenuItem value="myairtel">My Airtel App</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      name="paymentApp"
                      className="d-block invalid-feedback"
                      component="span"
                    />
                  </Grid>
                )}

                <Grid item xs={7}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="type"
                      name="type"
                      label="Type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="debit">DEBIT</MenuItem>
                      <MenuItem value="credit">CREDIT</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage
                    name="type"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={7}>
                  <Field
                    id="amount"
                    name="amount"
                    label="Principle Amount"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="amount"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">
                    Pay Date
                  </InputLabel>
                  <Field
                    id="paydate"
                    name="paydate"
                    // label="Pay Date"
                    type="date"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="paydate"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">
                    Receive Date
                  </InputLabel>
                  <Field
                    id="receivedate"
                    name="receivedate"
                    // label="Receive Date"
                    type="date"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="receivedate"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={7}>
                  <Field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    as={TextField}
                    fullWidth
                  />
                  <ErrorMessage
                    name="password"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting}
                    style={{marginBottom: "30px"}}
                  >
                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default AddData;
