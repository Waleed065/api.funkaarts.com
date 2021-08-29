import { app, io } from "./connection";
import items from "./routes/items";

import headings from "./routes/headings";
import categories from "./routes/categories";
import comments from "./routes/comments";
import search from "./routes/search";
import user from "./routes/user";
import destinations from "./routes/destinations";
// import root from "./routes/root";
import addOns from "./routes/addOns";
import chats from "./routes/chats";
import ads from "./routes/ads";
import favorites from "./routes/favorites";
import currency from "./routes/currency";
import orders from "./routes/orders";
import affiliates from "./routes/affiliates";

import onConnection from "./sockets/onConnection";
import message from "./sockets/message";
import { connectionConst } from "./constants";



io.on(connectionConst, (socket) => {
  onConnection(socket);
  message(socket);
});

// app.use("/", root);

app.use("/items", items);
app.use("/add-ons", addOns);
app.use("/destinations", destinations);
app.use("/categories", categories);
app.use("/headings", headings);
app.use("/comments", comments);
app.use("/search", search);
app.use("/user", user);
app.use("/orders", orders);
app.use("/ads", ads);
app.use("/favorites", favorites);
app.use("/chats", chats);
app.use("/currency", currency);
app.use("/affiliates", affiliates);
