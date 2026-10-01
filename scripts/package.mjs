import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = (await readFile(path.join(root, 'version'), 'utf8')).trim();
const versionPattern = /^\d+\.\d+\.\d+$/;
if (!versionPattern.test(version)) throw new Error('version must use MAJOR.MINOR.PATCH');

const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
if (manifest.version !== version) throw new Error('manifest.json version must match the root version file');

const output = path.join(root, 'dist', 'IntraNest');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['manifest.json', 'popup.html', 'popup.css', 'popup.js', 'options.html', 'options.css', 'options.js', 'shared.js', 'version']) {
  await cp(path.join(root, file), path.join(output, file));
}
await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
await writeFile(path.join(output, 'version'), version + '\n');
process.stdout.write('Packaged IntraNest extension v' + version + ' at dist/IntraNest\n');
