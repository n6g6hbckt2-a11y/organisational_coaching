# organisational_coaching

Static copy of [organisational-coaching.com](https://organisational-coaching.com), migrated from WordPress/Elementor so it can be hosted on GitHub Pages.

## What's here

- Every public page from the live site (109 pages: home, expertise, insights, case studies, team bios, theme archives with their paginated pages, policies), each at the **same URL path** as on WordPress (e.g. `/our-expertise/coaching/index.html` serves `/our-expertise/coaching/`), so existing links and Google rankings carry over.
- The site's own Elementor stylesheets and fonts, so it looks the same.
- Images under the original `wp-content/uploads/…` paths. Large photos were converted to WebP at the same size (44MB → 10MB), so pages load faster.
- `assets/site.js` and `assets/site.css` replace the WordPress scripts: entrance animations, desktop drop-down menu, mobile burger menu, the "Talk to us" popup, clickable cards, toggles, share buttons and the contact forms.
- `sitemap.xml`, `robots.txt`, a `404.html`, and redirects for the two old `/our-team/…` URLs.

All internal links are relative, so the site works both at `https://n6g6hbckt2-a11y.github.io/organisational_coaching/` and on the real domain. Canonical tags, social-sharing tags and structured data still point at `https://organisational-coaching.com`.

## Contact forms

WordPress handled the forms before. They now send through [FormSubmit](https://formsubmit.co) to `connect@organisational-coaching.com` (no account needed).
**The first submission triggers a one-off activation email to that address — click the link in it, or no messages will be delivered.**

## Going live on the real domain

1. Repo **Settings → Pages**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
2. Check the github.io preview.
3. When ready to switch: add a file named `CNAME` containing `organisational-coaching.com`, then at the domain's DNS provider point the apex domain at GitHub Pages (A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` as a CNAME to `n6g6hbckt2-a11y.github.io`. Tick "Enforce HTTPS" once the certificate is issued.
4. Resubmit `sitemap.xml` in Google Search Console.

Don't add the `CNAME` file before the DNS switch — GitHub would start redirecting the preview URL to the domain, which still points at WordPress.

## Editing

Pages are plain HTML in their folders. Text can be edited directly in the `index.html` for that page; the header and footer are repeated in every page, so a menu or footer change needs a find-and-replace across all `index.html` files.
