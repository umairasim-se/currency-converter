export const FetchData = async ({ amount, to, from }) => {
  try {
    const APIKEY = import.meta.env.VITE_APIKEY;
    const endpoint = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;
    const headers = new Headers();
    headers.append("apikey", APIKEY);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
