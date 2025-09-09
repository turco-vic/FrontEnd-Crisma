"use client";
import { useState } from 'react';
import styles from './Login.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
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

        if (errors[name]) {
            validateField(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fieldsToValidate = ['email', 'senha'];
        let hasErrors = false;
        let firstErrorField = null;

        fieldsToValidate.forEach(field => {
            const isValid = validateField(field, formData[field]);
            if (!isValid) {
                hasErrors = true;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });

        if (hasErrors) {
            if (firstErrorField) {
                const element = document.getElementById(firstErrorField);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'nearest'
                    });
                    setTimeout(() => element.focus(), 300);
                }
            }
            return;
        }

        console.log('Dados de login:', formData);

    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <section className={styles.hero}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.subtitle}>
                        Entre com suas credenciais para acessar sua conta
                    </p>
                </section>

                <main className={styles.content}>
                    <form onSubmit={handleSubmit} className={styles.form}>
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
                            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
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
                                    placeholder="Digite sua senha"
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
                            {errors.senha && <span className={styles.errorMessage}>{errors.senha}</span>}
                        </div>

                        <div className={styles.submitSection}>
                            <button type="submit" className={styles.submitButton}>
                                <FaSignInAlt className={styles.submitIcon} />
                                Entrar
                            </button>
                            <p className={styles.submitInfo}>
                                Não tem uma conta? <a href="/inscreverse" className={styles.link}>Inscreva-se</a>
                            </p>
                        </div>
                    </form>
                </main>
            </div>
            <Footer />
        </>
    );
}
