
// , ;
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer); 
        // tiene el conociieto que personas estan conectadas
        
        this.esucharSockets();
    }

    public esucharSockets() {
        console.log('Esuchando conexiones - sockets');


        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');

            socket.conectarCliente(cliente, this.io);
            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);
            
            // Mensajes
            socket.mensaje(cliente, this.io);
            
            // Desconectar
            socket.desconectar(cliente, this.io);
            // cliente.on('disconnect', () => {
            //     console.log('Ciente desconectado');
            // });


            });            
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: VoidFunction) {
        this.httpServer.listen(this.port, callback)
    }
}