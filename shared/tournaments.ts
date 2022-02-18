import { Tournament } from "./types"

export const tournaments :Tournament[] = [{
    name: "Phoenix Open",
    beforeStartWordle: 228,
    pars: [4,4,5,3,4,4,3,4,4,4,4,3,5,4,5,3,4,4]
}];

const currentTournament = tournaments[0];

export default currentTournament;