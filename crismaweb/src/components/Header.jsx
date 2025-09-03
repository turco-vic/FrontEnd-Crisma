"use client";
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import styles from '../styles/Header.module.css';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Contato', href: '/contato' },
  { name: 'Sobre', href: '/sobre' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crisma Sousas</h1>
      
      <div
        className={styles.menuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        role="button"
        tabIndex={0}
      >
        <HiMenu size={28} />
      </div>

      <div className={`${styles.menuContainer} ${menuOpen ? styles.open : ''}`}>
        <nav className={styles.menuLinks}>
          {pages.map(page => (
            <a 
              key={page.href} 
              href={page.href} 
              className={styles.menuLink} 
              onClick={() => setMenuOpen(false)}
            >
              {page.name}
            </a>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
