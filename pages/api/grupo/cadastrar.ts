import {connectToDatabase} from '@/config/mongodb';

async function validaGrupoCadastrado(db: any, chaveGerada: string = ""): Promise<string> {
    let randomKey = chaveGerada
        ? chaveGerada
        : Math.random().toString(36).substring(7);

    const grupoCadastrado = await db
        .collection("groups")
        .findOne({id: randomKey});

    if (grupoCadastrado) {
        randomKey = Math.random().toString(36).substring(7);

        return validaGrupoCadastrado(db, randomKey);
    }

    return randomKey;
}

export default async function handler(req: any, res: any) {

    const {db, client} = await connectToDatabase();

    if (client.isConnected()) {
        let randomKey = await validaGrupoCadastrado(db);

        const novoGrupo = {
            id: randomKey
        };

        await db.collection('groups').insertOne(novoGrupo)

        res.statusCode = 200;
        res.json(novoGrupo);
    }

}
