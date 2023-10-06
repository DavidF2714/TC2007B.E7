import React,{ useState } from "react";
import Select from 'react-select';
import './Suppliers.css'
import PropTypes from "prop-types";

const suppliersData = [
    { label: 'Servicios', value: 1 },
    { label: 'Digital', value: 2 },
    { label: 'Infrastructura', value: 3 },
    { label: 'Recursos humanos', value: 4 },
    { label: 'Beneficiarios', value: 5 },
    { label: 'Mobiliario', value: 6 },
    { label: 'Seguridad', value: 7 },
    { label: 'Materiales', value: 8 },
    { label: 'Fenómeno metereologico', value: 9 }
]
const sub_supplier_Data2= [
    { label: 'agua', value: 1},
    { label: 'Luz', value: 2 },
    { label: 'Telefono', value: 3 },
    { label: 'Basura', value: 4},
    { label: 'Limpieza del aula', value: 5}

]

const sub_supplier_Data3= [
    { label: 'Internet/servidores/equipo', value: 1},
    { label: 'Software', value: 2 },
    { label: 'Hardware', value: 3 },
    { label: 'Camara de seguridad', value: 4 },
    { label: 'Soporte técnico presencial y remoto', value: 5 }

]

const sub_supplier_Data4= [
    { label: 'Paredes', value: 1},
    { label: 'Techo', value: 2 },
    { label: 'Ventanas', value: 3 },
    { label: 'Puertas', value: 4 },
    { label: 'Aulas en general', value: 5 }

]

const sub_supplier_Data5= [
    { label: 'Permisos', value: 1},
    { label: 'Asistencias', value: 2 },
    { label: 'Salud', value: 3 },
    { label: 'Tramites', value: 4 },
    { label: 'Honorarios', value: 5 }

]

const sub_supplier_Data6= [
    { label: 'Asistencias', value: 1},
    { label: 'Documentación', value: 2 },
    { label: 'Apoyo Academico', value: 3 },
    { label: 'Salud', value: 4 },
    { label: 'Seguridad, bulling', value: 4 }

]

const sub_supplier_Data7= [
    { label: 'Sillas, Butacas', value: 1},
    { label: 'Escritorios', value: 2 },
    { label: 'Pizarrones', value: 3 },
    { label: 'Cafeteria', value: 4 },
    { label: 'Etantes, Archiveros', value: 5 }

]

const sub_supplier_Data8= [
    { label: 'Delicuencia', value: 1},
    { label: 'Robo', value: 2 },
    { label: 'Bandalismo', value: 3 },
    { label: 'Imagen intistucional', value: 4 }

]


const sub_supplier_Data9= [
    { label: 'Educativos', value: 1},
    { label: 'Papeleria', value: 2 },
    { label: 'Lipieza', value: 3 }

]

const sub_supplier_Data10= [
    { label: 'Inundaciones', value: 1},
    { label: 'Incendios', value: 2 },
    { label: 'Sismos', value: 3 }

]


export const Suppliers = ({ onChange }) => {
    const [selectedSupplier, setSelectedSupplier] = useState();
  
    const handleSelectChange = (event) => {
      setSelectedSupplier(event.value);
      onChange(event.value);
    };
  
    return (
      <div className="Suppliers-container">
        <Select
          defaultValue={{ label: 'Selecciona una categoría', value: 1 }}
          options={suppliersData}
          onChange={handleSelectChange}
        />
      </div>
    );
  };

export const Subsupplier = (props) => {
  const Datos =
    props.value === 1 ? sub_supplier_Data2 :
    props.value === 2 ? sub_supplier_Data3 :
    props.value === 3 ? sub_supplier_Data4 :
    props.value === 4 ? sub_supplier_Data5 :
    props.value === 5 ? sub_supplier_Data6 :
    props.value === 6 ? sub_supplier_Data7 :
    props.value === 7 ? sub_supplier_Data8 :
    props.value === 8 ? sub_supplier_Data9 :
    props.value === 9 ? sub_supplier_Data10 :
    [];

  const handleSelectChange = (event) => {
    console.log(event.value); 
  };

  return (
    <div className="Suppliers-container">
      <Select
        defaultValue={{ label: 'Selecciona una subcategoria', value: 1 }} 
        options={Datos}
        onChange={handleSelectChange} 
      />
    </div>
  );
};

Suppliers.propTypes = {
    onChange: PropTypes.func,
  };



export default Suppliers;