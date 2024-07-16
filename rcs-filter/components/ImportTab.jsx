import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ImportTab = ({ handleFileChange, handleSubmitSingle, handleSubmitMultiple, setEmail, setKey }) => {
  return (
    <Tabs defaultValue="multiple">
      <TabsList>
        <TabsTrigger value="single">Campo de Texto</TabsTrigger>
        <TabsTrigger value="multiple">Arquivo</TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <Card className="grid grid-col gap-4">
          <CardHeader>
            <CardTitle>Escreva seus contatos</CardTitle>
            <CardDescription>
              Lembre-se de escrever os números separando por ponto e vírgula (;), como no exemplo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmitSingle}>
              <Input 
                type="email" 
                placeholder="Agent e-mail" 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <Input 
                type="text" 
                placeholder="Agent key" 
                onChange={(e) => setKey(e.target.value)} 
              />
              <Textarea 
                name="number"
                type="text" 
                id="number" 
                placeholder="119999999999;119988888888;119999999999;119988888888" 
              />
              <Button type="submit" className="mt-6">
                Confirmar
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="multiple">
        <Card>
          <CardHeader>
            <CardTitle>Importe um arquivo .txt</CardTitle>
            <CardDescription>
              Certifique-se de que o arquivo tenha os contatos separados por ponto e vírgula (;).
              Como no exemplo (119999999999;119988888888).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input 
              type="email" 
              placeholder="Agent e-mail" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              type="text" 
              placeholder="Agent key" 
              onChange={(e) => setKey(e.target.value)} 
              required 
            />
            <Input type="file" id="file" onChange={handleFileChange} />
            <Button onClick={handleSubmitMultiple} className="mt-6">Confirmar</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default ImportTab;
