type Hole = {
    number: number,
    par: number,
    score?: number
}

type Player = {
    id: string,
    displayName: string,
    holes: Hole[],
}

type Standings = {
    holes: Hole[],
    players: Player[],
}

export default Hole;