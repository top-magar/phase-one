import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// For testing only - in production, this should be in environment variables
const TEST_ENCRYPTION_KEY = 'cdba5420107126e3c1ce8e07889398541fb93f2ea19151d871a59ab06899eb08';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

function encryptToken(token: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, Buffer.from(TEST_ENCRYPTION_KEY, 'hex'), iv);
  
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Combine IV, encrypted data, and auth tag
  return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
}

function decryptToken(encryptedData: string): string {
  const [ivHex, encrypted, authTagHex] = encryptedData.split(':');
  
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = createDecipheriv(ALGORITHM, Buffer.from(TEST_ENCRYPTION_KEY, 'hex'), iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Test token (simulating a social media access token)
const testToken = 'EAABsbCS1ZCGYBO...'; // Example Facebook access token

try {
  console.log('Original token:', testToken);
  
  // Encrypt the token
  const encrypted = encryptToken(testToken);
  console.log('\nEncrypted token:', encrypted);
  
  // Decrypt the token
  const decrypted = decryptToken(encrypted);
  console.log('\nDecrypted token:', decrypted);
  
  // Verify the decryption worked correctly
  if (decrypted === testToken) {
    console.log('\n✅ Test passed: Decrypted token matches original token');
  } else {
    console.log('\n❌ Test failed: Decrypted token does not match original token');
  }
} catch (error) {
  console.error('\n❌ Test failed with error:', error);
} 