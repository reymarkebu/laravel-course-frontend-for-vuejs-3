<script setup lang="ts">
import { AxiosError } from "axios";
import { useAuth } from "~~/composables/useAuth";
import { RegisterPayLoad } from "@/types";
import { FormKitNode } from "@formkit/core";

definePageMeta({
  layout: "centered",
  // middleware: ["guest"],
});
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const { register } = useAuth();
const { handleInvalidForm } = useInvalidForm();

async function handleRegister(payload: RegisterPayLoad, node?: FormKitNode) {
  try {
    await register(payload);
  }
  catch (err) {
    handleInvalidForm(err, node);
  }

}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" submit-label="Register" @submit="handleRegister">
      <FormKit label="Name" name="name" type="text"/>
      <FormKit label="Email" name="email" type="email"/>
      <FormKit label="Password" name="password" type="password"/>
      <FormKit label="Confirm Password" name="password_confirmation" type="password"/>
    </FormKit>
    <!-- <form @submit.prevent="register(form)">
      <label>
        <div>Name</div>
        <input type="text"  v-model="form.name"/>
      </label>

      <label>
        <div>Email</div>
        <input type="email" v-model="form.email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
      </label>

      <label>
        <div>Confirm Password</div>
        <input type="password" v-model="form.password_confirmation" />
      </label>

      <button class="btn">Register</button>
    </form> -->

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
