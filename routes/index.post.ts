import { createHash } from "crypto";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  let url: string;
  const type = typeof data;
  if (type === "string" && data.startsWith("http")) {
    url = data;
  } else if (data && type === "object") {
    if ("url" in data) {
      url = data.url;
    } else {
      const keys = Object.keys(data);
      if (typeof keys[0] === "string" && keys[0].startsWith("http")) {
        url = keys[0];
      }
    }
  }
  if (!url) {
    return { status: 400, body: "Invalid request" };
  }
  const key = createHash("sha256")
    .update(url)
    .digest("base64")
    .replace(/[^a-z0-9]/g, "")
    .slice(-6);
  const kv = useStorage("kv");
  let item = await kv.hasItem(key);
  const redirectUrl = `${process.env.URL}/${key}`;
  if (item) {
    setResponseStatus(event, 200);
    return { url: redirectUrl };
  } else {
    await kv.setItem(key, url);
  }
  setResponseStatus(event, 201);
  return { url: redirectUrl };
});
