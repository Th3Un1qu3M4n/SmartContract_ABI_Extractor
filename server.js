
import express from 'express';
import dotenv  from "dotenv";
import fetch from 'node-fetch';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config()

let port = 5000;

const app = express();


const directoryPath = path.join(__dirname, 'abis');

const inMemoryAbiList = [];

console.log(directoryPath);

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        
        console.log(file.split('.')[0]);
        inMemoryAbiList.push(file.split('.')[0]); 
    });
});


//Create simple get route for the index of your app
app.get('/', function(req,res){
    res.send('Send get request to /getAbi/:address to get the abi of the contract');
})

app.get('/getAbi/:address', async function(req, res) {
    const {address} = req.params;

    if(inMemoryAbiList.includes(address)){
        //read from file
        console.log("Sending Abi from file");
        const abi = fs.readFileSync(`${directoryPath}/${address}.json`, 'utf8');
        res.json(JSON.parse(abi));
    }else{
        fetch(`${process.env.ETHERSCAN_URL}?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`)
            .then(res => res.json())
            .then(jsonRes => {
                if(jsonRes.status !== "0"){
                    // console.log(jsonRes)
                    inMemoryAbiList.push(address);
                    fs.writeFileSync(
                        `${directoryPath}/${address}.json`,
                        jsonRes.result
                    );
                    res.json(JSON.parse(jsonRes.result));
                }else{
                    res.json(jsonRes.result);
                }
            });
        
    }
    
});
//Listen on the defined port
app.listen(port, function(){
    console.log('Listening on port http://localhost:5000')
})
