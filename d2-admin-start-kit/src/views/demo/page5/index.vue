<template>
  <d2-container>
    <template slot="header">简易视频网站</template>
      <div>
        <!-- <legend>简易视频网站</legend> -->
        <!-- <header id="header"></header>
        <nav id="nav"></nav>
        <section id="section"></section>
        <footer id="footer"></footer> -->

        <div id="header">
          <span>
            <a href="#">电影</a>
            <a href="#">电视剧</a>
            <a href="#">动漫</a>
            <a href="#">短视频</a>
            <a href="#">游戏视频</a>
            <a href="#">纪录片</a>
            <a href="#">科幻片</a>
          </span>
        </div>
        <div id="sec">
          <tr>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
          </tr>
          <tr>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
          </tr>
          <tr>
            <td>31</td>
            <td>32</td>
            <td>33</td>
            <td>34</td>
            <td>35</td>
            <td>36</td>
            <td>37</td>
            <td>38</td>
            <td>39</td>
          </tr>
        </div>
        <div id="footer">
          
        </div>
      </div>
    <template slot="footer">网站的尾部</template>
  </d2-container>
</template>

<script>
export default {
  name: 'page5'
}
</script>
<style scoped>
  #header{
    width: 100%;
    height: 40px;
    background-color:rgb(170, 225, 247);
    text-align: center;
    font-size: 30px;
  }
  a{
    margin: 20px;
  }
  #sec{
    width: 100%;
    height: 480px;
    border: ridge 1px palevioletred;
  } 
  #footer{
    width: 100%;
    height: 40px;
    background-color: rgb(170, 225, 247);
  }
  td{
    height: 160px;
    width: 200px;
    border: ridge paleturquoise 1px;
  }
</style>>