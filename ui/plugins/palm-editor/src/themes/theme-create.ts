import { tags as t } from "@lezer/highlight";
import {
  monokaiColor,
  whiteDarkColor,
  whiteLightColor,
  tomorrowNightBlueColor,
  solarizedDarktColor,
  solarizedLightColor,
  redColor,
  quietlightColor,
  monokaiDimmedColor,
  kimbieColor,
  copilotColor,
  andromedaColor,
  abyssColor,
} from "./colors";
import { Themes } from "../types";
const maps = new Map();

maps.set(Themes.basicDark, {
  default: {
    background: "#2E3235",
    foreground: "#DDDDDD",
    caret: "#DDDDDD",
    selection: "#202325",
    selectionMatch: "#202325",
    gutterBackground: "#292d30",
    gutterForeground: "#808080",
    gutterBorder: "1px solid #ffffff10",
    lineHighlight: "#B9D2FF30",
  },
  styles: [
    { tag: t.keyword, color: "#fda331" },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: "#b5bd68",
    },
    { tag: [t.variableName], color: "#6fb3d2" },
    { tag: [t.function(t.variableName)], color: "#fda331" },
    { tag: [t.labelName], color: "#fc6d24" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#fda331",
    },
    { tag: [t.definition(t.name), t.separator], color: "#cc99cc" },
    { tag: [t.brace], color: "#cc99cc" },
    {
      tag: [t.annotation],
      color: "#fc6d24",
    },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#fda331",
    },
    {
      tag: [t.typeName, t.className],
      color: "#6fb3d2",
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: "#cc99cc",
    },
    {
      tag: [t.tagName],
      color: "#fda331",
    },
    {
      tag: [t.squareBracket],
      color: "#cc99cc",
    },
    {
      tag: [t.angleBracket],
      color: "#cc99cc",
    },
    {
      tag: [t.attributeName],
      color: "#6fb3d2",
    },
    {
      tag: [t.regexp],
      color: "#fda331",
    },
    {
      tag: [t.quote],
      color: "#DDDDDD",
    },
    { tag: [t.string], color: "#b5bd68" },
    {
      tag: t.link,
      color: "#6987AF",
      textDecoration: "underline",
      textUnderlinePosition: "under",
    },
    {
      tag: [t.url, t.escape, t.special(t.string)],
      color: "#8abeb7",
    },
    { tag: [t.meta], color: "#A54543" },
    { tag: [t.comment], color: "#808080", fontStyle: "italic" },
    { tag: t.monospace, color: "#DDDDDD" },
    { tag: t.strong, fontWeight: "bold", color: "#fda331" },
    { tag: t.emphasis, fontStyle: "italic", color: "#6fb3d2" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.heading, fontWeight: "bold", color: "#DDDDDD" },
    { tag: t.special(t.heading1), fontWeight: "bold", color: "#DDDDDD" },
    { tag: t.heading1, fontWeight: "bold", color: "#DDDDDD" },
    {
      tag: [t.heading2, t.heading3, t.heading4],
      fontWeight: "bold",
      color: "#DDDDDD",
    },
    {
      tag: [t.heading5, t.heading6],
      color: "#DDDDDD",
    },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#8abeb7" },
    {
      tag: [t.processingInstruction, t.inserted],
      color: "#8abeb7",
    },
    {
      tag: [t.contentSeparator],
      color: "#6fb3d2",
    },
    {
      tag: t.invalid,
      color: "#B9D2FF",
      borderBottom: `1px dotted ${"#fc6d24"}`,
    },
  ],
});

maps.set(Themes.basicLight, {
  default: {
    background: "#ffffff",
    foreground: "#2e3440",
    caret: "#3b4252",
    selection: "#eceff4",
    selectionMatch: "#e5e9f0",
    gutterBackground: "#eceff4",
    gutterForeground: "#2e3440",
    gutterBorder: "none",
    lineHighlight: "#02255f11",
  },
  styles: [
    { tag: t.keyword, color: "#5e81ac" },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: "#d08770",
    },
    { tag: [t.variableName], color: "#d08770" },
    { tag: [t.function(t.variableName)], color: "#5e81ac" },
    { tag: [t.labelName], color: "#81a1c1" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#5e81ac",
    },
    { tag: [t.definition(t.name), t.separator], color: "#a3be8c" },
    { tag: [t.brace], color: "#8fbcbb" },
    {
      tag: [t.annotation],
      color: "#d30102",
    },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#88c0d0",
    },
    {
      tag: [t.typeName, t.className],
      color: "#ebcb8b",
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: "#a3be8c",
    },
    {
      tag: [t.tagName],
      color: "#b48ead",
    },
    {
      tag: [t.squareBracket],
      color: "#bf616a",
    },
    {
      tag: [t.angleBracket],
      color: "#d08770",
    },
    {
      tag: [t.attributeName],
      color: "#ebcb8b",
    },
    {
      tag: [t.regexp],
      color: "#5e81ac",
    },
    {
      tag: [t.quote],
      color: "#3b4252",
    },
    { tag: [t.string], color: "#d08770" },
    {
      tag: t.link,
      color: "#8fbcbb",
      textDecoration: "underline",
      textUnderlinePosition: "under",
    },
    {
      tag: [t.url, t.escape, t.special(t.string)],
      color: "#d08770",
    },
    { tag: [t.meta], color: "#88c0d0" },
    { tag: [t.comment], color: "#434c5e", fontStyle: "italic" },
    { tag: t.strong, fontWeight: "bold", color: "#5e81ac" },
    { tag: t.emphasis, fontStyle: "italic", color: "#5e81ac" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.heading, fontWeight: "bold", color: "#5e81ac" },
    { tag: t.special(t.heading1), fontWeight: "bold", color: "#5e81ac" },
    { tag: t.heading1, fontWeight: "bold", color: "#5e81ac" },
    {
      tag: [t.heading2, t.heading3, t.heading4],
      fontWeight: "bold",
      color: "#5e81ac",
    },
    {
      tag: [t.heading5, t.heading6],
      color: "#5e81ac",
    },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#d08770" },
    {
      tag: [t.processingInstruction, t.inserted],
      color: "#8fbcbb",
    },
    {
      tag: [t.contentSeparator],
      color: "#ebcb8b",
    },
    { tag: t.invalid, color: "#434c5e", borderBottom: "1px dotted #d30102" },
  ],
});

maps.set(Themes.abcdef, {
  default: {
    background: "#0f0f0f",
    foreground: "#defdef",
    caret: "#00FF00",
    selection: "#515151",
    selectionMatch: "#515151",
    gutterBackground: "#555",
    gutterForeground: "#FFFFFF",
    lineHighlight: "#0a6bcb3d",
  },
  styles: [
    { tag: t.keyword, color: "darkgoldenrod", fontWeight: "bold" },
    { tag: t.atom, color: "#77F" },
    { tag: t.comment, color: "#7a7b7c", fontStyle: "italic" },
    { tag: t.number, color: "violet" },
    { tag: t.definition(t.variableName), color: "#fffabc" },
    { tag: t.variableName, color: "#abcdef" },
    { tag: t.function(t.variableName), color: "#fffabc" },
    { tag: t.typeName, color: "#FFDD44" },
    { tag: t.tagName, color: "#def" },
    { tag: t.string, color: "#2b4" },
    { tag: t.meta, color: "#C9F" },
    { tag: t.bracket, color: "#8a8a8a" },
    { tag: t.attributeName, color: "#DDFF00" },
    { tag: t.heading, color: "aquamarine", fontWeight: "bold" },
    { tag: t.link, color: "blueviolet", fontWeight: "bold" },
  ],
});

