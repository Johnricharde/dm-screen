export default function calculateModifier(abilityScore) {
    let modifier = Math.floor((abilityScore - 10) / 2);
    if (modifier >= 0) {
        modifier = "+" + modifier;
    }
    return modifier;
}