import { config } from 'dotenv';
import app from './index';
import { AppDataSource } from './shared/database/ormconfig';
import './shared/dependencies';
config();

console.log('🔄 - Connecting to the database.');
AppDataSource.initialize()
  .then(async () => {
    const PORT = process.env.FF_BACKEND_PORT || 3000;
    app.listen(PORT, () => {
      console.log('🆗 - Database connected successfully!');
      console.log(`🆗 - FF Backend server started on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log('❌ - Error while connecting to the database', error);
  });