// abyss
maps.set(Themes.abyss, {
  default: {
    background: abyssColor.background,
    foreground: abyssColor.foreground,
    caret: abyssColor.cursor,
    selection: abyssColor.selection,
    selectionMatch: abyssColor.selectionMatch,
    gutterBackground: abyssColor.background,
    gutterForeground: abyssColor.foreground,
    lineHighlight: abyssColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: abyssColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: abyssColor.variable,
    },
    { tag: [t.propertyName], color: abyssColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: abyssColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: abyssColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: abyssColor.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: abyssColor.variable },
    { tag: [t.className], color: abyssColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: abyssColor.number,
    },
    { tag: [t.typeName], color: abyssColor.type, fontStyle: abyssColor.type },
    { tag: [t.operator, t.operatorKeyword], color: abyssColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: abyssColor.regexp },
    { tag: [t.meta, t.comment], color: abyssColor.comment },
    { tag: t.tagName, color: abyssColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: abyssColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: abyssColor.variable,
    },
    { tag: t.invalid, color: abyssColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// androidstudio
maps.set(Themes.androidstudio, {
  default: {
    background: "#282b2e",
    foreground: "#a9b7c6",
    caret: "#00FF00",
    selection: "#4e5254",
    selectionMatch: "#4e5254",
    lineHighlight: "#7f85891f",
  },
  styles: [
    { tag: [t.keyword, t.deleted, t.className], color: "#cc7832" },
    { tag: [t.number, t.literal, t.derefOperator], color: "#6897bb" },
    { tag: [t.link, t.variableName], color: "#629755" },
    { tag: [t.comment, t.quote], color: "grey" },
    { tag: [t.meta, t.documentMeta], color: "#bbb529" },
    { tag: [t.string, t.propertyName, t.attributeValue], color: "#6a8759" },
    { tag: [t.heading, t.typeName], color: "#ffc66d" },
    { tag: [t.attributeName], color: "#a9b7c6" },
    { tag: [t.emphasis], fontStyle: "italic" },
  ],
});

// andromeda
maps.set(Themes.andromeda, {
  default: {
    background: andromedaColor.background,
    foreground: andromedaColor.foreground,
    caret: andromedaColor.cursor,
    selection: andromedaColor.selection,
    selectionMatch: andromedaColor.selectionMatch,
    gutterBackground: andromedaColor.background,
    gutterForeground: andromedaColor.foreground,
    lineHighlight: andromedaColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: andromedaColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: andromedaColor.variable,
    },
    { tag: [t.propertyName], color: andromedaColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: andromedaColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: andromedaColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: andromedaColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: andromedaColor.variable,
    },
    { tag: [t.className], color: andromedaColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: andromedaColor.number,
    },
    {
      tag: [t.typeName],
      color: andromedaColor.type,
      fontStyle: andromedaColor.type,
    },
    { tag: [t.operator], color: andromedaColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: andromedaColor.regexp },
    { tag: [t.meta, t.comment], color: andromedaColor.comment },
    { tag: t.tagName, color: andromedaColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: andromedaColor.heading },
    {
      tag: [t.atom, t.special(t.variableName)],
      color: andromedaColor.variable,
    },
    { tag: t.invalid, color: andromedaColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
      tag: [t.operatorKeyword, t.bool, t.null, t.variableName],
      color: andromedaColor.constant,
    },
  ],
});

// atomone
maps.set(Themes.atomone, {
  default: {
    background: "#272C35",
    foreground: "#9d9b97",
    caret: "#797977",
    selection: "#3d4c64",
    selectionMatch: "#3d4c64",
    gutterBackground: "#272C35",
    gutterForeground: "#465063",
    gutterBorder: "transparent",
    lineHighlight: "#2e3f5940",
  },
  styles: [
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.url,
        t.processingInstruction,
      ],
      color: "hsl(207, 82%, 66%)",
    },
    { tag: [t.tagName, t.heading], color: "#e06c75" },
    { tag: t.comment, color: "#54636D" },
    { tag: [t.propertyName], color: "hsl(220, 14%, 71%)" },
    { tag: [t.attributeName, t.number], color: "hsl( 29, 54%, 61%)" },
    { tag: t.className, color: "hsl( 39, 67%, 69%)" },
    { tag: t.keyword, color: "hsl(286, 60%, 67%)" },
    {
      tag: [t.string, t.regexp, t.special(t.propertyName)],
      color: "#98c379",
    },
  ],
});

// aura
maps.set(Themes.aura, {
  default: {
    background: "#21202e",
    foreground: "#edecee",
    caret: "#a277ff",
    selection: "#5a51898f",
    selectionMatch: "#5a51898f",
    gutterBackground: "#21202e",
    gutterForeground: "#edecee",
    gutterBorder: "transparent",
    lineHighlight: "#a394f033",
  },
  styles: [
    { tag: t.keyword, color: "#a277ff" },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: "#edecee" },
    { tag: [t.propertyName], color: "#ffca85" },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: "#61ffca",
    },
    { tag: [t.function(t.variableName), t.labelName], color: "#ffca85" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#61ffca",
    },
    { tag: [t.definition(t.name), t.separator], color: "#edecee" },
    { tag: [t.className], color: "#82e2ff" },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#61ffca",
    },
    { tag: [t.typeName], color: "#82e2ff" },
    { tag: [t.operator, t.operatorKeyword], color: "#a277ff" },
    { tag: [t.url, t.escape, t.regexp, t.link], color: "#61ffca" },
    { tag: [t.meta, t.comment], color: "#6d6d6d" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: "#a277ff" },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#edecee" },
    { tag: t.invalid, color: "#ff6767" },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// bbedit
maps.set(Themes.bbedit, {
  default: {
    background: "#FFFFFF",
    foreground: "#000000",
    caret: "#FBAC52",
    selection: "#FFD420",
    selectionMatch: "#FFD420",
    gutterBackground: "#f5f5f5",
    gutterForeground: "#4D4D4C",
    gutterBorder: "transparent",
    lineHighlight: "#00000012",
  },
  styles: [
    { tag: [t.meta, t.comment], color: "#804000" },
    { tag: [t.keyword, t.strong], color: "#0000FF" },
    { tag: [t.number], color: "#FF0080" },
    { tag: [t.string], color: "#FF0080" },
    { tag: [t.variableName], color: "#006600" },
    { tag: [t.escape], color: "#33CC33" },
    { tag: [t.tagName], color: "#1C02FF" },
    { tag: [t.heading], color: "#0C07FF" },
    { tag: [t.quote], color: "#000000" },
    { tag: [t.list], color: "#B90690" },
    { tag: [t.documentMeta], color: "#888888" },
    { tag: [t.function(t.variableName)], color: "#0000A2" },
    { tag: [t.definition(t.typeName), t.typeName], color: "#6D79DE" },
  ],
});

