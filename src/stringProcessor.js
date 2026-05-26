function maskEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Email inválido');
  }

  const [user, domain] = email.split('@');

  if (user.length === 1) {
    return email;
  }

  return user[0] +
    '*'.repeat(user.length - 2) +
    user[user.length - 1] +
    '@' +
    domain;
}

function reverseWords(sentence) {
  if (sentence.trim() === '') {
    return '';
  }

  return sentence.trim().split(/\s+/).reverse().join(' ');
}

function extractHashtags(text) {
  return text.match(/#\w+/g) || [];
}

module.exports = {maskEmail,reverseWords,extractHashtags};