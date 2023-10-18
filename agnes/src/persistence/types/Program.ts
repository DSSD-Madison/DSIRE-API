import type ImplementingSector from "./ImplementingSector";


export default interface Program {
    id: number;
    is_entire_state: number;
    name: string | null;
    start_date: Date | null;
    end_date: Date | null;
    summary: string | null;

    implementing_sector: ImplementingSector;
}
