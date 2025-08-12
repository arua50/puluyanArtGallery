export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          sizeLimit: 100 * 1024 * 1024, // 100 MB
        },
        delete: {},
      },
      mimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'audio/mpeg',
        'application/zip',
        'model/gltf-binary',
        'model/gltf+json'
      ],
    },
  },
});
