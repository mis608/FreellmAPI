const Database = require('better-sqlite3');
const db = new Database('D:/freellmapi/server/data/freeapi.db', {readonly: true});

console.log('=== API KEYS ===');
const keys = db.prepare('SELECT * FROM api_keys').all();
keys.forEach(k => console.log(JSON.stringify(k)));

console.log('\n=== KEY MONTHLY USAGE ===');
const usage = db.prepare('SELECT * FROM key_monthly_usage').all();
usage.forEach(u => console.log(JSON.stringify(u)));

console.log('\n=== SETTINGS (budget related) ===');
const settings = db.prepare("SELECT key, value FROM settings WHERE key LIKE '%budget%' OR key LIKE '%cap%' OR key LIKE '%token%'").all();
settings.forEach(s => console.log(s.key, '=', s.value));

console.log('\n=== MODELS >= 128K CONTEXT (enabled only) ===');
const models = db.prepare("SELECT platform, model_id, display_name, context_window, monthly_token_budget FROM models WHERE enabled=1 AND context_window >= 128000 ORDER BY context_window DESC").all();
models.forEach(m => console.log(m.context_window, '|', m.platform, '|', m.model_id, '|', m.display_name, '| budget:', m.monthly_token_budget));

console.log('\n=== COUNT: models with >= 128K ===');
const count = db.prepare("SELECT COUNT(*) as c FROM models WHERE enabled=1 AND context_window >= 128000").get();
console.log(count.c, 'models with >= 128K context');

console.log('\n=== COUNT: models with >= 1M ===');
const count2 = db.prepare("SELECT COUNT(*) as c FROM models WHERE enabled=1 AND context_window >= 1000000").get();
console.log(count2.c, 'models with >= 1M context');