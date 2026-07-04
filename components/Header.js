import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VP
        </Link>
        <nav className={styles.nav}>
          <a href="https://t.me/nikaproc" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            Telegram
          </a>
          <a href="https://www.instagram.com/nikaproc?igsh=MWhvd3ZxeHMyYnFvaQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}