export default eventHandler(async (event) => {
  const store = useStorage("kv");
  const token = event.context.params.token;
  const item = await store.getItem<string>(token);
  if (!item) {
    setResponseStatus(event, 505, "Not found");
    return { message: "Redirect not found" };
  }
  setResponseStatus(event, 307);
  setHeader(event, "Location", item);
  return `Go to: ${item}`;
});
