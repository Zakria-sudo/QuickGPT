import chatModel from "../models/chat.model";

export async function createMsg(req, res) {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    const chat = await chatModel.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "User",
      isImage: false,
      content: prompt,
      timestamp: Date.now(),
    });
  } catch (error) {}
}
