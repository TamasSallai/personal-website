Build the app to fly.io using the following command:

```
fly deploy \
  --build-arg PUBLIC_RECAPTCHA_SITE_KEY=value \
  --build-arg ASENDGRID_API_KEY=value \
  --build-arg SENDGRID_EMAIL_FROM=value \
  --build-arg SENDGRID_EMAIL_TO=value
```
