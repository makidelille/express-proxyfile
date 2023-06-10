# express-proxyfile

> a simple library to replace any current express application that uses the file system to serve files to switch to a cloud service


### Installation

```shell
npm i express-proxyfile
```

In your application you use it as a middleware:

```typescript

import {proxyFile} from "express-proxyfile";

//...

app = express();
app.use(proxyFile(myCloudHandler));


//...

app.get('/:somefiles', (req, res) => {
    res.sendFile('path to my file');
});

```


## BuildIn Handler

### S3 Object storage


```typescript

import {s3Proxy} from "express-proxyfile";

//...

app = express();
app.use(s3Proxy({
    // Your S3 config
    endpoint: process.env.STORAGE_ENDPOINT,
    credentials: {
        accessKeyId: process.env.STORAGE_API_KEY,
        secretAccessKey: process.env.STORAGE_API_SECRET
    },
    region: process.env.STORAGE_REGION
}, "myBucketName"));


//...

app.get('/:somefiles', (req, res) => {
    res.sendFile('path to my file');
});


```