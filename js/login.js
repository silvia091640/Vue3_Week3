import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  

const app=createApp({
    data() {
        return {
           user: {
                "username": "",
                "password": ""
              }
        }
    },
    methods: {
        login(){          
            const apiUrl="https://vue3-course-api.hexschool.io/v2/admin/signin";

            axios.post(apiUrl,this.user)
            .then(res=>{
                const { token,expired }=res.data;
                document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}; path=/`;
               
                window.location ='products.html'
            })
            .catch(error=>{
                console.log(error);
            })
        },
       
    },
})

app.mount('#app');