import type * as e from "express";

const fileProxy =
  (
    fileGetter: (path: string, options?: any) => Promise<NodeJS.ReadableStream>
  ) =>
  (_: e.Request, res: e.Response, next: e.NextFunction) => {
    res.sendFile = async (path: string, options?: any, fn?: e.Errback) => {
      res.contentType(path.split(".").pop()!);

      try {
        const stream = await fileGetter(path, options);
        stream
          .on("error", (err) => {
            res.end();
            if (fn) {
              return fn(err);
            }
            throw err;
          })
          .on("finish", () => {
            res.end();
            if (fn) return fn(null as any);
          })
          .pipe(res);
      } catch (err) {
        if (fn && err instanceof Error) {
          return fn(err);
        }
        throw err;
      }
    };

    return next();
  };

export { fileProxy };
