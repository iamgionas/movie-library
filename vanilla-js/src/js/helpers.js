export const getJSON = async function (url) {
  try {
    const result = await fetch(url, {
      credentials: 'omit',
    });
    const data = await result.json();
    if (!result.ok) throw new Error(`${data.message} (${result.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
