# 超图

- 天气信息
- 降雨量等值线图
- 气温热力图
- 气温等值线图

---

# git 命令

- mkdir filename 创建文件夹 Linux 命令
- cd filename
- git init 初始化存储库
- git add 提交到暂存区
  - git add . 添加所有文件
  - git add document1.txt document2.txt
  - git add \*.txt 添加所有.txt 格式文件
- git status
- git commit -m "commits" || git commit 提交修改信息
- git commit -a -m "commits" || git commit -am "commits" 创建空提交
- git ls-files 列出文件信息
- git rm document1.txt 删除文件
- git mv document1.txt document2.txt 移动文件
- .gitignore 忽略指定文件(暂存区没该文件之前起作用)
- git rm --cached document1.txt 移除暂存区文件
- git diff --staged 查看暂存区信息
- git log commits 历史
- git restore
- git restore --staged document1.txt 撤销 git add :smile: document1.txt

---

# git 配置

- git config --global core.editor "code --wait" 设置默认编辑器为 vscode
- git config --global -e 使用 vscode 编辑全局配置文件
- git config --global https.proxy 'http://127.0.0.1:8001'   
- git config --global http.proxy 'http://127.0.0.1:8001'
- git config --global socks.proxy "127.0.0.1:1080"

