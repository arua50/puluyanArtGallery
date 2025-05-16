'use strict';
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const { createCanvas, loadImage } = require('canvas');

let model;

async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('file://./model/model.json');
  }
  return model;
}

module.exports = {
  async recognize(ctx) {
    const { files } = ctx.request;

    if (!files || !files.image) {
      return ctx.badRequest('No image uploaded');
    }

    const imagePath = files.image.filepath;
    const image = await loadImage(imagePath);

    const canvas = createCanvas(224, 224);
    const ctx2d = canvas.getContext('2d');
    ctx2d.drawImage(image, 0, 0, 224, 224);

    const tensor = tf.browser.fromPixels(canvas)
      .toFloat()
      .div(255.0)
      .expandDims();

    const model = await loadModel();
    const prediction = model.predict(tensor);
    const predictionIndex = prediction.argMax(-1).dataSync()[0];

    // Optional: You can map label index to actual artwork names
    const labels = ['odessa', 'couple'];
    const predictedLabel = labels[predictionIndex];

    // Search in Strapi DB
    const artwork = await strapi.db.query('api::artwork.artwork').findOne({
      where: { slug: predictedLabel },
    });

    if (!artwork) {
      return ctx.notFound('Artwork recognized but not found in database');
    }

    return {
      title: artwork.art_title,
      description: artwork.art_description,
      };
  },
};
