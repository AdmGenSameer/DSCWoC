Keeping a backup branch for `main`

Local manual commands:

1. Create the `main-backup` branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b main-backup
git push origin main-backup
```

2. Update `main-backup` to exactly match `main` (force push):

```bash
git checkout main
git pull origin main
git branch -D main-backup || true
git checkout -b main-backup
git push --force origin main-backup
```

Automated alternative (cron):

Create a small script `mirror-main.sh` containing the above update commands, make it executable, and add a cron entry (runs daily at 02:00):

```bash
# mirror-main.sh
#!/bin/bash
cd /path/to/your/repo
git fetch --all
git checkout main
git pull origin main
git branch -D main-backup || true
git checkout -b main-backup
git push --force origin main-backup

# crontab entry (edit with `crontab -e`):
0 2 * * * /path/to/mirror-main.sh >> /var/log/mirror-main.log 2>&1
```

Note: A GitHub Actions workflow `.github/workflows/backup-main.yml` was added. It now creates timestamped backup branches (e.g. `main-backup-20260102-030000`) and runs on every push to `main` and daily at 03:00 UTC. The workflow also prunes backups older than 30 days.

Timestamped backups and restore
--------------------------------

To list backup branches:

```bash
git fetch --all --prune
git branch -r | grep main-backup-
```

To restore `main` from a timestamped backup branch safely (recommended: open a PR):

```bash
# Option A: Create PR (safer)
git checkout -b restore-from-backup
git reset --hard origin/main-backup-YYYYMMDD-HHMMSS
git push origin restore-from-backup
# open a PR from restore-from-backup -> main on GitHub and merge after review

# Option B: Force replace main (use with caution)
git checkout main
git fetch origin
git reset --hard origin/main-backup-YYYYMMDD-HHMMSS
git push --force origin main
```

If you want different retention (e.g., keep 90 days), update the workflow's prune step accordingly.
