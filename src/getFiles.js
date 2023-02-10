import { readdir } from 'fs/promises';
import { extname } from 'path';

/**
 * Get files recursively
 *
 * @param {string} path The path
 */
export async function getFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });

  // Get files within the current directory
  const files = entries
    .filter(file => (!file.isDirectory() && ['.js', '.css'].includes(extname(file.name))))
    .map(file => `${path}${file.name}`);

  // Get folders within the current directory
  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders) {
    // Recursive
    files.push(...await getFiles(`${path}${folder.name}/`));
  }

  return files;
}
