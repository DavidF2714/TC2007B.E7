import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const CustomLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the useLogin hook to perform login
            await login({ username, password });
        } catch (error) {
            notify('Authentication failed');
        }
    };

    document.body.style.overflow='hidden';

    return (
        <MDBContainer fluid>
            <MDBRow className="justify-content-center align-items-center min-vh-100">
                <MDBCol sm='6'>
                    <div className='d-flex flex-row justify-content-center'>
                    </div>

                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Usuario'
                                id='username'
                                type='text'
                                size="lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                            />
                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                label='Contraseña'
                                id='password'
                                type='password'
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type="submit">Ingresar</MDBBtn>

                        </form>
                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='success' size='lg' type="submit" href='/#/registrarse'>Registrarse</MDBBtn>
                    </div>
                </MDBCol>
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src="https://wallpapercave.com/wp/wp6511786.jpg"
                    alt="Login image" className="w-100" style={{ objectFit: 'contain', objectPosition: 'left'}}/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default CustomLoginPage;
