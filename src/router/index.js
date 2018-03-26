import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
import UserInfo from '@/components/userinfo.vue'
import Topic from '@/components/topic.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'

        },
        {
            path: '/home',
            name: 'root',
            component: Home
        },
        {
            path: '/home/userinfo/:id',
            component: UserInfo
        },
        {
            path: '/home/topic/:id',
            component: Topic
        }
    ]
})