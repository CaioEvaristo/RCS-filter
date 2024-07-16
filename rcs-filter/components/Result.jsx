// Results.js
import React from 'react';
import { Table, TableBody, TableHead, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const Result = ({ result }) => {
  return (
    <Table>
      <TableCaption>importaçoes recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%]">Numeros validos</TableHead>
          <TableHead className="w-[50%]">Numeros invalidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result.content.valid.map((validNum, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{validNum}</TableCell>
            <TableCell className="font-medium">
              {result.content.invalid[index] || ""}
            </TableCell>
          </TableRow>
        ))}
        {result.content.invalid.length > result.content.valid.length && result.content.invalid.slice(result.content.valid.length).map((invalidNum, index) => (
          <TableRow key={index + result.content.valid.length}>
            <TableCell></TableCell>
            <TableCell className="font-medium">{invalidNum}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Result;
