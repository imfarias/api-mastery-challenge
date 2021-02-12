import {connectToDatabase} from "../../../../config/mongodb";

export default async function handler(req, res) {

    const RIOT_API = process.env.RIOT_API;

    const {
        query: { grupoRegiaoNome },
    } = req;

    const grupo = grupoRegiaoNome[0];
    const regiao = grupoRegiaoNome[1].toLowerCase();
    const nomeInvocador = grupoRegiaoNome[2];

    const url = `https://${regiao}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeInvocador}`;

    const responseSummoner = await fetch(url, {
        headers: {
            'X-Riot-Token': RIOT_API
        }
    });
    const dataInvocador = await responseSummoner.json();

    const {db, client} = await connectToDatabase();

    if (client.isConnected()) {

        const novoGrupo = {
            group: grupo,
            ...dataInvocador
        };

        await db.collection('users').insertOne(novoGrupo)

        res.statusCode = 200;
        res.json(novoGrupo);
    }

}
