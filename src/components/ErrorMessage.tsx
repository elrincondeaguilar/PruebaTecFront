import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-md">
      <p>❌ {message}</p>
    </div>
  );
}
