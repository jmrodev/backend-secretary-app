use pnpm

---

### Database Schema Changes

- Added `is_admin BOOLEAN DEFAULT FALSE NOT NULL` column to the `users` table in `schema.sql`.
  *To apply this change, you need to drop and recreate your database using the updated `schema.sql`.*

---