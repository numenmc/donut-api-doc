<script lang="ts">
  export let title: string;
  export let root: boolean = false;
  export let comment: string = "";
  export let unstable: boolean = false;

  let tvNodeRef: HTMLSpanElement;
  let tvNestedRef: HTMLUListElement;

  function toggle() {
    tvNodeRef.classList.toggle("open");
    tvNestedRef.classList.toggle("open");
  }
</script>

<li>
  {#if $$slots.default}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="tv-node d-flex" bind:this={tvNodeRef} on:click={toggle}>
      <div>
        <div style="font-family: 'JetBrains Mono', monospace;">
          {@html title}
        </div>
        {#if comment.trim() != ""}
          <div
            class={`mb-3 ${unstable ? "text-danger" : ""}`}
            style="color: white; font-size: 1.1em;"
          >
            {@html comment}
          </div>
        {/if}
      </div>
    </span>
    <ul class={"tv-nested" + (root ? " tv-root" : "")} bind:this={tvNestedRef}>
      <slot />
    </ul>
  {:else}
    <div class="tv-node-unnested">
      <div style="font-family: 'JetBrains Mono', monospace;">{@html title}</div>
      {#if comment.trim() != ""}
        <div
          class={`mb-3 ${unstable ? "text-danger" : ""}`}
          style="color: white; font-size: 1.1em;"
        >
          {@html comment}
        </div>
      {/if}
    </div>
  {/if}
</li>
