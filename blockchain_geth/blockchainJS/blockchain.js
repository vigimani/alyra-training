//SHA256 => crypto-js
const CryptoJS = require("crypto-js");

//BONUS
//implementer un système POW simple
//implémenter un systeme de transaction
//gérerla synchro de la bc entre les noeds

function calculateHash(timestamp, data, prevHash){
    return CryptoJS.SHA256(timestamp+data+prevHash).toString();
}



class Block {
    constructor(timestamp, data, hash, prevHash, number){
            this.timestamp = Date.now(); ;
            this.data = data;
            this.hash = hash.toString();
            this.prevHash = prevHash.toString();
            this.number = number;
    }

    getHash(){
        //return block hash
        return CryptoJS.SHA256(timestamp+data+prevHash).toString();
    }

    isBlockvalid(){
        if ((this.number == 0) && (myBlockchain[0]=this)) {
            return true;
        } else if (this.prevHash !== myBlockchain[this.number-1].hash){
            return false;
        } else {
            return true;
        }
    }

}


class Blockchain {
    constructor(){
        //création block genesis
        const now = Date.now();
        const data = "Genesis block";
        const genesisblock = new Block(now, data,calculateHash(now,data,0),"0",0);
        this.myBlockchain = [];
        this.myBlockchain.push(genesisblock)
    }

    getLastBlock(){
        //return last block
        return this.myBlockchain[this.myBlockchain.length-1];

    }

    addBlock(block){
        //add block in blockchain
        const prevBlock = this.getLastBlock();
        const number = prevBlock.number +1;
        const timestamp = Date.now();
        const data = "";
        const hash = calculateHash(timestamp, data, prevBlock.hash);
        const newblock = new Block(timestamp, data, hash, prevBlock.hash, number);
        this.myBlockchain.push(newblock);
        return newblock;
    }

    isValid(myBlockchain=this) {
        //return true if the blockchain is valid, false otherwise -> verification des hash
        const nbdeblock = this.myBlokchain.length;
        for (var i = 0; i < nbdeblock; i++) {
            if (this.myBlockchain[i].isBlockvalid == false){
                return false;
            };    
        }
        
    }
}

let blockchain = new Blockchain();
blockchain.addBlock();
blockchain.addBlock();
blockchain.addBlock();
blockchain.addBlock();
console.log(blockchain.getLastBlock())
console.log(blockchain)
console.log(blockchain.isValid())

