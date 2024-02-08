export function calculateModifier(abilityScore) {
    let modifier = Math.floor((abilityScore - 10) / 2);

    return modifier >= 0 ? "+" + modifier : modifier;
}
export function formatChallengeRating(challengeRating) {
    switch (challengeRating) {
        case 0.125:
            return "1/8";
        case 0.25:
            return "1/4";
        case 0.5:
            return "1/2";
        default:
            return challengeRating.toString();
    }
}