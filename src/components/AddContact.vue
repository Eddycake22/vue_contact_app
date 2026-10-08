<template>
       <div class="container mt-4">
              <div class="row">
                     <div class="col-md-6">
                            <form @submit.prevent="saveContact">
                                   <div class="form-group">
                                          <input type="text" v-model="contact.name" class="form-control" placeholder="Enter name">
                                   </div>
                                   <br>
                                   <div class="form-group">
                                          <input type="email" v-model="contact.email" class="form-control" placeholder="Enter email">
                                   </div>
                                   <br>
                                   <div class="form-group">
                                          <input type="text" v-model="contact.phone" class="form-control" placeholder="Enter Phone">
                                   </div>
                                   <br>
                                   <div class="form-group">
                                          <input type="text" v-model="contact.designation" class="form-control" placeholder="Enter Designation">
                                   </div>
                                   <button type="submit" class="btn btn-dark btn-sm mt-4">Submit</button>
                            </form>
                     </div>
              </div>
       </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useToast} from 'vue-toastification'

const contact = ref({
       name: '',
       email: '',
       phone: '',
       designation: '',
});


const toast = useToast();
       // Sirve para ver que se está llamando por medio de la consola
       const saveContact = async () => {
              console.log("Contact value are ", contact.value);
       
       // Nos va a dar un aviso si falta informacion por llenar
       if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation){
              toast.error("All fields are required!")
       }

       try{
              const url = 'http://localhost:5000/api/contacts';
              const response = await axios.post(url, contact.value);
              console.log(response);

              if(response.status === 201) {
                     toast.success('Contact Added Successfully');
                     contact.value.name = '';
                     contact.value.email = '';
                     contact.value.phone = '';
                     contact.value.designation = '';
              }
       }catch (error){

       }
}
</script>