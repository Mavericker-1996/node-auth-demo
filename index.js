const Koa = require("koa");
const axios = require("axios");
const serve = require("koa-static");
const route = require("koa-route");
const path = require("path");

const client_id = "2cc4f30f82aada3b6446";
const client_secret = "b9b06fe2969de295ca8afccf27ffabd673ed5c2a";

const app = new Koa();

const oauth = async ctx => {
  // 获取返回的code
  const code = ctx.request.query.code;
  console.log("authorization code:", code);

  // 获取access_token
  const tokenResponse = await axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id,
      client_secret,
      code
    },
    headers: {
      accept: "application/json"
    }
  });
  const access_token = tokenResponse.data.access_token;

  console.log("access_token", access_token);

  // 获取user信息
  const res = await axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `token ${access_token}`
    }
  });

  console.log("res", res.data);
  const name = res.data.name;

  ctx.redirect(`/welcome.html?name=${name}`);
};

app.use(serve(path.join(__dirname, "public")));

app.use(route.get("/oauth/redirect", oauth));

app.listen(7000, () => {
  console.log("server started...");
});
