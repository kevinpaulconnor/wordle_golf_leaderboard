type Hole = {
    number: number,
    par: number,
    score?: number
}

export type Player = {
    id: number,
    displayName: string,
    scores: number[],
    total?: number,
}

export type Tournament = {
    holes?: Hole[],
    players?: Player[],
    pars: number[],
    name: string,
    beforeStartWordle: number,
}

export type GroupMeMessage = {
    "created_at": number,
    "name": string,
    "sender_id": string,
    "text": string,
}

export default Hole;