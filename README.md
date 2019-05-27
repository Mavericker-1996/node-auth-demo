# node-oauth-demo

模拟 Github 第三方登录流程

## 应用登记

一个应用要求 OAuth 授权，必须先到对方的网站登记，让对方知道是谁在请求。

我们这里就应该到 [Github](https://github.com/settings/applications/new) 去登记一下。登记页面长这样：

![github登记应用](https://cdn.nlark.com/yuque/0/2019/png/276025/1558936519848-a987462e-fe7f-487b-9901-58636da7b281.png)

可以看出必须要填的内容有：

- 应用名称
- 应用主页URL
- 用户同意授权后的跳转URL

提交表单之后，Github 会返回给我们一个 Client ID 和 Client Secret，这就是该应用的身份识别码。

![client识别码](https://cdn.nlark.com/yuque/0/2019/png/276025/1558937027930-06be1f22-748f-4349-b8cb-a0813c6a017c.png)

## 授权流程

假如用户想要登录 A 网站，A 网站让用户提供第三方网站的数据。证明自己的身份。

假如这个第三方网站是 Github，整个授权流程如下：

1. A 网站让用户跳转到 Github 的授权页面，并携带 client_id 和 redirect_url
2. Github 的授权页面会询问 ” A 网站要求获得 xx 权限，你是否同意？“
3. 用户同意之后，Github会重定向到之前提供的redirect_url，同时会携带一个授权码
4. A 网站使用授权码，带上之前的 Client ID 和 Client Secret，向 Github 请求令牌（access_token）
5. Github 返回令牌
6. A 网站使用该令牌，具体表现为在 Authorization 头部携带该令牌，向 Github 请求用户数据

具体 api 参考[这里](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

## 参考文章

[GitHub OAuth 第三方登录示例教程](http://www.ruanyifeng.com/blog/2019/04/github-oauth.html)

[Implementing OAuth 2.0 with Node.js](https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/#landing-page) 