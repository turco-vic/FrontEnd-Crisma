"use client";
import { useState } from 'react';
import styles from './Inscrevercoordenador.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUserTie, FaUser, FaEnvelope, FaPhone, FaLock, FaUpload, FaCheck, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function InscreverCoordenador() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
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
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const getPasswordRequirements = (password) => {
    const requirements = [];
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasMinLength) requirements.push('6 caracteres');
    if (!hasUpperCase) requirements.push('1 letra maiúscula');
    if (!hasLowerCase) requirements.push('1 letra minúscula');
    if (!hasNumber) requirements.push('1 número');

    if (requirements.length === 0) {
      return 'Senha válida!';
    } else if (password.length === 0) {
      return 'Digite uma senha com 6 caracteres, 1 maiúscula, 1 minúscula e 1 número';
    } else {
      return `Ainda falta: ${requirements.join(', ')}`;
    }
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'nome':
        if (!value.trim()) {
          newErrors[name] = 'Nome é obrigatório';
        } else {
          delete newErrors[name];
        }
        break;
      case 'sobrenome':
        if (!value.trim()) {
          newErrors[name] = 'Sobrenome completo é obrigatório';
        } else {
          delete newErrors[name];
        }
        break;
      case 'telefone':
        if (!value.trim()) {
          newErrors[name] = 'Telefone é obrigatório';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors[name] = 'Email inválido';
        } else {
          delete newErrors[name];
        }
        break;
      case 'senha':
        if (!value.trim()) {
          newErrors[name] = 'Senha é obrigatória';
        } else if (value.length < 6) {
          newErrors[name] = 'Senha deve ter pelo menos 6 caracteres';
        } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
          newErrors[name] = 'Senha deve ter 1 letra maiúscula, 1 minúscula e 1 número';
        } else {
          delete newErrors[name];
        }
        break;
      case 'confirmarSenha':
        if (!value.trim()) {
          newErrors[name] = 'Confirmação de senha é obrigatória';
        } else if (value !== formData.senha) {
          newErrors[name] = 'Senhas não coincidem';
        } else {
          delete newErrors[name];
        }
        break;
      case 'fotoPerfil':
        if (!value) {
          newErrors[name] = 'Foto de perfil é obrigatória';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'senha') {
      setPasswordFeedback(getPasswordRequirements(value));
    }
    
    if (errors[name]) {
      validateField(name, value);
    }
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
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      validateField('fotoPerfil', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fieldsToValidate = ['nome', 'sobrenome', 'telefone', 'email', 'senha', 'confirmarSenha', 'fotoPerfil'];
    let hasErrors = false;
    let firstErrorField = null;
    
    fieldsToValidate.forEach(field => {
      const value = field === 'fotoPerfil' ? formData.fotoPerfil : formData[field];
      const isValid = validateField(field, value);
      if (!isValid) {
        hasErrors = true;
        if (!firstErrorField) {
          firstErrorField = field;
        }
      }
    });
    
    if (hasErrors) {
      if (firstErrorField) {
        const element = firstErrorField === 'fotoPerfil' 
          ? document.querySelector('input[type="file"]')
          : document.getElementById(firstErrorField);
        
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
  
          if (firstErrorField !== 'fotoPerfil') {
            setTimeout(() => element.focus(), 300);
          }
        }
      }
      return;
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      return;
    }
    
    if (formData.senha.length < 6) {
      return;
    }
    
    const form = new FormData();
    form.append('nome', formData.nome);
    form.append('sobrenome', formData.sobrenome);
    form.append('telefone', formData.telefone);
    form.append('email', formData.email);
    form.append('senha', formData.senha);
    form.append('foto_perfil', formData.fotoPerfil);
    
    try {
      const response = await fetch('http://localhost:3000/api/coordenadores', {
        method: 'POST',
        body: form,
      });
      
      if (response.ok) {
        const result = await response.json();
        alert('Cadastro de coordenador enviado com sucesso!');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Erro do servidor:', errorData);
        
        console.log('Tentando abordagem alternativa...');
        return await tentarEnvioAlternativo();
      }
    } catch (err) {
      console.error('Erro de conexão:', err);

      return await tentarEnvioAlternativo();
    }
    
    async function tentarEnvioAlternativo() {
      try {
        const dadosJSON = {
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          telefone: formData.telefone,
          email: formData.email,
          senha: formData.senha,
          foto_perfil: 'default-avatar.png'
        };
        
        const response = await fetch('http://localhost:3000/api/coordenadores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosJSON)
        });
        
        if (response.ok) {
          const result = await response.json();
          alert('Cadastro de coordenador enviado com sucesso!');
          window.location.href = '/';
        } else {
          const errorData = await response.json();
          console.error('Erro no método alternativo:', errorData);
          window.prompt('Erro ao enviar cadastro. Copie o erro abaixo:', JSON.stringify(errorData));
        }
      } catch (err) {
        console.error('Erro no método alternativo:', err);
        window.prompt('Erro de conexão com o servidor. Copie o erro abaixo:', String(err));
      }
    }
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
                  <label htmlFor="nome" className={styles.label}>
                    <FaUser className={styles.labelIcon} />
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    onBlur={(e) => validateField('nome', e.target.value)}
                    className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
                    placeholder="Digite seu nome"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sobrenome" className={styles.label}>
                    <FaUser className={styles.labelIcon} />
                    Sobrenome Completo *
                  </label>
                  <input
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleInputChange}
                    onBlur={(e) => validateField('sobrenome', e.target.value)}
                    className={`${styles.input} ${errors.sobrenome ? styles.inputError : ''}`}
                    placeholder="Digite seu sobrenome completo"
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
                    onBlur={(e) => validateField('telefone', e.target.value)}
                    className={`${styles.input} ${errors.telefone ? styles.inputError : ''}`}
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
                    onBlur={(e) => validateField('email', e.target.value)}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="senha" className={styles.label}>
                    <FaLock className={styles.labelIcon} />
                    Senha *
                  </label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="senha"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField('senha', e.target.value)}
                      className={`${styles.input} ${errors.senha ? styles.inputError : ''}`}
                      placeholder="Mínimo 6 caracteres"
                      minLength="6"
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordFeedback && (
                    <span className={`${styles.passwordFeedback} ${passwordFeedback.includes('Senha válida!') ? styles.valid : styles.invalid}`}>
                      {passwordFeedback}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha" className={styles.label}>
                    <FaLock className={styles.labelIcon} />
                    Confirmar Senha *
                  </label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmarSenha"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField('confirmarSenha', e.target.value)}
                      className={`${styles.input} ${errors.confirmarSenha ? styles.inputError : ''}`}
                      placeholder="Digite a senha novamente"
                      minLength="6"
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmarSenha && <span className={styles.errorMessage}>{errors.confirmarSenha}</span>}
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
                  <label className={`${styles.uploadLabel} ${errors.fotoPerfil ? styles.uploadLabelError : ''}`}>
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview da foto de perfil" 
                        className={styles.imagePreview}
                      />
                    ) : (
                      <>
                        <FaUpload className={`${styles.uploadIcon} ${errors.fotoPerfil && !formData.fotoPerfil ? styles.uploadIconError : ''}`} />
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
