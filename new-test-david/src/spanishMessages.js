export const spanishMessages = {
    ra:{
        action: {
            add_filter: 'Añadir filtro',
            add: 'Añadir',
            back: 'Regresar',
            bulk_actions: '1 objeto seleccionado |||| %{smart_count} objetos seleccionados',
            cancel: 'Cancelar',
            clear_array_input: 'Borrar lista',
            clear_input_value: 'Borrar valor',
            clone: 'Clonar',
            confirm: 'Aceptar',
            create: 'Crear',
            create_item: 'Crear %{item}',
            delete: 'Eliminar',
            edit: 'Editar',
            export: 'Exportar',
            list: 'Lista',
            refresh: 'Recargar',
            remove_filter: 'Borrar este filtro',
            remove_all_filters: 'Borrar todos los filtros',
            remove: 'Borrar',
            save: 'Guardar',
            search: 'Buscar',
            select_all: 'Seleccionar todo',
            select_row: 'Seleccionar esta fila',
            show: 'Mostrar',
            sort: 'Ordenar',
            undo: 'Deshacer',
            unselect: 'Deseleccionar',
            expand: 'Expandir',
            close: 'Cerrar',
            open_menu: 'Abrir menu',
            close_menu: 'Cerrar menu',
            update: 'Actualizar',
            move_up: 'Mover arriba',
            move_down: 'Mover abajo',
            open: 'Abrir',
            toggle_theme: 'Activar Tema',
            select_columns: 'Columna',
            update_application: 'Recargar Aplicación',
        },
        boolean: {
            true: 'Si',
            false: 'No',
            null: ' ',
        },
        page: {
            create: 'Crear %{name}',
            dashboard: 'Panel',
            edit: '%{name} %{recordRepresentation}',
            error: 'Algo salió mal',
            list: '%{name}',
            loading: 'Cargando',
            not_found: 'Sin Resultados',
            show: '%{name} %{recordRepresentation}',
            empty: 'No hay %{name} todavía.',
            invite: '¿Deseas agregar uno?',
        },
        input: {
            file: {
                upload_several:
                    'Suelte algunos archivos para cargar o haga clic para seleccionar uno.',
                upload_single: 'Suelta un archivo para cargarlo o haz clic para seleccionarlo.',
            },
            image: {
                upload_several:
                    'Suelte algunas imágenes para cargar o haga clic para seleccionar una.',
                upload_single:
                    'Suelta una imagen para cargarla o haz clic para seleccionarla.',
            },
            references: {
                all_missing: 'No se pueden encontrar las referencias.',
                many_missing:
                    'Varias de las referencias asociadas ya no estan disponible.',
                single_missing:
                    'La referencia asociada ya esta disponible.',
            },
            password: {
                toggle_visible: 'Ocultar contraseña',
                toggle_hidden: 'Mostrar constraseña',
            },
        },
        message: {
            about: 'Acerca de',
            are_you_sure: '¿Estas seguro?',
            auth_error:
                'Ocurrió un error al validar el token de autentificación',
            bulk_delete_content:
                '¿Deseas eliminar %{name}? |||| ¿Deseas eliminar estos %{smart_count} objetos?',
            bulk_delete_title:
                'Eliminar %{name} |||| Eliminar %{smart_count} %{name}',
            bulk_update_content:
                '¿Deseas actualizar %{name}? |||| ¿Deseas actualizar %{smart_count} objetos?',
            bulk_update_title:
                'Actualizar %{name} |||| Actualizar %{smart_count} %{name}',
            clear_array_input: '¿Deseas vaciar la lista?',
            delete_content: '¿Estas seguro de eliminar este objeto?',
            delete_title: 'Eliminar %{name} #%{id}',
            details: 'Eliminar',
            error:
                "Ocurrió un error en el cliente y tu petición no pudo ser procesada",

            invalid_form: 'El formulario no es válido. Favor de verificarlo',
            loading: 'La página esta cargando, espere un momento por favor',
            no: 'No',
            not_found:
                'URL inválido',
            yes: 'Si',
            unsaved_changes:
                "Alugnos de tus cambios no fueron guardados. ¿Deseas ignorarlos?",
        },
        navigation: {
            no_results: 'No hay resultados',
            no_more_results:
                'La página número %{page} esta fuera de límite. Prueba la página anterior.',
            page_out_of_boundaries: 'La página %{page} esta fuera de limites',
            page_out_from_end: 'No se puede avanzar después de la página anterior',
            page_out_from_begin: 'No es posible ir más allá de la página principal',
            page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
            partial_page_range_info:
                '%{offsetBegin}-%{offsetEnd} de más de %{offsetEnd}',
            current_page: 'Página %{page}',
            page: 'Ir a la página %{page}',
            first: 'Ir a la primera página',
            last: 'Ir a la última página',
            next: 'Ir a la siguiente página',
            previous: 'Ir a la página anterior',
            page_rows_per_page: 'Filas por página:',
            skip_nav: 'Omitir contenido',
        },
        sort: {
            sort_by: 'Ordenar por %{field} %{order}',
            ASC: 'Ascendente',
            DESC: 'Descendente',
        },
        auth: {
            auth_check_error: 'Por favor inicia sesión para continuar',
            user_menu: 'Perfil',
            username: 'Nombre de Usuario',
            password: 'Contraseña',
            sign_in: 'Iniciar sesión',
            sign_in_error: 'Error de autentificación, intentalo de nuevo',
            logout: 'Cerrar sesión',
        },
        notification: {
            updated: 'Elemento actualizado |||| %{smart_count} elementos actualizados',
            created: 'Elemento creado',
            deleted: 'Elemento eliminado |||| %{smart_count} elementos eliminados',
            bad_item: 'Elemento incorrecto',
            item_doesnt_exist: 'El elemento no existe',
            http_error: 'Error de comunicación con el servidor',
            data_provider_error:
                'Error del dataProvider . Revisar la consola para los detalles.',
            i18n_error:
                'No hay traducción para el lenguaje especificado.',
            canceled: 'Acción cancelada',
            logged_out: 'Su sesión ha terminado, favor de reconectarse.',
            not_authorized: "No tienes el permiso para acceder a este recurso.",
            application_update_available: 'Una nueva versión esta disponible.',
        },
        validation: {
            required: 'Requerido',
            minLength: 'Debes tener un mínimo de %{min} caracteres',
            maxLength: 'Debes tener un máximo de %{max} caracteres o menos',
            minValue: 'Debe ser al menos %{min}',
            maxValue: 'Debe ser %{max} o menos',
            number: 'Debe ser un número',
            email: 'Debe ser un email válido',
            oneOf: 'Debe ser uno de: %{options}',
            regex: 'Debe tener un formato específico (regexp): %{pattern}',
            unique: 'Debe ser único',
        },
        saved_queries: {
            label: 'Consultas guardadas',
            query_name: 'Nombre de la consulta',
            new_label: 'Guardar la consulta actual...',
            new_dialog_title: 'Guardar la consulta actual como',
            remove_label: 'Eliminar la consulta guardada',
            remove_label_with_name: 'Eliminar la consulta "%{name}"',
            remove_dialog_title: '¿Desea eliminar la consulta guardada?',
            remove_message:
                '¿Desea elminar este objeto de su lista de consultas guardadas?',
            help: 'Filtrar la lista y guardar esta consulta para después',
        },
        configurable: {
            customize: 'Configurar',
            configureMode: 'Configurar esta página',
            inspector: {
                title: 'Inspector',
                content: 'Pase el cursor sobre los elementos de la interfaz de usuario de la aplicación para configurarlos',
                reset: 'Reiniciar Ajustes',
                hideAll: 'Ocultar Todo',
                showAll: 'Mostrar Todo',
            },
            Datagrid: {
                title: 'Cuadrícula',
                unlabeled: 'Columna sin nombre #%{column}',
            },
            SimpleForm: {
                title: 'Formulario',
                unlabeled: 'Entrada sin nombre #%{input}',
            },
            SimpleList: {
                title: 'Lista',
                primaryText: 'Texto primario',
                secondaryText: 'Texto secundario',
                tertiaryText: 'Texto terciario',
            },
        },
    },
};

let messages = spanishMessages;

let locale = 'en';

export const i18nProvider = {
    translate: key => lodashGet(messages, key),
    changeLocale: newLocale => {
        messages = (newLocale === 'es') ? spanishMessages : englishMessages;
        locale = newLocale;
        return Promise.resolve();
    },
    getLocale: () => locale
}