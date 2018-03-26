<template>
    <div class="userInfo">
        <div class="topInfo">
            <div>
                <img :src="list.avatar_url" alt="">
                <span>{{list.loginname}}</span>
            </div>
            <p>{{list.score}}</p>
            <p>注册时间：{{list.create_at}}</p>
        </div>
        <div class="apply">
            <p>回复的主题</p>
            <ul>
                <li v-for="(item,index) in list.recent_replies" :key="index">
                    <router-link :to="'/home/topic/'+item.id">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="apply">
            <p>创建的主题</p>
            <ul>
               <li v-for="(item,index) in list.recent_replies" :key="index">
                    <router-link :to="'/home/topic/'+item.id">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.getList()
        },
        data() {
            return {
                list: {},
                isShow: false
            }
        },
        methods: {
            getList() {
                this.$http({
                        url: `https://cnodejs.org/api/v1/user/${this.$route.params.id}`,
                        method: 'get'
                    })
                    .then(res => {
                        const body = res.data;
                        if (body.success === true) {
                            this.list = body.data;
                            console.log(this.$route.params.id);
                        }
                    })
            }
        }
    }
</script>
<style>
    .userInfo {
        margin: 2rem 6rem;
    }
    .userInfo .topInfo {
        padding: 1rem;
        background-color: #fff;
    }
    .userInfo .topInfo div img {
        width: 50px;
    }
    .userInfo .apply {
        background-color: #fff;
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .userInfo .apply p {
        line-height: 30px;
        background-color: #eaeaea;
        font-size: 16px;
    }
    .userInfo .apply ul {
        list-style: none;
        font-size: 14px;
        color: blue;
    }
</style>

