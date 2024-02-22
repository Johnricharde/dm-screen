async function fetchCharacters() {
    try {
        const response = await fetch('http://localhost:3000/api/nonPlayerCharacters');
        const data = await response.json();
        console.log([data]);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
fetchCharacters();
export default function Npc() {

    return (
        <div>
            <h3><span className="font-bold">Name:</span>Bill the Merchant</h3>
            <h3><span className="font-bold">Occupation:</span>Merchant</h3>
            <h3><span className="font-bold">Notes:</span>Bill is a character the players meet when they were in the town of Helgen.</h3>
            <hr />
            <br />
        </div>
    )
}