// bespin
maps.set(Themes.bespin, {
  default: {
    background: "#28211c",
    foreground: "#9d9b97",
    caret: "#797977",
    selection: "#4f382b",
    selectionMatch: "#4f382b",
    gutterBackground: "#28211c",
    gutterForeground: "#666666",
    lineHighlight: "#ffffff1a",
  },
  styles: [
    { tag: [t.atom, t.number, t.link, t.bool], color: "#9b859d" },
    { tag: t.comment, color: "#937121" },
    { tag: [t.keyword, t.tagName], color: "#cf6a4c" },
    { tag: t.string, color: "#f9ee98" },
    { tag: t.bracket, color: "#9d9b97" },
    { tag: [t.variableName], color: "#5ea6ea" },
    { tag: t.definition(t.variableName), color: "#cf7d34" },
    { tag: [t.function(t.variableName), t.className], color: "#cf7d34" },
    { tag: [t.propertyName, t.attributeName], color: "#54be0d" },
  ],
});

// copilot
maps.set(Themes.copilot, {
  default: {
    background: copilotColor.background,
    foreground: copilotColor.foreground,
    caret: copilotColor.cursor,
    selection: copilotColor.selection,
    selectionMatch: copilotColor.selectionMatch,
    gutterBackground: copilotColor.background,
    gutterForeground: copilotColor.foreground,
    lineHighlight: copilotColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: copilotColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: copilotColor.variable,
    },
    { tag: [t.propertyName], color: copilotColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: copilotColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: copilotColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: copilotColor.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: copilotColor.variable },
    { tag: [t.className], color: copilotColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: copilotColor.number,
    },
    {
      tag: [t.typeName],
      color: copilotColor.type,
      fontStyle: copilotColor.type,
    },
    { tag: [t.operator], color: copilotColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: copilotColor.regexp },
    { tag: [t.meta, t.comment], color: copilotColor.comment },
    { tag: t.tagName, color: copilotColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: copilotColor.heading },
    { tag: [t.atom, t.special(t.variableName)], color: copilotColor.variable },
    { tag: t.invalid, color: copilotColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
      tag: [t.operatorKeyword, t.bool, t.null, t.variableName],
      color: copilotColor.constant,
    },
  ],
});

// darcula
maps.set(Themes.darcula, {
  default: {
    background: "#2B2B2B",
    foreground: "#f8f8f2",
    caret: "#FFFFFF",
    selection: "rgba(255, 255, 255, 0.1)",
    selectionMatch: "rgba(255, 255, 255, 0.2)",
    gutterBackground: "rgba(255, 255, 255, 0.1)",
    gutterForeground: "#999",
    gutterBorder: "transparent",
    lineHighlight: "rgba(255, 255, 255, 0.1)",
  },
  styles: [
    { tag: [t.atom, t.number], color: "#bd93f9" },
    { tag: [t.comment], color: "#61A151" },
    { tag: [t.string], color: "#6A8759" },
    { tag: [t.variableName, t.operator], color: "#A9B7C6" },
    { tag: [t.meta, t.className], color: "#A9B7C6" },
    { tag: [t.propertyName], color: "#FFC66D" },
    { tag: [t.keyword], color: "#CC7832" },
    { tag: [t.tagName], color: "#ff79c6" },
    { tag: [t.typeName], color: "#ffb86c" },
  ],
});

// dracula
maps.set(Themes.dracula, {
  default: {
    background: "#282a36",
    foreground: "#f8f8f2",
    caret: "#f8f8f0",
    selection: "rgba(255, 255, 255, 0.1)",
    selectionMatch: "rgba(255, 255, 255, 0.2)",
    gutterBackground: "#282a36",
    gutterForeground: "#6D8A88",
    gutterBorder: "transparent",
    lineHighlight: "rgba(255, 255, 255, 0.1)",
  },
  styles: [
    { tag: t.comment, color: "#6272a4" },
    { tag: t.string, color: "#f1fa8c" },
    { tag: t.atom, color: "#bd93f9" },
    { tag: t.meta, color: "#f8f8f2" },
    { tag: [t.keyword, t.operator, t.tagName], color: "#ff79c6" },
    { tag: [t.function(t.propertyName), t.propertyName], color: "#66d9ef" },
    {
      tag: [
        t.definition(t.variableName),
        t.function(t.variableName),
        t.className,
        t.attributeName,
      ],
      color: "#50fa7b",
    },
    { tag: t.atom, color: "#bd93f9" },
  ],
});

// xcodeDark
maps.set(Themes.xcodeDark, {
  default: {
    background: "#292A30",
    foreground: "#CECFD0",
    caret: "#fff",
    selection: "#727377",
    selectionMatch: "#727377",
    lineHighlight: "#ffffff0f",
  },
  styles: [
    { tag: [t.comment, t.quote], color: "#7F8C98" },
    { tag: [t.keyword], color: "#FF7AB2", fontWeight: "bold" },
    { tag: [t.string, t.meta], color: "#FF8170" },
    { tag: [t.typeName], color: "#DABAFF" },
    { tag: [t.definition(t.variableName)], color: "#6BDFFF" },
    { tag: [t.name], color: "#6BAA9F" },
    { tag: [t.variableName], color: "#ACF2E4" },
    { tag: [t.regexp, t.link], color: "#FF8170" },
  ],
});

// xcodeLight
maps.set(Themes.xcodeLight, {
  default: {
    background: "#fff",
    foreground: "#3D3D3D",
    selection: "#BBDFFF",
    selectionMatch: "#BBDFFF",
    gutterBackground: "#fff",
    gutterForeground: "#AFAFAF",
    lineHighlight: "#d5e6ff69",
  },
  styles: [
    { tag: [t.comment, t.quote], color: "#707F8D" },
    { tag: [t.typeName, t.typeOperator], color: "#aa0d91" },
    { tag: [t.keyword], color: "#aa0d91", fontWeight: "bold" },
    { tag: [t.string, t.meta], color: "#D23423" },
    { tag: [t.name], color: "#032f62" },
    { tag: [t.typeName], color: "#522BB2" },
    { tag: [t.variableName], color: "#23575C" },
    { tag: [t.definition(t.variableName)], color: "#327A9E" },
    { tag: [t.regexp, t.link], color: "#0e0eff" },
  ],
});

