# 在场

出差里抽出的一天。城市观察的生命记录，不是旅行博客。

全文只活在这里。朋友圈、小红书、X 上出现的，都只是从这里摘出的一小截。

## 记录系统

唯一的正文来源是 Markdown：

src/content/journal/YYYY-MM-DD-city-slug.md

不要在别的地方另写一版再拷过来。先写全文，再摘短的。

## 新增一篇

1. 复制 templates/entry.md 到 src/content/journal/
2. 按约定命名，例如 2026-08-12-kyoto.md
   - 日期是观察日
   - city-slug 用拉丁字母（拼音或英文）
3. 填 frontmatter，写正文
4. 写完后把 status 改成 published

未发布的 draft 不会出现在首页和 RSS；正式构建里访问草稿地址会 404。本地开发服务器可以打开草稿预览。

## 文件名与网址

src/content/journal/2026-08-12-kyoto.md 对应网址 /2026/kyoto

同一座城市同一年走两次时，后一篇会变成 /2026/kyoto-11-03，以免撞车。

## 命令

npm install
npm run dev      # 本地预览，默认 http://localhost:4321
npm run build    # 生成静态站点到 dist/
npm run preview  # 预览构建结果

## 改名

工作标题「在场」可以只改一处：src/site.config.ts。页面上的名称、页脚、RSS 都从这里读。

## 部署前

把 astro.config.mjs 里的 site 占位域名换成真实域名。
