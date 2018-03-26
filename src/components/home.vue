<template>
    <div class="discuss">
        <ul>
            <li v-for="(item,index) in posts" :key="index">
                <router-link :to="'/home/userinfo/'+item.author.loginname"><img class="my-img" :src="item.author.avatar_url" alt=""></router-link>
                <span class="my-sp">
                          {{item.reply_count}}/{{item.visit_count}}
                      </span>
                <router-link :to="'/home/topic/'+item.id" class="my-a">{{item.title}}</router-link>
                <span class="last-sp">{{item.last_reply_at|date}}</span>
            </li>
           
        </ul>
    </div>
</template>
<script>
    export default {
        created(){
            this.getposts()
        },
        data() {
            return {
                posts: [],
                loading: false
            }
        },
        methods: {
            getposts() {
                this.$http({
                    url: 'https://cnodejs.org/api/v1/topics',
                    method: 'get',
                    params: {
                        page: 1,
                        limit: 20
                    }
                })
                .then(res =>{
                    const body = res.data;
                    if(body.success === true){
                        this.posts = body.data;
                        console.log(body);
                    }
                    
                })
            }
        }
    }
</script>
<style>
    .discuss ul {
        background-color: #fff;
        padding: 0.5rem;
        margin: 1rem 2rem;
        list-style: none;
    }
    ul li {
        line-height: 30px;
        vertical-align: middle;
        border-bottom: 1px #cccccc solid;
    }
    .my-img {
        height: 30px;
        margin-top: 0.3rem;
    }
    .my-sp {
        margin-left: 1.5rem;
        display: inline-block;
        margin-top: -0.3rem;
    }
    .my-a {
        margin-left: 1rem;
        margin-right: 3rem;
        display: inline-block;
        max-width: 70%;
        text-overflow: ellipsis;
        vertical-align: center;
        white-space: nowrap;
        text-decoration: none;
        color: black;
    }
    .my-a:visited {
        color: #ccc;
    }
    .last-sp {
        float: right;
        margin-top: 0.5rem;
    }
</style>
