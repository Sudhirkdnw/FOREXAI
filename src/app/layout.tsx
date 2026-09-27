import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ForexAI — AI-Powered Forex Market Intelligence & Decision Support',
  description: 'AI-Powered Decision Support for Forex Traders combining Technical Analysis, Machine Learning Ensembles, FinBERT News Sentiment, and Macroeconomic Risk Filters.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100">{children}</body>
    </html>
  );
}
