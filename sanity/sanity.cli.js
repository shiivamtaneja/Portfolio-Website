import { defineCliConfig } from 'sanity/cli'

const projectId = import.meta.env.VITE_APP_SANITY_PRODUCTION_ID;

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: 'production'
  }
})

const searchItem = ''