// monokai
maps.set(Themes.monokai, {
  default: {
    background: monokaiColor.background,
    foreground: monokaiColor.foreground,
    caret: monokaiColor.cursor,
    selection: monokaiColor.selection,
    selectionMatch: monokaiColor.selection,
    gutterBackground: monokaiColor.background,
    gutterForeground: monokaiColor.foreground,
    lineHighlight: monokaiColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: monokaiColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: monokaiColor.variable,
    },
    { tag: [t.propertyName], color: monokaiColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: monokaiColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: monokaiColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: monokaiColor.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: monokaiColor.variable },
    { tag: [t.className], color: monokaiColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: monokaiColor.number,
    },
    {
      tag: [t.typeName],
      color: monokaiColor.type,
      fontStyle: monokaiColor.type,
    },
    { tag: [t.operator, t.operatorKeyword], color: monokaiColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: monokaiColor.regexp },
    { tag: [t.meta, t.comment], color: monokaiColor.comment },
    { tag: t.tagName, color: monokaiColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: monokaiColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: monokaiColor.variable,
    },
    { tag: t.invalid, color: monokaiColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// whiteDark
maps.set(Themes.whiteDark, {
  default: {
    background: whiteDarkColor.background,
    foreground: whiteDarkColor.foreground,
    caret: whiteDarkColor.cursor,
    selection: whiteDarkColor.selection,
    selectionMatch: whiteDarkColor.selectionMatch,
    gutterBackground: whiteDarkColor.background,
    gutterForeground: whiteDarkColor.foreground,
    lineHighlight: whiteDarkColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: monokaiColor.keyword, fontWeight: "bold" },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: monokaiColor.variable,
    },
    { tag: [t.propertyName], color: monokaiColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: monokaiColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: monokaiColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: monokaiColor.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: monokaiColor.variable },
    { tag: [t.className], color: monokaiColor.class },
    {
      tag: [t.typeName],
      color: monokaiColor.type,
      fontStyle: monokaiColor.type,
    },
    { tag: [t.url, t.escape, t.regexp, t.link], color: monokaiColor.regexp },
    { tag: [t.meta, t.comment], color: monokaiColor.comment },
    { tag: t.tagName, color: monokaiColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: monokaiColor.heading },
    { tag: [t.atom, t.special(t.variableName)], color: monokaiColor.variable },
    { tag: t.invalid, color: monokaiColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
      tag: [t.operatorKeyword, t.bool, t.null, t.variableName],
      color: monokaiColor.constant,
    },
    { tag: [t.operator], color: "#bb9af7" },
    { tag: [t.number], color: "#a8a8b1" },
    { tag: [t.bracket], color: "#bb9af7" },
  ],
});

// whiteLight
maps.set(Themes.whiteLight, {
  default: {
    background: whiteLightColor.background,
    foreground: whiteLightColor.foreground,
    caret: whiteLightColor.cursor,
    selection: whiteLightColor.selection,
    selectionMatch: whiteLightColor.selectionMatch,
    gutterBackground: whiteLightColor.background,
    gutterForeground: whiteLightColor.foreground,
    lineHighlight: whiteLightColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: whiteLightColor.keyword, fontWeight: "bold" },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: whiteLightColor.variable,
    },
    { tag: [t.propertyName], color: whiteLightColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: whiteLightColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: whiteLightColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: whiteLightColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: whiteLightColor.variable,
    },
    { tag: [t.className], color: whiteLightColor.class },
    {
      tag: [t.typeName],
      color: whiteLightColor.type,
      fontStyle: whiteLightColor.type,
    },
    { tag: [t.url, t.escape, t.regexp, t.link], color: whiteLightColor.regexp },
    { tag: [t.meta, t.comment], color: whiteLightColor.comment },
    { tag: t.tagName, color: whiteLightColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: whiteLightColor.heading },
    {
      tag: [t.atom, t.special(t.variableName)],
      color: whiteLightColor.variable,
    },
    { tag: t.invalid, color: whiteLightColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
      tag: [t.operatorKeyword, t.bool, t.null, t.variableName],
      color: whiteLightColor.constant,
    },
    { tag: [t.operator], color: "#0431fa" },
    { tag: [t.number], color: "#a8a8b1" },
    { tag: [t.bracket], color: "#0431fa" },
  ],
});

// vscode
maps.set(Themes.vscode, {
  default: {
    background: "#1e1e1e",
    foreground: "#9cdcfe",
    caret: "#c6c6c6",
    selection: "#6199ff2f",
    selectionMatch: "#72a1ff59",
    lineHighlight: "#ffffff0f",
    gutterBackground: "#1e1e1e",
    gutterForeground: "#838383",
    gutterActiveForeground: "#fff",
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
  },
  styles: [
    {
      tag: [
        t.keyword,
        t.operatorKeyword,
        t.modifier,
        t.color,
        t.constant(t.name),
        t.standard(t.name),
        t.standard(t.tagName),
        t.special(t.brace),
        t.atom,
        t.bool,
        t.special(t.variableName),
      ],
      color: "#569cd6",
    },
    {
      tag: [t.controlKeyword, t.moduleKeyword],
      color: "#c586c0",
    },
    {
      tag: [
        t.name,
        t.deleted,
        t.character,
        t.macroName,
        t.propertyName,
        t.variableName,
        t.labelName,
        t.definition(t.name),
      ],
      color: "#9cdcfe",
    },
    { tag: t.heading, fontWeight: "bold", color: "#9cdcfe" },
    {
      tag: [
        t.typeName,
        t.className,
        t.tagName,
        t.number,
        t.changed,
        t.annotation,
        t.self,
        t.namespace,
      ],
      color: "#4ec9b0",
    },
    {
      tag: [t.function(t.variableName), t.function(t.propertyName)],
      color: "#dcdcaa",
    },
    { tag: [t.number], color: "#b5cea8" },
    {
      tag: [t.operator, t.punctuation, t.separator, t.url, t.escape, t.regexp],
      color: "#d4d4d4",
    },
    {
      tag: [t.regexp],
      color: "#d16969",
    },
    {
      tag: [t.special(t.string), t.processingInstruction, t.string, t.inserted],
      color: "#ce9178",
    },
    { tag: [t.angleBracket], color: "#808080" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: [t.meta, t.comment], color: "#6a9955" },
    { tag: t.link, color: "#6a9955", textDecoration: "underline" },
    { tag: t.invalid, color: "#ff0000" },
  ],
});

