export async function uploadFile(file, path) {
  return null
}

export function isValidImageUrl(url) {
  try { new URL(url); return true }
  catch { return false }
}