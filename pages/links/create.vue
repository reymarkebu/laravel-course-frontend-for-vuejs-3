<script setup lang="ts">
import axios from "axios";
import { FormKitNode } from "@formkit/core";
import { nanoid } from "nanoid";

definePageMeta({
  // middleware: ["auth"],
});

definePageMeta({
  middleware: ["auth"],
});

const { handleInvalidForm } = useInvalidForm();

async function createLink(payload, node?: FormKitNode) {
  try {
    await axios.post("/api/links", {
      ...payload,
      short_link: nanoid(8)
    });

    useRouter().push("/links");
  } catch (err) {
    handleInvalidForm(err);
  }
  
}
</script>
<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>
  
  <FormKit type="form" submit-label="Create Link" @submit="createLink">
    <FormKit label="Link" name="full_link" type="url"/>
  </FormKit>
</template>