// tomorrowNightBlue
maps.set(Themes.tomorrowNightBlue, {
  default: {
    background: tomorrowNightBlueColor.background,
    foreground: tomorrowNightBlueColor.foreground,
    caret: tomorrowNightBlueColor.cursor,
    selection: tomorrowNightBlueColor.selection,
    selectionMatch: tomorrowNightBlueColor.selection,
    gutterBackground: tomorrowNightBlueColor.background,
    gutterForeground: tomorrowNightBlueColor.foreground,
    lineHighlight: tomorrowNightBlueColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: tomorrowNightBlueColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: tomorrowNightBlueColor.variable,
    },
    { tag: [t.propertyName], color: tomorrowNightBlueColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: tomorrowNightBlueColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: tomorrowNightBlueColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: tomorrowNightBlueColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: tomorrowNightBlueColor.variable,
    },
    { tag: [t.className], color: tomorrowNightBlueColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: tomorrowNightBlueColor.number,
    },
    {
      tag: [t.typeName],
      color: tomorrowNightBlueColor.type,
      fontStyle: tomorrowNightBlueColor.type,
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: tomorrowNightBlueColor.keyword,
    },
    {
      tag: [t.url, t.escape, t.regexp, t.link],
      color: tomorrowNightBlueColor.regexp,
    },
    { tag: [t.meta, t.comment], color: tomorrowNightBlueColor.comment },
    { tag: t.tagName, color: tomorrowNightBlueColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    {
      tag: t.heading,
      fontWeight: "bold",
      color: tomorrowNightBlueColor.heading,
    },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: tomorrowNightBlueColor.variable,
    },
    { tag: t.invalid, color: tomorrowNightBlueColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// tokyoNightStorm
maps.set(Themes.tokyoNightStorm, {
  default: {
    background: "#24283b",
    foreground: "#7982a9",
    caret: "#c0caf5",
    selection: "#6f7bb630",
    selectionMatch: "#343b5f",
    gutterBackground: "#24283b",
    gutterForeground: "#7982a9",
    gutterBorder: "transparent",
    lineHighlight: "#292e427a",
  },
  styles: [
    { tag: t.keyword, color: "#bb9af7" },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: "#c0caf5" },
    { tag: [t.propertyName], color: "#7aa2f7" },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: "#9ece6a",
    },
    { tag: [t.function(t.variableName), t.labelName], color: "#7aa2f7" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#bb9af7",
    },
    { tag: [t.definition(t.name), t.separator], color: "#c0caf5" },
    { tag: [t.className], color: "#c0caf5" },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#ff9e64",
    },
    { tag: [t.typeName], color: "#2ac3de", fontStyle: "#2ac3de" },
    { tag: [t.operator, t.operatorKeyword], color: "#bb9af7" },
    { tag: [t.url, t.escape, t.regexp, t.link], color: "#b4f9f8" },
    { tag: [t.meta, t.comment], color: "#565f89" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: "#89ddff" },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#c0caf5" },
    { tag: t.invalid, color: "#ff5370" },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// tokyoNightDay
maps.set(Themes.tokyoNightDay, {
  default: {
    background: "#e1e2e7",
    foreground: "#3760bf",
    caret: "#3760bf",
    selection: "#99a7df",
    selectionMatch: "#99a7df",
    gutterBackground: "#e1e2e7",
    gutterForeground: "#3760bf",
    gutterBorder: "transparent",
    lineHighlight: "#5f5faf11",
  },
  styles: [
    { tag: t.keyword, color: "#007197" },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: "#3760bf" },
    { tag: [t.propertyName], color: "#3760bf" },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: "#587539",
    },
    { tag: [t.function(t.variableName), t.labelName], color: "#3760bf" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#3760bf",
    },
    { tag: [t.definition(t.name), t.separator], color: "#3760bf" },
    { tag: [t.className], color: "#3760bf" },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#b15c00",
    },
    { tag: [t.typeName], color: "#007197", fontStyle: "#007197" },
    { tag: [t.operator, t.operatorKeyword], color: "#007197" },
    { tag: [t.url, t.escape, t.regexp, t.link], color: "#587539" },
    { tag: [t.meta, t.comment], color: "#848cb5" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: "#b15c00" },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#3760bf" },
    { tag: t.invalid, color: "#f52a65" },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

//sublime
maps.set(Themes.sublime, {
  default: {
    background: "#303841",
    foreground: "#FFFFFF",
    caret: "#FBAC52",
    selection: "#4C5964",
    selectionMatch: "#3A546E",
    gutterBackground: "#303841",
    gutterForeground: "#FFFFFF70",
    lineHighlight: "#00000059",
  },
  styles: [
    { tag: [t.meta, t.comment], color: "#A2A9B5" },
    { tag: [t.attributeName, t.keyword], color: "#B78FBA" },
    { tag: t.function(t.variableName), color: "#5AB0B0" },
    { tag: [t.string, t.regexp, t.attributeValue], color: "#99C592" },
    { tag: t.operator, color: "#f47954" },
    // { tag: t.moduleKeyword, color: 'red' },
    { tag: [t.tagName, t.modifier], color: "#E35F63" },
    {
      tag: [
        t.number,
        t.definition(t.tagName),
        t.className,
        t.definition(t.variableName),
      ],
      color: "#fbac52",
    },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#E35F63" },
    { tag: t.variableName, color: "#539ac4" },
    { tag: [t.propertyName, t.typeName], color: "#629ccd" },
    { tag: t.propertyName, color: "#36b7b5" },
  ],
});

// solarizedDark
maps.set(Themes.solarizedDark, {
  default: {
    background: solarizedDarktColor.background,
    foreground: solarizedDarktColor.foreground,
    caret: solarizedDarktColor.cursor,
    selection: solarizedDarktColor.selection,
    selectionMatch: solarizedDarktColor.selection,
    gutterBackground: solarizedDarktColor.background,
    gutterForeground: solarizedDarktColor.foreground,
    gutterBorder: "transparent",
    lineHighlight: solarizedDarktColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: solarizedDarktColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: solarizedDarktColor.variable,
    },
    { tag: [t.propertyName], color: solarizedDarktColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: solarizedDarktColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: solarizedDarktColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: solarizedDarktColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: solarizedDarktColor.variable,
    },
    { tag: [t.className], color: solarizedDarktColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: solarizedDarktColor.number,
    },
    {
      tag: [t.typeName],
      color: solarizedDarktColor.type,
      fontStyle: solarizedDarktColor.type,
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: solarizedDarktColor.keyword,
    },
    {
      tag: [t.url, t.escape, t.regexp, t.link],
      color: solarizedDarktColor.regexp,
    },
    { tag: [t.meta, t.comment], color: solarizedDarktColor.comment },
    { tag: t.tagName, color: solarizedDarktColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: solarizedDarktColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: solarizedDarktColor.variable,
    },
    { tag: t.invalid, color: solarizedDarktColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// solarizedLight
maps.set(Themes.solarizedLight, {
  default: {
    background: solarizedLightColor.background,
    foreground: solarizedLightColor.foreground,
    caret: solarizedLightColor.cursor,
    selection: solarizedLightColor.selection,
    selectionMatch: solarizedLightColor.selectionMatch,
    gutterBackground: solarizedLightColor.background,
    gutterForeground: solarizedLightColor.foreground,
    gutterBorder: "transparent",
    lineHighlight: solarizedLightColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: solarizedLightColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: solarizedLightColor.variable,
    },
    { tag: [t.propertyName], color: solarizedLightColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: solarizedLightColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: solarizedLightColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: solarizedLightColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: solarizedLightColor.variable,
    },
    { tag: [t.className], color: solarizedLightColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: solarizedLightColor.number,
    },
    {
      tag: [t.typeName],
      color: solarizedLightColor.type,
      fontStyle: solarizedLightColor.type,
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: solarizedLightColor.keyword,
    },
    {
      tag: [t.url, t.escape, t.regexp, t.link],
      color: solarizedLightColor.regexp,
    },
    { tag: [t.meta, t.comment], color: solarizedLightColor.comment },
    { tag: t.tagName, color: solarizedLightColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: solarizedLightColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: solarizedLightColor.variable,
    },
    { tag: t.invalid, color: solarizedLightColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// red
maps.set(Themes.red, {
  default: {
    background: redColor.background,
    foreground: redColor.foreground,
    caret: redColor.cursor,
    selection: redColor.selection,
    selectionMatch: redColor.selection,
    gutterBackground: redColor.background,
    gutterForeground: redColor.foreground,
    lineHighlight: redColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: redColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: redColor.variable,
    },
    { tag: [t.propertyName], color: redColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: redColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: redColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: redColor.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: redColor.variable },
    { tag: [t.className], color: redColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: redColor.number,
    },
    { tag: [t.typeName], color: redColor.type, fontStyle: redColor.type },
    { tag: [t.operator, t.operatorKeyword], color: redColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: redColor.regexp },
    { tag: [t.meta, t.comment], color: redColor.comment },
    { tag: t.tagName, color: redColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: redColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: redColor.variable,
    },
    { tag: t.invalid, color: redColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// tokyoNight
maps.set(Themes.tokyoNight, {
  default: {
    background: "#1a1b26",
    foreground: "#787c99",
    caret: "#c0caf5",
    selection: "#515c7e40",
    selectionMatch: "#16161e",
    gutterBackground: "#1a1b26",
    gutterForeground: "#787c99",
    gutterBorder: "transparent",
    lineHighlight: "#474b6611",
  },
  styles: [
    { tag: t.keyword, color: "#bb9af7" },
    { tag: [t.name, t.deleted, t.character, t.macroName], color: "#c0caf5" },
    { tag: [t.propertyName], color: "#7aa2f7" },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: "#9ece6a",
    },
    { tag: [t.function(t.variableName), t.labelName], color: "#7aa2f7" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#bb9af7",
    },
    { tag: [t.definition(t.name), t.separator], color: "#c0caf5" },
    { tag: [t.className], color: "#c0caf5" },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#ff9e64",
    },
    { tag: [t.typeName], color: "#0db9d7" },
    { tag: [t.operator, t.operatorKeyword], color: "#bb9af7" },
    { tag: [t.url, t.escape, t.regexp, t.link], color: "#b4f9f8" },
    { tag: [t.meta, t.comment], color: "#444b6a" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: "#89ddff" },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#c0caf5" },
    { tag: t.invalid, color: "#ff5370" },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// quietlight
maps.set(Themes.quietlight, {
  default: {
    background: quietlightColor.background,
    foreground: quietlightColor.foreground,
    caret: quietlightColor.cursor,
    selection: quietlightColor.selection,
    selectionMatch: quietlightColor.selection,
    gutterBackground: quietlightColor.background,
    gutterForeground: quietlightColor.foreground,
    gutterBorder: "transparent",
    lineHighlight: quietlightColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: quietlightColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: quietlightColor.variable,
    },
    { tag: [t.propertyName], color: quietlightColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: quietlightColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: quietlightColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: quietlightColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: quietlightColor.variable,
    },
    { tag: [t.className], color: quietlightColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: quietlightColor.number,
    },
    {
      tag: [t.typeName],
      color: quietlightColor.type,
      fontStyle: quietlightColor.type,
    },
    { tag: [t.operator, t.operatorKeyword], color: quietlightColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: quietlightColor.regexp },
    { tag: [t.meta, t.comment], color: quietlightColor.comment },
    { tag: t.tagName, color: quietlightColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: quietlightColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: quietlightColor.variable,
    },
    { tag: t.invalid, color: quietlightColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// okaidia
maps.set(Themes.okaidia, {
  default: {
    background: "#272822",
    foreground: "#FFFFFF",
    caret: "#FFFFFF",
    selection: "#49483E",
    selectionMatch: "#49483E",
    gutterBackground: "#272822",
    gutterForeground: "#FFFFFF70",
    lineHighlight: "#0000003b",
  },
  styles: [
    { tag: [t.comment, t.documentMeta], color: "#8292a2" },
    { tag: [t.number, t.bool, t.null, t.atom], color: "#ae81ff" },
    { tag: [t.attributeValue, t.className, t.name], color: "#e6db74" },
    {
      tag: [t.propertyName, t.attributeName],
      color: "#a6e22e",
    },
    {
      tag: [t.variableName],
      color: "#9effff",
    },
    {
      tag: [t.squareBracket],
      color: "#bababa",
    },
    {
      tag: [t.string, t.special(t.brace)],
      color: "#e6db74",
    },
    {
      tag: [t.regexp, t.className, t.typeName, t.definition(t.typeName)],
      color: "#66d9ef",
    },
    {
      tag: [
        t.definition(t.variableName),
        t.definition(t.propertyName),
        t.function(t.variableName),
      ],
      color: "#fd971f",
    },
    // { tag: t.keyword, color: '#f92672' },
    {
      tag: [
        t.keyword,
        t.definitionKeyword,
        t.modifier,
        t.tagName,
        t.angleBracket,
      ],
      color: "#f92672",
    },
  ],
});

// nord
maps.set(Themes.nord, {
  default: {
    background: "#2e3440",
    foreground: "#FFFFFF",
    caret: "#FFFFFF",
    selection: "#4b556a",
    selectionMatch: "#4b556a",
    gutterBackground: "#2e3440",
    gutterForeground: "#4c566a",
    gutterActiveForeground: "#d8dee9",
    lineHighlight: "#4c566a29",
  },
  styles: [
    { tag: t.keyword, color: "#5e81ac" },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: "#88c0d0",
    },
    { tag: [t.variableName], color: "#8fbcbb" },
    { tag: [t.function(t.variableName)], color: "#8fbcbb" },
    { tag: [t.labelName], color: "#81a1c1" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#5e81ac",
    },
    { tag: [t.definition(t.name), t.separator], color: "#a3be8c" },
    { tag: [t.brace], color: "#8fbcbb" },
    {
      tag: [t.annotation],
      color: "#d30102",
    },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#b48ead",
    },
    {
      tag: [t.typeName, t.className],
      color: "#ebcb8b",
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: "#a3be8c",
    },
    {
      tag: [t.tagName],
      color: "#b48ead",
    },
    {
      tag: [t.squareBracket],
      color: "#bf616a",
    },
    {
      tag: [t.angleBracket],
      color: "#d08770",
    },
    {
      tag: [t.attributeName],
      color: "#ebcb8b",
    },
    {
      tag: [t.regexp],
      color: "#5e81ac",
    },
    {
      tag: [t.quote],
      color: "#b48ead",
    },
    { tag: [t.string], color: "#a3be8c" },
    {
      tag: t.link,
      color: "#a3be8c",
      textDecoration: "underline",
      textUnderlinePosition: "under",
    },
    {
      tag: [t.url, t.escape, t.special(t.string)],
      color: "#8fbcbb",
    },
    { tag: [t.meta], color: "#88c0d0" },
    { tag: [t.monospace], color: "#d8dee9", fontStyle: "italic" },
    { tag: [t.comment], color: "#4c566a", fontStyle: "italic" },
    { tag: t.strong, fontWeight: "bold", color: "#5e81ac" },
    { tag: t.emphasis, fontStyle: "italic", color: "#5e81ac" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.heading, fontWeight: "bold", color: "#5e81ac" },
    { tag: t.special(t.heading1), fontWeight: "bold", color: "#5e81ac" },
    { tag: t.heading1, fontWeight: "bold", color: "#5e81ac" },
    {
      tag: [t.heading2, t.heading3, t.heading4],
      fontWeight: "bold",
      color: "#5e81ac",
    },
    {
      tag: [t.heading5, t.heading6],
      color: "#5e81ac",
    },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#d08770" },
    {
      tag: [t.processingInstruction, t.inserted],
      color: "#8fbcbb",
    },
    {
      tag: [t.contentSeparator],
      color: "#ebcb8b",
    },
    { tag: t.invalid, color: "#434c5e", borderBottom: `1px dotted #d30102` },
  ],
});

// noctisLilac
maps.set(Themes.noctisLilac, {
  default: {
    background: "#f2f1f8",
    foreground: "#0c006b",
    caret: "#5c49e9",
    selection: "#d5d1f2",
    selectionMatch: "#d5d1f2",
    gutterBackground: "#f2f1f8",
    gutterForeground: "#0c006b70",
    lineHighlight: "#16067911",
  },
  styles: [
    {
      tag: t.comment,
      color: "#9995b7",
    },
    {
      tag: t.keyword,
      color: "#ff5792",
      fontWeight: "bold",
    },
    {
      tag: [t.definitionKeyword, t.modifier],
      color: "#ff5792",
    },
    {
      tag: [t.className, t.tagName, t.definition(t.typeName)],
      color: "#0094f0",
    },
    {
      tag: [t.number, t.bool, t.null, t.special(t.brace)],
      color: "#5842ff",
    },
    {
      tag: [t.definition(t.propertyName), t.function(t.variableName)],
      color: "#0095a8",
    },
    {
      tag: t.typeName,
      color: "#b3694d",
    },
    {
      tag: [t.propertyName, t.variableName],
      color: "#fa8900",
    },
    {
      tag: t.operator,
      color: "#ff5792",
    },
    {
      tag: t.self,
      color: "#e64100",
    },
    {
      tag: [t.string, t.regexp],
      color: "#00b368",
    },
    {
      tag: [t.paren, t.bracket],
      color: "#0431fa",
    },
    {
      tag: t.labelName,
      color: "#00bdd6",
    },
    {
      tag: t.attributeName,
      color: "#e64100",
    },
    {
      tag: t.angleBracket,
      color: "#9995b7",
    },
  ],
});

// monokaiDimmed
maps.set(Themes.monokaiDimmed, {
  default: {
    background: monokaiDimmedColor.background,
    foreground: monokaiDimmedColor.foreground,
    caret: monokaiDimmedColor.cursor,
    selection: monokaiDimmedColor.selection,
    selectionMatch: monokaiDimmedColor.selection,
    gutterBackground: monokaiDimmedColor.background,
    gutterForeground: monokaiDimmedColor.foreground,
    lineHighlight: monokaiDimmedColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: monokaiDimmedColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: monokaiDimmedColor.variable,
    },
    { tag: [t.propertyName], color: monokaiDimmedColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: monokaiDimmedColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: monokaiDimmedColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: monokaiDimmedColor.constant,
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: monokaiDimmedColor.variable,
    },
    { tag: [t.className], color: monokaiDimmedColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: monokaiDimmedColor.number,
    },
    {
      tag: [t.typeName],
      color: monokaiDimmedColor.type,
      fontStyle: monokaiDimmedColor.type,
    },
    { tag: [t.operator, t.operatorKeyword], color: monokaiDimmedColor.keyword },
    {
      tag: [t.url, t.escape, t.regexp, t.link],
      color: monokaiDimmedColor.regexp,
    },
    { tag: [t.meta, t.comment], color: monokaiDimmedColor.comment },
    { tag: t.tagName, color: monokaiDimmedColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: monokaiDimmedColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: monokaiDimmedColor.variable,
    },
    { tag: t.invalid, color: monokaiDimmedColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// material
maps.set(Themes.material, {
  default: {
    background: "#2e3235",
    foreground: "#bdbdbd",
    caret: "#a0a4ae",
    selection: "#d7d4f063",
    selectionMatch: "#d7d4f063",
    gutterBackground: "#2e3235",
    gutterForeground: "#999",
    gutterActiveForeground: "#4f5b66",
    lineHighlight: "#545b6130",
  },
  styles: [
    { tag: t.keyword, color: "#cf6edf" },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: "#56c8d8",
    },
    { tag: [t.propertyName], color: "#facf4e" },
    { tag: [t.variableName], color: "#bdbdbd" },
    { tag: [t.function(t.variableName)], color: "#56c8d8" },
    { tag: [t.labelName], color: "#cf6edf" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#facf4e",
    },
    { tag: [t.definition(t.name), t.separator], color: "#fa5788" },
    { tag: [t.brace], color: "#cf6edf" },
    {
      tag: [t.annotation],
      color: "#ff5f52",
    },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#ffad42",
    },
    {
      tag: [t.typeName, t.className],
      color: "#ffad42",
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: "#7186f0",
    },
    {
      tag: [t.tagName],
      color: "#99d066",
    },
    {
      tag: [t.squareBracket],
      color: "#ff5f52",
    },
    {
      tag: [t.angleBracket],
      color: "#606f7a",
    },
    {
      tag: [t.attributeName],
      color: "#bdbdbd",
    },
    {
      tag: [t.regexp],
      color: "#ff5f52",
    },
    {
      tag: [t.quote],
      color: "#6abf69",
    },
    { tag: [t.string], color: "#99d066" },
    {
      tag: t.link,
      color: "#56c8d8",
      textDecoration: "underline",
      textUnderlinePosition: "under",
    },
    {
      tag: [t.url, t.escape, t.special(t.string)],
      color: "#facf4e",
    },
    { tag: [t.meta], color: "#707d8b" },
    { tag: [t.comment], color: "#707d8b", fontStyle: "italic" },
    { tag: t.monospace, color: "#bdbdbd" },
    { tag: t.strong, fontWeight: "bold", color: "#ff5f52" },
    { tag: t.emphasis, fontStyle: "italic", color: "#99d066" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.heading, fontWeight: "bold", color: "#facf4e" },
    { tag: t.heading1, fontWeight: "bold", color: "#facf4e" },
    {
      tag: [t.heading2, t.heading3, t.heading4],
      fontWeight: "bold",
      color: "#facf4e",
    },
    {
      tag: [t.heading5, t.heading6],
      color: "#facf4e",
    },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#56c8d8" },
    {
      tag: [t.processingInstruction, t.inserted],
      color: "#ff5f52",
    },
    {
      tag: [t.contentSeparator],
      color: "#56c8d8",
    },
    { tag: t.invalid, color: "#606f7a", borderBottom: `1px dotted #ff5f52` },
  ],
});

maps.set(Themes.kimbie, {
  default: {
    background: kimbieColor.background,
    foreground: kimbieColor.foreground,
    caret: kimbieColor.cursor,
    selection: kimbieColor.selection,
    selectionMatch: kimbieColor.selection,
    gutterBackground: kimbieColor.background,
    gutterForeground: kimbieColor.foreground,
    lineHighlight: kimbieColor.activeLine,
  },
  styles: [
    { tag: t.keyword, color: kimbieColor.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: kimbieColor.variable,
    },
    { tag: [t.propertyName], color: kimbieColor.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: kimbieColor.string,
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: kimbieColor.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: kimbieColor.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: kimbieColor.variable },
    { tag: [t.className], color: kimbieColor.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: kimbieColor.number,
    },
    { tag: [t.typeName], color: kimbieColor.type, fontStyle: kimbieColor.type },
    { tag: [t.operator, t.operatorKeyword], color: kimbieColor.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: kimbieColor.regexp },
    { tag: [t.meta, t.comment], color: kimbieColor.comment },
    { tag: t.tagName, color: kimbieColor.tag },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: kimbieColor.heading },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: kimbieColor.variable,
    },
    { tag: t.invalid, color: kimbieColor.invalid },
    { tag: t.strikethrough, textDecoration: "line-through" },
  ],
});

// gruvbox
maps.set(Themes.gruvbox, {
  default: {
    background: "#282828",
    foreground: "#ebdbb2",
    caret: "#ebdbb2",
    selection: "#b99d555c",
    selectionMatch: "#b99d555c",
    lineHighlight: "#baa1602b",
    gutterBackground: "#282828",
    gutterForeground: "#7c6f64",
  },
  styles: [
    { tag: t.keyword, color: "#fb4934" },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: "#8ec07c",
    },
    { tag: [t.variableName], color: "#83a598" },
    {
      tag: [t.function(t.variableName)],
      color: "#b8bb26",
      fontStyle: "bold",
    },
    { tag: [t.labelName], color: "#ebdbb2" },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: "#d3869b",
    },
    { tag: [t.definition(t.name), t.separator], color: "#ebdbb2" },
    { tag: [t.brace], color: "#ebdbb2" },
    {
      tag: [t.annotation],
      color: "#fb4934d",
    },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: "#d3869b",
    },
    {
      tag: [t.typeName, t.className],
      color: "#fabd2f",
    },
    {
      tag: [t.operator, t.operatorKeyword],
      color: "#fb4934",
    },
    {
      tag: [t.tagName],
      color: "#8ec07c",
      fontStyle: "bold",
    },
    {
      tag: [t.squareBracket],
      color: "#fe8019",
    },
    {
      tag: [t.angleBracket],
      color: "#83a598",
    },
    {
      tag: [t.attributeName],
      color: "#8ec07c",
    },
    {
      tag: [t.regexp],
      color: "#8ec07c",
    },
    {
      tag: [t.quote],
      color: "#928374",
    },
    { tag: [t.string], color: "#ebdbb2" },
    {
      tag: t.link,
      color: "#a89984",
      textDecoration: "underline",
      textUnderlinePosition: "under",
    },
    {
      tag: [t.url, t.escape, t.special(t.string)],
      color: "#d3869b",
    },
    { tag: [t.meta], color: "#fabd2f" },
    { tag: [t.comment], color: "#928374", fontStyle: "italic" },
    { tag: t.strong, fontWeight: "bold", color: "#fe8019" },
    { tag: t.emphasis, fontStyle: "italic", color: "#b8bb26" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.heading, fontWeight: "bold", color: "#b8bb26" },
    { tag: [t.heading1, t.heading2], fontWeight: "bold", color: "#b8bb26" },
    {
      tag: [t.heading3, t.heading4],
      fontWeight: "bold",
      color: "#fabd2f",
    },
    {
      tag: [t.heading5, t.heading6],
      color: "#fabd2f",
    },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#d3869b" },
    {
      tag: [t.processingInstruction, t.inserted],
      color: "#83a598",
    },
    {
      tag: [t.contentSeparator],
      color: "#fb4934",
    },
    { tag: t.invalid, color: "#fe8019", borderBottom: `1px dotted #fb4934d` },
  ],
});

// github
maps.set(Themes.github, {
  default: {
    background: "#fff",
    foreground: "#24292e",
    selection: "#BBDFFF",
    selectionMatch: "#BBDFFF",
    gutterBackground: "#fff",
    gutterForeground: "#6e7781",
  },
  styles: [
    { tag: [t.standard(t.tagName), t.tagName], color: "#116329" },
    { tag: [t.comment, t.bracket], color: "#6a737d" },
    { tag: [t.className, t.propertyName], color: "#6f42c1" },
    {
      tag: [t.variableName, t.attributeName, t.number, t.operator],
      color: "#005cc5",
    },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
      color: "#d73a49",
    },
    { tag: [t.string, t.meta, t.regexp], color: "#032f62" },
    { tag: [t.name, t.quote], color: "#22863a" },
    { tag: [t.heading, t.strong], color: "#24292e", fontWeight: "bold" },
    { tag: [t.emphasis], color: "#24292e", fontStyle: "italic" },
    { tag: [t.deleted], color: "#b31d28", backgroundColor: "ffeef0" },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#e36209" },
    { tag: [t.url, t.escape, t.regexp, t.link], color: "#032f62" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.invalid, color: "#cb2431" },
  ],
});

// eclipse
maps.set(Themes.eclipse, {
  default: {
    background: "#fff",
    foreground: "#000",
    caret: "#FFFFFF",
    selection: "#d7d4f0",
    selectionMatch: "#d7d4f0",
    gutterBackground: "#f7f7f7",
    gutterForeground: "#999",
    lineHighlight: "#006fff1c",
    gutterBorder: "transparent",
  },
  styles: [
    { tag: [t.comment], color: "#3F7F5F" },
    { tag: [t.documentMeta], color: "#FF1717" },
    { tag: t.keyword, color: "#7F0055", fontWeight: "bold" },
    { tag: t.atom, color: "#00f" },
    { tag: t.number, color: "#164" },
    { tag: t.propertyName, color: "#164" },
    { tag: [t.variableName, t.definition(t.variableName)], color: "#0000C0" },
    { tag: t.function(t.variableName), color: "#0000C0" },
    { tag: t.string, color: "#2A00FF" },
    { tag: t.operator, color: "black" },
    { tag: t.tagName, color: "#170" },
    { tag: t.attributeName, color: "#00c" },
    { tag: t.link, color: "#219" },
  ],
});

// duotone
maps.set(Themes.duotone, {
  default: {
    background: "#2a2734",
    foreground: "#6c6783",
    caret: "#ffad5c",
    selection: "#91ff6c26",
    selectionMatch: "#91ff6c26",
    gutterBackground: "#2a2734",
    gutterForeground: "#545167",
    lineHighlight: "#36334280",
  },
  styles: [
    { tag: [t.comment, t.bracket], color: "#6c6783" },
    {
      tag: [t.atom, t.number, t.keyword, t.link, t.attributeName, t.quote],
      color: "#ffcc99",
    },
    {
      tag: [
        t.emphasis,
        t.heading,
        t.tagName,
        t.propertyName,
        t.className,
        t.variableName,
      ],
      color: "#eeebff",
    },
    { tag: [t.typeName, t.url], color: "#7a63ee" },
    { tag: t.operator, color: "#ffad5c" },
    { tag: t.string, color: "#ffb870" },
    { tag: [t.propertyName], color: "#9a86fd" },
    { tag: [t.unit, t.punctuation], color: "#e09142" },
  ],
});

export default maps;
