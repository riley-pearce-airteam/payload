import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { mediaSlug } from '../Media'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  defaultSort: 'title',
  access: {
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'associatedMedia',
      access: {
        create: () => true,
        update: () => false,
      },
      relationTo: mediaSlug,
      type: 'upload',
    },
    {
      name: 'arrayOneWithoutValidate',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'arrayTwoWithoutValidate',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'arrayOneWithValidate',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      validate: async (val, options) => {
        const arrayOne = val || []
        const arrayTwo = options.siblingData.tables || []

        if (arrayOne.length !== arrayTwo.length) {
          return 'Array One should have the same number of Array Two'
        }

        return true
      },
    },
    {
      name: 'arrayTwoWithValidate',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      validate: async (val, options) => {
        const arrayTwo = val || []
        const arrayOne = options.siblingData.arrayOne || []

        if (arrayTwo.length !== arrayOne.length) {
          return 'Array Two should have the same number of Array One'
        }

        return true
      },
    },
  ],
  slug: postsSlug,
}
