import { style } from "@vanilla-extract/css";

export const backImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export const mainContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "70%",
  height: "80%",
  border: "1px solid black",
  position: "relative",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px) saturate(180%)",
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  alignItems: "end",
  justifyContent: "start",
  zIndex: 1,
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "50px",
  border: "1px solid gray",
  width: "4.5rem",
  height: "2rem",
  cursor: "pointer",
  padding: "0 0.5rem",
});

export const button = style({
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  border: "1px solid gray",
  transition: "background-color 0.15s, transform 0.3s ease-out",
});
