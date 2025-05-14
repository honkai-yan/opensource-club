"use strict";
const path = require("path");
const opentype = require("opentype.js");
const charPreset = require("./char-preset");

// const fontPath = path.join(__dirname, '../../fonts/Comismsh.ttf');
/**
 * 导入字体报错，修改路径拼接方式使其兼容Next应用
 * - Auth: honkai-yan
 * - Github: honkai-yan
 * - Email: peter-adams@qq.com
 * - Data: 2025/05/13 22:15:05
 */
const fontPath = path.join(process.cwd(), "app", "lib", "svg-captcha", "fonts", "Comismsh.ttf");

const font = opentype.loadSync(fontPath);
const ascender = font.ascender;
const descender = font.descender;

const options = {
  width: 150,
  height: 50,
  noise: 1,
  color: false,
  background: "",
  size: 4,
  ignoreChars: "",
  fontSize: 56,
  charPreset,
  font,
  ascender,
  descender,
};

const loadFont = (filepath) => {
  const font = opentype.loadSync(filepath);
  options.font = font;
  options.ascender = font.ascender;
  options.descender = font.descender;
};

module.exports = {
  options,
  loadFont,
};
