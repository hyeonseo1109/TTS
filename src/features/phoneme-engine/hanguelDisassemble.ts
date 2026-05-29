import { disassemble } from "es-hangul";

export const splitHangul = (char: string) => {
  return disassemble(char);
};
