import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

const address = "0xd514dbead73648f56c6fcb4b758edf7197a928bc";

const body = { a: 1 };
const blockNumStart = "13845238";

const response = await fetch(
    'https://api.etherscan.io/api?' +
                'module=account' +
                '&action=tokenbalancehistory' +
                '&contractaddress=0x15874d65e649880c2614e7a480cb7c9A55787FF6' +
                '&address=' + address +
                '&blockno=' + blockNumStart +
                '&apiKey=' + process.env.ETHERSCAN_API_KEY,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' }
                }
);
const data = await response.json();

console.log(data);