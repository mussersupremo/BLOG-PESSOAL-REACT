import React, { ChangeEvent, useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import useLocalStorage from 'react-use-localstorage';

function Login() {

    /*

    A maior parte dos Hook pracisarão de uma variável para acessar o seu valor e uma função para modificar os seus dados.

    1 - Criaremos o Hook userState do tipo  UserLogin, definindo os seus valores iniciais

    2 - método para recuperar as informações dos usuários
    
    3 - Chamar o método dentro dos TextFields
    
    */
    const navigate = useNavigate()
    const [token, setToken] = useLocalStorage('token')
    const [UserLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        usuario: '',
        senha: '',
        token: ''
    })

    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...UserLogin,
            [e.target.name]: e.target.value

        })
    }

    useEffect(() => {
        if (token != '') {
            navigate('/home')

        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {

            await login('/usuarios/logar', UserLogin, setToken)

            alert('Usuario logado com Sucesso!')


        } catch (error) {

            alert('Dados incorretos!')

        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>

                        <TextField value={UserLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>

                        <TextField value={UserLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            id='senha' label='senha'
                            variant='outlined' name='senha' margin='normal'
                            fullWidth type='password'></TextField>


                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>

                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    );
}

export default Login;