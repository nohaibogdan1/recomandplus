export default function getLeftDays(endAt: string) {
    const endDate = new Date(endAt + 'Z');
    const current = new Date();
    current.setUTCHours(0,0,0,0);
    const leftDays = (endDate.getTime() - current.getTime()) / (1000 * 3600 * 24);
    if (leftDays === 0) return "Astazi este ultima zi";
    if (leftDays === 1) return "Maine este ultima zi";
    return `Au mai ramas ${leftDays} zile`;
}
