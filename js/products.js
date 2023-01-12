import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
  
const apiUrl="https://vue3-course-api.hexschool.io/v2";

const path="silvia-hexschool";

const token= document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

axios.defaults.headers.common.Authorization = token;

const config = {
  headers: { Authorization: token },
};


let productModal = '';
let delProductModal='';


const app=createApp({
    data() {
        return {
            tempProduct:{},
            products:[],
            isNew: false
        }
    },
    methods: {
        getAllProducts(){
            axios.get(`${apiUrl}/api/${path}/admin/products/all`)
            .then((res)=>{
                console.log(res.data.products)
                this.products=res.data.products;
                
            })
            .catch(error=>{
            
                console.log(error);
            })

        }, 
        deleteProduct(){
                axios.delete(`${apiUrl}/api/${path}/admin/product/${this.tempProduct.id}`)
                .then((res)=>{
                    delProductModal.hide();
                    this.getAllProducts();
                    
                })
                .catch(error=>{
                
                    console.log(error);
                })
           
        },
        saveProduct(){
            if(this.isNew)
            {
                axios.post(`${apiUrl}/api/${path}/admin/product`,{data :this.tempProduct })
                .then((res)=>{
                    console.log("OK");
                    productModal.hide();
                    this.getAllProducts();
                    
                })
                .catch(error=>{
                
                    console.log(error);
                })
            }
            else{
             axios.put(`${apiUrl}/api/${path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
            .then((res)=>{
                productModal.hide();
                this.getAllProducts();
                
            })
            .catch(error=>{
            
                console.log(error);
            })
            }
           
        },
        checkAdmin(){
          axios.post(`${apiUrl}/api/user/check`)
          .then(res=>{            
                this.getAllProducts();                         
          })
          .catch(error=>{
            window.location ="login.html";
          })
        },
        openModal(type,item){ 
            this.isNew=type==='create' ? true : false;
            if (type==='edit'){
                console.log(item);
                this.tempProduct={...item};

            }
            else
            {
                this.tempProduct={ imagesUrl: []};
            }
            
            productModal.show();
        },
        openDeleteModal(item){
            this.tempProduct={...item};
            delProductModal.show();
        }
       
    },
    mounted() {
      this.checkAdmin();
      productModal=new bootstrap.Modal(document.querySelector("#productModal"));
      delProductModal=new bootstrap.Modal(document.querySelector("#delProductModal"));
    //   this.createProduct();
    },
})

app.mount("#app");





