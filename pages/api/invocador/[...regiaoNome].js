export default async function handler(req, res) {

    const RIOT_API = "RGAPI-b5f3f204-98d0-4e3b-9558-283c4365edf0";

    const {
        query: { regiaoNome },
    } = req;

    const regiao = regiaoNome[0].toLowerCase();
    const nomeInvocador = regiaoNome[1];

    const url = `https://${regiao}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nomeInvocador}`;

    const responseSummoner = await fetch(url, {
        headers: {
            'X-Riot-Token': RIOT_API
        }
    });
    const dataInvocador = await responseSummoner.json();

    const urlMaestria = `https://${regiao}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${dataInvocador.id}`;

    const responseCampeoes = await fetch(urlMaestria, {
        headers: {
            'X-Riot-Token': RIOT_API
        }
    });
    const dataCampeoes = await responseCampeoes.json();

    dataInvocador.campeoes = dataCampeoes;

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.statusCode = 200;
    res.json({dataInvocador});

}