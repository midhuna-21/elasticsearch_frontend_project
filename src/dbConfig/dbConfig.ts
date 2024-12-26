import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongoose Connected Successfully");
        });
        connection.on("error", (err) => {
            console.log(
                "Mongoose connection error. Please make usre MongoDB is running" +
                    err
            );
            process.exit();
        });
    } catch (error) {
        console.log("Something goes wrong");
        console.log(error);
    }
}
