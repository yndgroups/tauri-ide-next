```
import { readDir, BaseDirectory } from '@tauri-apps/plugin-fs';
const dir = 'users';
const entries = await readDir('users', { dir: BaseDirectory.App });
processEntriesRecursive(dir, entries);
async function processEntriesRecursive(parent, entries) {
  for (const entry of entries) {
    console.log(`Entry: ${entry.name}`);
    if (entry.isDirectory) {
      const dir = parent + entry.name;
      processEntriesRecursive(dir, await readDir(dir, { dir: BaseDirectory.App }));
    }
  }
}
```
