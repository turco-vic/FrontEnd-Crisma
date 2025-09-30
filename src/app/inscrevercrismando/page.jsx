"use client";
import { useState } from 'react';
import styles from './Inscrevercrismando.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUser, FaUpload, FaCheck, FaCalendarAlt, FaPhone, FaInstagram, FaHome, FaUserCheck, FaFileUpload, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaMapMarkerAlt, FaRoad, FaCity } from 'react-icons/fa';

export default function InscreverCrismando() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    telefone: '',
    instagram: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
    certidaoBatismo: null,
    certidaoEucaristia: null,
    rg: null,
    foto: null
  });

  const [uploadStatus, setUploadStatus] = useState({
    certidaoBatismo: false,
    certidaoEucaristia: false,
    rg: false,
    foto: false
  });

  const [imagePreview, setImagePreview] = useState({
    certidaoBatismo: null,
    certidaoEucaristia: null,
    rg: null,
    foto: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [errors, setErrors] = useState({});
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
      return 'Senha válida! ✓';
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
      case 'sobrenome':
      case 'nomeResponsavel':
        if (!value.trim()) {
          newErrors[name] = 'Este campo é obrigatório';
        } else {
          delete newErrors[name];
        }
        break;
      case 'dataNascimento':
        if (!value.trim()) {
          newErrors[name] = 'Data de nascimento é obrigatória';
        } else {
          delete newErrors[name];
        }
        break;
      case 'cep':
        if (!value.trim()) {
          newErrors[name] = 'CEP é obrigatório';
        } else if (value.replace(/\D/g, '').length !== 8) {
          newErrors[name] = 'CEP deve ter 8 dígitos';
        } else {
          delete newErrors[name];
        }
        break;
      case 'logradouro':
      case 'numero':
      case 'bairro':
      case 'cidade':
        if (!value.trim()) {
          newErrors[name] = 'Este campo é obrigatório';
        } else {
          delete newErrors[name];
        }
        break;
      case 'telefone':
      case 'telefoneResponsavel':
        if (!value.trim()) {
          newErrors[name] = 'Telefone é obrigatório';
        } else {
          delete newErrors[name];
        }
        break;
      case 'instagram':
        if (!value.trim()) {
          newErrors[name] = 'Instagram é obrigatório';
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
      case 'foto':
      case 'certidaoBatismo':
      case 'certidaoEucaristia':
      case 'rg':
        if (!value) {
          newErrors[name] = 'Este documento é obrigatório';
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

  const buscarCep = async (cep) => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      return;
    }

    setLoadingCep(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || ''
        }));
      } else {
        console.log('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCepChange = (e) => {
    const { value } = e.target;
    let formattedCep = value.replace(/\D/g, '');

    if (formattedCep.length > 5) {
      formattedCep = formattedCep.slice(0, 5) + '-' + formattedCep.slice(5, 8);
    }
    
    setFormData(prev => ({
      ...prev,
      cep: formattedCep
    }));

    if (formattedCep.replace(/\D/g, '').length === 8) {
      buscarCep(formattedCep);
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
      setUploadStatus(prev => ({
        ...prev,
        [fieldName]: true
      }));

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(prev => ({
            ...prev,
            [fieldName]: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(prev => ({
          ...prev,
          [fieldName]: 'uploaded'
        }));
      }
      
      // Validar campo de arquivo
      validateField(fieldName, file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldsToValidate = [
      'nome', 'sobrenome', 'dataNascimento', 'cep', 'logradouro', 'numero', 
      'bairro', 'cidade', 'telefone', 'instagram', 'email', 'senha', 
      'confirmarSenha', 'nomeResponsavel', 'telefoneResponsavel', 
      'foto', 'certidaoBatismo', 'certidaoEucaristia', 'rg'
    ];
    let hasErrors = false;
    let firstErrorField = null;
    fieldsToValidate.forEach(field => {
      const value = ['foto', 'certidaoBatismo', 'certidaoEucaristia', 'rg'].includes(field) 
        ? formData[field] 
        : formData[field];
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
        let element;
        if (['foto', 'certidaoBatismo', 'certidaoEucaristia', 'rg'].includes(firstErrorField)) {
          if (firstErrorField === 'foto') {
            element = document.querySelector('input[accept=".jpg,.jpeg,.png"]');
          } else {
            const fileInputs = document.querySelectorAll('input[accept=".pdf,.jpg,.jpeg,.png"]');
            if (firstErrorField === 'certidaoBatismo') {
              element = fileInputs[0];
            } else if (firstErrorField === 'certidaoEucaristia') {
              element = fileInputs[1];
            } else if (firstErrorField === 'rg') {
              element = fileInputs[2];
            }
          }
        } else {
          element = document.getElementById(firstErrorField);
        }
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          if (!['foto', 'certidaoBatismo', 'certidaoEucaristia', 'rg'].includes(firstErrorField)) {
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
    const dadosCompletos = {
      name: formData.nome,
      surname: formData.sobrenome,
      birthday: formData.dataNascimento,
      cep: formData.cep,
      road: formData.logradouro,
      house_number: formData.numero,
      complement: formData.complemento,
      neighborhood: formData.bairro,
      city: formData.cidade,
      phone_number: formData.telefone,
      instagram: formData.instagram,
      email: formData.email,
      password: formData.senha,
      responsible_person: formData.nomeResponsavel,
      responsible_person_phone: formData.telefoneResponsavel,
      baptismal_certificate: formData.certidaoBatismo,
      certificate_first_communion: formData.certidaoEucaristia,
      rg: formData.rg,
      profile_photo: formData.foto,
      // turma_id: pode ser adicionado aqui se necessário
    };
    const form = new FormData();
    Object.entries(dadosCompletos).forEach(([key, value]) => {
      form.append(key, value);
    });
    try {
      const response = await fetch('http://localhost:3000/api/crismandos', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        alert('Inscrição enviada com sucesso!');
        window.location.href = '/';
      } else {
        const errorText = await response.text();
        window.prompt('Erro ao enviar inscrição. Copie o erro abaixo:', errorText);
      }
    } catch (err) {
      window.prompt('Erro de conexão com o servidor. Copie o erro abaixo:', String(err));
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroIcon}>
            <FaUser />
          </div>
          <h1 className={styles.title}>Inscrição para Crismando</h1>
          <p className={styles.subtitle}>
            Preencha todos os campos para se inscrever no Sacramento da Crisma
          </p>
        </section>

        <main className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaUser className={styles.sectionIcon} />
                <h2>Dados Pessoais do Crismando</h2>
              </div>
              
              <div className={styles.photoSection}>
                <div className={styles.uploadGroup}>
                  <label className={`${styles.uploadLabel} ${errors.foto ? styles.uploadLabelError : ''}`}>
                    {imagePreview.foto && imagePreview.foto !== 'uploaded' ? (
                      <img src={imagePreview.foto} alt="Foto para perfil" className={styles.uploadedPhoto} />
                    ) : (
                      <>
                        <FaUpload className={`${styles.uploadIcon} ${errors.foto && !formData.foto ? styles.uploadIconError : ''}`} />
                        <span>Foto para perfil *</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'foto')}
                    className={styles.fileInput}
                    required
                  />
                  <p className={styles.fileInfo}>JPG ou PNG - Máx. 3MB</p>
                </div>
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
                    className={styles.input}
                    placeholder="Digite o nome do crismando"
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
                    className={styles.input}
                    placeholder="Digite o sobrenome completo do crismando"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dataNascimento" className={styles.label}>
                    <FaCalendarAlt className={styles.labelIcon} />
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="cep" className={styles.label}>
                    <FaMapMarkerAlt className={styles.labelIcon} />
                    CEP *
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    className={styles.input}
                    placeholder="00000-000"
                    maxLength="9"
                    required
                  />
                  {loadingCep && <p className={styles.loadingText}>Buscando endereço...</p>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="logradouro" className={styles.label}>
                    <FaRoad className={styles.labelIcon} />
                    Rua *
                  </label>
                  <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Rua, Avenida, etc."
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="numero" className={styles.label}>
                    <FaHome className={styles.labelIcon} />
                    Número *
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="123"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="complemento" className={styles.label}>
                    <FaHome className={styles.labelIcon} />
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Apto 101, Bloco A, etc."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="bairro" className={styles.label}>
                    <FaCity className={styles.labelIcon} />
                    Bairro *
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Nome do bairro"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cidade" className={styles.label}>
                    <FaCity className={styles.labelIcon} />
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Nome da cidade"
                    required
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              
              <div className={styles.formGrid}>
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
                  <label htmlFor="instagram" className={styles.label}>
                    <FaInstagram className={styles.labelIcon} />
                    Instagram *
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="@seuusuario"
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
                    <span className={`${styles.passwordFeedback} ${passwordFeedback.includes('✓') ? styles.valid : styles.invalid}`}>
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
                <FaUserCheck className={styles.sectionIcon} />
                <h2>Dados do Responsável</h2>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="nomeResponsavel" className={styles.label}>
                    <FaUser className={styles.labelIcon} />
                    Nome Completo do Responsável *
                  </label>
                  <input
                    type="text"
                    id="nomeResponsavel"
                    name="nomeResponsavel"
                    value={formData.nomeResponsavel}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Digite o nome completo do responsável"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telefoneResponsavel" className={styles.label}>
                    <FaPhone className={styles.labelIcon} />
                    Telefone do Responsável *
                  </label>
                  <input
                    type="tel"
                    id="telefoneResponsavel"
                    name="telefoneResponsavel"
                    value={formData.telefoneResponsavel}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaFileUpload className={styles.sectionIcon} />
                <h2>Documentos Necessários</h2>
              </div>
              
              <div className={styles.uploadGrid}>
                <div className={styles.uploadGroup}>
                  <label className={`${styles.uploadLabel} ${errors.certidaoBatismo ? styles.uploadLabelError : ''}`}>
                    {imagePreview.certidaoBatismo && imagePreview.certidaoBatismo !== 'uploaded' ? (
                      <img src={imagePreview.certidaoBatismo} alt="Certidão de Batismo" className={styles.uploadedDocumentImage} />
                    ) : imagePreview.certidaoBatismo === 'uploaded' ? (
                      <>
                        <FaCheck className={styles.uploadedDocumentIcon} />
                        <span className={styles.uploadSuccessText}>Documento enviado!</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className={`${styles.uploadIcon} ${errors.certidaoBatismo && !formData.certidaoBatismo ? styles.uploadIconError : ''}`} />
                        <span>Clique para enviar</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'certidaoBatismo')}
                    className={styles.fileInput}
                    required
                  />
                  <h3 className={styles.documentTitle}>Certidão de Batismo *</h3>
                  <p className={styles.fileInfo}>PDF, JPG ou PNG - Máx. 5MB</p>
                </div>

                <div className={styles.uploadGroup}>
                  <label className={`${styles.uploadLabel} ${errors.certidaoEucaristia ? styles.uploadLabelError : ''}`}>
                    {imagePreview.certidaoEucaristia && imagePreview.certidaoEucaristia !== 'uploaded' ? (
                      <img src={imagePreview.certidaoEucaristia} alt="Certidão de Primeira Eucaristia" className={styles.uploadedDocumentImage} />
                    ) : imagePreview.certidaoEucaristia === 'uploaded' ? (
                      <>
                        <FaCheck className={styles.uploadedDocumentIcon} />
                        <span className={styles.uploadSuccessText}>Documento enviado!</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className={`${styles.uploadIcon} ${errors.certidaoEucaristia && !formData.certidaoEucaristia ? styles.uploadIconError : ''}`} />
                        <span>Clique para enviar</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'certidaoEucaristia')}
                    className={styles.fileInput}
                    required
                  />
                  <h3 className={styles.documentTitle}>Certidão de Primeira Eucaristia *</h3>
                  <p className={styles.fileInfo}>PDF, JPG ou PNG - Máx. 5MB</p>
                </div>

                <div className={styles.uploadGroup}>
                  <label className={`${styles.uploadLabel} ${errors.rg ? styles.uploadLabelError : ''}`}>
                    {imagePreview.rg && imagePreview.rg !== 'uploaded' ? (
                      <img src={imagePreview.rg} alt="RG (Documento de Identidade)" className={styles.uploadedDocumentImage} />
                    ) : imagePreview.rg === 'uploaded' ? (
                      <>
                        <FaCheck className={styles.uploadedDocumentIcon} />
                        <span className={styles.uploadSuccessText}>Documento enviado!</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className={`${styles.uploadIcon} ${errors.rg && !formData.rg ? styles.uploadIconError : ''}`} />
                        <span>Clique para enviar</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'rg')}
                    className={styles.fileInput}
                    required
                  />
                  <h3 className={styles.documentTitle}>RG (Documento de Identidade) *</h3>
                  <p className={styles.fileInfo}>PDF, JPG ou PNG - Máx. 5MB</p>
                </div>
              </div>
            </section>

            <div className={styles.submitSection}>
              <button type="submit" className={styles.submitButton}>
                <FaCheck className={styles.submitIcon} />
                Enviar Inscrição
              </button>
              <p className={styles.submitInfo}>
                * Campos obrigatórios. Após o envio, você receberá uma confirmação por email.
              </p>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}
