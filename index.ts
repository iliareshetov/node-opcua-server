import {
  OPCUAServer,
  nodesets,
  Variant,
  DataType,
  AddressSpace,
  Namespace,
  UAObjectsFolder,
  UAObject,
  UAString,
} from "node-opcua";

function constructAddressSpace(server: OPCUAServer): void {
  const addressSpace: AddressSpace = server.engine.addressSpace!;
  const namespace: Namespace = addressSpace.getOwnNamespace();
  const objectsFolder: UAObjectsFolder = addressSpace.rootFolder.objects;

  const processModule: UAObject = namespace.addFolder(objectsFolder, {
    browseName: "ProcessModule",
  });

  namespace.addVariable({
    componentOf: processModule,
    browseName: "Temperature",
    dataType: "Double",
    value: {
      get: () => {
        const t: number = new Date().getUTCMilliseconds() / 10000.0;
        const value: number = 10.0 + 10.0 * Math.sin(t);
        return new Variant({ dataType: DataType.Double, value: value });
      },
    },
  });
}

(async () => {
  try {
    const server: OPCUAServer = new OPCUAServer({
      port: 26543,
      nodeset_filename: [nodesets.standard, nodesets.di],
      buildInfo: {
        productName: "NodeOPCUA Server",
        buildNumber: "0001",
        buildDate: new Date(),
      },
    });

    await server.initialize();

    constructAddressSpace(server);

    await server.start();

    const endpointUrl: UAString =
      server.endpoints[0].endpointDescriptions()[0].endpointUrl;

    console.log(`INFO: Server is now listening, endpointUrl: ${endpointUrl}`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
})();
