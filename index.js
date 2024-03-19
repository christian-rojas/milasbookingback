import { MercadoPagoConfig, Payment } from "mercadopago";
import functions from "@google-cloud/functions-framework";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

functions.http("payment", async (req, res) => {
  const client = new MercadoPagoConfig({
    accessToken: process.env.meli,
    options: { idempotencyKey: "abc" },
  });
  const payment = new Payment(client);
  let mortis = null;
  try {
    mortis = await payment.create({
      body: {
        transaction_amount: 12.34,
        description: "test",
        payment_method_id: "visa",
        payer: {
          email: "christian.ici17@gmail.com",
        },
        token: req.body.token,
        installments: 1,
      },
    });
  } catch (error) {
    // console.log(JSON.stringify(error));
    mortis = error;
  }

  res.send(mortis);
});

// async function create(req) {
//   const client = new MercadoPagoConfig({
//     accessToken: "TEST-8058260452801878-030821-c25c4672b1d24b09926828d4736a9d81-1719956084",
//     options: { idempotencyKey: "abc" },
//   });
//   const payment = new Payment(client);
//   let mortis = null;
//   try {
//     mortis = await payment.create({
//       body: {
//         transaction_amount: 12.34,
//         description: "test",
//         payment_method_id: "visa",
//         payer: {
//           email: "christian.ici17@gmail.com",
//         },
//         token: req.body.token,
//         installments: 1,
//       },
//     });
//   } catch (error) {
//     // console.log(JSON.stringify(error));
//     mortis = error;
//   }

//   return mortis;
// }

// Define a route handler for the root path
// app.post("/payment", async (req, res) => {
//   const test = await create(req);

//   res.send(test); // Respond with "Hello, world!"
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
