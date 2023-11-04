export default defineEventHandler((event) => {
  setResponseStatus(event, 307);
  setHeader(event, "Location", "https://github.com/formkit/shorten");
  return "Redirecting...";
});
