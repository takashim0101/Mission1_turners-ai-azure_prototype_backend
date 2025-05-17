import express from 'express';
import { loadVehicles, saveVehicles } from './localStorage.js'; // localStorageからインポート

const router = express.Router();

// セダンのデータを取得
router.get('/sedans', (req, res) => {
    try {
        const sedans = loadVehicles('sedans'); // セダンのデータを読み込む
        res.json(sedans);
    } catch (error) {
        console.error(`Error loading sedans: ${error.message}`); // 具体的なエラーログ
        return res.status(500).json({ error: `Failed to load sedans data: ${error.message}` });
    }
});

// SUVのデータを取得
router.get('/suvs', (req, res) => {
    try {
        const suvs = loadVehicles('suvs'); // SUVのデータを読み込む
        res.json(suvs);
    } catch (error) {
        console.error(`Error loading suvs: ${error.message}`); // 具体的なエラーログ
        return res.status(500).json({ error: `Failed to load suvs data: ${error.message}` });
    }
});

// トラックのデータを取得
router.get('/trucks', (req, res) => {
    try {
        const trucks = loadVehicles('trucks'); // トラックのデータを読み込む
        res.json(trucks);
    } catch (error) {
        console.error(`Error loading trucks: ${error.message}`); // 具体的なエラーログ
        return res.status(500).json({ error: `Failed to load trucks data: ${error.message}` });
    }
});

// セダンのデータを追加
router.post('/sedans', (req, res) => {
    try {
        const sedans = loadVehicles('sedans'); // 現在のセダンデータを読み込む
        const newSedan = req.body; // 新しいセダンデータを取得
        sedans.push(newSedan); // 追加
        saveVehicles('sedans', sedans); // データを保存
        res.status(201).json(newSedan); // 成功レスポンス
    } catch (error) {
        console.error(`Error saving sedans: ${error.message}`); // 具体的なエラーログ
        return res.status(500).json({ error: `Failed to save sedans data: ${error.message}` });
    }
});

// SUVのデータを追加
router.post('/suvs', (req, res) => {
    try {
        const suvs = loadVehicles('suvs'); // 現在のSUVデータを読み込む
        const newSuv = req.body; // 新しいSUVデータを取得
        suvs.push(newSuv); // 追加
        saveVehicles('suvs', suvs); // データを保存
        res.status(201).json(newSuv); // 成功レスポンス
    } catch (error) {
        console.error(`Error saving suvs: ${error.message}`); // 具体的なエラーログ
        return res.status(500).json({ error: `Failed to save suvs data: ${error.message}` });
    }
});

export default router;








