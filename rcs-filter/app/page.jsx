"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);  

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
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleSubmitMultiple(event) {
    event.preventDefault();
 
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.RCS_FILTER}/check/multiple`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="container flex-col justify-center w-[500px] pt-[80px]">
      <Tabs defaultValue="multiple">
        <TabsList>
          <TabsTrigger value="single">Write</TabsTrigger>
          <TabsTrigger value="multiple">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
        <Card>
            <CardHeader>
              <CardTitle>Write your RCS numbers</CardTitle>
              <CardDescription>write your number using semicolon</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSingle}>
                <Textarea 
                  name="number"
                  type="number" 
                  id="number" 
                  placeholder="119999999999;119988888888;119999999999;119988888888" />
                <Button type="submit">
                  Confirm
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multiple">
          <Card>
            <CardHeader>
              <CardTitle>Import your RCS numbers</CardTitle>
              <CardDescription>import your file</CardDescription>
            </CardHeader>
            <CardContent>
              <Input type="file" id="file" onChange={handleFileChange} />
              <button onClick={handleSubmitMultiple}>Confirm</button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
