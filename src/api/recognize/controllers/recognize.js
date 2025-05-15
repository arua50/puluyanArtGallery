'use strict';
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

module.exports = {
  async recognize(ctx) {
    const { files } = ctx.request;
    const uploadedImage = files?.image;

    if (!uploadedImage) {
      return ctx.badRequest('No image uploaded');
    }

    try {
      const uploaded = await Jimp.read(uploadedImage.path);

      // Load all artworks from your Strapi collection
      const artworks = await strapi.entityService.findMany('api::artwork.artwork', {
        populate: ['image'],
      });

      let bestMatch = null;
      let minDistance = Infinity;

      for (const art of artworks) {
        const imageUrl = art.image?.url || art.image?.data?.attributes?.url;
        if (!imageUrl) continue;

        const localImagePath = path.join(__dirname, `../../../../public${imageUrl}`);
        if (!fs.existsSync(localImagePath)) continue;

        const dbImage = await Jimp.read(localImagePath);
        const distance = Jimp.distance(uploaded, dbImage); // 0 is identical, 1 is completely different

        if (distance < minDistance) {
          minDistance = distance;
          bestMatch = art;
        }
      }

      if (!bestMatch || minDistance > 0.6) {
        return ctx.notFound('No matching artwork found');
      }

      return {
        title: bestMatch.art_title,
        artist: bestMatch.artist || 'Unknown',
        description: bestMatch.art_description,
      };
    } catch (err) {
      console.error('Recognition error:', err);
      return ctx.internalServerError('Error during recognition');
    }
  },
};
