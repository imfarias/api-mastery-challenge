import {connectToDatabase} from "../../../../config/mongodb";

export default async function handler(req, res) {

    const RIOT_API = process.env.RIOT_API;

    const {
        query: { grupoInvocadorCampeao },
    } = req;

    const grupo = grupoInvocadorCampeao[0];
    const invocador = grupoInvocadorCampeao[1];
    const campeao = grupoInvocadorCampeao[2];

    const {db, client} = await connectToDatabase();

    if (client.isConnected()) {

        const novoCampeao = {
            group: grupo,
            user: invocador,
            champion: campeao
        };

        await db.collection('champions').deleteOne(novoCampeao)

        res.statusCode = 200;
        res.json(novoCampeao);
    }

}
