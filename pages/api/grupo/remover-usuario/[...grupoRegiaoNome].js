import {connectToDatabase} from "../../../../config/mongodb";

export default async function handler(req, res) {

    const RIOT_API = process.env.RIOT_API;

    const {
        query: {grupoRegiaoNome},
    } = req;

    const grupo = grupoRegiaoNome[0];
    const nomeInvocador = grupoRegiaoNome[1];

    const {db, client} = await connectToDatabase();

    if (client.isConnected()) {

        const novoGrupo = {
            group: grupo,
            id: nomeInvocador
        };

        const novoGrupoCampeao = {
            group: grupo,
            user: nomeInvocador
        };

        await db.collection('champions').remove(novoGrupoCampeao)

        await db.collection('users').deleteOne(novoGrupo)

        res.statusCode = 200;
        res.json(novoGrupo);
    }

}
