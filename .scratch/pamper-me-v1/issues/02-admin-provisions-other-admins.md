# Admin provisions other admins

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Allow a logged-in admin to invite another admin from admin-web. The existing admin enters a name and email; the system generates a one-time setup token; the existing admin shares the resulting setup URL out of band (email integration arrives later). The invitee uses the URL to set their own password and TOTP, completing their account.

## Acceptance criteria

- [ ] Admin-web exposes a "Create admin" form (name, email)
- [ ] Submission creates a pending admin User and a one-time setup token
- [ ] The setup URL is displayed to the inviting admin for sharing
- [ ] The invitee uses the URL to set password + TOTP and is then logged in
- [ ] New admin appears in the admin list view
- [ ] The setup token is invalidated after use and on TTL expiry
- [ ] Tests cover: invite issued, setup completes, token reuse rejected, expired token rejected

## Blocked by

- [#01 — Bootstrap + Admin login](./01-bootstrap-admin-login.md)
