import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    id: null,
    departmentId: null,
    name: null,
    userid: null,
    password: null,
    role: null,
    email: null,
    phone: null,
    updatedPwDate: null,
    createdAt: null,
    updatedAt: null
  }
}
export default {
  state: {
    // state에 사용할 모델이나 값을 선언 한다.
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null // 입력모드 구분해주는 코드(등록: insert, 수정: update)
  },
  getters: {
    // getters을 통해 state값을 호출 한다.
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult,
    UserInputMode: state => state.InputMode
  },
  mutations: {
    // mutations는 동기적이어야 함.(비동기 사용 불가)
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setUserInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // action은 비동기적 사용이 가능하다. (action에서 mutation을 호출하는 방법을 권장함)
    // 사용자 리스트
    actUserList(context, payload) {
      console.log('actUserList', payload)
      /* 테스트 데이터 세팅 */
      // const UserList = [
      //   {
      //     id: 1,
      //     departmentId: 1,
      //     name: '홍길동',
      //     userid: 'hong',
      //     role: 'leader',
      //     email: 'hong@email.com',
      //     phone: '010-1234-5678',
      //     createdAt: '2021-12-01T00:00:00.000Z',
      //     Department: { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' }
      //   },
      //   {
      //     id: 2,
      //     departmentId: 2,
      //     name: '김길동',
      //     userid: 'kim',
      //     role: 'member',
      //     email: 'kim@email.com',
      //     phone: '010-9876-5432',
      //     createdAt: '2021-12-01T00:00:00.000Z',
      //     Department: { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
      //   }
      // ]
      // context.commit('setUserList', UserList)

      /* RestAPI 호출 */
      api
        .get('/serverApi/users')
        .then(response => {
          const userList = response && response.data
          context.commit('setUserList', userList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserList.error', error)
          context.commit('setUserList', [])
        })
    },
    // 신규등록
    actUserInsert(context, payload) {
      console.log('actUserInsert', payload)
      // 결과값 초기화
      context.commit('setInsertedResult', null)

      // 백엔드 호출 (결과값 수신)
      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const insertedResult = 1
      //   context.commit('setInsertedResult', insertedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      api
        .post('/serverApi/users', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 신규등록 초기화
    actUserInit(context, payload) {
      // { ...stateInit.User }는 현재의 값만 복사해주기 때문에 사용한다.
      context.commit('setUser', { ...stateInit.User })
      // 메모리 부분까지 복사하기 때문에 stateInit.User 값이 변하면 User값도 변하게 된다.
      // context.commit('setUser', stateInit.User)
    },
    // 입력모드 설정
    actUserInputMode(context, payload) {
      // console.log('actUserInputMode', context, payload)
      context.commit('setUserInputMode', payload)
    },
    // 사용자 정보 조회
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })

      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const UserList = [
          {
            id: 1,
            departmentId: 1,
            name: '홍길동',
            userid: 'hong',
            role: 'leader',
            email: 'hong@email.com',
            phone: '010-1234-5678',
            updatedPwDate: '2021-12-01T00:00:00.000Z',
            createdAt: '2021-12-01T00:00:00.000Z',
            Department: { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' }
          },
          {
            id: 2,
            departmentId: 2,
            name: '김길동',
            userid: 'kim',
            role: 'member',
            email: 'kim@email.com',
            phone: '010-9876-5432',
            updatedPwDate: '2021-12-01T00:00:00.000Z',
            createdAt: '2021-12-01T00:00:00.000Z',
            Department: { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
          }
        ]

        let User = { ...stateInit.User }
        for (let i = 0; i < UserList.length; i += 1) {
          if (payload === UserList[i].id) {
            User = { ...UserList[i] }
          }
        }
        context.commit('setUser', User)
      }, 300)
      */

      /* RestAPI 호출 */
      api
        .get(`/serverApi/users/${payload}`)
        .then(response => {
          const user = response && response.data
          context.commit('setUser', user)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInfo.error', error)
          context.commit('setUser', -1)
        })
    },
    // 수정
    actUserUpdate(context, payload) {
      console.log('actUserUpdate', payload)
      // 상태값 초기화
      context.commit('setUpdatedResult', null)
      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.length > 0 && response.data[0]
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actUserDelete(context, payload) {
      console.log('actUserDelete', payload)
      // 상태값 초기화
      context.commit('setDeletedResult', null)
      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/users/${payload}`)
        .then(response => {
          const deletedResult = response && response.data
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
