import { useState } from "react";
import DigitButton from "../components/DigitButton";
import OperationButton from "../components/OperationButton";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [calc, setCalc] = useState({
    num: "",
    res: "",
    clickedEqual: false,
  });

  const digitClickHandler = (e) => {
    e.preventDefault();
    const digit = e.target.innerHTML;

    if (calc.overwrite) {
      setCalc({
        ...calc,
        num: "",
        res: "",
        overwrite: false
      });
    }
    setCalc({
      ...calc,
      num:
        (calc.num == "" && digit == "0") || calc.num == "0"
          ? ""
          : `${calc.num}${digit}`,
      res: eval(`${calc.num}${digit}`),
      clickedEqual: false,
    });
  };

  const operationClickHandler = (e) => {
    const operation = e.target.innerHTML;
    console.log(calc.num.charAt(calc.num.length - 1));
    const numLastChar = calc.num.charAt(calc.num.length - 1);
    if (
      numLastChar == "+" ||
      numLastChar == "-" ||
      numLastChar == "/" ||
      numLastChar == "*"
    ) {
      setCalc({
        ...calc,
        num: `${calc.num.slice(0, -1)}${operation}`,
        res: eval(calc.num.slice(0, -1)),
        clickedEqual: false,
      });
    } else {
      setCalc({
        ...calc,
        num: `${calc.num}${operation}`,
        res: eval(calc.num),
        clickedEqual: false,
      });
    }
  };
  const percentHandler =() => {
    // const percent
  }
  const deleteHandler = () => {
    // const lastNum = calc.num.slice(0,-1)
    if (calc.res == 0 || calc.num == "") {
      setCalc({
        ...calc,
      });
    }
    if (calc.clickedEqual) {
      setCalc({
        ...calc,
        num: "",
        res: 0,
        clickedEqual: false,
      });
    }

    setCalc({
      ...calc,
      num: calc.num.slice(0, -1),
      res: calc.num == 0 || calc.num == "" ? 0 : eval(calc.num.slice(0, -1)),
      clickedEqual: false,
    });
  };
  const equalHandler = () => {
    if(calc.res == 0){
      setCalc({
        ...calc,
      })
    }
    setCalc({
      ...calc,
      res: eval(calc.num),
      clickedEqual: true,
    });
  };

  const clearHandler = () => {
    setCalc({
      ...calc,
      num: "",
      res: 0,
    });
  };
  const resultClassName = calc.clickedEqual ? "result big" : "result fade";
  const numFormatter = (number) => new Intl.NumberFormat('en-US').format(number)
  return (
    <div>
      <div className="calculator">
        <div className="current">{calc.num}</div>
        <div className={resultClassName}>
          {calc.num ? "=" : ""} {numFormatter(calc.res) || 0}
        </div>
        <div className="divider" />
        <div className="num-pad">
          <button className="button operation" onClick={clearHandler}>
            C
          </button>
          <button className="button operation" onClick={deleteHandler}>
            DEL
          </button>
          <button className="button operation" onClick={percentHandler}>%</button>

          <OperationButton
            operation="/"
            operationClickHandler={operationClickHandler}
          />
          <DigitButton digit="7" digitClickHandler={digitClickHandler} />
          <DigitButton digit="8" digitClickHandler={digitClickHandler} />
          <DigitButton digit="9" digitClickHandler={digitClickHandler} />

          <OperationButton
            operationClickHandler={operationClickHandler}
            operation="*"
          />

          <DigitButton digit="4" digitClickHandler={digitClickHandler} />
          <DigitButton digit="5" digitClickHandler={digitClickHandler} />
          <DigitButton digit="6" digitClickHandler={digitClickHandler} />

          <OperationButton
            operationClickHandler={operationClickHandler}
            operation="-"
          />

          <DigitButton digit="1" digitClickHandler={digitClickHandler} />
          <DigitButton digit="2" digitClickHandler={digitClickHandler} />
          <DigitButton digit="3" digitClickHandler={digitClickHandler} />

          <OperationButton
            operationClickHandler={operationClickHandler}
            operation="+"
          />

          <DigitButton digit="0" digitClickHandler={digitClickHandler} />
          <DigitButton digit="." digitClickHandler={digitClickHandler} />
          <button className="button operation span-2" onClick={equalHandler}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
