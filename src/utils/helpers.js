export function generateUniqueUsername(email) {
  // Extract the part before the '@' symbol from the email
  const username = email.split('@')[0];

  // Generate a timestamp with a maximum of 5 characters
  const timestamp = String(Date.now()).slice(-5);

  // Concatenate the username and random timestamp
  const uniqueUsername = `${username}${timestamp}`;

  return uniqueUsername;
}
