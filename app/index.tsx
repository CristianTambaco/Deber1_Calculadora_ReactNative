import React, { useState } from "react";
import { Text, View } from "react-native";
import FAB from "../components/FAB";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleOperator = (op: string) => {
    setFirstValue(display);
    setOperator(op);
    setWaitingForOperand(true);
  };

  const handleEqual = () => {
    if (!operator || !firstValue) return;
    const a = parseFloat(firstValue);
    const b = parseFloat(display);
    let result = 0;
    switch (operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "x": result = a * b; break;
      case "÷": result = b !== 0 ? a / b : 0; break;
    }
    setDisplay(result.toString());
    setOperator(null);
    setFirstValue(null);
    setWaitingForOperand(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setOperator(null);
    setFirstValue(null);
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleSign = () => {
    setDisplay((prev) => (prev[0] === "-" ? prev.slice(1) : "-" + prev));
  };

  const handleDot = () => {
    setDisplay((prev) => (prev.includes(".") ? prev : prev + "."));
  };

  const Row = ({ children }: { children: React.ReactNode }) => (
    <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
      {children}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        padding: 16,
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          minHeight: 120,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: 24,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 64, fontWeight: "300" }}>
          {display}
        </Text>
      </View>
      <View style={{ width: "100%" }}>
      <Row>
        <FAB digit="C" onKey={handleClear} color="#aaa" />
        <FAB digit="+/-" onKey={handleSign} color="#aaa" />
        <FAB digit="del" onKey={handleDelete} color="#aaa" />
        <FAB digit="÷" onKey={() => handleOperator("÷")} color="#f90" />
      </Row>
      <Row>
        <FAB digit="7" onKey={() => handleNumber("7")} />
        <FAB digit="8" onKey={() => handleNumber("8")} />
        <FAB digit="9" onKey={() => handleNumber("9")} />
        <FAB digit="x" onKey={() => handleOperator("x")} color="#f90" />
      </Row>
      <Row>
        <FAB digit="4" onKey={() => handleNumber("4")} />
        <FAB digit="5" onKey={() => handleNumber("5")} />
        <FAB digit="6" onKey={() => handleNumber("6")} />
        <FAB digit="-" onKey={() => handleOperator("-")} color="#f90" />
      </Row>
      <Row>
        <FAB digit="1" onKey={() => handleNumber("1")} />
        <FAB digit="2" onKey={() => handleNumber("2")} />
        <FAB digit="3" onKey={() => handleNumber("3")} />
        <FAB digit="+" onKey={() => handleOperator("+")} color="#f90" />
      </Row>
      <Row>
        <FAB digit="0" onKey={() => handleNumber("0")} style={{ flex: 1/1.6 }} />
        <FAB digit="." onKey={handleDot} />
        <FAB digit="=" onKey={handleEqual} color="#f90" />
      </Row>
      </View>
    </View>
  );
}