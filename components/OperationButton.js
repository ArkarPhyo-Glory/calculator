const OperationButton = ({ operation, operationClickHandler }) => {
  return (
    <button className="button operation" onClick={operationClickHandler}>
      {operation}
    </button>
  );
};

export default OperationButton;
