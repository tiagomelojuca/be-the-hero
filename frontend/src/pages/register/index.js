import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [zap, setZap] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const registerData = {
            name,
            email,
            zap,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', registerData);
            alert(`Seu ID de acesso é ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/> Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={zap} onChange={e => setZap(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} style={ { width: 80 } }/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;