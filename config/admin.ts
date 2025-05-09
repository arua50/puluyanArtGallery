export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET','20c1e6cd6f2f1c081041bfdb9959e17a'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT','31b7babce821f42f76d09374e35b37ba'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
