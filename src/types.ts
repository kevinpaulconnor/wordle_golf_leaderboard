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

export type Standings = {
    holes: Hole[],
    players: Player[],
}

export default Hole;