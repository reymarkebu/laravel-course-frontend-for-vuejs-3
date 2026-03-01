<script setup lang="ts">
import axios from "axios";

definePageMeta({
  // middleware: ["auth"],
});

const { user } = useAuth();

// const { data:user } = await axios.get("/api/user"); 
</script>

<template>
  <p><strong>User Name:</strong> {{ user?.name }}</p>
  <p><strong>User Email:</strong> {{ user?.email }}</p>
</template>
