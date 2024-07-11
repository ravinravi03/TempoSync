export function getCookie(name) {
    console.log(document.cookie)
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
}

export function setCookie(name, value) {
  let cookieValue = encodeURIComponent(value);
  
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (1 * 24 * 60 * 60 * 1000));
  
  cookieValue += `; expires=${expirationDate.toUTCString()}`;
  
  document.cookie = `${name}=${cookieValue}; path=/;`;
}

export function invalidateCookie(name){
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}