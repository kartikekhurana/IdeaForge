import { Contact } from "../models/contact.model.js";
import { apiError } from "../utils/apiError.js";

const submitContact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    if (!fullname || !email || !message) {
      throw new apiError(400, "all fields are required");
    }
    const newmessage = await Contact.create({
      fullname,
      email,
      message,
    });
    return res.status(200).json({
      success: true,
      message: "message recieved successfully",
      message: newmessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "something went wrong while recieving the message",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    if (messages.length === 0 || !messages) {
      throw new apiError(404, "messages not found");
    }
    return res.status(200).json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        error.message || "something went wrong while fetching the messages",
    });
  }
};
export { submitContact, getAllMessages };
