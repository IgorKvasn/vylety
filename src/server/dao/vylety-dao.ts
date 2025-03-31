import { neon } from "@neondatabase/serverless";
import {VyletDTO} from "@/types/vylet-dto";
import {VyletFilterDTO} from "@/types/vylet-filter-dto";

if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL undefined. Check your .env file and make sure it is loaded",
    );
}
export const sql = neon(process.env.DATABASE_URL);

/*export async function getPgVersion() {
    const result = await sql`SELECT version()`;
    return result[0].version;
}*/

export async function searchAll(filter?: VyletFilterDTO): Promise<VyletDTO[]>{
    let result;
    let filterSQL = null;
    if (!!filter) {
        result = await sql(`SELECT * from VYLET WHERE $1`, [filterSQL]);
    } else {
        result = await sql(`SELECT * from VYLET`);
    }
    if (!result || result.length == 0) {
        return [];
    }
    return result.map(mapToVyletDTO);
}

export async function findVylet(id: number): Promise<VyletDTO | null> {
    let v = await sql(`SELECT * from VYLET WHERE id=$1`, [id]);
    if (!v) {
        return null;
    }
    return v[0] as VyletDTO;
}

export async function deleteVylet(id: number) {
   await sql(`DELETE FROM VYLET WHERE id=$1`, [id]);
}

export async function createVylet(data: VyletDTO) {
    await sql(`INSERT INTO VYLET(NAME, done, description, dateFrom, dateFto, deleted) VALUES ($1, false, $2, $3, $4, false)`
        , [data.name, data.description, data.dateFrom, data.dateTo]);
}

export async function updateVylet(id: number, data: VyletDTO) {
    await sql(`UPDATE VYLET SET name=$1, description=$2, dateFrom=$3, dateTo=$4) WHERE id=$5`, [data.name, data.description, data.dateFrom, data.dateTo]);
}

function mapToVyletDTO(data: Record<string, any>){
    return data as VyletDTO;
}
