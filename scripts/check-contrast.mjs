/**
 * WCAG AA コントラスト比チェッカー
 *
 * WCAG AA基準:
 * - 通常テキスト: 4.5:1 以上
 * - 大きいテキスト（18pt以上 or 14pt太字以上）: 3:1 以上
 * - UIコンポーネント・グラフィック: 3:1 以上
 */

// 相対輝度を計算
function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// HEXをRGBに変換
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

// コントラスト比を計算
function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// 結果を判定
function checkWCAG(ratio, type = "normal") {
  if (type === "normal") {
    // 通常テキスト: 4.5:1
    return ratio >= 4.5 ? "✅ PASS" : "❌ FAIL";
  } else {
    // 大きいテキスト / UI: 3:1
    return ratio >= 3.0 ? "✅ PASS" : "❌ FAIL";
  }
}

// カラーシステム
const colors = {
  // 背景
  "zinc-50": "#FAFAFA", // ライトモード背景
  "zinc-950": "#09090B", // ダークモード背景

  // テキスト
  "zinc-900": "#18181B", // プライマリテキスト（ライト）
  "zinc-100": "#F4F4F5", // プライマリテキスト（ダーク）
  "zinc-600": "#52525B", // セカンダリテキスト（ライト）
  "zinc-400": "#A1A1AA", // セカンダリテキスト（ダーク）
  "zinc-500": "#71717A", // ミューテッドテキスト

  // アクセント（黄色）
  "yellow-400": "#FACC15",
  "yellow-500": "#EAB308",
  "yellow-600": "#CA8A04",
};

console.log("=".repeat(70));
console.log("WCAG AA コントラスト比チェック");
console.log("=".repeat(70));
console.log("\n【基準】");
console.log("- 通常テキスト: 4.5:1 以上");
console.log("- 大きいテキスト / UI: 3:1 以上\n");

// ライトモードのチェック
console.log("-".repeat(70));
console.log("📱 ライトモード（背景: zinc-50 #FAFAFA）");
console.log("-".repeat(70));

const lightBg = colors["zinc-50"];
const lightChecks = [
  { name: "プライマリテキスト", color: "zinc-900", type: "normal" },
  { name: "セカンダリテキスト", color: "zinc-600", type: "normal" },
  { name: "ミューテッドテキスト", color: "zinc-500", type: "normal" },
  { name: "黄色アクセント（テキスト）", color: "yellow-600", type: "normal" },
  { name: "黄色アクセント（大きいテキスト/UI）", color: "yellow-600", type: "large" },
  { name: "黄色ボタン背景", color: "yellow-400", type: "large" },
];

lightChecks.forEach(({ name, color, type }) => {
  const ratio = getContrastRatio(lightBg, colors[color]);
  const result = checkWCAG(ratio, type);
  const requirement = type === "normal" ? "4.5:1" : "3.0:1";
  console.log(
    `${result} ${name}: ${ratio.toFixed(2)}:1 (${color} ${colors[color]}) [要求: ${requirement}]`
  );
});

// ダークモードのチェック
console.log("\n" + "-".repeat(70));
console.log("🌙 ダークモード（背景: zinc-950 #09090B）");
console.log("-".repeat(70));

const darkBg = colors["zinc-950"];
const darkChecks = [
  { name: "プライマリテキスト", color: "zinc-100", type: "normal" },
  { name: "セカンダリテキスト", color: "zinc-400", type: "normal" },
  { name: "ミューテッドテキスト", color: "zinc-500", type: "normal" },
  { name: "黄色アクセント（テキスト）", color: "yellow-400", type: "normal" },
  { name: "黄色アクセント（大きいテキスト/UI）", color: "yellow-400", type: "large" },
];

darkChecks.forEach(({ name, color, type }) => {
  const ratio = getContrastRatio(darkBg, colors[color]);
  const result = checkWCAG(ratio, type);
  const requirement = type === "normal" ? "4.5:1" : "3.0:1";
  console.log(
    `${result} ${name}: ${ratio.toFixed(2)}:1 (${color} ${colors[color]}) [要求: ${requirement}]`
  );
});

// 黄色ボタン上のテキスト
console.log("\n" + "-".repeat(70));
console.log("🔘 黄色ボタン上のテキスト（背景: yellow-400 #FACC15）");
console.log("-".repeat(70));

const yellowBg = colors["yellow-400"];
const buttonChecks = [
  { name: "黒テキスト", color: "zinc-900", type: "normal" },
  { name: "白テキスト", color: "zinc-100", type: "normal" },
];

buttonChecks.forEach(({ name, color, type }) => {
  const ratio = getContrastRatio(yellowBg, colors[color]);
  const result = checkWCAG(ratio, type);
  console.log(
    `${result} ${name}: ${ratio.toFixed(2)}:1 (${color} ${colors[color]}) [要求: 4.5:1]`
  );
});

// ホバー時のリンク色
console.log("\n" + "-".repeat(70));
console.log("🔗 リンクホバー色のチェック");
console.log("-".repeat(70));

const linkChecks = [
  {
    name: "ライト: yellow-600 on zinc-50",
    fg: "yellow-600",
    bg: "zinc-50",
    type: "normal",
  },
  {
    name: "ダーク: yellow-400 on zinc-950",
    fg: "yellow-400",
    bg: "zinc-950",
    type: "normal",
  },
];

linkChecks.forEach(({ name, fg, bg, type }) => {
  const ratio = getContrastRatio(colors[bg], colors[fg]);
  const result = checkWCAG(ratio, type);
  console.log(`${result} ${name}: ${ratio.toFixed(2)}:1 [要求: 4.5:1]`);
});

// 代替色の提案
console.log("\n" + "-".repeat(70));
console.log("💡 代替色の検証");
console.log("-".repeat(70));

const alternatives = {
  "yellow-700": "#A16207",
  "yellow-800": "#854D0E",
  "amber-600": "#D97706",
  "amber-700": "#B45309",
  "amber-800": "#92400E",
  "zinc-600": "#52525B",
};

console.log("\n【ライトモード背景（zinc-50）での黄色代替】");
Object.entries(alternatives).forEach(([name, hex]) => {
  if (name.startsWith("yellow") || name.startsWith("amber")) {
    const ratio = getContrastRatio(colors["zinc-50"], hex);
    const result = checkWCAG(ratio, "normal");
    console.log(`${result} ${name} (${hex}): ${ratio.toFixed(2)}:1`);
  }
});

console.log("\n【ダークモード背景（zinc-950）でのミューテッド代替】");
const mutedRatio = getContrastRatio(colors["zinc-950"], colors["zinc-600"]);
console.log(`${checkWCAG(mutedRatio, "normal")} zinc-600: ${mutedRatio.toFixed(2)}:1`);

console.log("\n" + "=".repeat(70));
console.log("チェック完了");
console.log("=".repeat(70));
