import React from "react";

interface TernaryProps {
  condition: boolean;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

const Ternary: React.FC<TernaryProps> = ({ condition, fallback, children }) => {
  return <>{condition ? children : fallback}</>;
};

export default Ternary;
