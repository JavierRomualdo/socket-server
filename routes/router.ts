// , ;

import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok:true,
        mensaje: 'Todo esta bien'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const body = req.body;
    const cuerpo = body.cuerpo;
    const de = body.de;
    
    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);
    
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

// permite enviar mensaje privado a alguien
router.post('/mensajes/:id', (req: Request, res: Response) => {
    const body = req.body;
    const cuerpo = body.cuerpo;
    const de = body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    // envia mensajes privados (io.in)
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;

    // io.clients (me retorna todos los ids de los clientes conectados)
    server.io.clients((err: any, clientes: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes
        });
    });
});

// 
export default router;