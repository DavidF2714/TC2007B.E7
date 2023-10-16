import { useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from 'mdb-react-ui-kit';
import { useNotify } from "react-admin";

const Registrarse = () => {

    const [datos, setDatos] = useState({
        username: "",
        password: "",
        fullName: "",
        permissions: "",
    });

    const notify = useNotify();

    const [usuarioCreado, setUsuarioCreado] = useState(false);
    const [redireccionar, setRedireccionar] = useState(false);
    const [registroExitoso, setRegistroExitoso] = useState(false);


    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const handleSendData = async () => {
        if (datos.username && datos.password && datos.fullName && datos.permissions) {
            const request = await new Request('https://localhost:1337/registrarse', {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });

            try {
                const response = await fetch(request);
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                setRegistroExitoso(true);
                notify('Registro Exitoso', { type: "success" })
                setDatos({
                    username: "",
                    password: "",
                    fullName: "",
                    permissions: "",
                });

            }
            catch {
                notify("Nombre de usuario no disponible",{type:'error'});
                throw new Error('Nombre de usuario no disponible');
            }

        } else {
            alert('Por favor, complete todos los campos')
        }
        setTimeout(() => {
            setUsuarioCreado(true);
            setTimeout(() => {
                setRedireccionar(true);
            }, 1500);
        }, 1000);

    };

    if (redireccionar) {
        window.location.href = "/#/login"
    }

    return (

        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Crear una cuenta</h2>
                    <MDBInput wrapperClass='mb-4' label='Nombre Completo' size='lg' id='fullName' type='text' name="fullName" value={datos.fullName} onChange={handleChange} />
                    <MDBInput wrapperClass='mb-4' label='Usuario' size='lg' id='username' type='text' name="username" value={datos.username} onChange={handleChange} />
                    <MDBInput wrapperClass='mb-4' label='Contraseña' size='lg' id='password' type='password' name="password" value={datos.password} onChange={handleChange} />
                    <select class="mb-4 form-control" value={datos.permissions} onChange={handleChange} label="Rol de Permisos" id="permissions" type='text' name='permissions'>
                        <option value="" disabled hidden>Selecciona un tipo de usuario</option>
                        <option value="Coordinador">Coordinador de Aula</option>
                        <option value="Nacional">Coordinador Nacional</option>
                        <option value="Ejecutivo">Ejecutivo</option>
                    </select>
                    <MDBBtn size='lg' onClick={handleSendData}>Registrarse</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );

};

export default Registrarse;