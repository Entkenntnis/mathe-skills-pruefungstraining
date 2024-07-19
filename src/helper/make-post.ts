export async function makePost(route: string, body: object) {
  /*if (window.location.hostname !== 'skills.arrrg.de' && route !== '/export') {
    console.log('makePost', route, body)
    return
  }*/
  const res = await fetch('http://localhost:3222' + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the appropriate content type for your data
    },
    body: JSON.stringify(body), // Convert the data to a JSON string
  })
  return await res.json()
}
