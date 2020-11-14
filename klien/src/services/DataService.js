import Api from '@/services/Api'

export default {
  getAllSalary() {
    return Api().get('getAllSalary')
  },
  getAllSpending() {
    return Api().get('getAllSpending')
  },
}
