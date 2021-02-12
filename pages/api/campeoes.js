export default async function handler(req, res) {

    const responseVersions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const data = await responseVersions.json();

    const lastVersion = data.splice(0, 1);

    const responseChampions = await fetch(`http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/pt_BR/champion.json`);
    const dataCampeoes = await responseChampions.json();

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.statusCode = 200;
    res.json(dataCampeoes);

}
