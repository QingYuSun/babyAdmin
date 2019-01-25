<template>
    <expand-box :title="title" :close="true">
        <div slot="body">
            <ul class="users-list clearfix">
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">张老师</a>
                    <span class="users-list-date">今天</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">王老师</a>
                    <span class="users-list-date">昨天</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">李老师</a>
                    <span class="users-list-date">1月12日</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">何老师</a>
                    <span class="users-list-date">1月12日</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">黄老师</a>
                    <span class="users-list-date">1月13日</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">陈老师</a>
                    <span class="users-list-date">1月14日</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">秦老师</a>
                    <span class="users-list-date">1月15日</span>
                </li>
                <li>
                    <img src="../../assets/avatar.png" alt="User Image">
                    <a class="users-list-name" href="#">林老师</a>
                    <span class="users-list-date">1月15日</span>
                </li>
            </ul>
        </div>
    </expand-box>
</template>
<style lang="scss" scoped>

    .list-unstyled, .chart-legend, .contacts-list, .users-list, .mailbox-attachments {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .users-list-name {
        font-weight: 600;
        color: #444;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .users-list-name, .users-list-date {
        display: block;
    }

    .users-list-date {
        color: #999;
        font-size: 12px;
    }
    .users-list>li {
        width: 25%;
        float: left;
        padding: 10px;
        text-align: center;
    }
</style>
<script>
    import ExpandBox from './ExpandBox.vue'
    export default{
        data(){
            return{
                msg:'hello vue',
                title:'学校'
            }
        },
        components:{
            'expand-box' : ExpandBox,
        }
    }
</script>
