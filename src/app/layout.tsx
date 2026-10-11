import { Viewport, Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#33becf',
  width: "device-width",
  initialScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: 'Consultar o clima',
  description: 'Site para consultar o clima',
  openGraph: {
    title: 'Consultar o clima',
    description: 'Site para consultar o clima',
    url: 'https://weather-forecast-next-app.vercel.app',
    siteName: 'Consultar o clima',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://weather-forecast-next-app.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: "Imagem de apresentação do meu site"
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
