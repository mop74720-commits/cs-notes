# Mo's CS Notes

基于 Material for MkDocs 的个人计算机知识库，整体主题、插件和部署方式参考 csdiy.wiki。

默认 GitHub Pages 地址：

```text
https://mop74720-commits.github.io/cs-notes/
```

不绑定自定义域名。

## 部署

推送到 `main` 后，GitHub Actions 会自动执行：

```bash
pip3 install -U -r requirements.txt
mkdocs gh-deploy --force
```

生成内容会发布到 `gh-pages` 分支。


## CS DIY learning snapshot

The upstream `PKUFlyingPig/cs-self-learning` documentation is synchronized into
`docs/csdiy/` for learning and open-source redistribution under the upstream
MIT license. See `third_party/csdiy/` for the retained license and provenance.
