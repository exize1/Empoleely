import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AlertPayment from "./AlertPayment";
import { useState } from "react";
import "./calendar.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { updatePayment } from "../../ProfileSlice";
import { useDispatch } from "react-redux";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function MewPaymentForm() {
  const [alert, setaAlert] = useState(false);

  const show = () => {
    setaAlert(!alert);
  };

  const schema = Yup.object().shape({
    cardName: Yup.string().required("Please enter the card name"),

    cardNumber: Yup.string()
      .required("Please enter your card number")
      .matches(/[0-9]/, "Password can only contain numbers.")
      .min(16)
      .max(16),

    expireDate: Yup.string()
      .required("Please enter the expire date")
      .matches(/[0-9]/, "Password can only contain numbers.")
      .min(4)
      .max(4),

    Cvv: Yup.string()
      .matches(/[0-9]/, "Password can only contain numbers.")
      .required("Please enterthe digits behind the card")
      .min(3)
      .max(3),
  });

  const handleSubmition = (values) => {
    const paymentDetails = {
      cardName: values.cardName,
      cardNumber: values.cardNumber,
      expireDate: values.expireDate,
      Cvv: values.Cvv,
    };
    dispatch(updatePayment(paymentDetails));
    show();
  };
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method:
      </Typography>
      <Formik
        initialValues={{
          cardName: "",
          cardNumber: "",
          expireDate: "",
          Cvv: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => handleSubmition(values)}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" sx={{ minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Card Name
                  </InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={values.cardName}
                    label="Card Name"
                    name="cardName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={"Visa"}>Visa</MenuItem>
                    <MenuItem value={"Master Card"}>Master Card</MenuItem>
                    <MenuItem value={"Thired"}>Thired</MenuItem>
                  </Select>
                </FormControl>
                <p className="error-message">
                  {errors.cardName && touched.cardName && errors.cardName}
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  name="cardNumber"
                  autoComplete="cc-number"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error-message">
                  {errors.cardNumber && touched.cardNumber && errors.cardNumber}
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  name="expireDate"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error-message">
                  {errors.expireDate && touched.expireDate && errors.expireDate}
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  fullWidth
                  name="Cvv"
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error-message">
                  {errors.Cvv && touched.Cvv && errors.Cvv}
                </p>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="secondary" name="saveCard" value="yes" />
                  }
                  label="Remember credit card details for next time"
                />
              </Grid>
              <Button type="submit" className="submit-payment-btn">
                submit
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
      {alert ? <AlertPayment /> : null}
    </React.Fragment>
  );
}
