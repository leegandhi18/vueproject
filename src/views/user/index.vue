<template>
  <div>
    <h1>사용자 관리</h1>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-input-group style="width: 250px">
            <b-form-input v-model="searchParams" placeholder="Search" @keyup.ctrl.enter="searchUserList"></b-form-input>
            <b-button variant="primary" size="sm" @click="searchUserList">검색</b-button>
          </b-input-group>
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="success" size="sm" @click="onClickAddNew">신규등록</b-button>
        </b-col>
      </b-row>
    </div>
    <b-table striped hover :items="userList" :fields="fields">
      <template #cell(Department)="data">
        {{ data.item.Department && data.item.Department.name }}
      </template>
      <template #cell(createdAt)="row">
        {{ row.item.createdAt.substring(0, 10) }}
      </template>
      <template #cell(updateBtn)="data">
        <b-button variant="success" size="sm" @click="onClickEdit(data.item.id)">수정</b-button>
      </template>
      <template #cell(deleteBtn)="data">
        <b-button variant="danger" size="sm" @click="onClickDelete(data.item.id)">삭제</b-button>
      </template>
    </b-table>

    <!-- 입력 폼 -->
    <Inform />
  </div>
</template>

<script>
import Inform from './inform.vue'

export default {
  components: {
    Inform
  },
  data() {
    return {
      searchParams: null,
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: '이름' },
        { key: 'Department', label: '부서' },
        { key: 'userid', label: '아이디' },
        { key: 'role', label: '권한' },
        { key: 'email', label: '이메일' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
    insertedResult() {
      return this.$store.getters.UserInsertedResult
    },
    updatedResult() {
      return this.$store.getters.UserUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.UserDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      console.log('watch.InsertedResult', value)

      // 등록 후 처리
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      console.log('watch.updatedResult', value)

      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      console.log('watch.deletedResult', value)

      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchUserList()
  },
  methods: {
    searchUserList() {
      // console.log('searchUserList', this.searchParams)
      this.$store.dispatch('actUserList', this.searchParams)
    },
    onClickAddNew() {
      console.log('onClickAddNew')
      // 1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'insert')

      // 신규등록 누를 때 초기화 시키기
      this.$store.dispatch('actUserInit')

      // 입력 모달 띄우기
      this.$bvModal.show('modal-user-inform')
    },
    onClickEdit(id) {
      console.log('onClickEdit', id)
      // 1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'update')

      // 2. 사용자 정보 조회
      this.$store.dispatch('actUserInfo', id)

      // 입력 모달 띄우기
      this.$bvModal.show('modal-user-inform')
    },
    onClickDelete(id) {
      console.log('onClickDelete', id)
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actUserDelete', id)
        }
      })
    }
  }
}
</script>
