import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

const address = "0x9E67029403675Ee18777Ed38F9C1C5c75F7B34f2";

const body = { a: 1 };

const response = await fetch(
    'https://api.etherscan.io/api?module=account&action=balance&address=' +
    address +
    '&tag=latest&apiKey=' +
    process.env.ETHERSCAN_API_KEY, {

    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();

console.log(data);