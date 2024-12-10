import { Descendant, Element, Text } from 'slate';

function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');

  if (localPart.length <= 1) {
    // 로컬 부분이 1글자 이하인 경우 마스킹하지 않음
    return '';
  }
  if (localPart.length <= 2) {
    // 로컬 부분이 2글자 이하인 경우 마지막 글자만 마스킹
    return `${localPart[0]}*${localPart.slice(2)}@${domain}`;
  }

  // 로컬 부분의 앞 2글자, 뒷 1글자를 남기고 중간을 '*'로 마스킹
  const maskedLocalPart = `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 3)}${localPart.slice(-1)}`;

  return `${maskedLocalPart}@${domain}`;
}

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function countContentText(data: Descendant[]) {
  let totalCount = 0;

  if (!Array.isArray(data)) {
    return 0;
  }

  function countCharacters(node: Descendant) {
    if (Text.isText(node)) {
      totalCount += node.text.length;
    } else if (Element.isElement(node)) {
      node.children.forEach(child => {
        countCharacters(child);
      });
    }
  }

  data.forEach(node => {
    countCharacters(node);
  });

  return totalCount;
}

export { maskEmail, sha256, countContentText };
