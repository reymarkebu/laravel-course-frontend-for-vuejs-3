<script setup lang="ts">
import { AxiosError } from "axios";
import { useAuth } from "~~/composables/useAuth";
import { LoginPayload } from "@/types";
import { FormKitNode } from "@formkit/core";

definePageMeta({
  layout: "centered",
  // middleware: ["guest"],
});

const { login } = useAuth();
const { handleInvalidForm } = useInvalidForm();

async function handleLogin(payload: LoginPayload, node?: FormKitNode) {
  try {
    await login(payload);
  }
  catch (err) {
    handleInvalidForm(err, node);
  }
}

</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <FormKit label="Email" name="email" type="email"/>
      <FormKit label="Password" name="password" type="password"/>
    </FormKit>

    <!-- <form @submit.prevent="handleLogin">
      <label>
        <div>Email</div>
        <input type="text" v-model="form.email" />
        <div v-for="error in errors.email" :key="error" class="text-red-600">{{ error }}</div>
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
        <div v-for="error in errors.password" :key="error" class="text-red-600">{{ error }}</div>
      </label>
      <button class="btn">Login</button>
    </form> -->

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
