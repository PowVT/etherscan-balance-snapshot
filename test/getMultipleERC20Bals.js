import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const address = [
    "0x9E67029403675Ee18777Ed38F9C1C5c75F7B34f2",
    "0x384C092e96F042a223778A82E8E09bB2B49EC921",
    "0x3cB431081f4D9e012F6E2671973aA3a7cB3c90b9",
    "0x562680a4dC50ed2f14d75BF31f494cfE0b8D10a1",
    "0x5EA06A2bE857D35D5E545b2bF54b2d387bB8B4bA",
    "0x36fEa9A0650f8E1994C625041BB278a8Ab63C8f8"
];

const body = { a: 1 };
const blockNum = "13845238";

for (let i = 0; i < address.length; i++) {

    const response = await fetch(
        'https://api.etherscan.io/api?module=account&action=tokenbalancehistory&contractaddress=0x15874d65e649880c2614e7a480cb7c9A55787FF6&address=' +
        address[i] +
        '&blockno=' + blockNum +
        '&apiKey=' + process.env.ETHERSCAN_API_KEY,
        {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }
    );

    const data = await response.json();
    console.log('EMAX: ', address[i], data.result / (10 ** 18));
    await sleep(315)
}
