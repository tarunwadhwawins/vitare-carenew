<template>
<div @click="logout()">logout</div>
    <div>
        dashboard works 
        <Header />
        <Sidebar />
    </div>
</template>

<script>
import Header from '../layout/header/header'
import Sidebar from '../layout/sidebar/sidebar'
import { useRouter } from 'vue-router'
export default {
    components:{
        Header,
        Sidebar
    },
    setup(){
        const router = useRouter();
        function logout(){
            localStorage.removeItem('auth')
            localStorage.clear()
            // router.push({
            //     path: '/'
            // })
        }
        return{
            logout
        }
    }
    
}
</script>