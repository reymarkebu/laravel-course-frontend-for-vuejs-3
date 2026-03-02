<script setup lang="ts">
import type { Link } from "@/types";
import { FormKitNode } from "@formkit/core";
import { useLinks } from "~~/composables/useLinks";
import { useInvalidForm } from "~~/composables/useInvalidForm";

definePageMeta({
  middleware: ["auth"],
});

const { find, link, update } = useLinks();
const { handleInvalidForm } = useInvalidForm();
await find(useRoute().params.id as string);

async function handleUpdate(payload: Partial<Link>, node?: FormKitNode) {
  console.log("update", useRoute().params.id, payload);
  try {
    await update(Number(useRoute().params.id), payload);
  }
  catch (err) {
    handleInvalidForm(err, node);
  }
}
</script>

<template>
  <h1>Update Link</h1>
  <GoBack>or go back to links</GoBack>
  <FormKit type="form" submit-label="Update Link" @submit="handleUpdate">
    <FormKit
      :value="link?.short_link"
      type="text"
      name="short_link"
      label="Short Link"
    />
    <FormKit
      :value="link?.full_link"
      type="text"
      name="full_link"
      label="Full Link"
    />
  </FormKit>
</template>
