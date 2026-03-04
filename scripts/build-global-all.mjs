import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";

const INPUT_ROOT = "data";
const OUT_DIR = "global";

const PROCEDURES = "procedures.txt";
const PROFILE_RESTRICTIONS = "profile_restrictions.txt";
const VOLUMES = "volumes.geojson";

// Output is VALID GeoJSON FeatureCollection, formatted so each feature is on its own line
const VOLUMES_OUT = "volumes.geojson";

async function tryReadText(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (e) {
    if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return null;
    throw e;
  }
}

const sectorDirs = (await fg(`${INPUT_ROOT}/*`, { onlyDirectories: true })).sort();

if (sectorDirs.length === 0) {
  console.error(`No sector folders found under ${INPUT_ROOT}/`);
  process.exit(1);
}

await fs.mkdir(OUT_DIR, { recursive: true });

// 1) TXT files: concatenate, skipping missing files
for (const filename of [PROCEDURES, PROFILE_RESTRICTIONS]) {
  let out = "";

  for (const sector of sectorDirs) {
    const content = await tryReadText(path.join(sector, filename));
    if (content == null) continue;

    out += content;
    if (!out.endsWith("\n")) out += "\n";
  }

  await fs.writeFile(path.join(OUT_DIR, filename), out, "utf8");
  console.log(`Wrote ${OUT_DIR}/${filename}`);
}

// 2) volumes.geojson: valid FeatureCollection; each Feature on its own line, comma-separated
const features = [];

for (const sector of sectorDirs) {
  const raw = await tryReadText(path.join(sector, VOLUMES));
  if (raw == null) continue;

  let gj;
  try {
    gj = JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${sector}/${VOLUMES}: ${e.message}`);
  }

  if (gj?.type === "FeatureCollection" && Array.isArray(gj.features)) {
    for (const feat of gj.features) {
      if (feat?.type === "Feature") features.push(feat);
    }
    continue;
  }

  if (gj?.type === "Feature") {
    features.push(gj);
    continue;
  }

  throw new Error(
    `Unsupported GeoJSON in ${sector}/${VOLUMES}: expected FeatureCollection or Feature, got ${gj?.type}`
  );
}

const header = `{"type":"FeatureCollection","features":[\n`;
const body = features.map((f) => JSON.stringify(f)).join(",\n"); // comma-separated, one per line
const footer = `\n]}\n`;

await fs.writeFile(path.join(OUT_DIR, VOLUMES_OUT), header + body + footer, "utf8");
console.log(`Wrote ${OUT_DIR}/${VOLUMES_OUT} with ${features.length} features`);