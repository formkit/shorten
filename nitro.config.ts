//https://nitro.unjs.io/config
export default defineNitroConfig({
  storage: {
    kv: {
      driver: "vercelKV",
    },
  },
});
