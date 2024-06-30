import mongoose from "mongoose";
function connectDb() {
  mongoose
    .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then((res) => {
      console.log(
        `database connection successful ..... ${res.connection.host}:${res.connection.port}`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
export default connectDb;
