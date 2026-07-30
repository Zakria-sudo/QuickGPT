import chatModel from "../models/chat.model.js";
import userModel from "../models/user.model.js";
import ai from "../configs/gemini.js";
import { uploadFile } from "../utils/uploadFile.js";
import openai from "../configs/openai.js";

export async function generateMsg(req, res) {
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
    const { choices } = await openai.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };
    res.json({ success: true, reply });
    chat.messages.push(reply);
    await chat.save();
    await userModel.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// for image generation
export async function generateImg(req, res) {
  try {
    const userId = req.user._id;

    if (req.user.credits < 2) {
      return res.status(400).json({
        success: false,
        message: "Not enough credits",
      });
    }

    const { prompt, chatId, isPublished } = req.body;

    const chat = await chatModel.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Save user's prompt
    chat.messages.push({
      role: "user",
      isImage: false,
      content: prompt,
      timestamp: Date.now(),
    });

    await chat.save();

    // Generate image
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image",
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    // Extract generated image
    let imageBuffer = null;

    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData?.data) {
          imageBuffer = Buffer.from(part.inlineData.data, "base64");
          break;
        }
      }

      if (imageBuffer) break;
    }

    if (!imageBuffer) {
      return res.status(500).json({
        success: false,
        message: "No image returned by Gemini.",
      });
    }

    // Upload to ImageKit
    const uploaded = await uploadFile(imageBuffer, `${Date.now()}.png`);

    const reply = {
      role: "assistant",
      isImage: true,
      content: uploaded.url,
      timestamp: Date.now(),
    };

    // Save assistant response
    chat.messages.push(reply);

    await chat.save();

    // Deduct credits
    await userModel.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    return res.status(200).json({
      success: true,
      image: uploaded.url,
      reply,
    });
  } catch (error) {
    console.error("Image generation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}