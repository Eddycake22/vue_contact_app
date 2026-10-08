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
                                   <button type="text" class="btn btn-dark btn-sm mt-4">Submit</button>
                            </form>
                     </div>
              </div>
       </div>
</template>

<script setup>
    import {onMounted, ref } from 'vue';
    import axios from 'axios';
    import {useRouter, useRoute} from 'vue-router';
    import {useToast} from 'vue-toastification';
    
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
  
        const contact = ref ({
            name: '',
            email: '',
            phone: '',
            designation: ''
        });

        const getContactById = async () => {
          try{
            const url = `http://localhost:5000/api/contacts/${route.params.id}`
            const response = await axios.get(url);
            contact.value = response.data.contact;
          } catch (error) { //ver error en la consola
            console.error(error);
          }
        }

        onMounted(() => {
    if(route.params.id){
        getContactById();
    }
});

const saveContact = async () => {
    try{    
        await axios.put(
        `http://localhost:5000/api/contacts/${route.params.id}`,
        contact.value
        );
        toast.success("Contacto actualizado");
        router.push("/");
    }catch(error){
        console.error(error);
        toast.error("Ocurrió un error");
    }
}
</script>