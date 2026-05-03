import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(rootDir, "src", "App.jsx");
const source = readFileSync(appPath, "utf8");

const errors = [];
const warnings = [];

function reportError(message) {
  errors.push(message);
}

function reportWarning(message) {
  warnings.push(message);
}

function normalizeImportPath(importPath) {
  return toPosix(path.normalize(importPath.replace(/^\.\//, "src/")));
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function listFiles(dirPath, extensions) {
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return listFiles(fullPath, extensions);
    }

    if (!extensions.includes(path.extname(entry.name).toLowerCase())) {
      return [];
    }

    return [toPosix(path.relative(rootDir, fullPath))];
  });
}

function findBalancedArray(text, constName) {
  const marker = `const ${constName} =`;
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1) {
    reportError(`Не найден массив ${constName}.`);
    return "";
  }

  const start = text.indexOf("[", markerIndex);
  if (start === -1) {
    reportError(`Не найдено начало массива ${constName}.`);
    return "";
  }

  let depth = 0;
  let quote = null;

  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    const previous = text[index - 1];

    if (quote) {
      if (character === quote && previous !== "\\") quote = null;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "[") depth += 1;
    if (character === "]") depth -= 1;

    if (depth === 0) return text.slice(start, index + 1);
  }

  reportError(`Не найден конец массива ${constName}.`);
  return "";
}

function findObjectBlock(text, constName) {
  const marker = `const ${constName} =`;
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1) return "";

  const start = text.indexOf("{", markerIndex);
  if (start === -1) return "";

  let depth = 0;
  let quote = null;

  for (let index = start; index < text.length; index += 1) {
    const character = text[index];
    const previous = text[index - 1];

    if (quote) {
      if (character === quote && previous !== "\\") quote = null;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "{") depth += 1;
    if (character === "}") depth -= 1;

    if (depth === 0) return text.slice(start, index + 1);
  }

  return "";
}

function splitTopLevelObjects(arraySource) {
  const objects = [];
  let start = -1;
  let depth = 0;
  let quote = null;

  for (let index = 0; index < arraySource.length; index += 1) {
    const character = arraySource[index];
    const previous = arraySource[index - 1];

    if (quote) {
      if (character === quote && previous !== "\\") quote = null;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "{") {
      if (depth === 0) start = index;
      depth += 1;
      continue;
    }

    if (character === "}") {
      depth -= 1;

      if (depth === 0 && start !== -1) {
        objects.push(arraySource.slice(start, index + 1));
        start = -1;
      }
    }
  }

  return objects;
}

const importsByName = new Map();
const importsByPath = new Map();
const importPattern = /^import\s+([A-Za-z_$][\w$]*)\s+from\s+"(\.\/assets\/[^"]+)";/gm;

for (const match of source.matchAll(importPattern)) {
  const [, importName, importPath] = match;
  const normalizedPath = normalizeImportPath(importPath);

  if (importsByName.has(importName)) {
    reportError(`Импорт ${importName} объявлен больше одного раза.`);
  }

  importsByName.set(importName, normalizedPath);

  if (!importsByPath.has(normalizedPath)) {
    importsByPath.set(normalizedPath, []);
  }
  importsByPath.get(normalizedPath).push(importName);

  if (!existsSync(path.join(rootDir, normalizedPath))) {
    reportError(`Файл импорта не найден: ${normalizedPath} (${importName}).`);
  }
}

for (const [assetPath, importNames] of importsByPath) {
  if (importNames.length > 1) {
    reportWarning(`Файл ${assetPath} импортирован несколько раз: ${importNames.join(", ")}.`);
  }
}

const categoriesSource = findBalancedArray(source, "categories");
const categoryBlocks = splitTopLevelObjects(categoriesSource);
const categories = [];
const categoryIds = new Set();

