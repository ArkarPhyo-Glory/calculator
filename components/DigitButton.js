const DigitButton = ({ digit, digitClickHandler }) => {
  return <button className="button" onClick={digitClickHandler}>{digit}</button>;
};

export default DigitButton;
