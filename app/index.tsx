import React, { useState } from "react";
import { Text, View } from "react-native";
import FAB from "../components/FAB";

import * as Haptics from 'expo-haptics';


export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);  
  const [lastOperation, setLastOperation] = useState<string | null>(null); // muestra la última operación realizada


  const MAX_DIGITS = 7; // Número máximo de dígitos permitidos

  const handleNumber = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Si hay un resultado previo, se reemplaza con el nuevo número  
    if (lastResult) {
      setDisplay(num);
      setOperator(null);
      setFirstValue(null);
      setWaitingForOperand(false);
      setLastResult(null);
      setLastOperation(null);
      return;
    }

    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay((prev) => {
        const cleanPrev = prev.replace("-", "").replace(".", "");
        if (cleanPrev.length >= MAX_DIGITS) return prev;
        return prev === "0" ? num : prev + num;
      });
    }
  };

  const handleOperator = (op: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Si hay un resultado previo, se usa como primer valor
    if (lastResult) {
      setFirstValue(lastResult);
      setOperator(op);
      setWaitingForOperand(true);
      setLastResult(null);
      setLastOperation(null);
      setDisplay(lastResult); // muestra el resultado anterior
      return;
    }

    if (operator && !waitingForOperand) {
      handleEqual();
      setFirstValue(display);
      setOperator(op);
      setWaitingForOperand(true);
    } else {
      setFirstValue(display);
      setOperator(op);
      setWaitingForOperand(true);
    }
  };

  const handleEqual = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
    setLastResult(result.toString());
    setLastOperation(`${firstValue} ${operator} ${display}`); // guarda la operación
    setDisplay(result.toString());
    setOperator(null);
    setFirstValue(null);
    setWaitingForOperand(false);
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setDisplay("0");
    setOperator(null);
    setFirstValue(null);
    setWaitingForOperand(false);
    setLastResult(null);
    setLastOperation(null); // limpia la última operación realizada
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleSign = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setDisplay((prev) => (prev[0] === "-" ? prev.slice(1) : "-" + prev));
  };

  const handleDot = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setDisplay((prev) => (prev.includes(".") ? prev : prev + "."));
  };


  // Componente para organizar los botones en filas
  const Row = ({ children }: { children: React.ReactNode }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 18 }}>
      {children}
    </View>
  );

  // Colores para los botones
  const gray = "#a5a5a5";
  const dark = "#333333";
  const orange = "#ff9500";
  const white = "#fff";
  const size = 76; // el tamaño de los botones

  // Muestra la operación realizada 
  let operation = "";
  if (operator && firstValue) {
    operation = `${firstValue} ${operator} ${waitingForOperand ? "" : display}`;
  } else if (lastOperation) {
    operation = lastOperation;
  }

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
        {/* Operación actual o última operación */}
        {operation !== "" && (
          <Text style={{ color: "#fff", fontSize: 38, fontWeight: "300", opacity: 0.8 }}>
            {operation}
          </Text>
        )}
        {/* Resultado de la operación */}
        {lastResult && (
          <Text style={{ color: "#fff", fontSize: 24, opacity: 0.5, marginTop: 4 }}>
            {lastResult}
          </Text>
        )}
        {/* El Display principal */}
        <Text style={{ color: "#fff", fontSize: 64, fontWeight: "300" }}>
          {display}
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <Row>
          <FAB digit="C" onKey={handleClear} bg={gray} color="#000" size={size} />
          <FAB digit="+/-" onKey={handleSign} bg={gray} color="#000" size={size} label="+ / -" />
          <FAB digit="del" onKey={handleDelete} bg={gray} color="#000" size={size} label="del" />
          <FAB digit="÷" onKey={() => handleOperator("÷")} bg={orange} color={white} size={size} label="÷" />
        </Row>
        <Row>
          <FAB digit="7" onKey={() => handleNumber("7")} bg={dark} color={white} size={size} />
          <FAB digit="8" onKey={() => handleNumber("8")} bg={dark} color={white} size={size} />
          <FAB digit="9" onKey={() => handleNumber("9")} bg={dark} color={white} size={size} />
          <FAB digit="x" onKey={() => handleOperator("x")} bg={orange} color={white} size={size} label="x" />
        </Row>
        <Row>
          <FAB digit="4" onKey={() => handleNumber("4")} bg={dark} color={white} size={size} />
          <FAB digit="5" onKey={() => handleNumber("5")} bg={dark} color={white} size={size} />
          <FAB digit="6" onKey={() => handleNumber("6")} bg={dark} color={white} size={size} />
          <FAB digit="-" onKey={() => handleOperator("-")} bg={orange} color={white} size={size} label="-" />
        </Row>
        <Row>
          <FAB digit="1" onKey={() => handleNumber("1")} bg={dark} color={white} size={size} />
          <FAB digit="2" onKey={() => handleNumber("2")} bg={dark} color={white} size={size} />
          <FAB digit="3" onKey={() => handleNumber("3")} bg={dark} color={white} size={size} />
          <FAB digit="+" onKey={() => handleOperator("+")} bg={orange} color={white} size={size} label="+" />
        </Row>
        <Row>
          <FAB
            digit="0"
            onKey={() => handleNumber("0")}
            bg={dark}
            color={white}
            size={size}
            extended={true}
            style={{ minWidth: size * 2 + 12, paddingHorizontal: 40 }} // Tamaño para el botón "0"
          />
          <FAB digit="." onKey={handleDot} bg={dark} color={white} size={size} label="." />
          <FAB digit="=" onKey={handleEqual} bg={orange} color={white} size={size} label="=" />
        </Row>
      </View>
    </View>
  );
}