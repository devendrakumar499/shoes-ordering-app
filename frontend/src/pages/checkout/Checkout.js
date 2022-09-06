import {
  isCheckoutFormEmpty,
  validateEmail,
  validateMobile,
  validatePinCode,
} from "../../utils/formValidator";
import { CheckoutOrderSummary } from "../../components/checkout/CheckoutOrderSummary";
import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { Box, useToast } from "@chakra-ui/react";
import { setToast } from "../../utils/extraFunctions";
import { shallowEqual, useSelector } from "react-redux";
import { useState } from "react";

export const Checkout = () => {
  const { orderSummary } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
    // useSelector is a function that takes the current state as an argument and returns whatever data you want from it
    //Shallow equality checking (or reference equality) simply checks that two different variables reference the same object
  );

  const initState = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    locality: "",
    pinCode: "",
    state: "",
    country: "",
    email: "",
    mobile: "",
  };

  const [form, setForm] = useState(initState);
  const toast = useToast();

  const handleInputChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFormValidation = (form) => {
    const isEmpty = isCheckoutFormEmpty(form);
    if (!isEmpty.status) {
      setToast(toast, isEmpty.message, "error");
      return isEmpty.status;
    }
    const isEmail = validateEmail(form.email);
    if (!isEmail.status) {
      setToast(toast, isEmail.message, "error");
      return isEmail.status;
    }
    const isPinCode = validatePinCode(form.pinCode);
    if (!isPinCode.status) {
      setToast(toast, isPinCode.message, "error");
      return isPinCode.status;
    }
    const isMobile = validateMobile(form.mobile);
    if (!isMobile.status) {
      setToast(toast, isMobile.message, "error");
      return isMobile.status;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!handleFormValidation(form)) return;

    setToast(toast, "Order Placed Successfully !!!", "success");
  };

  return (
    <>
      <Box
        p={"20px"}
        my={"30px"}
        mx={"auto"}
        maxW={"1200px"}
        display={"grid"}
        gap={["40px", "40px", "40px", "10%", "10%"]}
        gridTemplateColumns={["100%", "100%", "100%", "55% 35%", "60% 30%"]}
      >
        <CheckoutForm onChange={handleInputChange} />

        <CheckoutOrderSummary
          onClick={handleFormSubmit}
          orderSummary={orderSummary}
        />
      </Box>
    </>
  );
};
