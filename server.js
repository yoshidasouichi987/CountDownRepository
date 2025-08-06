import express from 'express';
import fs from 'fs';
import path from 'path';

//読み込んだexpressモジュールをインスタンス化
const app = express();
const PORT = 3000;

//静的ファイルの提供
app.use(express.static('.'));

//ルートのハンドラー関数
//端末でファイル一覧をJSON記述形式で返す
app.get('/', (req, res) => {//パス「/」に入ってきたhttpレスポンスについて
  res.sendFile(path.join(__dirname, 'index.html'));
});
//スライド番号に応じたファイル名を取得
app.get('/api/files/:slideNum', (req, res) => {//パス「/api/files/:slideNum」に入ってきたhttpレスポンスについて
  const slideNum = req.params.slideNum;
  const dirPath = `slides${slideNum}`;
  
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      res.json(files);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.json([]);
  }
});
//POATでappは待機
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});