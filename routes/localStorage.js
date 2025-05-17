import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // 環境変数を読み込む

const DATA_PATH = process.env.DATA_PATH || './data'; // デフォルトのパスを設定

// 車両データをローカルJSONファイルから読み込むヘルパー関数
const loadVehicles = (vehicleType) => {
    const filePath = path.join(DATA_PATH, `trimmed_minimal_50_id_${vehicleType}.json`);
    console.log(`Loading vehicle data from: ${filePath}`); // デバッグ用ログ
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        if (!data) {
            throw new Error('File is empty');
        }
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${vehicleType} vehicles: ${error.message}`);
        throw new Error(`Error loading ${vehicleType} vehicles from local file: ${error.message}`);
    }
};

// 車両データをローカルJSONファイルに保存するヘルパー関数
const saveVehicles = (vehicleType, vehicles) => {
    const filePath = path.join(DATA_PATH, `trimmed_minimal_50_id_${vehicleType}.json`);
    const data = JSON.stringify(vehicles, null, 2);

    try {
        fs.writeFileSync(filePath, data);
        console.log(`Vehicles saved successfully to ${vehicleType} local file.`);
    } catch (error) {
        throw new Error(`Error saving ${vehicleType} vehicles to local file: ${error.message}`);
    }
};

export { loadVehicles, saveVehicles };





