import { Usuario } from "./usuario";


export class UsuarioLista {

    private lista: Usuario[] = [];

    constructor() {}

    // Agregar un usuario
    public agregarUsuario(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id: string, nombre: string) {
        const index = this.lista.findIndex(usuario => usuario.id === id);
        this.lista[index].nombre = nombre;

        console.log('====== Actualizando usuario ========');
        console.log(this.lista);
    }

    // Obtener lista de usuarios
    public getLista(): Usuario[] {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    
    public getUsuario(id: string): Usuario | undefined {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuario en un sala en particular
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}