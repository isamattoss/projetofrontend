import { useState, useEffect } from 'react';

export const useUserProfile = () => {
    const [perfil, setPerfil] = useState({
        nome: '',
        email: '',
        telefone: '',
        cursoSonho: ''
    });

    useEffect(() => {
        const dadosSalvos = localStorage.getItem('user_profile');
        if (dadosSalvos) {
            try {
                const parsed = JSON.parse(dadosSalvos);
                setPerfil({
                    nome: parsed.nome || '',
                    email: parsed.email || '',
                    telefone: parsed.telefone || '',
                    cursoSonho: parsed.cursoSonho || ''
                });
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
            }
        }
    }, []);

    const atualizarPerfil = (novosPerfil) => {
        setPerfil(novosPerfil);
        localStorage.setItem('user_profile', JSON.stringify(novosPerfil));
    };

    return { perfil, atualizarPerfil };
};

export default useUserProfile;