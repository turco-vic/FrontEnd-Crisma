"use client";
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Inscrever-se', href: '/inscrevase' },
  { name: 'Contato', href: '/contato' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Sobre o Desenvolvedor', href: '/sobredev' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logoSection}>
        <Image 
          src="/images/logosite.png" 
          alt="Logo Crisma Sousas" 
          width={50} 
          height={50}
          className={styles.logo}
        />
        <h1 className={styles.title}>Crisma Sousas</h1>
      </Link>
      
      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        role="button"
        tabIndex={0}
      >
        <HiMenu size={36} />
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
        <div className={styles.menuFooter}>
          <p className={styles.menuFooterText}>
            Desenvolvido por Enzo Turcovic
          </p>
          <a 
            href="https://instagram.com/turco.vic" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.instagramLink}
          >
            <FaInstagram className={styles.instagramIcon} />
            <span>@turco.vic</span>
          </a>
        </div>
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
