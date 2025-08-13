"use strict";

const cloudinary = require("cloudinary").v2;

module.exports = {
  init(config) {
    cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });

    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          const isModelFile = /\.(obj|mtl|zip|gltf|glb)$/i.test(file.name);

          cloudinary.uploader
            .upload_stream(
              {
                folder: config.folder || "strapi-uploads",
                resource_type: isModelFile ? "raw" : "auto", // 👈 key part
                public_id: file.name.split(".")[0],
              },
              (err, result) => {
                if (err) return reject(err);

                file.url = result.secure_url;
                file.provider_metadata = result;
                resolve();
              }
            )
            .end(file.buffer);
        });
      },

      delete(file) {
        return new Promise((resolve, reject) => {
          const publicId = file.provider_metadata?.public_id;
          const resourceType = /\.(obj|mtl|zip|gltf|glb)$/i.test(file.name)
            ? "raw"
            : "image";

          cloudinary.uploader.destroy(
            publicId,
            { resource_type: resourceType },
            (err, result) => {
              if (err) return reject(err);
              resolve();
            }
          );
        });
      },
    };
  },
};
