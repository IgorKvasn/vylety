import type {NextApiRequest, NextApiResponse} from 'next'
import {createVylet, searchAll} from "@/server/dao/vylety-dao";
import {VyletDTO} from "@/types/vylet-dto";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        await createVylet(req.body as VyletDTO);
        res.status(200).json(null);
    } else {
        let resp = await searchAll();
        res.status(200).json(resp);
    }

}
