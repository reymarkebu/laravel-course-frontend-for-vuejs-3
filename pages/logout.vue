<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth';

const { logout } = useAuth();
logout();

</script>
<template>
  <div>Logging Out...</div>
</template>
