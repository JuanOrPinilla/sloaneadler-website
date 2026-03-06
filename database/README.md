# GCP Cloud SQL Database Setup

This guide walks you through setting up Google Cloud SQL PostgreSQL for user account management.

## Overview

The database schema includes:
- **User Accounts**: Persistent user authentication
- **Sessions**: Multi-device session tracking
- **Contact Submissions**: Persisted form data
- **Audit Logs**: Security and compliance tracking

## Setup Steps

### 1. Enable Cloud SQL API

```bash
gcloud services enable sqladmin.googleapis.com
```

### 2. Create Cloud SQL Instance

```bash
# Create PostgreSQL 15 instance
gcloud sql instances create sloane-db-instance \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --storage-type=SSD \
  --storage-size=10GB \
  --availability-type=ZONAL
```

### 3. Create Database and User

```bash
# Create database
gcloud sql databases create sloane_website_db --instance=sloane-db-instance

# Create user
gcloud sql users create db_user \
  --instance=sloane-db-instance \
  --password=your-secure-password
```

### 4. Run Migrations

Connect to the database and run the SQL from `migrations/001_initial_schema.sql`

### 5. Configure Cloud Run

```bash
export DB_INSTANCE=your-project:us-central1:sloane-db-instance

gcloud run deploy sloaneadler \
  --source . \
  --region=us-central1 \
  --add-cloudsql-instances=$DB_INSTANCE \
  --set-env-vars="DB_HOST=/cloudsql/$DB_INSTANCE,DB_NAME=sloane_website_db,DB_USER=db_user,DB_PASSWORD=your-secure-password"
```

## Environment Variables

See `.env.example` for required database environment variables.

## Local Development

Use Cloud SQL Proxy for local development:

```bash
./cloud-sql-proxy --port 5432 your-project:us-central1:sloane-db-instance
```

Then update `.env.local` to use localhost.

## Security

- Use Secret Manager for passwords
- Enable automated backups
- Use IAM authentication
- Enable SSL/TLS for external connections
