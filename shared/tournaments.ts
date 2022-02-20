import { Tournament } from "./types"

export const tournaments :Tournament[] = [{
    name: "Phoenix Open",
    id: 0,
    beforeStartWordle: 228,
    beforeStartTime: 1643781600,
    pars: [4,4,5,3,4,4,3,4,4,4,4,3,5,4,5,3,4,4]
}];

const currentTournament = tournaments[0];

export default currentTournament;