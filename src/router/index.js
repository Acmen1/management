import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import IvIndex from '@/components/iv-index'
import ConText from '@/components/con-text'
import AddActivities from '@/components/add-activities/add-activities'
import RegistrationDetails from '@/components/registration-details/registration-details'
import HistoricalEvents from '@/components/historical-events/historical-events'
import VotingRecord from '@/components/voting-record/voting-record'
import TopupRecord from '@/components/topup-record/topup-record'
import sOne from '@/components/error-page/401'
import sFour from '@/components/error-page/404'
import sFive from '@/components/error-page/500'

Vue.use(Router)
const vueRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
      alias: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: IvIndex,
      children: [
        {
          path: '/index',
          component: ConText,
          redirect: 'index/registration-details',
          children: [
            {
              path: 'registration-details',
              name: '报名详情',
              component: RegistrationDetails,
              meta: {
                title: '报名详情',
                num: 1
              }
            },
            {
              path: 'add-activities',
              name: '添加活动',
              component: AddActivities,
              meta: {
                title: '添加活动',
                num: 2
              }
            },
            {
              path: 'historical-events',
              name: '历史活动',
              component: HistoricalEvents,
              meta: {
                title: '历史活动',
                num: 3
              }
            },
            {
              path: 'voting-record',
              name: '投票记录',
              component: VotingRecord,
              meta: {
                title: '投票记录',
                num: 4
              }
            },
            {
              path: 'topup-record',
              name: '充值记录',
              component: TopupRecord,
              meta: {
                title: '充值记录',
                num: 5
              }
            }
          ]
        }
      ]
    },
    {
      path: '/401',
      name: '401',
      component: sOne
    },
    {
      path: '/404',
      name: '404',
      component: sFour
    },
    {
      path: '/500',
      name: '500',
      component: sFive
    }
  ]
})
export default vueRouter

// vueRouter.beforeEach(function (to, from, next) {
//   const nextRoute = ['registration-details', 'add-activities', 'historical-events', 'voting-record', 'topup-record']
//   const auth = store.state.auth
//   if (nextRoute.indexOf(to.name) >= 0) {
//     if (!store.state.auth.IsLogin) {
//       vueRouter.push({name: 'login'})
//     }
//   }
//   if (to.name === 'login') {
//     if (auth.IsLogin) {
//       vueRouter.push({name: 'registration-details'})
//     }
//   }
//   next()
// })
