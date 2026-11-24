
declare const process: {
  env: Record<string, string | undefined>;
  exitCode?: number;
};

declare const require: (id: string) => unknown;

type FlousiServer = {
  listen(port: number): unknown;
};

const flousi = require("./server.js") as {
  createServer(): Promise<FlousiServer>;
};

const port = Number(process.env.PORT) || 3000;

flousi.createServer()
  .then((server) => {
    server.listen(port);
    console.log("Flousi server is running on port " + port);
  })
  .catch((error) => {
    console.error("Could not start Flousi:", error);
    process.exitCode = 1;
  });
