<script setup>
import AdminBar from './components/AdminBar.vue'
import AdminProducts from './components/AdminProducts.vue'
import AdminOrders from './components/AdminOrders.vue'
import AdminAdmin from './components/AdminAdmin.vue'
import {ref} from 'vue'

const activePage = ref('home')

const setActive = (bar) => {
    activePage.value = bar
}

</script>
<template>
    <div id="admin">
        <div>
            <AdminBar @getActive="(bar) => setActive(bar)"/>
        </div>
        <div style="justify-self: stretch;">
            <AdminProducts v-if="activePage == 'products'"/>
            <AdminOrders v-if="activePage == 'orders'"/>
            <AdminAdmin v-if="activePage == 'admin'"/>
        </div>
    </div>

</template>
<style>
#admin {
    display: grid;
    grid-template-columns: 1fr 5fr;
    width: 98vw;
}
</style>