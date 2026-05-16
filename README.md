# えんびゃれ 公式サイト

福島県只見町を舞台にした学生団体「えんびゃれ」の公式Webサイトのソースコードです。

🌐 公開URL: 準備中（独自ドメイン取得後に公開予定）
📦 GitHub: https://github.com/sasssai/enbyare_website

## 構成

```
enbyare_website/
├ index.html        トップページ
├ media.html        メディア掲載ページ
├ voices.html       参加者の声ページ
├ css/              スタイルシート
│  ├ index.css
│  ├ media.css
│  └ voices.css
├ js/               JavaScript
│  ├ index.js
│  ├ media.js
│  └ voices.js
├ images/           活動写真・代表者写真等
└ logo.png          ロゴ
```

## 技術構成

- **静的サイト** (HTML / CSS / Vanilla JavaScript)
- ビルドツール無し、依存パッケージ無し
- ホスティング: GitHub Pages

## 開発方法

### ローカル確認
ローカルで動作確認するだけなら、`index.html` をブラウザでダブルクリックで開けます。

ページ間遷移やパス解決を厳密に確認したい場合は、ローカルサーバーを立ててください:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .
```

その後 http://localhost:8000 を開く。

### 編集の流れ
1. `git pull` で最新を取得
2. 該当ファイルを編集 (HTML / CSS / JS)
3. ブラウザで動作確認
4. `git add` → `git commit` → `git push`

## 編集時の注意

- **画像追加**: `images/` ディレクトリへ。HTMLからは相対パス `images/xxx.jpg` で参照
- **新ページ追加**: トップディレクトリに `*.html` を作成、対応する `css/*.css` と `js/*.js` を切り出す方針
- **大きな変更前**: ブランチを切ってPRで進めることを推奨

## 連絡先

- Instagram: [@tadami_okoshi](https://www.instagram.com/tadami_okoshi/)
- X (Twitter): [@HPR49150091](https://x.com/HPR49150091)
