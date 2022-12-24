import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    username: {
        type: String,
        required: [true, "username required"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    }
})

const AdminModel = model.Admin ||  model("Admin", AdminSchema);
export default AdminModel;