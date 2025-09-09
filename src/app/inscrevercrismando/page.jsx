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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        alert('CEP não encontrado. Verifique o número digitado.');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Tente novamente.');
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
    
    const dadosCompletos = {
      ...formData,
      nomeCompleto: `${formData.nome} ${formData.sobrenome}`.trim(),
      enderecoCompleto: `${formData.logradouro}, ${formData.numero}${formData.complemento ? ', ' + formData.complemento : ''}, ${formData.bairro}, ${formData.cidade}, CEP: ${formData.cep}`
    };
    
    alert('Inscrição de crismando enviada com sucesso! Em breve entraremos em contato.');
    console.log('Dados do formulário:', dadosCompletos);
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
                  <label className={styles.uploadLabel}>
                    {imagePreview.foto && imagePreview.foto !== 'uploaded' ? (
                      <img src={imagePreview.foto} alt="Foto para perfil" className={styles.uploadedPhoto} />
                    ) : (
                      <>
                        <FaUpload className={styles.uploadIcon} />
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
                      className={styles.input}
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
                      className={styles.input}
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
                  <label className={styles.uploadLabel}>
                    {imagePreview.certidaoBatismo && imagePreview.certidaoBatismo !== 'uploaded' ? (
                      <img src={imagePreview.certidaoBatismo} alt="Certidão de Batismo" className={styles.uploadedDocumentImage} />
                    ) : imagePreview.certidaoBatismo === 'uploaded' ? (
                      <>
                        <FaCheck className={styles.uploadedDocumentIcon} />
                        <span className={styles.uploadSuccessText}>Documento enviado!</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className={styles.uploadIcon} />
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
                  <label className={styles.uploadLabel}>
                    {imagePreview.certidaoEucaristia && imagePreview.certidaoEucaristia !== 'uploaded' ? (
                      <img src={imagePreview.certidaoEucaristia} alt="Certidão de Primeira Eucaristia" className={styles.uploadedDocumentImage} />
                    ) : imagePreview.certidaoEucaristia === 'uploaded' ? (
                      <>
                        <FaCheck className={styles.uploadedDocumentIcon} />
                        <span className={styles.uploadSuccessText}>Documento enviado!</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className={styles.uploadIcon} />
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
                  <label className={styles.uploadLabel}>
                    {imagePreview.rg && imagePreview.rg !== 'uploaded' ? (
                      <img src={imagePreview.rg} alt="RG (Documento de Identidade)" className={styles.uploadedDocumentImage} />
                    ) : imagePreview.rg === 'uploaded' ? (
                      <>
                        <FaCheck className={styles.uploadedDocumentIcon} />
                        <span className={styles.uploadSuccessText}>Documento enviado!</span>
                      </>
                    ) : (
                      <>
                        <FaUpload className={styles.uploadIcon} />
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
