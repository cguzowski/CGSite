# Raspberry Pi deployment runner

The production workflow builds and tests on GitHub-hosted infrastructure. Only the
verified `angular/dist/angular/browser` artifact reaches the Raspberry Pi runner;
no inbound SSH access is required.

## One-time Pi setup

1. In the repository's GitHub settings, add a Linux self-hosted runner using a
   dedicated unprivileged account such as `cgsite-runner`. Add the custom label
   `cgsite-production`. Do not add this label to any non-production runner.
2. Install the runner as a system service using GitHub's generated commands. The
   runner requires outbound HTTPS access to GitHub and the Actions artifact
   service.
3. Install the reviewed deployment helper as a root-owned executable:

   ```sh
   sudo install -o root -g root -m 0755 deploy-cgsite /usr/local/sbin/deploy-cgsite
   ```

4. Allow only that root-owned helper through passwordless sudo. Create
   `/etc/sudoers.d/cgsite-runner` with `visudo`:

   ```text
   cgsite-runner ALL=(root) NOPASSWD: /usr/local/sbin/deploy-cgsite *
   ```

5. In GitHub, create a `production` environment. Restrict its deployment branch
   to `master`; optionally require a reviewer for the first rollout.

The helper owns the fixed `/var/www/cguzowski.com/angular` deployment boundary.
It copies each artifact into `releases/<commit>-<attempt>`, changes `browser`
atomically to a symlink for that release, validates Nginx, performs a local HTTP
check with the production Host header, and restores the prior target on failure.
It retains the three newest releases. The first automated deployment preserves
the existing `browser` directory as a timestamped legacy release.

## Rollback

Run on the Pi:

```sh
sudo /usr/local/sbin/deploy-cgsite --rollback
```

This switches `browser` to the newest retained release other than the current
one. Confirm the public site through Cloudflare after either deployment or
rollback; the local check verifies Nginx but cannot prove tunnel health.

## Security boundary

Keep the runner account out of privileged groups and do not give it ownership of
the Nginx document root. The sudo rule is safe only while the helper remains
root-owned and non-writable by the runner. GitHub environment protection and the
workflow's explicit `master` condition prevent pull-request code from reaching
the production runner.

