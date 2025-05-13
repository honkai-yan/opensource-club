export async function appRequest(url: string, data: any, options?: RequestInit): Promise<Response | undefined> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!res.ok) {
      console.warn(`请求失败：HTTP ${res.status} ${res.statusText}`);
    }
    return res;
  } catch (err) {
    console.info(`网络错误${err}`);
    return undefined;
  }
}
