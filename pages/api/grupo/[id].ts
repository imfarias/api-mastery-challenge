import {connectToDatabase} from '@/config/mongodb';

export default async function handler(req: any, res: any) {

    const id = req.query.id;

    const {db, client} = await connectToDatabase();

    if (client.isConnected()) {

        const grupo = await db.collection("groups")
            .findOne({id});

        const usuariosDoGrupo = await db.collection("users")
            .find({group: id})
            .toArray();

        grupo.users = usuariosDoGrupo;

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.statusCode = 200;
        res.json(grupo);
    }

}
