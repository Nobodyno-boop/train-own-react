/**
 *
 * @returns {[{
 *   code:string,
 *   short_link:string,
 *   full_short_link: string,
 *   short_link2:string,
 *   full_short_link2: string,
 *   short_link3:string,
 *   full_short_link3: string,
 *   share_link: string,
 *   full_share_link: string,
 *   original_link: string
 * }]}
 */
export const getLinks = () => {
  let get = localStorage.getItem('links')
  if (typeof get === 'string') {
    return JSON.parse(get)
  }
  return []
}

export const addLinks = (link) => {
  let links = getLinks()
  links.push(link)
  localStorage.setItem('links', JSON.stringify(links))
}
