import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const API_URL = process.env.API_URL || 'http://localhost:5000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

class HealthMonitor {
  async checkBackend() {
    try {
      const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
      return {
        status: 'healthy',
        service: 'backend',
        data: response.data
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        service: 'backend',
        error: error.message
      };
    }
  }

  async checkFrontend() {
    try {
      const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
      return {
        status: response.status === 200 ? 'healthy' : 'unhealthy',
        service: 'frontend',
        statusCode: response.status
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        service: 'frontend',
        error: error.message
      };
    }
  }

  async checkDatabase() {
    try {
      const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
      return {
        status: response.data.database === 'connected' ? 'healthy' : 'unhealthy',
        service: 'database',
        data: response.data.database
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        service: 'database',
        error: error.message
      };
    }
  }

  async checkAll() {
    console.log('🔍 Checking system health...\n');

    const [backend, frontend, database] = await Promise.all([
      this.checkBackend(),
      this.checkFrontend(),
      this.checkDatabase()
    ]);

    const results = { backend, frontend, database };

    // Display results
    for (const [service, result] of Object.entries(results)) {
      const icon = result.status === 'healthy' ? '✅' : '❌';
      console.log(`${icon} ${service.toUpperCase()}: ${result.status}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }

    console.log('\n');

    // Overall status
    const allHealthy = Object.values(results).every(r => r.status === 'healthy');
    if (allHealthy) {
      console.log('✅ All systems operational');
      return 0;
    } else {
      console.log('❌ Some systems are down');
      return 1;
    }
  }
}

// Run health check if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new HealthMonitor();
  monitor.checkAll()
    .then(exitCode => process.exit(exitCode))
    .catch(() => process.exit(1));
}

export default HealthMonitor;
