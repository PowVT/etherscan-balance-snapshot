import fetch from 'node-fetch';
import dotenv from "dotenv";
import fs from 'fs'
import { parse } from 'csv-parse'

dotenv.config();

// create write stream
var filePath = fs.createWriteStream('balances.csv');
// initiate array
const data = []
// start reading from address spreadsheet and push all 
fs.createReadStream("../etherscan-balance-snapshot/EMAX_balances_priorR7/emax.csv",
    {
        flag: 'r',
    })
    .pipe(parse({ delimiter: ',' }))
    .on('data', (r) => {
        //console.log(r);
        data.push(r);
    })
    .on('end', async () => {
        const body = { a: 1 };
        const blockNumStart = "13845237"; // before event
        const blockNumEnd = "13851680"; // after event

        for (let i = 1; i <= 118000; i++) {
           try {
            const response = await fetch(
                'https://api.etherscan.io/api?' +
                'module=account' +
                '&action=tokenbalancehistory' +
                '&contractaddress=0x15874d65e649880c2614e7a480cb7c9A55787FF6' +
                '&address=' + data[i][0] +
                '&blockno=' + blockNumStart +
                '&apiKey=' + process.env.ETHERSCAN_API_KEY,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            // using the fetch above for a specific address, record the results
            const data1 = await response.json();
            console.log('Entry ' + i + ' at block, ' + blockNumStart, data[i][0], data1.result / (10 ** 18));
            // const buffer = Buffer.from(data1.result);
            // console.log("Buffer", buffer)
            // filePath.write(buffer + ',\n')
            filePath.write(data1.result / (10 ** 18) + '\n')

            // allow API cooldown
            await sleep(305)
           } catch (err) {
               console.error(err)
               filePath.write(0 + '\n')
           }
        }
    })


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// const address = [
//     "0xa13eD2142dFfc5b38a80b2b178bAb608D069D202",
//     "0x384C092e96F042a223778A82E8E09bB2B49EC921",
//     "0x3cB431081f4D9e012F6E2671973aA3a7cB3c90b9",
//     "0x562680a4dC50ed2f14d75BF31f494cfE0b8D10a1",
//     "0x5EA06A2bE857D35D5E545b2bF54b2d387bB8B4bA",
//     "0x36fEa9A0650f8E1994C625041BB278a8Ab63C8f8"
// ];


