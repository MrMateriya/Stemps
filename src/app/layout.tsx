import type {Metadata, Viewport} from "next";
import "./globals.css";
import React, {JSX} from "react";
import localFont from 'next/font/local';
import {Header} from "@/components";

const PPNeueMontreal = localFont({
  variable: "--font-PPNeueMontreal",
  src: [
    {
      path: './../../public/fonts/PPNeueMontreal/ppneuemontreal-book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../public/fonts/PPNeueMontreal/ppneuemontreal-thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './../../public/fonts/PPNeueMontreal/ppneuemontreal-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../../public/fonts/PPNeueMontreal/ppneuemontreal-italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './../../public/fonts/PPNeueMontreal/ppneuemontreal-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../../public/fonts/PPNeueMontreal/ppneuemontreal-semibolditalic.otf',
      weight: '600',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: "Stemps",
  description: "IND Architectural Bureau",
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ru">
      <body className={`${PPNeueMontreal.variable} font-montreal font-normal`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
