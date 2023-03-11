# OPC UA Server

This is an example of how to create an OPCUA server using the **_node-opcua_** library.
The server exposes a single variable, Temperature, which is updated every 5 seconds.

## Usage

1. Install dependencies:

```
npm install
```

2. Start the server:

```
npm start
```

3. Connect to the server using an OPC UA client with the endpoint URL **_opc.tcp://localhost:26543_**

## Overview

This code creates a new OPCUAServer instance and initializes it with some basic configuration. It then adds a Temperature variable to the server's address space that returns a sine wave value.

## Client

To connect to the server, you can use [OPC UA client](https://github.com/iliareshetov/node-opcua-client)
