import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

const address = [
    "0x9E67029403675Ee18777Ed38F9C1C5c75F7B34f2",
    "0x384C092e96F042a223778A82E8E09bB2B49EC921",
    "0x3cB431081f4D9e012F6E2671973aA3a7cB3c90b9",
    "0x562680a4dC50ed2f14d75BF31f494cfE0b8D10a1",
    "0xffC2279Bb61E1B382cb19947a915BBa0aC6091e3",
    "0x36fEa9A0650f8E1994C625041BB278a8Ab63C8f8"
];

const body = { a: 1 };

for (let i = 0; i < address.length; i++) {
    const response = await fetch(
        'https://api.etherscan.io/api?module=account&action=balance&address=' +
        address[i] +
        '&tag=latest&apiKey=' +
        process.env.ETHERSCAN_API_KEY, {

        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log('ETH: ', address[i], data.result / 10 ** 18);
}
