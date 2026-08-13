# 行走与观照

一个全球旅行者的城市、文明与生命笔记。

全文只活在这里。朋友圈、小红书、X 上的，都只是从这里摘出的一小截。

站点名称、导航、关于页正文和主题列表都写在 src/site.config.ts。

## 记录系统

唯一的正文来源是 Markdown：src/content/journal/YYYY-MM-DD-city-slug.md

不要在别的地方另写一版再拷过来。先写全文，再摘短的。

## 新增一篇

1. 复制 templates/entry.md 到 src/content/journal/
2. 按约定命名，例如 2026-08-12-kyoto.md（日期是观察日；city-slug 用拉丁字母）
3. 填 frontmatter，写正文
4. 可选：在 themes 里填站点主题页上的名称（见 src/site.config.ts）
5. 写完后把 status 改成 published

未发布的 draft 不会出现在目录、主题页和 RSS；正式构建里访问草稿地址会 404。本地开发服务器可以打开草稿预览。

封面图放在 public/images/，frontmatter 里写成 /images/….jpg。不要提交图库或占位照片。

## 文件名与网址

src/content/journal/2026-08-12-kyoto.md 对应网址 /2026/kyoto

同一座城市同一年走两次时，后一篇会变成 /2026/kyoto-11-03，以免撞车。

GitHub Pages 项目站的 base 是 /zaichang。内部链接一律走 src/lib/paths.ts 的 withBase()。

## 命令

install 依赖；dev 本地预览；build 生成 dist/；preview 预览构建；pages 构建并复制到 docs/ 供 GitHub Pages 发布。
public/.nojekyll 会随构建进入 docs/，避免 Jekyll 吃掉下划线目录。


