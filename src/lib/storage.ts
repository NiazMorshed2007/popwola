"use client";

export const userId = (): string => {
  return JSON.parse(localStorage.getItem("user") || "{}").$id;
};
