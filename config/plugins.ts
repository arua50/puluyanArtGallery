export default () => ({
  upload: {
    config: {
      sizeLimit: 1000, // 100 MB

      // This is optional if you want to restrict or allow additional MIME types
      mimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'audio/mpeg',
        'application/zip',
        'model/gltf-binary', // .glb
        'model/gltf+json'    // .gltf
      ],
    },
  },
});
