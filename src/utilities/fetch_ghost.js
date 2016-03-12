import fetch from 'isomorphic-fetch'

export default function fetchGhost(ghostApiUrl, ghostApiOptions) {
  // Mock ghost for development.
  const ghost = global.ghost || {
    url: {
      api: function(ghostApiUrl) {
        return `/testapi/${ghostApiUrl}`
      }
    }
  }
  const url = ghostApiOptions ? ghost.url.api(ghostApiUrl, ghostApiOptions) : ghost.url.api(ghostApiUrl)
  console.log(url)
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      return res
    })
    .then(res => res.posts ? res.posts : res)
}
