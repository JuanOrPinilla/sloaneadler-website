import { Pool } from 'pg';

// GCP Cloud SQL PostgreSQL client configuration
const pool = new Pool({
  // Use Unix socket for Cloud SQL connection
  host: process.env.DB_HOST || '/cloudsql/your-project:us-central1:ike-db-instance',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ike_website_db',
  user: process.env.DB_USER || 'db_user',
  password: process.env.DB_PASSWORD,
  // SSL is not needed when using Unix socket with Cloud SQL
  ssl: false,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Export query helper
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Export pool for transactions
export { pool };

// User account helpers
export async function getUserByEmail(email: string) {
  const result = await query(
    'SELECT * FROM user_accounts WHERE email = $1 AND is_active = true',
    [email]
  );
  return result.rows[0];
}

export async function createUser(email: string, passwordHash: string, fullName?: string) {
  const result = await query(
    'INSERT INTO user_accounts (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING *',
    [email, passwordHash, fullName]
  );
  return result.rows[0];
}

export async function createSession(userId: string, sessionToken: string, expiresAt: Date, ipAddress?: string, userAgent?: string) {
  const result = await query(
    'INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [userId, sessionToken, expiresAt, ipAddress, userAgent]
  );
  return result.rows[0];
}

export async function getSessionByToken(token: string) {
  const result = await query(
    'SELECT s.*, u.email, u.full_name, u.is_admin FROM user_sessions s JOIN user_accounts u ON s.user_id = u.id WHERE s.session_token = $1 AND s.expires_at > NOW() AND s.is_active = true',
    [token]
  );
  return result.rows[0];
}

export async function deleteSession(token: string) {
  await query('UPDATE user_sessions SET is_active = false WHERE session_token = $1', [token]);
}

// Contact form helpers
export async function createContactSubmission(data: {
  name: string;
  email: string;
  company?: string;
  inquiry_type: string;
  message: string;
  ip_address?: string;
  user_agent?: string;
}) {
  const result = await query(
    'INSERT INTO contact_submissions (name, email, company, inquiry_type, message, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [data.name, data.email, data.company, data.inquiry_type, data.message, data.ip_address, data.user_agent]
  );
  return result.rows[0];
}

// Audit log helper
export async function logAuditEvent(data: {
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: object;
  ip_address?: string;
}) {
  await query(
    'INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, ip_address) VALUES ($1, $2, $3, $4, $5, $6)',
    [data.user_id, data.action, data.resource_type, data.resource_id, JSON.stringify(data.details), data.ip_address]
  );
}
