import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

function Checkout(props) {
  const [formInputValidity, setFormInputValidit] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isNotFiveChars = (value) => value.trim().length !== 5;

  const confirmHandler = (e) => {
    e.preventDefault();

    const dataHolder = {
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      city: cityInputRef.current.value,
      postalCode: postalInputRef.current.value,
    };

    const { name, street, city, postalCode } = dataHolder;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const cityIsValid = !isEmpty(city);
    const postalCodeIsValid = !isNotFiveChars(postalCode);

    setFormInputValidit({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm(dataHolder);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Name is not valid</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Street is not valid</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postalCode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal-code" ref={postalInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter valid value 'e.g: 12345'</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>City is not valid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancle
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
