# Elastic Beanstalk Deployment Guide

## Environment Variables Setup

### Method 1: AWS Console (Recommended for Sensitive Data)

1. Go to your Elastic Beanstalk environment
2. Click **Configuration** → **Software** → **Edit**
3. Scroll to **Environment properties**
4. Add the following variables:

```
DB_HOST = your-rds-endpoint.rds.amazonaws.com
DB_PORT = 3306
DB_USERNAME = admin
DB_PASSWORD = your-secure-password
DB_DATABASE = nest_blog_db
NODE_ENV = production
```

5. Click **Apply**

### Method 2: EB CLI

```bash
eb setenv DB_HOST=your-rds-endpoint.rds.amazonaws.com \
         DB_PORT=3306 \
         DB_USERNAME=admin \
         DB_PASSWORD=your-secure-password \
         DB_DATABASE=nest_blog_db \
         NODE_ENV=production
```

### Method 3: Using .ebextensions (Non-Sensitive Only)

The `.ebextensions/environment.config` file is included for non-sensitive variables.
**Never commit sensitive data like passwords to `.ebextensions`!**

## How It Works

1. **Local Development**: Uses `.env` file
2. **Production (Elastic Beanstalk)**: 
   - Ignores `.env` file (via `ignoreEnvFile: true` when `NODE_ENV=production`)
   - Reads environment variables from EB environment configuration
   - Variables set in EB Console are injected as `process.env.*`

## Database Setup

### Using RDS (Recommended)

1. Create an RDS MySQL instance in the same VPC as your EB environment
2. Configure security groups to allow EB instances to connect to RDS
3. Use the RDS endpoint as `DB_HOST`
4. Set the RDS credentials as environment variables in EB

### Important Notes

- ✅ **DO**: Set environment variables in EB Console
- ✅ **DO**: Keep `.env` in `.gitignore`
- ✅ **DO**: Use RDS for production database
- ❌ **DON'T**: Commit `.env` file to git
- ❌ **DON'T**: Hardcode sensitive credentials
- ❌ **DON'T**: Use `synchronize: true` in production (already handled)

## Deployment Steps

1. Install EB CLI:
   ```bash
   pip install awsebcli
   ```

2. Initialize EB:
   ```bash
   eb init
   ```

3. Create environment:
   ```bash
   eb create nest-blog-prod
   ```

4. Set environment variables (see methods above)

5. Deploy:
   ```bash
   eb deploy
   ```

6. Open application:
   ```bash
   eb open
   ```

## Verifying Environment Variables

After deployment, you can check if variables are set:

```bash
eb printenv
```

## Database Migration

Since `synchronize` is disabled in production, you'll need to:

1. Create migrations locally
2. Run migrations on EB deployment

Consider using TypeORM migrations for production:
```bash
npm run typeorm migration:generate -- -n InitialMigration
npm run typeorm migration:run
```
