"use client";

import React, { useState } from 'react';
import ImportTab from '../components/ImportTab';
import Result from '../components/Result';

export default function Home() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState(null); // Estado para armazenar o resultado da API

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmitSingle(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let number = formData.get('number');

    try {
      const response = await fetch(`${process.env.RCS_FILTER}/check/single`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, email, key }), // Inclui email e key
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
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
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="container flex-col justify-center w-[500px] pt-[30px]">
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
