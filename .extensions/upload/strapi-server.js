module.exports = (plugin) => {
  // Allow extra mime types
  plugin.contentTypes.file.attributes.mime = {
    type: 'enumeration',
    enum: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'audio/mpeg',
      'application/zip',
      'model/gltf-binary',
      'model/gltf+json',
      'model/obj',
      'text/plain',
      'application/octet-stream',
    ],
    default: 'application/octet-stream',
  };

  return plugin;
};
