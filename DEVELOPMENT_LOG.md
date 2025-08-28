## 2025-08-24

- Next.jsプロジェクトのセットアップを実施。
- `npx create-next-app src --src-dir` コマンドにより `src/src` という意図しないディレクトリ構造が生成されたため、ファイルを移動して修正。
- 開発サーバーの起動方法を確認し、`cd src && npm run dev` で `http://localhost:3001` での起動に成功。

## 2025-08-28

- データベースとしてVercel Postgres (Neon) を採用することを決定。
- ローカル開発環境に接続情報を設定 (`.env.local`を作成)。
- DB接続ライブラリとして `@vercel/postgres` をインストール。
  - `npm install` の実行ディレクトリの問題でトラブルシューティングを実施。
- データベース接続を確認するためのテストAPI (`/api/db-test`) を作成し、正常なレスポンスを確認。