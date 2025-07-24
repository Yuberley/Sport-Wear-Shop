import React from "react";
import { Spinner } from "@nextui-org/react";

export const LoadingContent = ({ message }: { message: string }) => {
  return (
    <div
      className="flex justify-center items-center p-4 rounded-md"
      style={{
        background: "linear-gradient(to right, rgba(255,255,255,0), white 40%, white 60%, rgba(255,255,255,0))",
        padding: "2rem",
        borderRadius: "16px",
      }}
    >
      <Spinner />
      <span className="ml-2">{message}</span>
    </div>
  );
};