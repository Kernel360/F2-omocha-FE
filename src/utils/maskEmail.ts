function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');

  if (localPart.length <= 2) {
    // 로컬 부분이 2글자 이하인 경우 마지막 글자만 마스킹
    return `${localPart[0]}*${localPart.slice(2)}@${domain}`;
  }

  // 로컬 부분의 앞 2글자, 뒷 1글자를 남기고 중간을 '*'로 마스킹
  const maskedLocalPart = `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 3)}${localPart.slice(-1)}`;

  return `${maskedLocalPart}@${domain}`;
}

export default maskEmail;
