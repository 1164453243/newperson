import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/HelloWorld.vue'
import users from '../components/Userlist.vue'
import userdetil from "@/components/userdetil.vue";

Vue.use(Router)

const router=new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'users',
            redirect: '/users'
        },
        {
            path: '/users',
            name: 'users',
            component: users,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/detail',
            name: 'detail',
            component: userdetil,
        }
    ]
})
export default router;
router.beforeEach((to,from,next)=>{
    // if(to)
    // console.log(1,to);
    // if(to.name==="home"){
    //     store.commit('home/CHANGE_LOGIN',false)
    // }else{
    //     store.commit('home/CHANGE_LOGIN',true)
    // }
    next()
})

