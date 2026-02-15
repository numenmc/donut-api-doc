<script lang="ts">
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "@sveltestrap/sveltestrap";
  import type { Field, Schema, TypeRef } from "../type/schemaType";
  import SchemaRenderer from "./SchemaRenderer.svelte";
  import TreeViewNode from "./TreeViewNode.svelte";

  export let schema: Schema;
  let open = false;

  const tabWidth = 4;

  function pad(depth: number) {
    return " ".repeat(tabWidth * depth);
  }

  function typeRefToLine(typeRef: TypeRef, depth = 0): string {
    switch (typeRef.kind) {
      case "static":
        return JSON.stringify(typeRef.value);

      case "primitive":
        return typeRef.name === "uuid"
          ? "`${string}-${string}-${string}-${string}-${string}`"
          : typeRef.name;

      case "record":
        return `Record<${typeRefToLine(typeRef.key, depth)}, ${typeRefToLine(typeRef.value, depth)}>`;

      case "union":
        return typeRef.values.map((v) => JSON.stringify(v)).join(" | ");

      case "array": {
        const inner = typeRefToLine(typeRef.of, depth);
        return typeRef.of.kind === "union" ? `(${inner})[]` : `${inner}[]`;
      }

      case "object": {
        if (!typeRef.schema.fields.length) return "{}";

        const inner = typeRef.schema.fields
          .map((f) => fieldToLine(f, depth + 1))
          .join("\n");

        return `{\n${inner}\n${pad(depth)}}`;
      }
    }
  }

  function safePropKey(name: string): string {
    return /^[$A-Z_][0-9A-Z_$]*$/i.test(name) ? name : JSON.stringify(name);
  }

  function fieldToLine(field: Field, depth: number): string {
    const p = pad(depth);
    const opt = field.required === false ? "?" : "";
    const name = safePropKey(field.name);
    const type = typeRefToLine(field.type, depth);

    const lines: string[] = [];

    if (field.description?.trim()) {
      const safe = field.description.replace(/\*\//g, "*\\/");
      lines.push(`${p}/** ${safe} */`);
    }

    lines.push(`${p}${name}${opt}: ${type};`);

    return lines.join("\n");
  }
</script>

<Modal
  isOpen={open}
  toggle={() => (open = !open)}
  class="modal-dialog-centered"
  size="lg"
>
  <ModalHeader>Generated TypeScript declaration</ModalHeader>
  <ModalBody>
    <pre
      class="cb p-3"
      style="max-height: 500px; overflow: auto;">interface {schema.name ??
        "Typings"} {typeRefToLine({
        kind: "object",
        schema,
      })}</pre>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" on:click={() => (open = false)}>Close</Button>
  </ModalFooter>
</Modal>

<div class="cb p-2 mt-2" style="position: relative;">
  <Button
    style="position: absolute; top: 4px; right: 4px; z-index: 10;"
    size="sm"
    on:click={() => (open = true)}
  >
    Generate .d.ts
  </Button>
  <ul class="tv-nested tv-root">
    <TreeViewNode title={schema.name ?? "$root"}>
      {#each schema.fields as i (i.name)}
        <SchemaRenderer field={i} />
      {/each}
    </TreeViewNode>
  </ul>
</div>
