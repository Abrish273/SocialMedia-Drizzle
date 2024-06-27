import "dotenv/config";
import { db } from "./drizzle/db";
import { UserPreferencesTable, UserTable } from "./drizzle/schema";
import { asc, between, count, desc, eq, sql } from "drizzle-orm";
// 30:26

async function main() {
  // const userPref = await db.insert(UserPreferencesTable).values({
  //   emailUpdates: true,
  //   userId: "463ff3e3-a98b-4af7-9d76-51d1cece7790",
  // });
  // console.log("userPref", userPref)
  // ======================================
  // DELETE deleting  . . . .
  // await db.delete(UserTable);
  //=======================================
  // const user = await db
  //   .insert(UserTable)
  //   .values([
  //     {
  //       name: "abc",
  //       age: "19",
  //       email: "hello@gmail.com",
  //     },
  //     {
  //       name: "really",
  //       age: "19",
  //       email: "heejrf2@gmail.com",
  //     },
  //   ])
  //   .returning({
  //     id: UserTable.id,
  //     userName: UserTable.name,
  //   });
  // .onConflictDoUpdate({
  //   target: UserTable.email,
  //   set: { name: "Updated Name" },
  // });
  // console.log("user", user);
  // =====================================
  // GET ing  . . . .
  // const users = await db.query.UserTable.findMany({
  //   where: (table, funcs) => funcs.eq(table.name, "starting."),
  //   // columns: { name: true },
  //   // extras: {
  //   //   lowerCaseName: sql<string>`lower(${UserTable.name})`.as("lowerCaseName"),
  //   // },
  //   // limit: 1,
  //   // offset: 3,
  //   // work with different relationships
  //   // with: { preferences: true },
  //   // with: {
  //   //   preferences: {
  //   //     columns: {
  //   //       emailUpdates: true,
  //   //     },
  //   //   },
  //   // },
  //   // with: {
  //   //   posts: { with: { PostCategories: true } },
  //   // },
  //   // orderBy: asc(UserTable.age)
  // });
  // console.log(users);
  //==========================
  // const users = await db
  //   .select({
  //     id: UserTable.id,
  //     age: UserTable.age,
  //     emailUpdates: UserPreferencesTable.emailUpdates,
  //   })
  //   .from(UserTable)
  //   .leftJoin(
  //     UserPreferencesTable,
  //     eq(UserPreferencesTable.userId, UserTable.id)
  //   );
  // console.log("users", users);
  // ==============================
  // const users = await db
  //   .select({
  //     name: UserTable.name,
  //     count: count(UserTable.name)
  //   })
  //   .from(UserTable)
  //   .groupBy(UserTable.name)
  // console.log("users", users);
  // ==============================
  //  const users = await db
  //    .update(UserTable).set({age: "30"}).where(eq(UserTable.age, "19"))
  // ===================================
  const users = await db.select().from(UserTable);
  console.log("users", users);
  // ==============================
  //  const users = await db
  //    .delete(UserTable).where(eq(UserTable.name, "abdc"))
}
main();

//         ==================================================================
// ------------- wait for Prometheus app helthcheck and moniotoring -----------------
//         ==================================================================

// import express, { NextFunction, Request, Response } from "express";
// import { Counter, Histogram, Registry } from "prom-client";

// const app = express();
// const registry = new Registry();
// app.set("prometheusRegister", registry); // Store registry in app settings for access in middleware

// const requestCounter = new Counter({
//   name: "http_requests_total",
//   help: "Total number of HTTP requests",
//   labelNames: ["method", "path", "status"],
//   registers: [registry],
// });

// const requestDurationHistogram = new Histogram({
//   name: "http_request_duration_seconds",
//   help: "Duration of HTTP requests in seconds",
//   labelNames: ["method", "path", "status"],
//   registers: [registry],
// });

// // Middleware to record metrics
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const end = requestDurationHistogram.startTimer();
//   res.on("finish", () => {
//     requestCounter.inc({
//       method: req.method,
//       path: req.path,
//       status: res.statusCode.toString(),
//     });
//     end({
//       method: req.method,
//       path: req.path,
//       status: res.statusCode.toString(),
//     });
//   });
//   next();
// });

// // Example endpoints
// app.get("/endpoint1", (req: Request, res: Response) => {
//   res.send("This is endpoint 1");
// });

// app.get("/endpoint2", (req: Request, res: Response) => {
//   res.send("This is endpoint 2");
// });

// // Endpoint to expose metrics
// app.get("/metrics", async (req: Request, res: Response) => {
//   try {
//     res.set("Content-Type", registry.contentType);
//     res.end(await registry.metrics());
//   } catch (ex) {
//     res.status(500).end(ex);
//   }
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
