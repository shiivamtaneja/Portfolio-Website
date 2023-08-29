import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = import.meta.env.VITE_APP_SANITY_PRODUCTION_ID;

export default defineConfig({
  name: 'default',
  title: 'portfolio-website-shivam',

  projectId: projectId,
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
