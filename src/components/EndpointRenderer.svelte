<script lang="ts">
  import { Badge, Button, TabContent, TabPane } from "@sveltestrap/sveltestrap";
  import { URLParameter, type Endpoint } from "../type/specificationType";
  import { CheckLg, Copy } from "svelte-bootstrap-icons";
  import { getMethodColor, removeTrailingSlash } from "../util";
  import { specification } from "../specification/specification";
  import SchemaFormatter from "./SchemaFormatter.svelte";

  export let endpoint: Endpoint;

  let copied = false;
  let timeoutId: number;

  function copyToClipboard() {
    copied = true;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      copied = false;
    }, 3000);

    navigator.clipboard.writeText(
      removeTrailingSlash(specification.baseUrl) +
        "/" +
        endpoint.endpoint
          .map((i) => (i instanceof URLParameter ? `{${i.name}}` : i))
          .join("/"),
    );
  }
</script>

<div class="p-3 border rounded">
  <h2 class="d-flex gap-2">
    <div style="font-size: 0.8em;">
      <Badge color={getMethodColor(endpoint)}>{endpoint.method}</Badge>
    </div>

    <span>/</span>
    {#each endpoint.endpoint as segment, i}
      {#if segment instanceof URLParameter}
        <span class="param">&#123;{segment.name}&#125;</span>
      {:else}
        <span>{segment}</span>
      {/if}

      {#if i < endpoint.endpoint.length - 1}
        <span>/</span>
      {/if}
    {/each}

    <div style="flex: 1;"></div>

    <Button color={getMethodColor(endpoint)} on:click={copyToClipboard}>
      {#if copied}
        <CheckLg></CheckLg>
      {:else}
        <Copy></Copy>
      {/if}
    </Button>
  </h2>

  <p class="lead mb-0">{endpoint.description}</p>
  {#if endpoint.remarks.length > 0}
    <ul class="doc-pf">
      {#each endpoint.remarks as rm}
        <li>{@html rm}</li>
      {/each}
    </ul>
  {/if}

  {#if Object.keys(endpoint.urlParameters).length > 0}
    <h3 class="mt-4">URL Path Parameters</h3>
    <div style="display: flex; flex-direction: column; gap: 1em;">
      {#each Object.entries(endpoint.urlParameters) as [pn, pv]}
        <div>
          <h5><code>&#123;{pn}&#125;</code> - {pv.type}</h5>

          <p class="lead mb-0">{pv.description}</p>
          {#if pv.remarks.length > 0}
            <ul class="doc-pf">
              {#each pv.remarks as rm}
                <li>{@html rm}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  {#if endpoint.bodyJson}
    <h3 class="mt-4">JSON in Request Body</h3>
    <p class="lead mb-0">{endpoint.bodyJson.description}</p>
    <SchemaFormatter schema={endpoint.bodyJson.schema}></SchemaFormatter>
  {/if}

  <h3 class="mt-4">Responses</h3>

  <div class="d-flex flex-column" style="gap: 1em;">
    {#each endpoint.responses as response}
      <div>
        <h5>{response.status} - {response.synopsis}</h5>
        <p class="lead mb-0">{response.description}</p>
        {#if response.remarks.length > 0}
          <ul class="doc-pf">
            {#each response.remarks as rm}
              <li>{@html rm}</li>
            {/each}
          </ul>
        {/if}
        <SchemaFormatter schema={response.bodyJson}></SchemaFormatter>
      </div>
    {/each}
  </div>
</div>
