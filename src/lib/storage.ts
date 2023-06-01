"use client";

export const userId = (): string => {
  return localStorage.getItem("user_id") as string;
};
