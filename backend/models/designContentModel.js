import mongoose from 'mongoose';

const designContentSchema = new mongoose.Schema({
  jumbotronImage: {
    url: { type: String, required: false }, // Change `required: true` to `false`
    name: { type: String },
  },
  sections: [
    {
      title: { type: String, required: true },
      paragraphs: [{ type: String, required: true }],
      link: { type: String }, // <-- Add Link for Contact
      linkText: { type: String }, // <-- Add Link for Contact
      images: [
        {
          url: { type: String, required: true },
          name: { type: String },
        },
      ],
    },
  ],
});

const DesignContent = mongoose.model('DesignContent', designContentSchema);

export default DesignContent;
