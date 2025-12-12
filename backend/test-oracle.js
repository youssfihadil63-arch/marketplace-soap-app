const oracledb = require('oracledb'); 
async function test() { 
  try { 
    const conn = await oracledb.getConnection({ 
      user: 'marketplace', 
      password: 'marketplace123', 
      connectString: 'localhost/XE' 
    }); 
    console.log('? Oracle connect‚'); 
    await conn.close(); 
  } catch (err) { 
    console.error('? Erreur:', err.message); 
  } 
} 
test(); 
