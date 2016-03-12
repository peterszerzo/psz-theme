import fetchGhost from './fetch_ghost'

export default function fetchSinglePost(slug) {
  const url = `posts/slug/${slug}`
  return fetchGhost(url, {
    'include': 'tags',
    'fields': 'tags, meta_title, meta_description, slug, title, published_at, image, markdown'
  })
}
