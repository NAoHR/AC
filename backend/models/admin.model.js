import { Schema, models, model } from "mongoose";

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

const AdminModel = models.Admin ||  model("Admin", AdminSchema);
export default AdminModel;