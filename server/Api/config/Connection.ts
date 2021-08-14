import mongoose from "mongoose";

export default function DBConnection(uri: string) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => resolve(true))
      .catch((err) => reject(err));
  });
}
