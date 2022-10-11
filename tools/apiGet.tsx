function get_url(urlparts:string[])
{
  var base_url = "http://192.168.0.21:8090/twm/web";
  urlparts.unshift(base_url)
  var url = urlparts.join('/');
  console.log("url = ", url);
  return url
}


export async function apiSearch (
  type: string,
  pattern: string,
  setData: Function,
  setStatus: Function,
) {
  if (pattern == '') pattern = '*';
  var subtype = !isNaN(Number(pattern)) ? 'id' : 'name';
  const url = get_url([type, subtype, pattern]);
  try {
    const res = await fetch(url, {
      method: 'GET',
    });
    const data = await res.json();
    setStatus(data.Data.length != 0);
    if (!res.ok) {
      setData([]);
      return {error: data.code};
    }
    return setData(data.Data);
  } catch (err) {
    setData(false);
    return {error: err};
  }
};
