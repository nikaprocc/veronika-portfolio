import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Вероніка Проців | SMM-менеджер та Content Creator',
  description: 'Портфоліо робіт SMM-менеджера. Повний спектр послуг: контент-план, дизайн постів та сторіс, створення відео-Reels.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}