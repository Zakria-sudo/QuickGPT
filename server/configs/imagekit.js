import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default imagekit
export async function uploadFile(buffer, fileName = `${Date.now()}.jpg`) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName,
    folder:"/QuickGPT"
  });
  return result;
}

