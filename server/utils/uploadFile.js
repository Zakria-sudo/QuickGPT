import imagekit from "../configs/imagekit.js";

export async function uploadFile(buffer, fileName = `${Date.now()}.jpg`) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName,
    folder: "/QuickGPT",
  });

  return result;
}
