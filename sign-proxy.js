const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');

const app = express();
const DEFAULT_LLAMA3_ENDPOINT = 'http://localhost:11434/api/chat';
let wallet = undefined;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Proxy endpoint
app.post('/api/chat', async (req, res) => {
    try {
        // Forward the request to Llama3
        const llama3Response = await axios.post(process.env.LLAMA3_ENDPOINT || DEFAULT_LLAMA3_ENDPOINT, req.body);

        // Add a signature to the response
        const originResponseData = llama3Response.data;
        const signature = await wallet.signMessage(JSON.stringify(originResponseData));
        llama3Response.data = llama3Response.data + JSON.stringify({signature: signature});

        // For debug
        const address = ethers.verifyMessage(JSON.stringify(originResponseData), signature); 
        console.log('Recovered Address:', address, 'veified: ', address === wallet.address);

        // Send the modified response back to the client
        res.status(llama3Response.status).send(llama3Response.data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/signer', async (req, res) => {
    res.status(200).send(wallet.address);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    wallet = ethers.Wallet.createRandom();
    console.log('TEE signer address:', wallet.address);
    console.log(`Proxy service running on http://localhost:${port}`);
});
