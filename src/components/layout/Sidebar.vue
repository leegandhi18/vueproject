<template>
  <div>
    this.$route.path{{ this.$route.path }}
    <b-list-group>
      <b-list-group-item
        v-if="this.$route.path !== '/dashboard'"
        :style="this.$route.path === '/dashboard' ? 'background-color: yellow' : 'background-color: white'"
        href="#"
        @click="$router.push('/dashboard')"
        >대시보드
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path === '/dashboard'"
        :style="this.$route.path === '/dashboard' ? 'background-color: yellow' : 'background-color: white'"
        href="#"
        >대시보드
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path !== '/department'"
        :style="this.$route.path === '/department' ? 'background-color: #D6ADD3' : 'background-color: white'"
        href="#"
        @click="$router.push('/department')"
        >부서 관리
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path === '/department'"
        :style="this.$route.path === '/department' ? 'background-color: #D6ADD3' : 'background-color: white'"
        href="#"
        >부서 관리
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path !== '/user'"
        :style="this.$route.path === '/user' ? 'background-color: #B1C582' : 'background-color: white'"
        href="#"
        @click="$router.push('/user')"
        >사용자 관리
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path === '/user'"
        :style="this.$route.path === '/user' ? 'background-color: #B1C582' : 'background-color: white'"
        href="#"
        >사용자 관리
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path !== '/device'"
        :style="this.$route.path === '/device' ? 'background-color: #D30DC9' : 'background-color: white'"
        href="#"
        @click="$router.push('/device')"
        >장비 관리
      </b-list-group-item>
      <b-list-group-item
        v-if="this.$route.path === '/device'"
        :style="this.$route.path === '/device' ? 'background-color: #D30DC9' : 'background-color: white'"
        href="#"
        >장비 관리
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped></style>