for (const block of categoryBlocks) {
  const id = block.match(/id:\s*"([^"]+)"/)?.[1];
  const name = block.match(/name:\s*"([^"]+)"/)?.[1];
  const icon = block.match(/icon:\s*([A-Za-z_$][\w$]*)/)?.[1];
  const wordsSource = block.match(/words:\s*\[([\s\S]*?)\]\s*,?\s*\n\s*\}/)?.[1] ?? "";
  const words = [];

  if (!id) {
    reportError("Найдена категория без id.");
    continue;
  }

  if (categoryIds.has(id)) {
    reportError(`Категория ${id} объявлена больше одного раза.`);
  }
  categoryIds.add(id);

  if (!name) reportError(`У категории ${id} нет name.`);
  if (!icon) reportError(`У категории ${id} нет icon.`);
  if (icon && !importsByName.has(icon)) {
    reportError(`У категории ${id} icon ссылается на неизвестный импорт ${icon}.`);
  }

  const wordIds = new Set();
  const wordPattern = /\{\s*id:\s*"([^"]+)",\s*word:\s*"([^"]+)",\s*image:\s*([A-Za-z_$][\w$]*)\s*\}/g;

  for (const wordMatch of wordsSource.matchAll(wordPattern)) {
    const [, wordId, word, imageImport] = wordMatch;

    if (wordIds.has(wordId)) {
      reportError(`В категории ${id} слово ${wordId} объявлено больше одного раза.`);
    }
    wordIds.add(wordId);

    if (!importsByName.has(imageImport)) {
      reportError(`Слово ${id}/${wordId} ссылается на неизвестный импорт картинки ${imageImport}.`);
    }

    words.push({ id: wordId, word, imageImport });
  }

  if (words.length === 0) {
    reportError(`В категории ${id} нет слов.`);
  }

  categories.push({ id, name, icon, words });
}

if (categories.length === 0) {
  reportError("Не удалось прочитать категории из App.jsx.");
}

for (const category of categories) {
  const audioMapName = `${category.id}AudioMap`;
  const audioMapSource = findObjectBlock(source, audioMapName);

  if (!audioMapSource) {
    reportError(`Для категории ${category.id} не найден ${audioMapName}.`);
    continue;
  }

  const audioEntries = new Map();
  const audioEntryPattern = /^\s*([A-Za-z_$][\w$]*):\s*([A-Za-z_$][\w$]*),?/gm;

  for (const match of audioMapSource.matchAll(audioEntryPattern)) {
    const [, wordId, audioImport] = match;
    audioEntries.set(wordId, audioImport);

    if (!importsByName.has(audioImport)) {
      reportError(`${audioMapName}.${wordId} ссылается на неизвестный импорт ${audioImport}.`);
    }
  }

  for (const word of category.words) {
    if (!audioEntries.has(word.id)) {
      reportError(`Для слова ${category.id}/${word.id} (${word.word}) нет аудио в ${audioMapName}.`);
    }
  }

  for (const wordId of audioEntries.keys()) {
    if (!category.words.some((word) => word.id === wordId)) {
      reportError(`${audioMapName} содержит лишний ключ ${wordId}, которого нет в словах категории.`);
    }
  }
}

const importedAssetPaths = new Set(importsByPath.keys());
const imageFiles = listFiles(path.join(rootDir, "src", "assets"), [".png"]);
const audioFiles = listFiles(path.join(rootDir, "src", "assets", "audio"), [".mp3"]);

for (const filePath of [...imageFiles, ...audioFiles]) {
  if (!importedAssetPaths.has(filePath)) {
    reportWarning(`Файл не используется в App.jsx: ${filePath}.`);
  }
}

if (warnings.length > 0) {
  console.log("Content warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
  console.log("");
}

if (errors.length > 0) {
  console.error("Content check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const wordCount = categories.reduce((sum, category) => sum + category.words.length, 0);
console.log(`Content check passed: ${categories.length} categories, ${wordCount} words.`);
