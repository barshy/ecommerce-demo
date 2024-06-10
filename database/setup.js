import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks } from './utils.js'
import data from './data.json' assert { type: 'json' }

// Load environment
dotenv.config()

const credentials = {
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_ADMIN_API_KEY
}

const INDEX_NAME = 'products'

/* eslint-disable no-console */

const setup = async () => {
  // Credentials verification code…

  const client = new MeiliSearch(credentials)

  console.log(`Adding filterable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateFilterableAttributes([
    'brand',
    'category',
    'tag',
    'rating',
    'reviews_count',
    'price'
  ])

  console.log(`Adding ranking rules to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateRankingRules([
    'sort',
    'words',
    'typo',
    'proximity',
    'attribute',
    'exactness'
  ])

  console.log(`Adding sortable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateSortableAttributes([
    'rating',
    'price'
  ])

  // Adding documents and watching tasks…
}

setup()
