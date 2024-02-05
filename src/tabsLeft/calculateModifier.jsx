export default function calculateModifier(abilityScore) {
    let modifier = Math.floor((abilityScore - 10) / 2);

    return modifier >= 0 ? "+" + modifier : modifier;
}