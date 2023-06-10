import { S3ClientConfig } from "@aws-sdk/client-s3";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import { fileProxy } from "core";

const s3Proxy = (config: S3ClientConfig, Bucket: string) => {
  const s3client = new S3Client(config);
  return fileProxy(async (path) => {
    const command = new GetObjectCommand({
      Bucket,
      Key: path,
    });

    const resultingStream = await s3client.send(command);
    return resultingStream.Body as NodeJS.ReadableStream;
  });
};

export { s3Proxy };
