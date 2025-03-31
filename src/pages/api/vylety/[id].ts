import type {NextApiRequest, NextApiResponse} from 'next'
import {createVylet, deleteVylet, findVylet, searchAll, updateVylet} from "@/server/dao/vylety-dao";
import {VyletDTO} from "@/types/vylet-dto";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<VyletDTO | null>
) {
    const {id} = req.query;
    if (!id) {
        // @ts-ignore
        res.status(400).json({message: `Bad ID=${vyletIdString}`});
        return;
    }
    if (Array.isArray(id)) {
        // @ts-ignore
        res.status(400).json({message: `Bad ID=${vyletIdString.join(', ')}`});
        return;
    }
    const vyletId = parseInt(id, 10);
    if (vyletId +'' != id) {
        // @ts-ignore
        res.status(400).json({message: `Bad ID=${id}`});
        return;
    }
    if (req.method === 'GET') {
        const v = await findVylet(vyletId);
        res.status(200).json(v);
    }
    if (req.method === 'PUT') {
        await updateVylet(vyletId, req.body as VyletDTO);
        res.status(200).json(null);
    }
    if (req.method === 'DELETE') {
        await deleteVylet(vyletId);
        res.status(200).json(null);
    }

}
