import chatModel from "../models/chat.model.js";

// create chat api
export async function createChat(req, res) {
  try {
    const userId = req.user._id;
    const chatData = {
      userId,
      username: req.user.name,
      chatName: "New Chat",
      messages: [],
    };
    await chatModel.create(chatData);
    return res.json({ success: true, message: "Chat created" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// get chat api

export async function getChat(req, res) {
  try {
    const userId = req.user._id;
    const chats = await chatModel.find({userId}).sort({ updatedAt: -1 }); 
    return res.json({ success: true, chats });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// chat deletion api
export async function deleteChat(req, res) {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;
    await chatModel.deleteOne({ _id: chatId, userId });
    return res.json({ success: true, message: "Chat has been deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
