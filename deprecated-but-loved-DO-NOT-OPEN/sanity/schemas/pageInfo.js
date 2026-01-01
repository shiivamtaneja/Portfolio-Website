import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pageInfo',
  title: 'PageInfo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'profilePic',
      title: 'ProfilePic',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'otherInfo',
      title: 'OtherInfo',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
