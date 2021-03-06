const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const { default: App } = require("./client/src/App");
const routes = require("./routes");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/googlebooks"
);

const PORT = process.env.PORT || '8080'
app.set("port", PORT);


app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});