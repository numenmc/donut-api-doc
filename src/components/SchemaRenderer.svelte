<script lang="ts">
  import type { Field, TypeRef, Schema } from "../type/schemaType";

  import TreeViewNode from "./TreeViewNode.svelte";
  import SchemaRenderer from "./SchemaRenderer.svelte";

  export let field: Field;

  // ------------------------------
  // Syntax highlighting colors
  // ------------------------------
  const HL = {
    identifier: "#d4d4d4",
    optional: "#c586c0",
    punctuation: "#808080",
    type: "#4ec9b0",
    string: "#ce9178",
    number: "#b5cea8",
    keyword: "#569cd6",
  } as const;

  function isRequired(f: Field) {
    return f.required !== false;
  }

  function escapeHtml(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function span(color: string, text: string): string {
    return `<span style="color:${color}">${escapeHtml(text)}</span>`;
  }

  function typeHtml(t: TypeRef): string {
    switch (t.kind) {
      case "primitive":
        return span(HL.type, t.name);

      case "object":
        return span(HL.type, "object");

      case "array":
        // Render nested type then "[]"
        return `${typeHtml(t.of)}${span(HL.punctuation, "[]")}`;

      case "union": {
        // Render: "a" | "b" | 1 | 2
        return t.values
          .map((v) => {
            if (typeof v === "number") return span(HL.number, String(v));
            return `${span(HL.string, `"${v}"`)}`;
          })
          .join(` ${span(HL.punctuation, "|")} `);
      }

      case "record": {
        const kw = span(HL.keyword, "Record");
        const lt = span(HL.punctuation, "<");
        const comma = span(HL.punctuation, ",");
        const gt = span(HL.punctuation, ">");
        return `${kw}${lt}${typeHtml(t.key)}${comma} ${typeHtml(t.value)}${gt}`;
      }

      case "static": {
        if (typeof t.value === "number") {
          return span(HL.number, String(t.value));
        }

        return span(HL.string, `"${t.value}"`);
      }
    }
  }

  function titleHtml(field: Field, withSemicolon: boolean): string {
    const name = span(HL.identifier, field.name);
    const opt = isRequired(field) ? "" : span(HL.optional, "?");
    const colon = span(HL.punctuation, ":");
    const semi = withSemicolon ? span(HL.punctuation, ";") : "";

    return `${name}${opt}${colon} ${typeHtml(field.type)}${semi}`;
  }

  function unwrapArrayToObject(t: TypeRef): Schema | null {
    if (t.kind === "object") return t.schema;
    if (t.kind === "array") return unwrapArrayToObject(t.of);
    return null;
  }

  $: childSchema = unwrapArrayToObject(field.type);
  $: titleWithChildren = titleHtml(field, false);
  $: titleLeaf = titleHtml(field, true);
</script>

{#if childSchema}
  <TreeViewNode
    title={titleWithChildren}
    comment={field.description ?? ""}
    unstable={field.unstable}
  >
    {#each childSchema.fields as child (child.name)}
      <SchemaRenderer field={child} />
    {/each}
  </TreeViewNode>
{:else}
  <TreeViewNode
    title={titleLeaf}
    comment={field.description ?? ""}
    unstable={field.unstable}
  />
{/if}
