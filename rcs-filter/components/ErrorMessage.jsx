
import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ErrorMessage = ({ message }) => {
  return (
    <Alert status="error" className="mb-4">
      <AlertIcon />
      <AlertTitle mr={2}>Erro!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
