<template>
    <div class="topic">
        <div class="left-articl">
            <div class="main-articl">
                <h3>{{author.title}}</h3>
                <ul>
                    <li>分类回答</li>
                    <li>{{author.visit_count}}次访问</li>
                    <li>发布于{{author.create_at}}</li>
                    <li>作者：{{author.author.loginname}}</li>
                </ul>
                <div class="articl" v-html="author.content">
                </div>
            </div>
            <div class="comments">
                <ul>
                    <li v-for="(item,index) in author.replies" :key="index">
                        <p>
                            <router-link :to="'/home/userinfo/'+item.author.loginname"><img :src="item.author.avatar_url" alt="">
                                </router-link>
                                    <router-link :to="'/home/userinfo/'+item.author.loginname" class="name">{{item.author.loginname}}</router-link>
                                        <span>{{index+1}}楼</span>
                                        <section class="iconright">
                                            <span>❤ </span> 4
                                        </section>
                        </p>
                        <p v-html="item.content"></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="rightsummeray">
            <div class="authou">
                <p>作者</p>
                <p>
                    <router-link :to="'/home/userinfo/'+author.author.loginname">
                        <img :src="author.author.avatar_url" alt="">
                    </router-link>
                    <router-link :to="'/home/userinfo/'+author.author.loginname">
                                    {{author.author.loginname}} 
                    </router-link>
                </p>
                <p>积分：90</p>
            </div>
            <div class="recentTopic">
                <p>作者最近的主题</p>
                <ul>
                   <li v-for="(item,index) in list.recent_replies" :key="index">
                    <router-link :to="'/home/topic/'+item.id">
                        {{item.title}}
                    </router-link>
                </li>
                </ul>
            </div>
            <div class="recentTopic">
                <p>作者最近的主题</p>
                <ul>
                   <li v-for="(item,index) in list.recent_replies" :key="index">
                   <router-link :to="'/home/topic/'+item.id">
                        {{item.title}}
                    </router-link>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        beforeMount() {
            this.getauthorInfo();
           
        },
        data() {
            return {
                author: {
                    	author: {
	                loginname: 'temp',//设置默认值，防止Vue在axios未被调用前报错
	               }
                },
                list:{}
            }
        },
        methods: {
            getauthorInfo() {
                this.$http({
                        url: `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`, //ES6语法，引入组件内的 route object（路由信息对象） 
                        method: 'get',
                        params: {
                            mdrender: true
                        }
                    })
                    .then(res => {
                        const body = res.data;
                        if (body.success === true) {
                            this.author = body.data;
                            console.log(this.author.author.loginname);
                                                        console.log(this.$route.params.id);

                        }
                    })
            },
             getList() {
                this.$http({
                        url: `https://cnodejs.org/api/v1/user/${this.author.author.loginname}`,
                        method: 'get'
                    })
                    .then(res => {
                        const body = res.data;
                        if (body.success === true) {
                            this.list = body.data;
                            console.log(this.list);
                        }
                    })
            }
        },
        watch:{
            author(){
                this.getList();
            }
            }
        
    }
</script>
<style>
    .left-articl {
        width: 70%;
        display: inline-block;
        margin-left: 3%;
        padding: 1%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .main-articl {
        background-color: #fff;
        padding: 1.5rem;
    }
    .main-articl h3 {
        margin-bottom: 15px;
    }
    .main-articl ul {
        margin-bottom: 40px;
        height: 30px;
        font-size: 14px;
        color: #ccc;
    }
    .main-articl ul li {
        float: left;
        margin-right: 3rem;
    }
    .main-articl .articl p img {
        width: 100%;
    }
    /* .main-articl .articl .sec-img img {
        width: 100%;
    } */
    .comments {
        margin-top: 20px;
        background-color: #fff;
    }
    .comments ul li {
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        list-style: none;
    }
    .comments ul li a img {
        height: 30PX;
    }
    .comments ul li .name {
        color: black;
        font-size: 26px;
        text-decoration: none;
    }
    .comments ul li p span {
        font-size: 14px;
    }
    .comments ul li p .iconright {
        float: right;
        color: red;
    }
    .rightsummeray {
        float: right;
        width: 24%;
        margin-right: 3%;
        box-sizing: border-box;
        padding: 1%;
    }
    .rightsummeray .authou {
        background-color: #fff;
        padding: 1rem;
    }
    .rightsummeray .authou p:nth-child(1) {
        margin-bottom: 15px;
        background-color: #eaeaea;
    }
    .rightsummeray .authou p:nth-child(2) a img {
        width: 50px;
    }
    .rightsummeray .authou p:nth-child(2) a:last-child {
        text-decoration: none;
        color: black;
        display: inline-block;
        line-height: 40px;
    }
    .rightsummeray .authou p:nth-child(1) {
        font-size: 14px;
    }
    .recentTopic {
        padding: 1rem;
        background-color: #fff;
        margin-top: 15px;
    }
    .recentTopic p {
        font-size: 14px;
        margin-bottom: 10px;
        background-color: #eaeaea;
    }
    .recentTopic ul {
        list-style: none;
        font-size: 14px;
    }
    .recentTopic ul {
        line-height: 20px;
    }
    .comments ul li p:last-child {
        margin-left: 5%;
        margin-right: 2%;
    }
</style>
