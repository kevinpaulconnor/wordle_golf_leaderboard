export type Hole = {
    number: number,
    par: number,
    score?: number,
    average?: number
}

export type Player = {
    id: number,
    displayName: string,
    scores: (number | null)[],
    total?: number,
}

type PlayerKeyed = { [n:string]: Player}

export type Tournament = {
    id: number,
    holes?: Hole[],
    players?: Player[],
    name: string,
    beforeStartWordle: number,
    beforeStartTime: number,
    overrides: PlayerKeyed,
    leaders?: string[],
    finished?: boolean,
}

export type GroupMeMessage = {
    "created_at": number,
    "name": string,
    "sender_id": string,
    "text": string,
}

export default Hole;