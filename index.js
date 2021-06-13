const { OPCUAServer, nodesets, Variant, DataType } = require("node-opcua");

function constructAddressSpace(server) {
  const addressSpace = server.engine.addressSpace;
  const namespace = addressSpace.getOwnNamespace();
  const objectsFolder = addressSpace.rootFolder.objects;

  const processModule = namespace.addFolder(objectsFolder, {
    browseName: "ProcessModule",
  });

  namespace.addVariable({
    componentOf: processModule,
    browseName: "Temperature",
    dataType: "Double",
    value: {
      get: () => {
        const t = new Date() / 10000.0;
        const value = 10.0 + 10.0 * Math.sin(t);
        return new Variant({ dataType: DataType.Double, value: value });
      },
    },
  });
}

(async () => {
  try {
    const server = new OPCUAServer({
      port: 26543,
      nodeset_filename: [nodesets.standard, nodesets.di],
      buidIfo: {
        productName: "NodeOPCUA Server",
        buildNumber: "0001",
        buildDate: Date.now(),
      },
    });

    await server.initialize();

    constructAddressSpace(server);

    await server.start();

    const endpointUrl =
      server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log(`Server is now listening, endpointUrl: ${endpointUrl}`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
})();
