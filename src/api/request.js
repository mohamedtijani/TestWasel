export async function post(url, data) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

export async function put(url, data) {
  return await fetch(url, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      'Cache': 'no-cache'
    },
    body: JSON.stringify(data)
  })
}

export async function del(url) {
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function get(url) {
  return await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
}