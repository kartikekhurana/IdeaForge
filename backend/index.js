import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connections/mongooseConnection.js";
import userRoutes from "./routes/user.routes.js";
import ideaRoutes from "./routes/idea.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import logsRoutes from "./routes/logs.routes.js";
import userProfileRoutes from "./routes/userprofile.routes.js";
import passwordRoutes from "./routes/resetPassword.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import airoutes from "./routes/ai.routes.js";
import cookieParser from "cookie-parser";

const app = express();
//midllewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/ideas", ideaRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1", userProfileRoutes);
app.use("/api/v1/logs", logsRoutes);
app.use("/api/v1", passwordRoutes);
app.use("/api/v1", contactRoutes);
app.use("/api/v1/ai", airoutes);
//db connectiopn
connectDB();

app.listen(process.env.PORT, () => {
});
