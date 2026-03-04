import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";

const INPUT_ROOT = "data";
const OUT_DIR = "global/all";

const PROCEDURES = "procedures.txt";
const PROFILE_RESTRICTIONS = "profile_restrictions.txt";
const VOLUMES = "volumes.geojson";

// Output: one GeoJSON Feature per line (NDJSON/GeoJSONSeq-style)
const VOLUMES_OUT = "volumes.geojson";

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

// sector folders = first-level under data/
const sectorDirs = (await fg(`${INPUT_ROOT}/*`, { onlyDirectories: true })).sort();

const sectors = [];
for (const dir of sectorDirs) {
  const ok = await Promise.all([
    exists(path.join(dir, PROCEDURES)),
    exists(path.join(dir, PROFILE_RESTRICTIONS)),
    exists(path.join(dir, VOLUMES)),
  ]);
  if (ok.every(Boolean)) sectors.push(dir);
}

if (sectors.length === 0) {
  console.error(
    `No sector folders found under ${INPUT_ROOT}/ containing ${PROCEDURES}, ${PROFILE_RESTRICTIONS}, ${VOLUMES}`
  );
  process.exit(1);
}

await fs.mkdir(OUT_DIR, { recursive: true });

// 1) TXT files: concatenate (no formatting required)
for (const filename of [PROCEDURES, PROFILE_RESTRICTIONS]) {
  let out = "";
  for (const sector of sectors) {
    out += await fs.readFile(path.join(sector, filename), "utf8");
    if (!out.endsWith("\n")) out += "\n";
  }
  await fs.writeFile(path.join(OUT_DIR, filename), out, "utf8");
  console.log(`Wrote ${OUT_DIR}/${filename} from ${sectors.length} sectors`);
}

// 2) volumes: each *input Feature* becomes one output line, unchanged (no added properties)
const lines = [];

for (const sector of sectors) {
  const raw = await fs.readFile(path.join(sector, VOLUMES), "utf8");
  const gj = JSON.parse(raw);

  if (gj?.type === "FeatureCollection" && Array.isArray(gj.features)) {
    for (const feat of gj.features) {
      if (feat?.type !== "Feature") continue;
      lines.push(JSON.stringify(feat));
    }
    continue;
  }

  if (gj?.type === "Feature") {
    lines.push(JSON.stringify(gj));
    continue;
  }

  throw new Error(
    `Unsupported GeoJSON in ${sector}/${VOLUMES}: expected FeatureCollection or Feature, got ${gj?.type}`
  );
}

await fs.writeFile(path.join(OUT_DIR, VOLUMES_OUT), lines.join("\n") + "\n", "utf8");
console.log(`Wrote ${OUT_DIR}/${VOLUMES_OUT} with ${lines.length} features (1 per line)`);