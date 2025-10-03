import React, { memo } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
 
type Digit =
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  | "+" | "-" | "x" | "÷" | "=" | "C" | "del" | "+/-" | ".";

export interface FABProps
  extends Omit<PressableProps, "onPress" | "children" | "style"> {
  digit: Digit;  // valor del botón
  onKey: (digit: Digit) => void; // función que se ejecuta al presionar un botón
  label?: string; // texto alternativo para operadores
  size?: number; // tamaño del botón (ancho y alto)
  extended?: boolean; // el ancho para el boton "0"
  bg?: string; // color de fondo
  color?: string; // color del texto
  style?: ViewStyle; 
}
 
const FAB = memo(function FAB({
  digit,
  onKey,
  label,
  size = 64,
  extended = false,
  bg = "#2f2f2f",
  color = "#ffffff",
  style,
  ...rest
}: FABProps) {
  const shape: ViewStyle = extended
    ? { height: size, borderRadius: size / 2, paddingHorizontal: 40 } // Botón "0"
    : { width: size, height: size, borderRadius: size / 2 };
 
  return (
<Pressable
      onPress={() => onKey(digit)}
      android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: false }}
      style={[styles.base, shape, { backgroundColor: bg }, style]}
      {...rest}
>
<Text
        style={[styles.label, { color, fontSize: Math.min(22, size * 0.35) }]}
>
        {label ?? digit}
</Text>
</Pressable>
  );
});
 
const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  label: {
    fontWeight: "600",
  },
});
 
export default FAB;