<template>
  <div>
    <b-modal id="modal-user-inform" :title="`사용자 ${inputMode === 'insert' ? '등록' : '수정'}`" @ok="onSubmit">
      <b-form-group v-if="inputMode === 'update'" label-cols="3" label="id" label-for="id">
        <b-form-input id="id" v-model="user.id" disabled></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="부서" label-for="departmentId">
        <b-form-select v-model="user.departmentId" :options="departmentList" value-field="id" text-field="name">
          <template #first>
            <b-form-select-option :value="null">-- 부서를 선택해 주세요 --</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group label-cols="3" label="이름" label-for="name">
        <b-form-input id="name" v-model="user.name"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="아이디" label-for="userid">
        <b-form-input id="userid" v-model="user.userid"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="비밀번호" label-for="password">
        <b-form-input id="password" v-model="user.password" type="password"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="사용자권한" label-for="role">
        <b-form-radio-group v-model="user.role" :options="userRole.options"></b-form-radio-group>
      </b-form-group>
      <b-form-group label-cols="3" label="이메일" label-for="email">
        <b-form-input id="email" v-model="user.email"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="전화번호" label-for="phone">
        <b-form-input id="phone" v-model="user.phone"></b-form-input>
      </b-form-group>
      <b-form-group v-if="inputMode === 'update'" label-cols="3" label="등록일시" label-for="createdAt">
        <b-form-input id="createdAt" v-model="user.createdAt" disabled></b-form-input>
      </b-form-group>
    </b-modal>
    <!-- {{ infoData }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: null,
        departmentId: null,
        name: null,
        userid: null,
        password: null,
        role: null,
        email: null,
        phone: null,
        updatePwDate: null,
        createdAt: null
      },
      userRole: {
        default: 'member', // 기본값
        options: [
          { value: 'leader', text: '팀장' },
          { value: 'member', text: '팀원' }
        ]
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    },
    inputMode() {
      return this.$store.getters.UserInputMode
    },
    departmentList() {
      return this.$store.getters.DepartmentList
    }
  },
  watch: {
    infoData(value) {
      console.log('watch.infoData', value)
      this.user = { ...value }
      this.setDefaultValues() // 기본값 셋팅
    }
  },
  created() {
    // 모달이 최초 열릴 때 감지됨
    this.user = { ...this.infoData }
    this.setDefaultValues()
    this.$store.dispatch('actDepartmentList') // 부서 리스트 조회
    // this.$store.dispatch('actUserInfo')
  },
  methods: {
    onSubmit() {
      console.log('onSubmit', this.user)
      // console.log('onSubmit', { ...this.user }) // console에 출력값 바로 보이게 하기
      if (this.inputMode === 'insert') {
        return this.$store.dispatch('actUserInsert', this.user)
      } else if (this.inputMode === 'update') {
        return this.$store.dispatch('actUserUpdate', this.user)
      }
    },
    setDefaultValues() {
      // 초기값 셋팅
      // 신규등록 열릴 때 권한 라디오 member로 기본값 셋팅
      if (this.inputMode === 'insert') {
        this.user.role = this.userRole.default // 사용자 권한 초기값 주기
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
