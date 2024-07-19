"use client";

import React, { useState } from 'react';
import ImportTab from '../components/ImportTab';
import Result from '../components/Result';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmitSingle(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const number = formData.get('number');
    formData.append("email", email);
    formData.append("key", key);

    try {
      const response = await fetch(`${process.env.RCS_FILTER}/check/single`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, email, key }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
      setError(null);
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
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  }

  return (
    <div className="container grid grid-cols-2 gap-4 p-[30px]">
      
      <ImportTab
        handleFileChange={handleFileChange}
        handleSubmitSingle={handleSubmitSingle}
        handleSubmitMultiple={handleSubmitMultiple}
        setEmail={setEmail}
        setKey={setKey}
      />
      {result && <Result result={result} />}
    </div>
  );
}
