"use client";

import React, { useState } from 'react';
import ImportTab from '../components/ImportTab';
import Result from '../components/Result';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(null);
  const [key, setKey] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Estado para armazenar a mensagem de erro

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmitSingle(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const number = formData.get('number');

    try {
      const response = await fetch(`${process.env.RCS_FILTER}/check/single`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
      setError(null);
      console.log('Success:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  }

  async function handleSubmitMultiple(event) {
    event.preventDefault();

    if (!file) {
      alert("Por favor, selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("key", key);

    try {
      const response = await fetch(`${process.env.RCS_FILTER}/check/multiple`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
      setError(null);
      console.log('Success:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  }

  return (
    <div className="container grid grid-cols-2 gap-4 p-[30px]">
      {error && <ErrorMessage message={error} />}
      <ImportTab
        handleFileChange={handleFileChange}
        handleSubmitSingle={handleSubmitSingle}
        handleSubmitMultiple={handleSubmitMultiple}
      />
      {result && <Result result={result} />}
    </div>
  );
}
