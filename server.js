import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles.js';

dotenv.config(); // 環境変数を読み込む
const app = express();
const PORT = process.env.PORT || 3000;

// CORS設定
app.use(cors({
    origin: "http://localhost:5173", // フロントエンドのURLに合わせて変更
}));

// JSONボディを解析するミドルウェア
app.use(express.json()); // JSONデータの解析
app.use(express.urlencoded({ extended: true })); // URLエンコードされたデータの解析

// ルーターの設定
app.use('/api/vehicles', vehiclesRouter); // vehiclesRouterをマウント

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
























