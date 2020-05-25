// , ;

import { Router, Request, Response } from 'express';

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
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const body = req.body;
    const cuerpo = body.cuerpo;
    const de = body.de;
    const id = req.params.id;

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

export default router;