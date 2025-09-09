"use client";
import { useState } from 'react';
import styles from './Inscrevercoordenador.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUserTie, FaUser, FaEnvelope, FaPhone, FaLock, FaUpload, FaCheck, FaCamera } from 'react-icons/fa';

export default function InscreverCoordenador() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    fotoPerfil: null
  });

  const [uploadStatus, setUploadStatus] = useState({
    fotoPerfil: false
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        fotoPerfil: file
      }));
      setUploadStatus(prev => ({
        ...prev,
        fotoPerfil: true
      }));
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
      return;
    }
    
    if (formData.senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    alert('Cadastro de coordenador realizado com sucesso! Em breve entraremos em contato.');
    console.log('Dados do coordenador:', formData);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroIcon}>
            <FaUserTie />
          </div>
          <h1 className={styles.title}>Cadastro de Coordenador</h1>
          <p className={styles.subtitle}>
            Preencha seus dados para se cadastrar como coordenador da Crisma
          </p>
        </section>

        <main className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaUserTie className={styles.sectionIcon} />
                <h2>Dados Pessoais do Coordenador</h2>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="nomeCompleto" className={styles.label}>
                    <FaUser className={styles.labelIcon} />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telefone" className={styles.label}>
                    <FaPhone className={styles.labelIcon} />
                    Número de Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <FaEnvelope className={styles.labelIcon} />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="senha" className={styles.label}>
                    <FaLock className={styles.labelIcon} />
                    Senha *
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Mínimo 6 caracteres"
                    minLength="6"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha" className={styles.label}>
                    <FaLock className={styles.labelIcon} />
                    Confirmar Senha *
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Digite a senha novamente"
                    minLength="6"
                    required
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCamera className={styles.sectionIcon} />
                <h2>Foto de Perfil</h2>
              </div>
              
              <div className={styles.uploadContainer}>
                <div className={styles.uploadGroup}>
                  <label className={styles.uploadLabel}>
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview da foto de perfil" 
                        className={styles.imagePreview}
                      />
                    ) : (
                      <>
                        <FaUpload className={styles.uploadIcon} />
                        <span>Foto de Perfil *</span>
                      </>
                    )}
                    {uploadStatus.fotoPerfil && !imagePreview && <FaCheck className={styles.checkIcon} />}
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    required
                  />
                  <p className={styles.fileInfo}>JPG ou PNG - Máx. 3MB</p>
                </div>
              </div>
            </section>

            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitButton}>
                <FaCheck className={styles.submitIcon} />
                Cadastrar como Coordenador
              </button>
              <p className={styles.submitInfo}>
                * Campos obrigatórios. Após o cadastro, você receberá uma confirmação por email e instruções para acessar a área de coordenação.
              </p>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}
