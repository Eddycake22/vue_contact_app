<template>
    <div class="container">
        <ClipLoader v-if="loading"/>
        <table class="table table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact No#</th>
                    <th>Designation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-for="contact in contacts" v-bind:key="contact.id">
                <tr class="table-secondary">
                    <td>{{contact.name }}</td>
                    <td>{{contact.email}}</td>
                    <td>{{contact.phone}}</td>
                    <td>{{contact.designation}}</td>
                    <td>
                        <router-link :to="{name: 'EditContact', params: {id: contact._id}}" class="btn btn-primary btn-sm mr-4">Edit</router-link>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
   /* const contacts = [
        {name: 'Jesus', email: 'je227807@gmail.com', phone: '9841648955', designation:'Teacher'},
        {name: 'Jesus', email: 'je227807@gmail.com', phone: '9841648955', designation:'Teacher'},
        {name: 'Jesus', email: 'je227807@gmail.com', phone: '9841648955', designation:'Teacher'},
    ];  */

    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

    const apiUrl = 'http://localhost:5000/api/contacts';

    const contacts = ref([]);

    const loading = ref(true);

    const getContacts = async() => {
        try{
            const response = await axios.get(apiUrl);
            console.log(response.data);
            //console.log(contacts.value);
            contacts.value = response.data;
        }catch(error){
            console.log(error);
        } finally {
            loading.value = false;
        }
    }

    onMounted(()=> {
        console.log('Contacts List Component mounted');
        getContacts();
    })
</script>