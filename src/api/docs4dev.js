import 'isomorphic-unfetch';

const dev = process.env.NODE_ENV !== 'production';
const endpoint = dev ? 'http://dev.docs4dev.com' : 'https://www.docs4dev.com';

export async function queryChapter({ chapterId, lang = 'en' }) {
  const res = await fetch(`${endpoint}/admin/chapters/${chapterId}?lang=${lang}`);
  if (res.status >= 200 && res.status < 300) {
    const json = await res.json();
    return {
      chapter: json,
    };
  }
  return {
    statusCode: res.status,
  };
}

export async function updateChapter({ chapter }) {
  const { id } = chapter;
  delete chapter.id;
  const res = await fetch(`${endpoint}/admin/chapters/${id}`, {
    method: 'put',
    credentials: 'include',
    mode: 'same-origin',
    body: JSON.stringify({ ...chapter }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return {
    statusCode: res.status,
  };
}
