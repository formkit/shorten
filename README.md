# FormKit Url Shortener

This is a public url shortener built with [UnJS’s excellent Nitro server](https://nitro.unjs.io/) server. Anyone is welcome to use it free of charge ❤️. You can use it to shorten any url, and in general we (the FormKit team) will try to keep these short url’s alive.

## Usage

To shorten a URL ping perform a post request to `https://formk.it` with the url you’d like to shorten in the body (this can be plain text or a JSON object with a "url" property):

```sh
curl -X POST -d "https://www.youtube.com/watch?v=10q09MMqU9E" https://formk.it
# https://formk.it/b4fa31ffi2xzf3fmv02czq0
```

## Your own shortener

You can of course run your own shortener, and we encourage you to do so.

```sh
npx giget@latest gh:formkit/shorten my-shortener-app
```

You’ll need to provide your own Nitro storage adapter credentials (we use Vercel’s KV store)

```ts
// nitro.config.ts
export default defineNitroConfig({
  storage: {
    kv: {
      driver: "vercelKV", // 👀 your storage adapter
    },
  },
});
```

Finally use a `.env` file with the appropriate [environment variables for your adapter](https://unstorage.unjs.io/usage).


## Notice

If you chose to use the `formk.it` public shortener, please be aware that we do cannot guarantee the longevity of the short urls. We will try to keep them alive, but we may need to remove them at any time. If you need a short url that will never change, please run your own shortener.
