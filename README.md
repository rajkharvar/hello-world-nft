# Hello World NFT 💻 Marketplace

Discover, collect and sell finest Hello World NFTs

## Working

1. Admin mint new NFT and put it on marketplace with listing price of 0.1 ETH.
2. User can claim the NFT by paying listing price.
3. User can place NFT that they owns on sale by demanding expected price.
4. User can claim any other user NFT by paying bid price.

## Tech Stack

**Contracts:** Solidity

**Client:** Nextjs, ChakraUI, Ethers

**Indexer:** TheGraph

## Run Locally

Clone the project

```bash
  git clone https://github.com/rajkharvar/hello-world-nft.git
```

Go to the project directory

```bash
  cd hello-world-nft
```

Install dependencies

```bash
  npm install
```

Running contracts test

```
    npm test
```

To start client dev server

```bash
    cd client
    npm install
    npm run dev
```

Deploying subgraph to hosted service

```bash
    cd subgraph
    npm install
    npm run deploy
```

Note⚠: Before deploying subgraph make sure to update `deploy` script in `package.json`. Update `rajkharvar/hello-world-nft` with `YOUR_USERNAME/PROJECT_NAME`.

## Environment Variables

To deploy the contracts, you will need to add the following environment variables to your .env file

`PRIVATE_KEY`

`MUMBAI_URL`

For client, you will need to add the following environment variables.

`CONTRACT_ADDRESS`

## 🔗 Links

[Contract](https://mumbai.polygonscan.com/address/0x179248E4Ae3531A24589517C0E0123AB83cD64B5)

[Graph Endpoint](https://thegraph.com/hosted-service/subgraph/rajkharvar/hello-world-nft)
