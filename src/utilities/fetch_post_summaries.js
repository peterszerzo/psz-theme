import fetchGhost from './fetch_ghost';

const summaryFields = [
  'tags',
  'meta_title',
  'meta_description',
  'slug',
  'title',
  'published_at',
  'image'
];

export default function fetchPostSummaries() {
  return fetchGhost('posts', {
    'include': 'tags'//,
    //'fields': summaryFields.join(',')
  });
}
