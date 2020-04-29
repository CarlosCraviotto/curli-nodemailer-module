# curli-nodemailer-module

[Nodemailer](https://nodemailer.com/) implementation  for  the [Curli framework](https://github.com/CarlosCraviotto/curli-core/).


[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-nodemailer-module.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-nodemailer-module)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-nodemailer-module/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-nodemailer-module?branch=master)


### Installation

Install by `npm`

```sh
npm install --save curli-nodemailer-module
```
#### Basic Usage

**1 - In the configurations file, declare  de followings properties:**

**@TRANSPORT_TYPE**: (string) The type of transport we will use: 'smtp' | 'ses' | 'sendmail'
**@TRANSPORTS_CONFIGURATION** (object) An object with the configuration for the types. A configuration for the type selected must be present.
> Eg: `{
       'transporter_smtp': {
           'host': 'smtp.gmail.com',
           'port': 587,
           'secure': false,
           'user': 'one@gmail.com',
           'pass': 'password',
       }
   }`

**2 - Add the module definer:**

```typescript
import {NodemailerModule} from "curli-nodemailer-module";

  app.addModules(new NodemailerModule(app));

```


**3 - Send an email**

```typescript
await this.container.get('email').send({
     from: "sender@server.com",
     to: "receiver@sender.com",
     subject: "Message title",
     text: "Plaintext version of the message",
     html: "<p>HTML version of the message</p>"
   });
```


### Commands

 - `npm run build`: Build the project (Curli Mikro Orm).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.



### License

MIT